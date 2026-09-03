// The old agentMode boolean is gone; anyone upgrading has it in their
// settings.json. These tests pin the migration and the fact that the key is no
// longer a settings key at all.
const test = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const Module = require("node:module");

const SETTINGS = require.resolve("../src/main/settings");

// settings.js only needs electron for app.getPath("userData"). A fresh module
// instance per case is the point: the migration runs once, inside init().
function loadWith(stored) {
  const userData = fs.mkdtempSync(path.join(os.tmpdir(), "prts-vibe-test-"));
  if (stored) {
    fs.writeFileSync(path.join(userData, "settings.json"), JSON.stringify(stored));
  }
  const realLoad = Module._load;
  Module._load = function (request) {
    if (request === "electron") return { app: { getPath: () => userData } };
    return realLoad.apply(this, arguments);
  };
  try {
    delete require.cache[SETTINGS];
    const settings = require("../src/main/settings");
    settings.init();
    return settings;
  } finally {
    Module._load = realLoad;
  }
}

test("agentMode: true becomes the agent tier", () => {
  const settings = loadWith({ agentMode: true });
  assert.strictEqual(settings.get("vibeCodingMode"), "agent");
  assert.strictEqual(settings.get("agentMode"), undefined);
});

test("agentMode: false becomes companion, the new default", () => {
  // The old boolean had nothing between "full terminal control" and "off", so
  // off maps to the strictest tier rather than to the old tool set.
  const settings = loadWith({ agentMode: false });
  assert.strictEqual(settings.get("vibeCodingMode"), "companion");
});

test("an explicit tier already in settings.json wins over the old boolean", () => {
  const settings = loadWith({ agentMode: true, vibeCodingMode: "advisor" });
  assert.strictEqual(settings.get("vibeCodingMode"), "advisor");
});

test("a fresh install starts in companion", () => {
  const settings = loadWith(null);
  assert.strictEqual(settings.get("vibeCodingMode"), "companion");
});

test("the migrated boolean is not written back to disk", () => {
  const settings = loadWith({ agentMode: true });
  assert.ok(!Object.keys(settings.getAll()).includes("agentMode"));
});
