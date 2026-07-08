import { test } from "node:test";
import assert from "node:assert/strict";
import { tokenize, retrieve, matchNavigation } from "./retrieve.ts";
import { PAGES } from "./pages.ts";
import type { KnowledgeChunk } from "./knowledge.ts";

const CHUNKS: KnowledgeChunk[] = [
  { id: "m", page: "mhudi", title: "Mhudi", body: "The first English novel by a Black South African, by Sol Plaatje. Barolong survival after the Mfecane." },
  { id: "p", page: "presidents", title: "Nelson Mandela", body: "First democratically elected president of South Africa, 1994 to 1999." },
  { id: "prov", page: "provinces", title: "Western Cape", body: "Capital Cape Town. The province of the Mother City." },
];

test("tokenize drops stop-words and short tokens", () => {
  const toks = tokenize("Who is the president of South Africa?");
  assert.ok(!toks.includes("the"));
  assert.ok(!toks.includes("is"));
  assert.ok(toks.includes("president"));
  assert.ok(toks.includes("south"));
});

test("retrieve ranks the on-topic chunk first", () => {
  const top = retrieve("Tell me about Mandela the president", CHUNKS, 2);
  assert.equal(top[0].chunk.id, "p");
  assert.ok(top[0].score > 0);
});

test("retrieve returns nothing for an all-stopword query", () => {
  assert.equal(retrieve("what is the", CHUNKS).length, 0);
});

test("matchNavigation fires on an explicit trigger phrase", () => {
  const p = matchNavigation("take me to the provinces", PAGES);
  assert.equal(p?.id, "provinces");
});

test("matchNavigation fires on a bare page name", () => {
  assert.equal(matchNavigation("provinces", PAGES)?.id, "provinces");
  assert.equal(matchNavigation("totems", PAGES)?.id, "totems");
});

test("matchNavigation prefers the longer keyword (national days over days)", () => {
  assert.equal(matchNavigation("open national days", PAGES)?.id, "days");
});

test("matchNavigation does NOT fire on a genuine question", () => {
  // A real question that merely mentions a page name should be answered, not navigated.
  assert.equal(matchNavigation("what happened on freedom day and why does it matter historically", PAGES), null);
});

test("matchNavigation does NOT hijack a short question that names a page", () => {
  // "Who was Sol Plaatje?" is a question — answer it, don't navigate to the Mhudi page.
  assert.equal(matchNavigation("Who was Sol Plaatje?", PAGES), null);
  assert.equal(matchNavigation("What are totems?", PAGES), null);
});

test("matchNavigation still fires on 'take me to X' even if phrased with a page name", () => {
  assert.equal(matchNavigation("take me to totems", PAGES)?.id, "totems");
});

test("matchNavigation returns null when no page is referenced", () => {
  assert.equal(matchNavigation("how are you today", PAGES), null);
});
