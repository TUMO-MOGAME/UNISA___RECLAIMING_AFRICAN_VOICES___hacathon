import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveText, t } from "./localize.ts";

const SAMPLE = { en: "Yesterday", tn: "Maloba" };

test("returns reviewed text when the language exists", () => {
  const r = resolveText(SAMPLE, "tn");
  assert.deepEqual(r, { text: "Maloba", lang: "tn", status: "reviewed" });
});

test("falls back to English and flags it when the language is missing", () => {
  const r = resolveText(SAMPLE, "zu");
  assert.deepEqual(r, { text: "Yesterday", lang: "en", status: "fallback" });
});

test("uses a machine draft (labelled) when there is no reviewed text", () => {
  const r = resolveText(SAMPLE, "zu", "Izolo");
  assert.deepEqual(r, { text: "Izolo", lang: "zu", status: "draft" });
});

test("reviewed text always wins over a draft", () => {
  const r = resolveText(SAMPLE, "tn", "some-draft");
  assert.equal(r.status, "reviewed");
  assert.equal(r.text, "Maloba");
});

test("English request is reviewed, never a fallback", () => {
  const r = resolveText(SAMPLE, "en");
  assert.equal(r.status, "reviewed");
  assert.equal(r.lang, "en");
});

test("empty/whitespace translations fall back to English", () => {
  const r = resolveText({ en: "Yesterday", zu: "   " }, "zu");
  assert.equal(r.text, "Yesterday");
  assert.equal(r.status, "fallback");
});

test("t() returns just the resolved string", () => {
  assert.equal(t(SAMPLE, "tn"), "Maloba");
  assert.equal(t(SAMPLE, "ve"), "Yesterday");
});
