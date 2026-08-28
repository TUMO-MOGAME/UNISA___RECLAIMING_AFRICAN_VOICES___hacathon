import { test } from "node:test";
import assert from "node:assert/strict";
import { quizQuestions, quizFor, hasQuiz, answerOf, shuffledOptionOrder } from "./quiz.ts";
import { historyTrail } from "./history-trail.ts";

// These tests exist to make the integrity rules structural rather than a matter of intent. A future
// question that breaks one of them fails the build instead of quietly shipping.

test("every question has exactly one correct answer", () => {
  for (const q of quizQuestions) {
    const correct = q.options.filter((o) => o.correct);
    assert.equal(correct.length, 1, `${q.id} must have exactly one correct option`);
  }
});

test("every question offers at least three options", () => {
  for (const q of quizQuestions) {
    assert.ok(q.options.length >= 3, `${q.id} needs enough options to be a real question`);
  }
});

test("every question ties to a real history-trail milestone", () => {
  const ids = new Set(historyTrail.map((m) => m.id));
  for (const q of quizQuestions) {
    assert.ok(
      ids.has(q.milestoneId),
      `${q.id} points at "${q.milestoneId}", which is not a milestone — a question must never float free of its source`
    );
  }
});

test("every question carries an explanation", () => {
  for (const q of quizQuestions) {
    assert.ok(
      q.explain.en && q.explain.en.length > 40,
      `${q.id} needs an explanation — a right answer without a reason teaches nothing`
    );
  }
});

test("question ids are unique", () => {
  const seen = new Set<string>();
  for (const q of quizQuestions) {
    assert.ok(!seen.has(q.id), `duplicate question id: ${q.id}`);
    seen.add(q.id);
  }
});

test("no two options within a question repeat", () => {
  for (const q of quizQuestions) {
    const texts = q.options.map((o) => o.text.en.toLowerCase());
    assert.equal(new Set(texts).size, texts.length, `${q.id} has a duplicated option`);
  }
});

test("quizFor returns only that milestone's questions", () => {
  const got = quizFor("y1652");
  assert.ok(got.length > 0);
  assert.ok(got.every((q) => q.milestoneId === "y1652"));
  assert.deepEqual(quizFor("y-does-not-exist"), []);
});

test("hasQuiz reflects what is actually authored", () => {
  assert.equal(hasQuiz("y1652"), true);
  assert.equal(hasQuiz("y-does-not-exist"), false);
});

test("answerOf returns the correct option", () => {
  const q = quizFor("y1867")[0];
  assert.equal(answerOf(q)?.text.en, "Diamonds");
});

test("the 1652 question refuses the empty-land myth", () => {
  // This one is worth pinning: the whole point of offering "the land was empty" is that choosing it
  // is corrected. If it ever became the correct answer, the app would be teaching the colonial myth.
  const q = quizQuestions.find((x) => x.id === "q1652-who");
  assert.ok(q, "the 1652 question must exist");
  const empty = q!.options.find((o) => /empty/i.test(o.text.en));
  assert.ok(empty, "the myth must still be offered so it can be corrected");
  assert.notEqual(empty!.correct, true, "the empty-land myth must never be the correct answer");
  assert.equal(answerOf(q!)?.text.en, "The Khoikhoi and the San");
  assert.match(q!.explain.en, /myth/i, "the explanation must name it as a myth");
});

// ── KTR-01: re-asking a question after a correction (docs/14, D7) ────────────────────────────────
// A wrong answer hands the question back with its options reshuffled. That is presentation only, and
// these pin it: reordering must never lose an option, duplicate one, or move which one is correct.

test("shuffling an option order keeps every option exactly once", () => {
  for (const q of quizQuestions) {
    // Walk a range of rand() values rather than trusting one lucky draw.
    for (const r of [0, 0.25, 0.5, 0.75, 0.999]) {
      const order = shuffledOptionOrder(q, () => r);
      assert.equal(order.length, q.options.length, `${q.id} lost or gained an option`);
      assert.deepEqual(
        [...order].sort((a, b) => a - b),
        q.options.map((_, i) => i),
        `${q.id} did not preserve its options under shuffle (rand=${r})`
      );
    }
  }
});

test("shuffling never changes which option is correct", () => {
  for (const q of quizQuestions) {
    const answer = answerOf(q);
    for (const r of [0, 0.33, 0.66, 0.999]) {
      const shown = shuffledOptionOrder(q, () => r).map((i) => q.options[i]);
      const correct = shown.filter((o) => o.correct);
      assert.equal(correct.length, 1, `${q.id} must still have exactly one correct option after shuffle`);
      assert.equal(correct[0].text.en, answer?.text.en, `${q.id} changed its answer under shuffle`);
    }
  }
});

test("a real shuffle actually reorders — otherwise the retry is muscle memory again", () => {
  // Not every draw permutes (a shuffle may legitimately land on the identity), so assert that at
  // least one of many draws differs from the authored order.
  const q = quizQuestions.find((x) => x.options.length >= 4);
  assert.ok(q, "expected at least one four-option question");
  const identity = q.options.map((_, i) => i).join(",");
  const moved = Array.from({ length: 50 }, () => shuffledOptionOrder(q).join(",")).some(
    (o) => o !== identity
  );
  assert.ok(moved, "shuffledOptionOrder never reordered across 50 draws");
});
