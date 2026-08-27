import { test } from "node:test";
import assert from "node:assert/strict";
import { countryLanguages, languagesFor, hasLanguageMap } from "./country-languages.ts";
import { readFileSync } from "node:fs";
import { LANGUAGES } from "../i18n/languages.ts";

// The country → language map makes factual claims about real countries, so the structural parts of
// the integrity rule are pinned here rather than left to care.

const CODES = new Set(LANGUAGES.map((l) => l.code));

// anthems.ts is read rather than imported: it `require()`s 54 flag PNGs, which Node's type-stripping
// loader cannot resolve. Reading the source keeps this test dependency-free (same trick as
// src/routes.test.ts).
const anthemsSrc = readFileSync(
  new URL("./anthems.ts", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"),
  "utf8"
);
const COUNTRY_CODES = new Set([...anthemsSrc.matchAll(/\{\s*code:\s*"([a-z]{2})"/g)].map((m) => m[1]));

test("every mapped country is a real country in the picker", () => {
  for (const code of Object.keys(countryLanguages)) {
    assert.ok(COUNTRY_CODES.has(code), `"${code}" is not one of the 54 countries in anthems.ts`);
  }
});

test("every supported language is a language the app actually has", () => {
  for (const [code, entry] of Object.entries(countryLanguages)) {
    for (const l of entry.supported) {
      assert.ok(CODES.has(l), `${code} claims "${l}", which is not in the language registry`);
    }
  }
});

test("no country lists the same language twice", () => {
  for (const [code, entry] of Object.entries(countryLanguages)) {
    assert.equal(new Set(entry.supported).size, entry.supported.length, `${code} repeats a language`);
  }
});

test("every claim cites its source — this file states facts about real countries", () => {
  for (const [code, entry] of Object.entries(countryLanguages)) {
    assert.ok(
      entry.sourceNote && entry.sourceNote.length > 30,
      `${code} needs a real sourceNote: "what they speak in X" is a factual claim (AGENTS.md §4)`
    );
  }
});

test("English is offered everywhere it is mapped — it is the app's guaranteed base", () => {
  for (const [code, entry] of Object.entries(countryLanguages)) {
    assert.ok(entry.supported.includes("en"), `${code} must keep English, the fallback every text has`);
  }
});

test("South Africa carries all eleven official languages", () => {
  const za = languagesFor("za");
  assert.ok(za);
  assert.equal(za.supported.length, 11, "the Constitution names eleven; the picker must show eleven");
});

test("Zimbabwe's Ndebele is NOT mapped to South Africa's isiNdebele", () => {
  // Northern Ndebele (Zimbabwe) and Southern Ndebele (South Africa, `nr`) are different languages.
  // Conflating them would be a plausible-looking falsehood, which is the exact failure mode the
  // integrity rule exists to prevent.
  const zw = languagesFor("zw");
  assert.ok(zw);
  assert.ok(!zw.supported.includes("nr"), "Zimbabwe must not claim South Africa's isiNdebele");
  assert.ok(
    zw.notYet.some((n) => n.includes("Ndebele")),
    "Zimbabwe's Ndebele should be named as one we do not have"
  );
});

test("an unmapped country reports honestly rather than guessing", () => {
  // Egypt is deliberately not mapped. The picker falls back to the full list for countries like it.
  assert.equal(hasLanguageMap("eg"), false);
  assert.equal(languagesFor("eg"), undefined);
});

test("every country's lead language is one it actually supports", () => {
  // `lead` is what the app switches to when a country is chosen (LANG-04). A lead outside
  // `supported` would switch the reader into a language we never claimed was spoken there.
  for (const [code, entry] of Object.entries(countryLanguages)) {
    assert.ok(
      entry.supported.includes(entry.lead),
      `${code} leads with "${entry.lead}", which is not in its supported list`
    );
  }
});

test("the lead language is a language the app has", () => {
  for (const [code, entry] of Object.entries(countryLanguages)) {
    assert.ok(CODES.has(entry.lead), `${code} leads with "${entry.lead}", not in the language registry`);
  }
});

test("the Southern African neighbours lead with the language they actually share with us", () => {
  // The point of the whole feature: Botswana should come up in Setswana, not in English.
  assert.equal(languagesFor("bw")?.lead, "tn");
  assert.equal(languagesFor("ls")?.lead, "st");
  assert.equal(languagesFor("sz")?.lead, "ss");
});
