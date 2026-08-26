import { test } from "node:test";
import assert from "node:assert/strict";
import { quizQuestions, quizFor, hasQuiz, answerOf } from "./quiz.ts";
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
