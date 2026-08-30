// Device-local progress — the persistence layer behind the Journey, the heritage cards and the
// Passport (Architecture v2, decision D5).
//
// PRIVACY: this holds NO personal information. No name, no account, no contact detail, nothing that
// identifies a person — just which chapters have been finished, which cards were earned, and a day
// counter. It never leaves the device: there is no upload path, and no code here talks to a network.
// That is deliberate. Much of the audience is children, and the safest data is data you never collect
// (see docs/05-popia-compliance.md). "Reset my progress" in the Passport erases all of it.
//
// This file is pure (types + reducers) so it unit-tests under `node --test` without touching
// localStorage or any React Native module. The I/O shells live in store.ts / store.web.ts — the same
// split the Community Archive uses (services/archive/recordings.ts).

export type Progress = {
  /** The country whose journey is in progress, e.g. "za". */
  country: string;
  /** Finished stages, as "<country>:<n>". */
  stagesDone: string[];
  /** The stage currently open, or null before the journey starts. */
  currentStage: string | null;
  stars: number;
  /** Consecutive days with any activity. `lastDayISO` is a date only — never a timestamp. */
  streak: { count: number; lastDayISO: string | null };
  /** Heritage card ids earned (totems and others). */
  cards: string[];
  /** Countries whose journey has been completed. */
  stamps: string[];
  /** moduleId -> fraction watched, 0..1. */
  watched: Record<string, number>;
  /** stageId -> quiz tally. */
  quiz: Record<string, { correct: number; total: number }>;
  /**
   * KTR-02 — what solving is actually worth (docs/14-game-architecture.md §7).
   *
   * PRIVACY: every field here is a counter. Nothing identifies a person, nothing records *when*
   * anything happened, and nothing leaves the device. The key allow-list in progress.test.ts was
   * widened to admit `solve` DELIBERATELY, in this change, and it stays the gate on the next one.
   */
  solve: {
    /** Stages answered perfectly first time — no correction taken on any question. */
    firstTry: number;
    /** The current unbroken run of such stages. A correction resets it; see `recordSolve`. */
    run: number;
    /** The longest run ever reached. Positive framing only: it never goes down. */
    bestStreak: number;
  };
};

/** Contract both platform stores implement. */
export type ProgressStore = {
  /** Whether progress survives an app refresh/restart on this platform. */
  readonly persists: boolean;
  load(): Promise<Progress>;
  save(p: Progress): Promise<void>;
  /** Erasure: forget everything. */
  clear(): Promise<void>;
};

export const STARS_PER_STAGE = 50;

/**
 * Stars paid for each question answered correctly *without* taking a correction (KTR-02, D7).
 *
 * Deliberately small next to STARS_PER_STAGE: finishing a stage is what the journey is for, and
 * solving it cleanly is a bonus on top. A wrong answer costs this bonus and nothing else — it is
 * never subtracted, only not paid.
 */
export const BONUS_STARS_FIRST_TRY = 10;

export function emptyProgress(country = "za"): Progress {
  return {
    country,
    stagesDone: [],
    currentStage: null,
    stars: 0,
    streak: { count: 0, lastDayISO: null },
    cards: [],
    stamps: [],
    watched: {},
    quiz: {},
    solve: { firstTry: 0, run: 0, bestStreak: 0 },
  };
}

export const stageId = (country: string, n: number) => `${country}:${n}`;

/** Guards against a malformed or half-written stored blob — a bad read must never crash the app. */
export function normalise(raw: unknown, country = "za"): Progress {
  const base = emptyProgress(country);
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<Progress>;
  const arr = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : 0);
  return {
    country: typeof r.country === "string" && r.country ? r.country : base.country,
    stagesDone: arr(r.stagesDone),
    currentStage: typeof r.currentStage === "string" ? r.currentStage : null,
    stars: num(r.stars),
    streak: {
      count: num(r.streak?.count),
      lastDayISO: typeof r.streak?.lastDayISO === "string" ? r.streak.lastDayISO : null,
    },
    cards: arr(r.cards),
    stamps: arr(r.stamps),
    watched: r.watched && typeof r.watched === "object" ? (r.watched as Record<string, number>) : {},
    quiz: r.quiz && typeof r.quiz === "object" ? (r.quiz as Record<string, { correct: number; total: number }>) : {},
    // A blob written before KTR-02 has no `solve` at all — it reads back as zeroes rather than
    // undefined, so an existing reader's Passport renders instead of crashing on a missing field.
    solve: {
      firstTry: num(r.solve?.firstTry),
      run: num(r.solve?.run),
      bestStreak: num(r.solve?.bestStreak),
    },
  };
}

// ---- pure reducers (unit-tested) ----

/** Mark a stage finished: award stars once, never twice for the same stage. */
export function completeStage(p: Progress, id: string, stars = STARS_PER_STAGE): Progress {
  if (p.stagesDone.includes(id)) return p;
  return { ...p, stagesDone: [...p.stagesDone, id], stars: p.stars + stars, currentStage: null };
}

/** Award a heritage card. Collecting the same card twice is a no-op, not a duplicate. */
export function awardCard(p: Progress, cardId: string): Progress {
  if (p.cards.includes(cardId)) return p;
  return { ...p, cards: [...p.cards, cardId] };
}

export function stampCountry(p: Progress, code: string): Progress {
  if (p.stamps.includes(code)) return p;
  return { ...p, stamps: [...p.stamps, code] };
}

/** Record how far through a film/scene the reader got. Never moves backwards. */
export function setWatched(p: Progress, moduleId: string, fraction: number): Progress {
  const clamped = Math.max(0, Math.min(1, fraction));
  const prev = p.watched[moduleId] ?? 0;
  if (clamped <= prev) return p;
  return { ...p, watched: { ...p.watched, [moduleId]: clamped } };
}

export function recordQuiz(p: Progress, id: string, correct: number, total: number): Progress {
  const prev = p.quiz[id];
  // Keep the best attempt, so re-taking a quiz can never lower a score.
  if (prev && prev.correct >= correct) return p;
  return { ...p, quiz: { ...p.quiz, [id]: { correct, total } } };
}

/**
 * The bonus owed for a stage, given how many questions were solved first-try this time and the best
 * previously recorded for that same stage. Only the IMPROVEMENT pays, so re-walking a stage you
 * already aced pays nothing and a shaky first pass can still be improved on later.
 *
 * Exported because StageScreen shows the reader this exact number on the reward card. One formula,
 * one place — a screen that computed its own would eventually disagree with the store.
 */
export function firstTryBonus(previousBest: number, firstTry: number): number {
  const before = Math.max(0, previousBest);
  return Math.max(0, firstTry - before) * BONUS_STARS_FIRST_TRY;
}

/**
 * KTR-02 — record a solved stage. This is what StageScreen calls when a stage finishes, and it
 * replaces the bare `recordQuiz` call that KTR-01 wired.
 *
 * `firstTry` is the number of questions answered correctly WITHOUT taking a correction. It is the
 * only score that means anything (D7): every question is eventually answered right, because a wrong
 * answer hands the question back rather than failing you out, so `correct` on its own always ends at
 * `total`.
 *
 * Four rules, none of them negotiable:
 *
 * 1. **Nothing is ever taken away.** Stars only go up, `bestStreak` only goes up, and the stored
 *    tally keeps the best attempt.
 * 2. **The bonus pays the improvement, once.** Re-visiting a stage you already solved cleanly pays
 *    nothing the second time; solving it *better* pays only the difference.
 * 3. **The run advances on a stage's first clean solve and on nothing else.** Otherwise re-opening
 *    one easy stage seven times would "earn" a streak of seven.
 * 4. **A stage with no authored questions is neither a win nor a break.** `total <= 0` returns
 *    untouched: you cannot be credited for a question that does not exist, and you certainly cannot
 *    lose a streak to one. Twelve of the 25 milestones are in exactly that state today.
 */
export function recordSolve(p: Progress, id: string, firstTry: number, total: number): Progress {
  if (total <= 0) return p; // rule 4 — a milestone with no question decides nothing

  const clean = firstTry >= total;
  const prev = p.quiz[id];
  const wasClean = !!prev && prev.total > 0 && prev.correct >= prev.total;

  const bonus = firstTryBonus(prev?.correct ?? 0, firstTry);
  const next = recordQuiz(p, id, firstTry, total);

  let { firstTry: solvedClean, run, bestStreak } = p.solve;
  if (clean && !wasClean) {
    solvedClean += 1;
    run += 1;
    bestStreak = Math.max(bestStreak, run);
  } else if (!clean && !wasClean) {
    // A correction breaks the current run. The record of the best one stands — that is the whole
    // reason `bestStreak` is stored separately, and why there is no "you lost your streak" anywhere
    // in the UI. A stage already solved cleanly is not un-solved by a sloppier re-visit.
    run = 0;
  }

  const solveChanged =
    solvedClean !== p.solve.firstTry || run !== p.solve.run || bestStreak !== p.solve.bestStreak;
  if (next === p && !bonus && !solveChanged) return p; // nothing moved — let `apply` skip the write

  return {
    ...next,
    stars: next.stars + bonus,
    solve: solveChanged ? { firstTry: solvedClean, run, bestStreak } : p.solve,
  };
}

/**
 * Update the day streak. `todayISO` is a plain date ("2026-08-26") — deliberately not a timestamp,
 * so nothing here records when someone was using the app.
 */
export function touchStreak(p: Progress, todayISO: string): Progress {
  const last = p.streak.lastDayISO;
  if (last === todayISO) return p; // already counted today
  const count = last && isDayBefore(last, todayISO) ? p.streak.count + 1 : 1;
  return { ...p, streak: { count, lastDayISO: todayISO } };
}

/** True when `a` is the calendar day immediately before `b`. Both are "YYYY-MM-DD". */
export function isDayBefore(a: string, b: string): boolean {
  const da = Date.parse(`${a}T00:00:00Z`);
  const db = Date.parse(`${b}T00:00:00Z`);
  if (Number.isNaN(da) || Number.isNaN(db)) return false;
  return db - da === 86_400_000;
}

/** Today as a plain date string, in the viewer's own timezone. */
export function todayISO(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** How far through a country's journey, 0..1. */
export function journeyFraction(p: Progress, country: string, totalStages: number): number {
  if (totalStages <= 0) return 0;
  const done = p.stagesDone.filter((s) => s.startsWith(`${country}:`)).length;
  return Math.min(1, done / totalStages);
}

/** Explorer level — one level per 200 stars, starting at 1. */
export function level(p: Progress): number {
  return 1 + Math.floor(p.stars / 200);
}
