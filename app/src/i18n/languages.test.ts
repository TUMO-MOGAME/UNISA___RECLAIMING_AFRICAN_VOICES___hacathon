import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LANGUAGES,
  DEFAULT_LANG,
  languageByCode,
  toBcp47,
  toBotlhaleCode,
} from "./languages.ts";

test("covers all 11 official South African languages", () => {
  assert.equal(LANGUAGES.length, 11);
});

test("language codes are unique", () => {
  const codes = LANGUAGES.map((l) => l.code);
  assert.equal(new Set(codes).size, codes.length);
});

test("includes each official language by code", () => {
  const codes = new Set(LANGUAGES.map((l) => l.code));
  for (const c of ["en", "af", "nr", "xh", "zu", "nso", "st", "tn", "ss", "ve", "ts"]) {
    assert.ok(codes.has(c as never), `missing ${c}`);
  }
});

test("every language has a non-empty endonym, English name, and speech codes", () => {
  for (const l of LANGUAGES) {
    assert.ok(l.endonym.length > 0, `${l.code} endonym`);
    assert.ok(l.english.length > 0, `${l.code} english`);
    assert.ok(l.bcp47.length > 0, `${l.code} bcp47`);
    assert.ok(l.botlhale.length > 0, `${l.code} botlhale`);
  }
});

test("only English and Setswana are marked as human-reviewed today", () => {
  const reviewed = LANGUAGES.filter((l) => l.reviewedContent).map((l) => l.code).sort();
  assert.deepEqual(reviewed, ["en", "tn"]);
});

test("speech codes resolve to the expected xx-ZA forms", () => {
  assert.equal(toBcp47("tn"), "tn-ZA");
  assert.equal(toBotlhaleCode("tn"), "tn-ZA");
  assert.equal(toBcp47("zu"), "zu-ZA");
  assert.equal(toBotlhaleCode("xh"), "xh-ZA");
});

test("unknown codes fall back to the default language", () => {
  assert.equal(languageByCode("xx").code, DEFAULT_LANG);
});
