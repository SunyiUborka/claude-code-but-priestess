// Guards the fork-specific parts of settings.set(). Upstream's VALIDATORS table
// describes upstream's feature set; copied verbatim it silently narrows this
// fork's own options back to upstream's. These tests fail loudly if that
// happens during a future merge.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");

// settings.js only needs electron for app.getPath("userData").
const userData = fs.mkdtempSync(path.join(os.tmpdir(), "prts-settings-test-"));
const realLoad = Module._load;
Module._load = function (request) {
  if (request === "electron") return { app: { getPath: () => userData } };
  return realLoad.apply(this, arguments);
};

const settings = require("../src/main/settings");
settings.init();

function roundTrip(key, value) {
  settings.set({ [key]: value });
  return settings.get(key);
}

test("every backend this fork ships is a legal chatProvider", () => {
  for (const provider of ["claude", "codex", "priestess", "opencode"]) {
    assert.strictEqual(roundTrip("chatProvider", provider), provider,
      `${provider} must be accepted — it is a real backend here`);
  }
  settings.set({ chatProvider: "claude" });
  assert.strictEqual(roundTrip("chatProvider", "gpt5"), "claude", "unknown provider is rejected");
});

test("Japanese stays a legal menu language", () => {
  for (const lang of ["system", "zh", "en", "ja"]) {
    assert.strictEqual(roundTrip("menuLanguage", lang), lang);
  }
  settings.set({ menuLanguage: "system" });
  assert.strictEqual(roundTrip("menuLanguage", "de"), "system", "unknown language is rejected");
});

test("the vibe coding tiers validate, and agentMode is gone", () => {
  for (const tier of ["companion", "advisor", "agent"]) {
    assert.strictEqual(roundTrip("vibeCodingMode", tier), tier);
  }
  settings.set({ vibeCodingMode: "companion" });
  assert.strictEqual(roundTrip("vibeCodingMode", "root"), "companion",
    "an unknown tier is rejected");
  // The old boolean is not a settings key any more: set() rejects it as
  // unknown rather than storing something no reader consults.
  assert.ok(!("agentMode" in settings.DEFAULTS));
  settings.set({ agentMode: true });
  assert.strictEqual(settings.get("agentMode"), undefined);
});

test("opencodeModel is a declared key, not one surviving a permissive merge", () => {
  assert.ok("opencodeModel" in settings.DEFAULTS, "must be declared in DEFAULTS");
  assert.strictEqual(roundTrip("opencodeModel", "some/model"), "some/model");
});

test("Claude effort levels validate, junk does not", () => {
  for (const level of ["low", "medium", "high", "xhigh", "max", ""]) {
    assert.strictEqual(roundTrip("claudeReasoningEffort", level), level);
  }
  settings.set({ claudeReasoningEffort: "medium" });
  assert.strictEqual(roundTrip("claudeReasoningEffort", "turbo"), "medium",
    "an effort level Claude has never had is rejected");
});

test("undeclared keys are rejected", () => {
  // An upstream-only key: declared there, not here.
  settings.set({ windowsNeteaseClientControl: true });
  assert.strictEqual(settings.get("windowsNeteaseClientControl"), undefined);
});

test("a rejected patch neither persists nor wakes subscribers", () => {
  let calls = 0;
  const unsubscribe = settings.subscribe(() => { calls += 1; });
  settings.set({ nonsenseKey: 1 });
  assert.strictEqual(calls, 0, "no subscriber call for an empty sanitized patch");
  settings.set({ theme: "dark" });
  assert.strictEqual(calls, 1);
  unsubscribe();
});

test("subscribers receive only what was applied", () => {
  let seen = null;
  const unsubscribe = settings.subscribe((_all, patch) => { seen = patch; });
  settings.set({ theme: "light", menuLanguage: "cy", outfit: "casual" });
  assert.deepStrictEqual(seen, { theme: "light", outfit: "casual" },
    "the rejected key must not reach subscribers");
  unsubscribe();
});
