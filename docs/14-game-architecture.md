# 14 — Know the Road: the game layer (v3)

> **Supersedes:** the "Know the Road — Game Architecture v2" proposal (27 Aug 2026) and, by
> reference, the "Roll the Road" dice design it claimed to supersede. **Neither was ever checked into
> this repo**; this file is the first game architecture that is.
> **Decided:** 27 August 2026 · **Live board:** [STATUS.md](../STATUS.md) · **Backlog:**
> [specs/tasks.md](../specs/tasks.md) (Phase 6)

---

## 1. The problem this fixes

The v2 loop — WATCH → QUIZ → REWARD — looks like a game and is not one, because **the quiz decides
nothing**:

- [`StageScreen.tsx`](../app/src/components/StageScreen.tsx) `finish()` awards the heritage card and
  all 50 stars **whether or not a single answer was right**. The score is rendered once
  (`correctCount / questions.length`) and then thrown away.
- `recordQuiz` and `stampCountry` in
  [`services/progress/progress.ts`](../app/src/services/progress/progress.ts) are **defined,
  unit-tested and called by nothing.** (`setWatched` was the third of these until 27 Aug.)
- So there is no way to be *better* at Ubuntu Heritage than someone who taps randomly.

For a project scored **30% on Humanities Depth**, that is the most expensive gap in the codebase.
A reader who guesses their way to a full Passport has learnt nothing, and the app told them they had.

**The fix in one line: solving is what moves you.**

---

## 2. Decisions (D7–D9, 27 Aug 2026)

| # | Decision | Why |
|---|----------|-----|
| **D7** | **Solving replaces landing.** A stage completes when its questions are answered correctly — wrong answers are corrected and retried, never penalised. No dice, no chance. | The v2 quiz is ornamental. Movement earned by thinking is the only version of this that serves the humanities rubric. |
| **D8** | **No server, no accounts, no network play. Competition is local: pass-and-play on one device.** The networked "Arena" is **parked**, not rejected — see §6. | D5 (nothing leaves the device) is what lets Kids mode exist with *no consent flow at all* — [docs/05](05-popia-compliance.md) says so in as many words. Re-opening it is a decision Tumo makes deliberately, not a footnote in a game doc. |
| **D9** | **No timers outside pass-and-play.** Depth is the difficulty, not speed. | The elder/child audience in [docs/07](07-accessibility.md) and [docs/09](09-research-summary.md). A timer excludes the exact people this is for. |

**Carried forward unchanged:** no in-app purchases, no wagering of stars or cards, no loss streaks,
no scarcity mechanics, no public defeat records, no chat between strangers, no stranger contact of
any kind.

---

## 3. What was taken from the v2 proposal, and what was not

The proposal was right about the core loop and wrong about the half it spent the most words on.

**Taken:**

- Solve-gated movement (its central idea).
- **Forks at branch milestones** — and these cost almost nothing: `milestone.branches` already exist
  in [`history-trail.ts`](../app/src/content/history-trail.ts) and `StageScreen` already renders them
  as side-roads. The work is turning a list into a choice.
- The **challenge-format catalogue**. This is the treasure of the document and it is entirely
  independent of competition: eight ways to ask a sourced question that are not "read four sentences,
  tap one."
- **`challenges.ts` with a non-optional `sourceRef`** — [AGENTS.md §4](../AGENTS.md) as a *type
  constraint* rather than a habit. A generator that cannot cite its answer does not compile.

**Not taken:**

- **The networked Arena.** It stores a persistent per-device handle plus timestamps on a server —
  personal information by linkage, on a product used by children. POPIA §35 treats children's
  personal information as a special category. The proposal's mitigation ("default off for under-13
  Kids-mode devices") **cannot be implemented**: the app has no age signal and, by design, never will.
- **The anti-AI hardening** — canvas-rendered question text, answer-time forensics, instance
  randomisation as a security measure. It is cost with no return here, and the proposal contradicts
  its own rule: F2 (order four short event cards) and F8 (one claim, swipe true/false) are plain text,
  trivially pasteable inside a 15-second round, and are the two it schedules first.
  **The real defence is that winning buys nothing** — no wagering, no public losses, no rank. When
  cheating pays nothing, it stops. Randomisation stays, but as variety, not as a lock.

---

## 4. The Solo Trail loop

```
   AT MILESTONE n
        │
        ▼
   STUDY   the scene plays — film, or picture + sourced record, or the Reader passage
        │
        ▼
   SOLVE   a challenge built ONLY from what STUDY just showed
        │
        ├─ correct              → WALK: the walker strolls to the next dot  (+stars)
        ├─ correct, first try   → +bonus star; the milestone's side-road unlocks
        └─ wrong                → the sourced correction, then a VARIANT of the same question.
                                  You cannot fail out. You can only keep learning until you pass.
        │
        ▼
   FORK    at a branch milestone: main road, or the side-road
           (side-roads are the smaller events already in history-trail.ts)
```

Rules that are not negotiable:

- **Progress is never taken away.** Same rule as the v2 stages: `completeStage` is idempotent and
  stars are awarded once.
- **A wrong answer is never a penalty.** It costs the first-try bonus, nothing else.
- **No timer.** Anywhere in Solo, in Kids, or in Schools.
- **Kids-mode constraints apply** to the Solo Trail when entered from Kids: 44px+ targets,
  audio-first, hold-to-exit.

---

## 5. Challenge formats

Every format is a way of asking a **sourced** question. Formats are ranked here by value-per-effort
given what the repo already holds.

| # | Format | Assets needed | Status |
|---|--------|---------------|--------|
| **F0** | **Multiple choice** — the existing quiz, unchanged | none — 14 questions exist | ✅ built |
| **F1** | **Listen & identify** — a totem's recorded call plays; tap the animal among six images | **already present**: 22 `.mp3` calls in `assets/animals/sounds/`, 23 images in `assets/animals/` | ready to build |
| **F5** | **Whose clan?** — drag three totems onto three clan names | `totems.ts` `terms` + `clans` — present for all 27 | ready to build |
| **F6** | **Picture flash** — a scene still for ~3s, then "what year / whose story?" | `journeyMedia` stills — present | ready to build |
| **F3** | **Map tap** — "where did this happen?" tap the province | needs an SA province map asset; `provinces.ts` exists | needs one asset |
| **F2** | **Order the road** — drag four events into chronological order | `history-trail.ts` — present | ready to build |
| **F8** | **True road / false road** — a claim, swipe myth vs sourced. Myths appear **only to be corrected** — the 1652 *terra nullius* rule generalised, and pinned by a test | `history-trail.ts` notes | ready to build |
| **F4** | **Finish the line** — a Vilakazi / Mqhayi line with a word missing, spoken choices | needs recorded indigenous-language audio we do not have | **blocked — no content, no format** |

> **F4 is blocked on purpose.** Its choices must be spoken in the language, and the only voices we
> could synthesise are the machine drafts already labelled unreviewed. Shipping it would put
> unreviewed pronunciation in a child's ear as if it were authoritative. No content, no format.

### The generator contract

```ts
// src/content/challenges.ts — pure, testable, no React.
export type Challenge = {
  id: string;
  format: "mcq" | "listen" | "clans" | "flash" | "map" | "order" | "trueRoad";
  milestoneId?: string;
  prompt: LocalizedText;
  /** NON-OPTIONAL. A challenge that cannot cite its answer must not exist. */
  sourceRef: string;
  // …format-specific payload
};
```

Integrity tests extend [`quiz.test.ts`](../app/src/content/quiz.test.ts) rather than replace it:
exactly one correct answer · no duplicate options · a correction that explains · **every referenced
asset resolves** · **a documented myth is never the correct answer**.

---

## 6. Competition: pass-and-play, and what is parked

**Pass-and-play** — two players, one device, alternating turns on a split screen. Seven rounds. It
needs no server, no handle, no account, no network, and no change to D5. It works on a cheap Android
with the data off, and it puts two people at one table, which is a better fit for this project than a
leaderboard of strangers. It is also the version we can put in front of a classroom via Schools
without touching a single learner record.

**Parked, pending an explicit decision with Tumo (a D-level call, not a task):** networked duels,
anonymous handles, matchmaking, weekly leaderboards. If they are ever built they need, at minimum: a
POPIA re-review of the wire schema, a decision on what a persistent device handle means for a child
user, and a wire-schema test with the same allow-list discipline as
[`progress.test.ts`](../app/src/services/progress/progress.test.ts). None of that is started, and
nothing in Phase 6 depends on it.

---

## 7. State

```ts
// progress store additions — the allow-list in progress.test.ts is updated DELIBERATELY,
// and every field here is a counter. Nothing identifies a person.
solve: {
  firstTry: number;        // milestones solved without a correction
  bestStreak: number;      // best run of first-try solves — positive framing only
  sideRoads: string[];     // branch ids walked
};
```

`recordQuiz(stageId, correct, total)` — **already written and already tested** — finally gets called.
It keeps the best attempt, so retrying can never lower a score.

---

## 8. Build order (Phase 6)

Each step ships as a complete feature on its own; none of them blocks on the next.

1. **KTR-01** — solve-gated stage completion + wire `recordQuiz`. *(The whole point. Smallest change.)*
2. **KTR-02** — first-try bonus star, streak, and the `solve` progress slice + allow-list update.
3. **KTR-03** — `challenges.ts` + the `sourceRef` type constraint + integrity tests, with F0 (the
   existing quiz) as the first generator, so the abstraction is proved against working content.
4. **KTR-04** — F8 *true road / false road*, then **F2** *order the road* — data-only, no new assets.
5. **KTR-05** — forks at branch milestones on `/journey`.
6. **KTR-06** — F1 *listen & identify* (22 calls already bundled) and F5 *whose clan?*
7. **KTR-07** — F6 *picture flash*.
8. **KTR-08** — pass-and-play on one device.
9. **KTR-09** — F3 *map tap* (needs a province map asset).
10. **KTR-10** — Schools hook: a teacher starts a pass-and-play round from the dashboard (demo-data
    rules unchanged).

**Gate before merge, every step:** integrity tests green · the progress allow-list updated
deliberately if the shape changed · 11-language coverage (`ui-coverage.test.ts`) · typecheck, tests
and web bundle green.

---

## 9. Corrections to the record

The v2 proposal described the repo inaccurately in four places. Noted here so the errors do not
propagate:

| Claim | Actual |
|---|---|
| "quiz bank (17+)" | **14 questions across 13 of 25 milestones.** STATUS.md and docs/10 also said 17; both corrected 27 Aug. |
| "22 totem calls already recorded" for "totems (22)" | **27 totems**, of which **22** have recorded calls. |
| "Supabase Realtime (already an optional dependency)" | `@supabase/supabase-js` is a dependency; **Realtime is used nowhere.** It is a new integration, not an existing one. |
| "Supersedes `roll-the-road-architecture.md`" | That file is **not in this repo** and never was. |
