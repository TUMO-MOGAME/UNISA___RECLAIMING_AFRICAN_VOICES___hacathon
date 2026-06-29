# Tasks — Lentswe backlog

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

- [ ] T011 `content/types.ts` + content registry `content/index.ts`
- [ ] T012 `CinematicReader` (bg image + scrim + overlaid text + scene nav)
- [ ] T013 HomeGallery screen (four pillars, hero images, blurbs)
- [ ] T014 ModuleScreen + navigation (expo-router or simple stack)
- [ ] T015 i18n layer + `LanguageToggle` (Setswana + English)
- [ ] T016 `ModeToggle` (Child/Adult) wired to scene `text`/`childText`
- [ ] T017 `services/gemini.ts` — author-time Child + translation drafts (cached into content)
- [ ] T018 `content/ityala-lamawele.ts` (virtual *inkundla*, grounded)
- [ ] T019 `content/indaba.ts` ("Myth & Origin", grounded; handle hard material with care)
- [ ] T020 "About the Sources" screen (credit authors + references)
- [ ] T021 Offline read verified (airplane mode) + images cached

## Phase 2 — Community Archive + offline (4–6 Jul)

- [ ] T022 `ConsentSheet` (POPIA) — blocks recording until opt-in + private/public choice
- [ ] T023 `services/recorder` (expo-av) → local file + metadata
- [ ] T024 WatermelonDB schema + models (recordings) + local list UI
- [ ] T025 Erasure: delete recording (local) — one tap
- [ ] T026 ArchiveScreen (record · list · play · delete)
- [ ] T027 (stretch) Supabase tables + **RLS** + upload on consent/online
- [ ] T028 (stretch) `services/lelapa.ts` — Vulavula transcribe + store transcript
- [ ] T029 (stretch) WatermelonDB ↔ Supabase sync

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
