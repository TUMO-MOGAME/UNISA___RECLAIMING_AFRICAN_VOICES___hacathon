import { test } from "node:test";
import assert from "node:assert/strict";
import { deidentify } from "./deidentify.ts";
import type { Testimony } from "./consensus.ts";
import { aggregate, withdraw } from "./consensus.ts";

// ---- de-identify ----

test("strips phone, SA ID and email but keeps historical names/places", () => {
  const raw =
    "My grandmother Nomsa marched in Soweto on 16 June 1976. Call me on 082 123 4567 " +
    "or email sipho@example.co.za. My ID is 7801235009087.";
  const { text, redactions } = deidentify(raw);

  // Content preserved — names and places are the history, not identity.
  assert.match(text, /grandmother Nomsa/);
  assert.match(text, /Soweto on 16 June 1976/);

  // Structured identifiers gone.
  assert.doesNotMatch(text, /082 123 4567/);
  assert.doesNotMatch(text, /sipho@example\.co\.za/);
  assert.doesNotMatch(text, /7801235009087/);
  assert.match(text, /\[phone removed\]/);
  assert.match(text, /\[email removed\]/);
  assert.match(text, /\[ID removed\]/);

  // Report is types + counts only — never the removed values.
  assert.deepEqual(redactions.sort((a, b) => a.type.localeCompare(b.type)), [
    { type: "email", count: 1 },
    { type: "id", count: 1 },
    { type: "phone", count: 1 },
  ]);
});

test("a 13-digit ID is not chewed up by the phone pass", () => {
  const { text, redactions } = deidentify("ID 8005075800086 only.");
  assert.match(text, /\[ID removed\]/);
  assert.doesNotMatch(text, /\[phone removed\]/);
  assert.deepEqual(redactions, [{ type: "id", count: 1 }]);
});

test("clean testimony is left untouched with no redactions", () => {
  const raw = "We walked to the river and the elders sang.";
  const { text, redactions } = deidentify(raw);
  assert.equal(text, raw);
  assert.deepEqual(redactions, []);
});

// ---- consensus ----

const TESTIMONIES: Testimony[] = [
  { id: "t1", claims: ["police-fired-first", "many-children"] },
  { id: "t2", claims: ["police-fired-first", "many-children"] },
  { id: "t3", claims: ["police-fired-first", "a-dog-barked"] }, // unique detail
  { id: "t4", claims: ["students-threw-stones-first"] }, // divergence + unique
];

test("aggregate counts agreement and links every claim back to its testimonies", () => {
  const c = aggregate(TESTIMONIES);
  assert.equal(c.total, 4);

  // Most-supported first — the honest "of N accounts…" order.
  assert.equal(c.claims[0].claim, "police-fired-first");
  assert.equal(c.claims[0].count, 3);
  assert.equal(c.claims[0].share, 3 / 4);
  assert.deepEqual(c.claims[0].testimonyIds, ["t1", "t2", "t3"]); // no orphan facts

  // The divergence is present, not hidden — it just has fewer voices.
  const diverge = c.claims.find((x) => x.claim === "students-threw-stones-first");
  assert.equal(diverge?.count, 1);
});

test("aggregate surfaces the detail no one else remembers", () => {
  const c = aggregate(TESTIMONIES);
  const uniques = c.unique.map((u) => u.claim).sort();
  assert.deepEqual(uniques, ["a-dog-barked", "students-threw-stones-first"]);
});

test("it counts — it never crowns a winner (no 'truth' field, contradictions coexist)", () => {
  const c = aggregate(TESTIMONIES);
  const claimKeys = c.claims.map((x) => x.claim);
  // Both sides of the contradiction are present in the tally.
  assert.ok(claimKeys.includes("police-fired-first"));
  assert.ok(claimKeys.includes("students-threw-stones-first"));
});

test("POPIA: withdrawing a testimony recomputes the aggregate — its unique detail disappears", () => {
  const remaining = withdraw(TESTIMONIES, "t3");
  const c = aggregate(remaining);

  assert.equal(c.total, 3);
  // t3 was the only "a-dog-barked" account — gone from the derived aggregate.
  assert.ok(!c.claims.some((x) => x.claim === "a-dog-barked"));
  // And the shared claim's support drops to reflect the withdrawal.
  assert.equal(c.claims.find((x) => x.claim === "police-fired-first")?.count, 2);
});

test("empty input aggregates cleanly (no divide-by-zero)", () => {
  const c = aggregate([]);
  assert.deepEqual(c, { total: 0, claims: [], unique: [] });
});
