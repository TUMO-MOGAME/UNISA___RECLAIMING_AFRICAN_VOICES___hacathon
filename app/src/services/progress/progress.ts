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
