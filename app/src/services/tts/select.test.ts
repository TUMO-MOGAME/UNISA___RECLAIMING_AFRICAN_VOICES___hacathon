import { test } from "node:test";
import assert from "node:assert/strict";
import { chooseProvider, providerLadder } from "./select.ts";
import { LANGUAGES } from "../../i18n/languages.ts";

const BOTH = { hasElevenLabsKey: true, hasBotlhaleKey: true };
const ELEVEN_ONLY = { hasElevenLabsKey: true, hasBotlhaleKey: false };
const BOTLHALE_ONLY = { hasElevenLabsKey: false, hasBotlhaleKey: true };
const NEITHER = { hasElevenLabsKey: false, hasBotlhaleKey: false };

/** The nine ElevenLabs cannot speak. Kept as a literal list so a registry edit has to face this test. */
const INDIGENOUS = ["tn", "zu", "xh", "nso", "st", "ts", "ss", "nr", "ve"] as const;

test("English and Afrikaans go to ElevenLabs when there is a key", () => {
  assert.equal(chooseProvider({ lang: "en", ...BOTH }), "elevenlabs");
  assert.equal(chooseProvider({ lang: "af", ...BOTH }), "elevenlabs");
});

test("NO indigenous language is ever routed to ElevenLabs — not even as a fallback", () => {
  // The integrity rule as a test. ElevenLabs returns fluent, confident, WRONG audio for these; it
  // does not error, so nothing downstream would notice. This is where it gets noticed.
  for (const lang of INDIGENOUS) {
    assert.equal(chooseProvider({ lang, ...BOTH }), "botlhale", `${lang} must not go to ElevenLabs`);
    assert.equal(
      providerLadder({ lang, ...BOTH }).includes("elevenlabs"),
      false,
      `${lang} must not have ElevenLabs anywhere on its ladder`
    );
    // Even with NO other engine available, the answer is the device, never ElevenLabs.
    assert.equal(chooseProvider({ lang, ...ELEVEN_ONLY }), "device");
    assert.deepEqual(providerLadder({ lang, ...ELEVEN_ONLY }), ["device"]);
  }
});

test("Botlhale stays first choice for Setswana even though ElevenLabs sounds better", () => {
  assert.equal(chooseProvider({ lang: "tn", ...BOTH }), "botlhale");
});

test("with no keys at all, every language still has an engine", () => {
  for (const l of LANGUAGES) {
    assert.equal(chooseProvider({ lang: l.code, ...NEITHER }), "device");
    assert.deepEqual(providerLadder({ lang: l.code, ...NEITHER }), ["device"]);
  }
});

test("the ladder always ends at the device, for every language and every key combination", () => {
  for (const l of LANGUAGES) {
    for (const keys of [BOTH, ELEVEN_ONLY, BOTLHALE_ONLY, NEITHER]) {
      const ladder = providerLadder({ lang: l.code, ...keys });
      assert.equal(ladder.at(-1), "device", `${l.code} must never dead-end`);
      assert.equal(new Set(ladder).size, ladder.length, "no engine appears twice");
    }
  }
});

test("English falls from ElevenLabs to Botlhale to the device", () => {
  assert.deepEqual(providerLadder({ lang: "en", ...BOTH }), ["elevenlabs", "botlhale", "device"]);
  assert.deepEqual(providerLadder({ lang: "en", ...ELEVEN_ONLY }), ["elevenlabs", "device"]);
  assert.deepEqual(providerLadder({ lang: "en", ...BOTLHALE_ONLY }), ["botlhale", "device"]);
});

test("chooseProvider always names the first rung of the ladder", () => {
  for (const l of LANGUAGES) {
    for (const keys of [BOTH, ELEVEN_ONLY, BOTLHALE_ONLY, NEITHER]) {
      assert.equal(chooseProvider({ lang: l.code, ...keys }), providerLadder({ lang: l.code, ...keys })[0]);
    }
  }
});
