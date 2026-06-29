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
