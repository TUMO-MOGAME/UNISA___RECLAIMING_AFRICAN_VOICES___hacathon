import { test } from "node:test";
import assert from "node:assert/strict";
import type { RecordingMeta } from "./recordings.ts";
import { sortNewestFirst, prepend, removeById, renameById } from "./recordings.ts";

const rec = (id: string, title = "story"): RecordingMeta => ({
  id,
  title,
  visibility: "private",
  createdAt: "now",
});

test("sortNewestFirst orders by id descending (newest capture first)", () => {
  const out = sortNewestFirst([rec("100"), rec("300"), rec("200")]);
  assert.deepEqual(
    out.map((r) => r.id),
    ["300", "200", "100"]
  );
});

test("sortNewestFirst does not mutate its input", () => {
  const input = [rec("1"), rec("2")];
  sortNewestFirst(input);
  assert.deepEqual(
    input.map((r) => r.id),
    ["1", "2"]
  );
});

test("prepend puts the new recording on top", () => {
  const out = prepend([rec("1")], rec("2"));
  assert.deepEqual(
    out.map((r) => r.id),
    ["2", "1"]
  );
});

test("prepend replaces an existing id rather than duplicating it", () => {
  const out = prepend([rec("1", "old"), rec("2")], rec("1", "new"));
  assert.deepEqual(
    out.map((r) => r.id),
    ["1", "2"]
  );
  assert.equal(out[0].title, "new");
});

test("removeById is real erasure — the id is gone", () => {
  const out = removeById([rec("1"), rec("2"), rec("3")], "2");
  assert.deepEqual(
    out.map((r) => r.id),
    ["1", "3"]
  );
});

test("removeById on a missing id leaves the list unchanged", () => {
  const out = removeById([rec("1")], "nope");
  assert.deepEqual(
    out.map((r) => r.id),
    ["1"]
  );
});

test("renameById updates only the matching recording", () => {
  const out = renameById([rec("1", "a"), rec("2", "b")], "2", "renamed");
  assert.equal(out[0].title, "a");
  assert.equal(out[1].title, "renamed");
});
