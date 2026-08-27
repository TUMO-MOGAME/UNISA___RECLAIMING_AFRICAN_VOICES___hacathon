# Tasks — Maloba backlog

`[ ]` todo · `[~]` in progress · `[x]` done. Keep this in sync with [STATUS.md](../STATUS.md). Tasks map
to phases in [docs/00-project-plan.md](../docs/00-project-plan.md). Mark de-scopes in STATUS.md.

## Phase 0 — Scaffold (29–30 Jun)

- [x] T001 Governance scaffold (CLAUDE.md, AGENTS.md, STATUS.md, README)
- [x] T002 Docs set (00–09 + index)
- [x] T003 .claude settings + project skills
- [x] T004 Concept-submission draft + this backlog
- [x] T005 Expo app initialized (blank-typescript, SDK 56) + web support; type-check + web bundle green
- [ ] T006 NativeWind wired (babel/metro/tailwind) — web + Expo Go parity verified  ← next
- [x] T007 Theme tokens (cinematic baobab-dusk palette, typography, spacing) in `src/theme/`
- [x] T008 `services/pollinations.ts` + `SceneImage` (loading + graceful fallback; Lottie/cache in Phase 1)
- [x] T009 `content/mhudi.ts` (2 grounded scenes) renders in `CinematicReader` (mode + language toggles)
- [ ] T010 Commit Phase 0; STATUS.md updated

## Phase 1 — Story core (1–3 Jul)

- [x] T011 `content/types.ts` + content registry `content/index.ts`
- [x] T012 `CinematicReader` (bg image + scrim + overlaid text + scene nav + back)
- [x] T013 HomeGallery screen (pillar cards, hero images, blurbs, language toggle)
- [x] T014 Navigation (lightweight in-app state; gallery ↔ reader). Router lib optional later.
- [~] T015 i18n layer + `LanguageToggle` — toggle works app-wide; dedicated `i18n/` strings file still TODO
- [x] T016 `ModeToggle` (Child/Adult) wired to scene `text`/`childText`
- [ ] T017 `services/gemini.ts` — author-time Child + translation drafts (cached into content) ← needs key
- [x] T018 `content/ityala-lamawele.ts` (virtual *inkundla*, grounded — 2 scenes)
- [x] T019 `content/indaba.ts` (Ninavanhu-Ma / preservation, grounded — 2 scenes)
- [ ] T020 "About the Sources" screen (credit authors + references) ← next
- [ ] T021 Offline read verified (airplane mode) + images cached (expo-image)

## Phase 2 — Community Archive + offline (4–6 Jul)

- [x] T022 `ConsentSheet` (POPIA) — blocks recording until opt-in + private/public choice
- [x] T023 Recorder via **expo-audio** (SDK 56) → permission + record/stop + uri
- [~] T024 Local list UI done (session state); WatermelonDB persistence still TODO (survive reload)
- [x] T025 Erasure: delete recording — one tap
- [x] T026 ArchiveScreen (record · list · play · delete · rename)
- [ ] T027 (stretch) Supabase tables + **RLS** + upload on consent/online ← needs key
- [ ] T028 (stretch) `services/lelapa.ts` — Vulavula transcribe + store transcript ← needs key
- [ ] T029 (stretch) WatermelonDB ↔ Supabase sync ← needs key

## Phase 3 — Polish + submit (7–9 Jul)

- [ ] T030 Accessibility pass (contrast, text scaling, tap targets, data-saver)
- [ ] T031 ElevenLabs intro narration — pre-rendered mp3 in `assets/audio/` (static)
- [ ] T032 Lottie loading/transition polish
- [ ] T033 4th module `content/vilakazi.ts` (if time)
- [ ] T034 Record 2–3 min demo video to the shot list
- [ ] T035 Finalise written narrative ([concept-submission.md](concept-submission.md))
- [ ] T036 Grounding proofread — no `[NEEDS SOURCE]` remains
- [ ] T037 **SUBMIT** before 9 Jul 16:00

## Phase 4 — Showcase prep (13–16 Jul, if finalist)

- [ ] T038 Bug-fix + performance pass on a real device
- [ ] T039 Presentation rehearsal for the live showcase

## Phase 5 — Architecture v2: multi-page transformation (26 Aug – 15 Sep)

Full plan, decisions D1–D6 and week gates: **[docs/13-architecture-v2-plan.md](../docs/13-architecture-v2-plan.md)**.

### Week 1 — the shell and the split (26 Aug – 1 Sep)

- [x] V2-01 Extend the `Route` union: `countries · watch · watchItem · journey · stage · kids · kidsStage · schools · passport`
- [x] V2-02 `components/shell/AppShell.tsx` — header + content + footer + full-bleed rules
- [x] V2-03 `components/shell/SiteHeader.tsx` — D1 nav, country/language pickers, Passport chip, active underline
- [x] V2-04 `components/shell/MobileTabBar.tsx` — `Journey · Watch · Atlas · Me` (<900px)
- [x] V2-05 Extract the footer → `shell/SiteFooter.tsx` **verbatim** (D6), rendered on every route
- [x] V2-06 Extract the hero → `home/HomeHero.tsx` **verbatim** (D6); `onStart` → `/journey` (D2)
- [x] V2-07 Rebuild Home to the new section order — Hero → Continue → Watch rail → Journey preview → Countries → Atlas (+ room chips) → Kids/Schools → Archive
- [x] V2-08 `CountriesScreen.tsx` — country rail + atmosphere panel + "the journey ahead"
- [x] V2-09 Move the 54 flags + national anthems into `/countries` (D3); retire the floating hero picker
- [x] V2-10 `AtlasHubScreen.tsx` — gathers Provinces · Presidents · Heroes · Totems · Days
- [x] V2-11 Archive gains its Trust sub-nav (Heritage Ledger, Sources & provenance)
- [ ] V2-12 **Week gate** — tsc clean ✅ · web bundle green ✅ · route wiring pinned by `src/routes.test.ts` ✅ · **every pre-v2 route re-walked in a browser — still outstanding, needs a human at the keyboard** · STATUS updated ✅

### Week 2 — Watch and Journey, the core loop (2–8 Sep)

- [x] V2-13 `services/progress/` — types + local store (web + native) + hook (D5), unit-tested
- [x] V2-14 `WatchScreen.tsx` — featured + rails + filter chips + search (existing content only)
- [x] V2-15 `WatchItemScreen.tsx` — player · Child⇄Adult · language ▾ · **Sources & provenance** · Ask Ubuntu
- [x] V2-16 `JourneyScreen.tsx` — staged trail (done/current/locked) from `history-trail.ts`
- [x] V2-17 `content/quiz.ts` + grounded questions for chapters 1–3 — every distractor must be defensible
- [x] V2-18 `StageScreen.tsx` — WATCH → QUIZ → REWARD (wireframe 2e) + "Ask Ubuntu for a hint"
- [x] V2-19 Heritage cards — award on stage completion, 22 totems from `totems.ts`
- [x] V2-20 "Continue your journey" resume bar on Home, wired to real progress
- [x] V2-21 **Week gate** — tests + tsc + bundle green · STATUS updated

### Week 3 — Kids, Schools, Passport, polish (9–15 Sep)

- [x] V2-22 `PassportScreen.tsx` — level · streak · stamps · card grid · reset-my-progress (wireframe 2h)
- [x] V2-23 `KidsScreen.tsx` — home-language greeting · animal guide · today's story (wireframe 2f)
- [x] V2-24 `KidsStageScreen.tsx` — picture quiz, four big image answers, star rating
- [x] V2-25 Grown-ups corner — hold-3-seconds gate out of Kids mode
- [x] V2-26 `SchoolsScreen.tsx` — teacher dashboard over **seeded demo class data** (D5), labelled as demo
- [x] V2-27 CAPS-alignment + lesson plans for chapters 1–3 (cite the CAPS document)
- [x] V2-28 **i18n sweep** — every new string in all 11 languages, honest EN fallback
- [x] V2-29 Accessibility + responsive pass — labels · contrast · touch targets · web keyboard nav
- [x] V2-30 POPIA review of every new surface
- [x] V2-31 **Programme gate** — final polish · docs updated · STATUS + tasks.md reconciled


---

## Phase 6 — Know the Road: the game layer (from 27 Aug)

Decisions **D7–D9**, the format catalogue and what is parked:
**[docs/14-game-architecture.md](../docs/14-game-architecture.md)**.

The v2 loop looks like a game and is not one: the quiz decides nothing, and `recordQuiz` /
`stampCountry` are tested code that nothing calls. Phase 6 makes solving the thing that moves you.

- [x] KTR-01 Solve-gated stage completion — a wrong answer corrects and retries, never penalises; wire `recordQuiz`
- [ ] KTR-02 First-try bonus + streak + the `solve` progress slice (allow-list updated deliberately)
- [ ] KTR-03 `content/challenges.ts` — generator contract with a **non-optional `sourceRef`** + integrity tests; F0 (the existing quiz) as the first generator
- [ ] KTR-04 **F8** true road / false road, then **F2** order the road — data only, no new assets
- [ ] KTR-05 Forks at branch milestones on `/journey` (uses `milestone.branches`, already in the data)
- [ ] KTR-06 **F1** listen & identify (22 totem calls already bundled) + **F5** whose clan?
- [ ] KTR-07 **F6** picture flash
- [ ] KTR-08 Pass-and-play on one device — competition with no server, no handle, no POPIA change
- [ ] KTR-09 **F3** map tap (needs a province map asset)
- [ ] KTR-10 Schools hook — a teacher starts a pass-and-play round from the dashboard (demo-data rules unchanged)

**Blocked, deliberately:** F4 "finish the line" needs spoken indigenous-language choices we do not
have. The only voices we could synthesise are the machine drafts already labelled unreviewed, and
putting those in a child's ear as authoritative is exactly what AGENTS.md §4 forbids. No content, no
format.

**Parked, needs a decision not a task:** networked duels, anonymous handles, leaderboards. See
[docs/14 §6](../docs/14-game-architecture.md).

### Alongside — the hero trailer hands off to the deep version (27 Aug)

D2 is unchanged: the hero's walk is the free trailer and still opens **in place**. What changed is
that the trailer now offers a way *out* of itself, which it never did.

- [x] HERO-01 "Go deeper" on any dot → that milestone's stage (watch → solve → collect)
- [x] HERO-02 Reaching the last dot offers the whole `/journey` room, not only "walk it again"
- [ ] HERO-03 **The trailer is South Africa only.** It walks `history-trail.ts` — 25 sourced SA
      milestones — no matter which country is selected. Making it the pan-African trailer Tumo wants
      needs per-country milestones, and those do not exist: `countries/` has one researched nation
      (Botswana, 27 Aug) and 53 scaffolds. **No content, no trailer** — this unblocks per country as
      each `countries/*.md` gets a sourced Milestones table, not before
- [ ] HERO-04 Until then, make the trailer say *which* country's road it is walking, and say honestly
      when the selected country has no trail yet rather than silently showing South Africa's

### Alongside — the language picker follows the country (27 Aug)

- [x] LANG-01 `content/country-languages.ts` — a **sourced** country → language map, plus tests that pin the claims
- [x] LANG-02 `LanguagePicker` groups by the selected country, and names the languages we do **not** have rather than hiding them
- [ ] LANG-03 Extend the map beyond Southern Africa — **each country needs its own citation**; an unmapped country falls back to the flat list, which is the honest default
- [x] LANG-04 Choosing a country also **switches** the active language — but only while the reader has not picked one by hand. Once they choose a language themselves, nothing overrides it again
