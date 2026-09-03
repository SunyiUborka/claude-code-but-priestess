// The persona overlay is split into a stable `system` prefix and a per-turn
// `context`. That split is the whole prompt-caching story: a cached prefix
// matches by exact bytes from the start, so one changed character in the system
// prompt throws away the cache for the entire conversation behind it and the
// session is re-billed at full price, every turn. These tests pin the split, so
// a new persona block cannot quietly land on the wrong side of it.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");

const PERSONA = require.resolve("../src/main/persona");

function loadPersona() {
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "prts-persona-test-"));
  const memory = path.join(userData, "memory");
  fs.mkdirSync(memory, { recursive: true });
  fs.writeFileSync(path.join(memory, "MEMORY.md"), "# 记忆\n- 博士在写一个桌宠。\n");
  fs.writeFileSync(path.join(memory, "CONVERSATION_SUMMARY.md"), "# 摘要\n- 早些时候的对话。\n");
  fs.writeFileSync(
    path.join(memory, "CONVERSATION_ARCHIVE.jsonl"),
    `${JSON.stringify({ ts: Date.now(), role: "user", provider: "claude", text: "档案里的一条旧消息" })}\n`
  );
  const realLoad = Module._load;
  Module._load = function (request) {
    if (request === "electron") return { app: { getPath: () => userData } };
    return realLoad.apply(this, arguments);
  };
  try {
    delete require.cache[PERSONA];
    return { persona: require("../src/main/persona"), memory };
  } finally {
    Module._load = realLoad;
  }
}

const BASE = { vibeCodingMode: "companion", provider: "claude", skillsEnabled: true };

test("the system prefix is byte-identical across wildly different turns", () => {
  const { persona } = loadPersona();
  // Everything that varies per turn at once: the clock, the memory bundle, the
  // deep canon, the cat form, the observe rule, a screenshot, a transcript.
  const plain = persona.buildPersonaParts({ ...BASE, includeLongMemory: false });
  const loaded = persona.buildPersonaParts({
    ...BASE,
    includeLongMemory: true,
    deepPersona: true,
    observeEnabled: true,
    screenshotPath: "/tmp/screen.png",
    catMode: { cat: true, mood: "crying" },
    sharedTranscript: "博士: 你好\n\n普瑞赛斯: 我在，博士。"
  });
  assert.strictEqual(plain.system, loaded.system);
  assert.ok(loaded.context.length > plain.context.length);
});

test("settings and tier do move the system prefix — they are stable within a session, not across them", () => {
  const { persona } = loadPersona();
  const companion = persona.buildPersonaParts({ ...BASE, includeLongMemory: false });
  const agent = persona.buildPersonaParts({ ...BASE, vibeCodingMode: "agent", includeLongMemory: false });
  const noSkills = persona.buildPersonaParts({ ...BASE, skillsEnabled: false, includeLongMemory: false });
  assert.notStrictEqual(companion.system, agent.system);
  assert.notStrictEqual(companion.system, noSkills.system);
});

test("the per-turn context carries the clock, never the prefix", () => {
  const { persona } = loadPersona();
  const { system, context } = persona.buildPersonaParts({ ...BASE, includeLongMemory: false });
  assert.ok(context.includes("【此刻 —— 博士的本机时间】"));
  assert.ok(!system.includes("【此刻 —— 博士的本机时间】"));
});

test("the archive tail can be dropped for a session that already gets the full transcript", () => {
  const { persona } = loadPersona();
  const withTail = persona.buildPersonaParts({ ...BASE, includeLongMemory: true, includeArchiveTail: true });
  const without = persona.buildPersonaParts({ ...BASE, includeLongMemory: true, includeArchiveTail: false });
  assert.ok(withTail.context.includes("档案里的一条旧消息"));
  assert.ok(!without.context.includes("档案里的一条旧消息"));
});

test("the single-message form still returns both halves, in order", () => {
  const { persona } = loadPersona();
  const opts = { ...BASE, includeLongMemory: false };
  const { system, context } = persona.buildPersonaParts(opts);
  const whole = persona.buildPersonaPrompt(opts);
  assert.ok(whole.startsWith(system));
  assert.ok(whole.endsWith(context));
});

test("the reminder pins the format rules a resumed backend still has to follow", () => {
  const { persona } = loadPersona();
  const reminder = persona.personaReminder();
  // Sent instead of the full overlay on a resumed Codex rollout, so it has to
  // be small — and it has to keep the mood marker, which the UI parses.
  assert.ok(reminder.includes("[[mood:X]]"));
  assert.ok(reminder.includes("普瑞赛斯"));
  assert.ok(reminder.length < 600, `reminder grew to ${reminder.length} chars`);
});

test("the memory fingerprint tracks MEMORY.md and ignores the per-message files", () => {
  const { persona, memory } = loadPersona();
  const before = persona.longMemoryFingerprint();
  // The summary and archive are rewritten after every message; if they counted,
  // the fingerprint would change every turn and never skip a re-send.
  fs.writeFileSync(path.join(memory, "CONVERSATION_SUMMARY.md"), "# 摘要\n- 又一条。\n- 再一条。\n");
  fs.appendFileSync(path.join(memory, "CONVERSATION_ARCHIVE.jsonl"), `${JSON.stringify({ ts: Date.now(), role: "user", text: "新的" })}\n`);
  assert.strictEqual(persona.longMemoryFingerprint(), before);

  fs.writeFileSync(path.join(memory, "MEMORY.md"), "# 记忆\n- 博士在写一个桌宠。\n- 博士喜欢深夜工作。\n");
  assert.notStrictEqual(persona.longMemoryFingerprint(), before);
});
