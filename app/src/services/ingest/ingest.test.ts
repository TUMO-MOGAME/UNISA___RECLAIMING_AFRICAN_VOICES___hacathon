import { test } from "node:test";
import assert from "node:assert/strict";
import type { SourceRights } from "./rights.ts";
import { isPublicDomainByYear, canIngest, canPublish } from "./rights.ts";
import { stripGutenbergBoilerplate, normalizeText } from "./extract.ts";
import { segmentChapters } from "./segment.ts";
import { toDraftModule, seedFrom, excerpt, NEEDS_ADAPTATION } from "./draft.ts";

// ---- rights ----

test("SA life+50: a work is PD the year after the 50-year term ends", () => {
  assert.equal(isPublicDomainByYear(1932, 1982), false); // Plaatje term ends end of 1982
  assert.equal(isPublicDomainByYear(1932, 1983), true); // PD from 1983
  assert.equal(isPublicDomainByYear(1945, 1996), true); // Mqhayi PD from 1996
  assert.equal(isPublicDomainByYear(2000, 2026), false); // still in copyright
});

test("v1 gate ingests only cleared rights; unverified is blocked", () => {
  const pd: SourceRights = { id: "x", title: "T", author: "A", rights: "public-domain" };
  const lic: SourceRights = { id: "x", title: "T", author: "A", rights: "licensed" };
  const unk: SourceRights = { id: "x", title: "T", author: "A", rights: "unverified" };
  assert.equal(canIngest(pd), true);
  assert.equal(canIngest(lic), true);
  assert.equal(canIngest(unk), false);
  assert.equal(canPublish(unk), false);
});

// ---- extract ----

test("stripGutenbergBoilerplate keeps only the work between the markers", () => {
  const raw = [
    "The Project Gutenberg eBook of Something",
    "Lots of legal header text...",
    "*** START OF THE PROJECT GUTENBERG EBOOK SOMETHING ***",
    "The real opening line.",
    "More story.",
    "*** END OF THE PROJECT GUTENBERG EBOOK SOMETHING ***",
    "Legal footer, license, donations...",
  ].join("\n");
  const out = stripGutenbergBoilerplate(raw);
  assert.equal(out, "The real opening line.\nMore story.");
});

test("stripGutenbergBoilerplate leaves a non-Gutenberg text alone", () => {
  const raw = "  Just a plain text.\nSecond line.  ";
  assert.equal(stripGutenbergBoilerplate(raw), "Just a plain text.\nSecond line.");
});

test("normalizeText re-joins hyphenated line breaks and collapses blank runs", () => {
  const raw = "The govern-\nment of the land.\r\n\n\n\nNext para.   \n";
  assert.equal(normalizeText(raw), "The government of the land.\n\nNext para.");
});

// ---- segment ----

const BOOK = [
  "Title Page — dropped from chapters",
  "",
  "CHAPTER I. THE EXODUS.",
  "They left at dawn.",
  "The road was long.",
  "",
  "CHAPTER II. THE RETURN.",
  "Years later they came home.",
].join("\n");

test("segmentChapters splits on chapter headings and keeps verbatim bodies", () => {
  const chapters = segmentChapters(BOOK);
  assert.equal(chapters.length, 2);
  assert.equal(chapters[0].number, 1);
  assert.equal(chapters[0].heading, "CHAPTER I. THE EXODUS.");
  assert.equal(chapters[0].body, "They left at dawn.\nThe road was long.");
  assert.equal(chapters[1].heading, "CHAPTER II. THE RETURN.");
  assert.equal(chapters[1].body, "Years later they came home.");
});

test("segmentChapters returns one chapter when there are no headings", () => {
  const chapters = segmentChapters("A short story with no chapters at all.");
  assert.equal(chapters.length, 1);
  assert.equal(chapters[0].heading, "");
  assert.equal(chapters[0].body, "A short story with no chapters at all.");
});

test("segmentChapters does not match prose like 'chapter house'", () => {
  const chapters = segmentChapters("They met in the chapter house near the church.");
  assert.equal(chapters.length, 1);
  assert.equal(chapters[0].heading, "");
});

// ---- draft ----

const SOURCE: SourceRights = {
  id: "example",
  title: "The Example",
  author: "A. Author",
  authorDied: 1930,
  rights: "public-domain",
  basis: "SA life+50; d.1930 → PD 1981",
};

test("seedFrom is deterministic and non-negative", () => {
  assert.equal(seedFrom("example-1"), seedFrom("example-1"));
  assert.notEqual(seedFrom("example-1"), seedFrom("example-2"));
  assert.ok(seedFrom("anything") >= 0);
});

test("excerpt collapses whitespace and ellipsizes long bodies", () => {
  assert.equal(excerpt("  one   two\nthree  "), "one two three");
  assert.equal(excerpt("abcdef", 3), "abc…");
});

test("toDraftModule builds the Module shape with one anchored, unadapted scene per chapter", () => {
  const chapters = segmentChapters(BOOK);
  const draft = toDraftModule(SOURCE, chapters);

  assert.equal(draft.id, "example");
  assert.equal(draft.kind, "literature");
  assert.equal(draft.title, "The Example");
  assert.equal(draft.scenes.length, 2);

  const s0 = draft.scenes[0];
  assert.equal(s0.id, "example-ch1");
  assert.equal(s0.title.en, "CHAPTER I. THE EXODUS.");
  // Adapted text is explicitly a stub — the human/Gemini review gate, not silently blank.
  assert.equal(s0.text.en, NEEDS_ADAPTATION);
  assert.equal(s0.childText.en, NEEDS_ADAPTATION);
  // The sourceNote is anchored to real, verbatim text (integrity rule).
  assert.match(s0.sourceNote, /The Example, CHAPTER I\. THE EXODUS\.: “They left at dawn\./);
  assert.equal(draft.references[0], SOURCE.basis);
});
