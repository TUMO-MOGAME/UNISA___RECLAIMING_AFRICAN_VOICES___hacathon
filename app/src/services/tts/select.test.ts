import { test } from "node:test";
import assert from "node:assert/strict";
import { chooseProvider } from "./select.ts";

test("prefers Botlhale when a key is present", () => {
  assert.equal(chooseProvider({ hasBotlhaleKey: true }), "botlhale");
});

test("falls back to the on-device engine with no key", () => {
  assert.equal(chooseProvider({ hasBotlhaleKey: false }), "device");
});
