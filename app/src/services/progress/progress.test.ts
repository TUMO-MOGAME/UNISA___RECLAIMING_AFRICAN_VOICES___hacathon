import { test } from "node:test";
import assert from "node:assert/strict";
import {
  emptyProgress,
  normalise,
  completeStage,
  awardCard,
  stampCountry,
  setWatched,
  recordQuiz,
  recordSolve,
  firstTryBonus,
  touchStreak,
  isDayBefore,
  todayISO,
  journeyFraction,
  level,
  stageId,
  STARS_PER_STAGE,
  BONUS_STARS_FIRST_TRY,
} from "./progress.ts";

test("emptyProgress starts at zero and holds no personal data", () => {
  const p = emptyProgress();
  assert.equal(p.stars, 0);
  assert.deepEqual(p.stagesDone, []);
  assert.deepEqual(p.cards, []);
  assert.equal(p.streak.count, 0);
  assert.equal(p.streak.lastDayISO, null);
  // Guard against anyone later adding an identifying field to the shape.
  //
  // KTR-02 widened this list by exactly one key — `solve` — and it was widened DELIBERATELY, as a
  // reviewed line of the change that added it. That is the whole point of the allow-list: growing it
  // has to be a decision someone makes on purpose, not something a new field slips past. `solve`
  // holds three counters (firstTry, run, bestStreak) and nothing else; see the inner assertion
  // below, which fails if a fourth field ever appears without the same conversation.
  const keys = Object.keys(p).sort();
  assert.deepEqual(keys, [
    "cards", "country", "currentStage", "quiz", "solve", "stagesDone", "stamps", "stars", "streak", "watched",
  ]);
  assert.deepEqual(
    Object.keys(p.solve).sort(),
    ["bestStreak", "firstTry", "run"],
    "the solve slice holds counters only — nothing that identifies a person, nothing time-stamped"
  );
  assert.deepEqual(p.solve, { firstTry: 0, run: 0, bestStreak: 0 });
});

test("completeStage awards stars once and never twice for the same stage", () => {
  const id = stageId("za", 3);
  const once = completeStage(emptyProgress(), id);
  assert.equal(once.stars, STARS_PER_STAGE);
  assert.deepEqual(once.stagesDone, [id]);

  const twice = completeStage(once, id);
  assert.equal(twice.stars, STARS_PER_STAGE, "re-finishing must not pay out again");
  assert.equal(twice.stagesDone.length, 1);
  assert.equal(twice, once, "an unchanged result should be the same object");
});

test("completeStage does not mutate its input", () => {
  const before = emptyProgress();
  completeStage(before, stageId("za", 1));
  assert.equal(before.stars, 0);
  assert.deepEqual(before.stagesDone, []);
});

test("awardCard is idempotent — a collection never shows duplicates", () => {
  const one = awardCard(emptyProgress(), "lion");
  const two = awardCard(one, "lion");
  const three = awardCard(two, "elephant");
  assert.deepEqual(one.cards, ["lion"]);
  assert.deepEqual(three.cards, ["lion", "elephant"]);
  assert.equal(two, one);
});

test("stampCountry is idempotent", () => {
  const p = stampCountry(stampCountry(emptyProgress(), "za"), "za");
  assert.deepEqual(p.stamps, ["za"]);
});

test("setWatched keeps the furthest point and never rewinds", () => {
  let p = setWatched(emptyProgress(), "mhudi", 0.4);
  assert.equal(p.watched.mhudi, 0.4);
  p = setWatched(p, "mhudi", 0.2);
  assert.equal(p.watched.mhudi, 0.4, "a re-watch from the start must not lose progress");
  p = setWatched(p, "mhudi", 0.9);
  assert.equal(p.watched.mhudi, 0.9);
});

test("setWatched clamps out-of-range input", () => {
  assert.equal(setWatched(emptyProgress(), "m", 5).watched.m, 1);
  assert.equal(setWatched(emptyProgress(), "m", -3).watched.m ?? 0, 0);
});

test("recordQuiz keeps the best attempt, so retaking cannot lower a score", () => {
  let p = recordQuiz(emptyProgress(), "za:3", 8, 10);
  p = recordQuiz(p, "za:3", 5, 10);
  assert.deepEqual(p.quiz["za:3"], { correct: 8, total: 10 });
  p = recordQuiz(p, "za:3", 10, 10);
  assert.deepEqual(p.quiz["za:3"], { correct: 10, total: 10 });
});

// ---- KTR-02: what solving is worth ----

test("firstTryBonus pays only the improvement on a stage's previous best", () => {
  assert.equal(firstTryBonus(0, 3), 3 * BONUS_STARS_FIRST_TRY);
  assert.equal(firstTryBonus(3, 3), 0, "re-walking a stage you already aced pays nothing");
  assert.equal(firstTryBonus(1, 3), 2 * BONUS_STARS_FIRST_TRY, "only the difference pays");
  assert.equal(firstTryBonus(3, 1), 0, "a worse re-run never pays, and never takes away");
  assert.equal(firstTryBonus(-5, 2), 2 * BONUS_STARS_FIRST_TRY, "a corrupt stored best cannot inflate it");
});

test("recordSolve pays the first-try bonus once, then only for improvement", () => {
  const id = stageId("za", 3);
  let p = recordSolve(emptyProgress(), id, 2, 3);
  assert.equal(p.stars, 2 * BONUS_STARS_FIRST_TRY);
  assert.deepEqual(p.quiz[id], { correct: 2, total: 3 });

  const again = recordSolve(p, id, 2, 3);
  assert.equal(again.stars, p.stars, "the same score twice must not pay twice");
  assert.equal(again, p, "a no-op returns the same object so the store skips the write");

  p = recordSolve(p, id, 3, 3);
  assert.equal(p.stars, 3 * BONUS_STARS_FIRST_TRY, "solving it better pays only the difference");

  const worse = recordSolve(p, id, 1, 3);
  assert.equal(worse.stars, p.stars, "a sloppier re-visit never costs stars");
  assert.deepEqual(worse.quiz[id], { correct: 3, total: 3 }, "and never lowers the record");
});

test("recordSolve counts a clean stage once and advances the run once", () => {
  let p = recordSolve(emptyProgress(), stageId("za", 1), 2, 2);
  assert.deepEqual(p.solve, { firstTry: 1, run: 1, bestStreak: 1 });

  p = recordSolve(p, stageId("za", 1), 2, 2);
  assert.deepEqual(p.solve, { firstTry: 1, run: 1, bestStreak: 1 }, "re-walking one stage cannot farm a run");

  p = recordSolve(p, stageId("za", 2), 3, 3);
  assert.deepEqual(p.solve, { firstTry: 2, run: 2, bestStreak: 2 });
});

test("recordSolve: a correction breaks the run but never the record of the best one", () => {
  let p = emptyProgress();
  p = recordSolve(p, stageId("za", 1), 2, 2);
  p = recordSolve(p, stageId("za", 2), 2, 2);
  p = recordSolve(p, stageId("za", 3), 2, 2);
  assert.deepEqual(p.solve, { firstTry: 3, run: 3, bestStreak: 3 });

  p = recordSolve(p, stageId("za", 4), 1, 3); // needed a correction
  assert.equal(p.solve.run, 0, "the current run breaks");
  assert.equal(p.solve.bestStreak, 3, "the best ever reached is never taken away");
  assert.equal(p.solve.firstTry, 3, "a corrected stage does not count as solved clean");

  p = recordSolve(p, stageId("za", 5), 2, 2);
  assert.deepEqual(p.solve, { firstTry: 4, run: 1, bestStreak: 3 }, "the run restarts from one");
});

test("recordSolve: a sloppy re-visit to an already-clean stage does not break the run", () => {
  let p = recordSolve(emptyProgress(), stageId("za", 1), 2, 2);
  p = recordSolve(p, stageId("za", 2), 2, 2);
  const before = p.solve;

  p = recordSolve(p, stageId("za", 1), 0, 2); // walked it again, fumbled it this time
  assert.deepEqual(p.solve, before, "a stage already solved cleanly is not un-solved");
});

test("recordSolve: a milestone with no authored questions decides nothing", () => {
  let p = recordSolve(emptyProgress(), stageId("za", 1), 2, 2);
  const after = recordSolve(p, stageId("za", 7), 0, 0);
  assert.equal(after, p, "12 of 25 milestones have no question yet — none may break a run");
  assert.equal(after.solve.run, 1);
  assert.equal(Object.keys(after.quiz).length, 1, "and none may record an empty tally");
});

test("recordSolve does not mutate its input", () => {
  const before = emptyProgress();
  recordSolve(before, stageId("za", 1), 2, 2);
  assert.equal(before.stars, 0);
  assert.deepEqual(before.solve, { firstTry: 0, run: 0, bestStreak: 0 });
  assert.deepEqual(before.quiz, {});
});

test("isDayBefore recognises consecutive days, including across a month boundary", () => {
  assert.equal(isDayBefore("2026-08-25", "2026-08-26"), true);
  assert.equal(isDayBefore("2026-08-31", "2026-09-01"), true);
  assert.equal(isDayBefore("2026-08-24", "2026-08-26"), false);
  assert.equal(isDayBefore("2026-08-26", "2026-08-26"), false);
  assert.equal(isDayBefore("not-a-date", "2026-08-26"), false);
});

test("touchStreak counts consecutive days, resets after a gap, ignores same-day repeats", () => {
  let p = touchStreak(emptyProgress(), "2026-08-24");
  assert.equal(p.streak.count, 1);

  p = touchStreak(p, "2026-08-25");
  assert.equal(p.streak.count, 2);

  const same = touchStreak(p, "2026-08-25");
  assert.equal(same.streak.count, 2, "opening the app twice in a day is still one day");
  assert.equal(same, p);

  p = touchStreak(p, "2026-08-28");
  assert.equal(p.streak.count, 1, "a missed day restarts the streak");
});

test("todayISO returns a plain date, never a timestamp", () => {
  const s = todayISO(new Date(2026, 7, 26, 13, 45));
  assert.equal(s, "2026-08-26");
  assert.match(s, /^\d{4}-\d{2}-\d{2}$/);
});

test("journeyFraction counts only the given country's stages", () => {
  let p = emptyProgress();
  p = completeStage(p, stageId("za", 1));
  p = completeStage(p, stageId("za", 2));
  p = completeStage(p, stageId("gh", 1));
  assert.equal(journeyFraction(p, "za", 12), 2 / 12);
  assert.equal(journeyFraction(p, "gh", 10), 1 / 10);
  assert.equal(journeyFraction(p, "za", 0), 0, "no stages must not divide by zero");
});

test("level rises every 200 stars, starting at 1", () => {
  assert.equal(level(emptyProgress()), 1);
  assert.equal(level({ ...emptyProgress(), stars: 199 }), 1);
  assert.equal(level({ ...emptyProgress(), stars: 200 }), 2);
  assert.equal(level({ ...emptyProgress(), stars: 640 }), 4);
});

test("normalise survives junk, half-written and hostile stored values", () => {
  assert.deepEqual(normalise(null), emptyProgress());
  assert.deepEqual(normalise("nonsense"), emptyProgress());
  assert.deepEqual(normalise(42), emptyProgress());

  const partial = normalise({ stars: 120, cards: ["lion", 7, null], stagesDone: "not-an-array" });
  assert.equal(partial.stars, 120);
  assert.deepEqual(partial.cards, ["lion"], "non-string entries are dropped");
  assert.deepEqual(partial.stagesDone, []);

  const negative = normalise({ stars: -50, streak: { count: -2, lastDayISO: 5 } });
  assert.equal(negative.stars, 0, "a negative star count cannot be stored");
  assert.equal(negative.streak.count, 0);
  assert.equal(negative.streak.lastDayISO, null);
});

test("normalise repairs a solve slice written before KTR-02, or written badly", () => {
  // The realistic case: someone who used the app yesterday has a stored blob with no `solve` at all.
  // It must read back as zeroes, not undefined, or their Passport crashes on the next open.
  const older = normalise({ stars: 300, stagesDone: ["za:1"] });
  assert.deepEqual(older.solve, { firstTry: 0, run: 0, bestStreak: 0 });

  const hostile = normalise({ solve: { firstTry: -4, run: "lots", bestStreak: Infinity } });
  assert.deepEqual(hostile.solve, { firstTry: 0, run: 0, bestStreak: 0 });

  const good = normalise({ solve: { firstTry: 5, run: 2, bestStreak: 4, nickname: "Tumo" } });
  assert.deepEqual(good.solve, { firstTry: 5, run: 2, bestStreak: 4 });
  assert.equal(
    "nickname" in good.solve,
    false,
    "normalise rebuilds the slice field by field, so a stray key in stored JSON cannot get in"
  );
});
