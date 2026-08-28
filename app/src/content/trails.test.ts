import { test } from "node:test";
import assert from "node:assert/strict";
import { trailFor, hasTrail, trailToWalk, FALLBACK_TRAIL } from "./trails.ts";
import { historyTrail } from "./history-trail.ts";

// The hero walks whichever road this registry hands it, so the rule that a road must be researched
// before it exists is pinned here rather than left to good intentions.

test("South Africa's road is the 25 sourced milestones, unchanged", () => {
  const za = trailFor("za");
  assert.ok(za, "South Africa must have a trail — it is the fallback everything leans on");
  assert.equal(za.milestones, historyTrail, "za should walk history-trail.ts itself, not a copy");
  assert.ok(za.milestones.length >= 20, `expected the full trail, got ${za.milestones.length}`);
});

test("every trail's milestones are ordered and carry a year, a title and a note", () => {
  for (const code of ["za"]) {
    const t = trailFor(code);
    assert.ok(t);
    for (const m of t.milestones) {
      assert.ok(m.year && /^\d{4}$/.test(m.year), `${code}: "${m.title}" needs a four-digit year`);
      assert.ok(m.title && m.title.length > 2, `${code}: a milestone needs a title`);
      assert.ok(m.note && m.note.length > 20, `${code}: "${m.title}" needs a grounded line, not a stub`);
    }
    const years = t.milestones.map((m) => Number(m.year));
    assert.deepEqual(years, [...years].sort((a, b) => a - b), `${code}: milestones must run in time order`);
  }
});

test("every trail cites where its milestones come from", () => {
  for (const code of ["za"]) {
    const t = trailFor(code);
    assert.ok(t && t.sourceNote.length > 40, `${code} needs a real sourceNote — the road makes historical claims`);
  }
});

test("a country with no researched road has no road — it is not silently invented", () => {
  // Botswana has 19 dated events sitting in countries/bw-botswana.md, and is deliberately still
  // absent here: its citation markers were lost in the paste, so it is researched but not yet
  // sourced per claim. That distinction is the whole point of this test.
  assert.equal(hasTrail("bw"), false);
  assert.equal(trailFor("bw"), undefined);
  assert.equal(hasTrail("ke"), false);
});

test("trailToWalk reports honestly whose road the reader is getting", () => {
  const own = trailToWalk("za");
  assert.equal(own.isOwn, true);
  assert.equal(own.trail.country, "za");

  // The hero still has something to walk, but must be told it is not this country's own road.
  const borrowed = trailToWalk("bw");
  assert.equal(borrowed.isOwn, false, "walking another country's road must never report as 'own'");
  assert.equal(borrowed.trail, FALLBACK_TRAIL);
});
