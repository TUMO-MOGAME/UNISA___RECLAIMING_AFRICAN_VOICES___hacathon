import { test } from "node:test";
import assert from "node:assert/strict";
import { createPlaylist } from "./soundtrack.ts";

// deterministic rng so the shuffle is reproducible in tests
function seeded(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

test("every clip is used exactly once before any repeat (a full permutation)", () => {
  const n = 20;
  const p = createPlaylist(n, seeded(42));
  const seen: number[] = [];
  for (let i = 0; i < n; i++) seen.push(p.next());
  assert.equal(new Set(seen).size, n, "no clip reused within a cycle");
  assert.deepEqual([...seen].sort((a, b) => a - b), Array.from({ length: n }, (_, i) => i));
});

test("order is shuffled, not the raw slice order", () => {
  const n = 20;
  const p = createPlaylist(n, seeded(7));
  const seen = Array.from({ length: n }, () => p.next());
  assert.notDeepEqual(seen, Array.from({ length: n }, (_, i) => i), "should not be 0,1,2,…");
});

test("reshuffles after the pool is exhausted, no back-to-back repeat across the boundary", () => {
  const n = 8;
  const p = createPlaylist(n, seeded(3));
  const order = Array.from({ length: n * 2 }, () => p.next());
  assert.equal(new Set(order.slice(0, n)).size, n, "cycle 1 is a full permutation");
  assert.equal(new Set(order.slice(n)).size, n, "cycle 2 is a full permutation");
  assert.notEqual(order[n - 1], order[n], "last of cycle 1 != first of cycle 2");
});

test("size reflects the pool and a single-clip pool just repeats it", () => {
  const p = createPlaylist(1, seeded(1));
  assert.equal(p.size, 1);
  assert.equal(p.next(), 0);
  assert.equal(p.next(), 0);
});

test("rejects an empty pool", () => {
  assert.throws(() => createPlaylist(0), /at least one clip/);
});
