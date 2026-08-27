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
  touchStreak,
  isDayBefore,
  todayISO,
  journeyFraction,
  level,
  stageId,
  STARS_PER_STAGE,
} from "./progress.ts";

test("emptyProgress starts at zero and holds no personal data", () => {
  const p = emptyProgress();
  assert.equal(p.stars, 0);
  assert.deepEqual(p.stagesDone, []);
  assert.deepEqual(p.cards, []);
  assert.equal(p.streak.count, 0);
  assert.equal(p.streak.lastDayISO, null);
  // Guard against anyone later adding an identifying field to the shape.
  const keys = Object.keys(p).sort();
  assert.deepEqual(keys, [
    "cards", "country", "currentStage", "quiz", "stagesDone", "stamps", "stars", "streak", "watched",
  ]);
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
