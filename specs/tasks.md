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
- [ ] V2-07 Rebuild Home to the new section order
- [ ] V2-08 `CountriesScreen.tsx` — country rail + atmosphere panel + "the journey ahead"
- [ ] V2-09 Move the 54 flags + national anthems into `/countries` (D3); retire the floating hero picker
- [ ] V2-10 `AtlasHubScreen.tsx` — gathers Provinces · Presidents · Heroes · Totems · Days
- [ ] V2-11 Archive gains its Trust sub-nav (Heritage Ledger, Sources & provenance)
- [ ] V2-12 **Week gate** — tsc clean · web bundle green · every pre-v2 route re-walked · STATUS updated

### Week 2 — Watch and Journey, the core loop (2–8 Sep)

- [ ] V2-13 `services/progress/` — types + local store (web + native) + hook (D5), unit-tested
- [ ] V2-14 `WatchScreen.tsx` — featured + rails + filter chips + search (existing content only)
- [ ] V2-15 `WatchItemScreen.tsx` — player · Child⇄Adult · language ▾ · **Sources & provenance** · Ask Ubuntu
- [ ] V2-16 `JourneyScreen.tsx` — staged trail (done/current/locked) from `history-trail.ts`
- [ ] V2-17 `content/quiz.ts` + grounded questions for chapters 1–3 — every distractor must be defensible
- [ ] V2-18 `StageScreen.tsx` — WATCH → QUIZ → REWARD (wireframe 2e) + "Ask Ubuntu for a hint"
- [ ] V2-19 Heritage cards — award on stage completion, 22 totems from `totems.ts`
- [ ] V2-20 "Continue your journey" resume bar on Home, wired to real progress
- [ ] V2-21 **Week gate** — tests + tsc + bundle green · STATUS updated

### Week 3 — Kids, Schools, Passport, polish (9–15 Sep)

- [ ] V2-22 `PassportScreen.tsx` — level · streak · stamps · card grid · reset-my-progress (wireframe 2h)
- [ ] V2-23 `KidsScreen.tsx` — home-language greeting · animal guide · today's story (wireframe 2f)
- [ ] V2-24 `KidsStageScreen.tsx` — picture quiz, four big image answers, star rating
- [ ] V2-25 Grown-ups corner — hold-3-seconds gate out of Kids mode
- [ ] V2-26 `SchoolsScreen.tsx` — teacher dashboard over **seeded demo class data** (D5), labelled as demo
- [ ] V2-27 CAPS-alignment + lesson plans for chapters 1–3 (cite the CAPS document)
- [ ] V2-28 **i18n sweep** — every new string in all 11 languages, honest EN fallback
- [ ] V2-29 Accessibility + responsive pass — labels · contrast · touch targets · web keyboard nav
- [ ] V2-30 POPIA review of every new surface
- [ ] V2-31 **Programme gate** — final polish · docs updated · STATUS + tasks.md reconciled
