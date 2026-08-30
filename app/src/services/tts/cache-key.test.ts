import { test } from "node:test";
import assert from "node:assert/strict";
import { narrationKey } from "./cache-key.ts";

const base = { provider: "elevenlabs", lang: "en", voice: "amara", text: "Yesterday speaks today." };

test("the same passage, language and voice always produce the same key", () => {
  assert.equal(narrationKey(base), narrationKey({ ...base }));
  // The cache exists to stop paying twice; an unstable key would silently pay every time.
});

test("surrounding whitespace does not create a second paid rendering", () => {
  assert.equal(narrationKey(base), narrationKey({ ...base, text: "  Yesterday speaks today.\n" }));
});

test("a changed translation misses the cache rather than serving stale audio", () => {
  assert.notEqual(narrationKey(base), narrationKey({ ...base, text: "Yesterday speaks today!" }));
});

test("language, voice and provider each separate a rendering", () => {
  assert.notEqual(narrationKey(base), narrationKey({ ...base, lang: "af" }));
  assert.notEqual(narrationKey(base), narrationKey({ ...base, voice: "declan" }));
  assert.notEqual(narrationKey(base), narrationKey({ ...base, provider: "botlhale" }));
});

test("the key holds no readable text — it is a hash, not the passage", () => {
  const key = narrationKey(base);
  assert.equal(key.includes("Yesterday"), false);
  assert.ok(key.length < 60, `a key must stay short whatever the passage: ${key}`);
});

test("a very long passage still yields a short key", () => {
  const key = narrationKey({ ...base, text: "word ".repeat(5000) });
  assert.ok(key.length < 60);
  assert.ok(key.startsWith("elevenlabs:en:amara:"));
});

test("keys are distinct across a realistic body of passages", () => {
  // A cheap collision check: a collision costs one wrong clip, so it should be rare, not impossible.
  const seen = new Set<string>();
  for (let i = 0; i < 5000; i++) {
    seen.add(narrationKey({ ...base, text: `Passage number ${i} of the trail.` }));
  }
  assert.equal(seen.size, 5000, "5000 distinct passages must yield 5000 distinct keys");
});
