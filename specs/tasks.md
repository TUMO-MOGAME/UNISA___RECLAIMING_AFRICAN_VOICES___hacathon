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
- [x] KTR-02 First-try bonus + streak + the `solve` progress slice (allow-list updated deliberately).
      `recordSolve` replaces the bare `recordQuiz` call: keeps the best attempt, pays
      `BONUS_STARS_FIRST_TRY` per question solved without a correction, and moves a run of clean
      stages. Four rules the tests pin — nothing is taken away · the bonus pays the **improvement**,
      once · the run advances on a stage's **first** clean solve only (so re-walking one easy stage
      cannot farm a streak) · **a milestone with no authored question decides nothing**, neither a win
      nor a break, which matters while 12 of 25 have none. The `solve` slice is three counters and the
      allow-list grew by exactly one reviewed key. Surfaced on the reward card and the Passport
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
- [x] HERO-05 **The bug: "Start the journey" felt like it navigated away.** It never did — `openMap()`
      fired the 1652 dot-story the instant you tapped, throwing a full-screen picture-then-film over
      the road before you saw it. The walk everyone came for was hidden behind a film you had to
      dismiss. Now the road opens, the walker stands on the first dot, and the story plays only when
      you ask for it at a dot. **Watching is offered, never forced**
- [x] HERO-04 The trailer now says **whose road it is** — country name and year range in the top bar —
      and when the selected country has no trail, says that country's road is coming instead of
      silently passing South Africa's off as theirs
- [x] HERO-06 `content/trails.ts` — the country → road registry, so a new country is a **data edit**.
      `HistoryTrail` takes its milestones as a prop and resets the walker when the road changes
- [ ] HERO-03 **Only South Africa has a road.** That is the content gap, not a code gap: `trails.ts`
      holds `za` and nothing else, and a country is added the moment its `countries/*.md` Milestones
      table is sourced per claim. Botswana has 19 dated events ready and is deliberately **not** wired
      — its citation markers were lost in the paste it came from. **No sourced content, no road**

### Alongside — Ubuntu Heritage installs as a PWA (29 Aug)

Serves two things at once: the offline-first promise in [docs/07](../docs/07-accessibility.md) becomes
real rather than aspirational, and if MoMo Mini Apps turn out to be PWAs, the hackathon build starts
from a working one.

- [x] PWA-01 `public/manifest.webmanifest` + 192/512/maskable icons generated from `assets/icon.png`
- [x] PWA-02 `scripts/build-web.mjs` — injects the head tags into Expo's generated `index.html` and
      writes a service worker with a real precache list; `npm run build:web`
- [x] PWA-03 Service worker deliberately **conservative**: navigation is network-first so a deploy is
      picked up immediately, only content-hashed `/_expo/static/` is cache-first, and
      `skipWaiting` + `clients.claim` mean a bad worker is replaced by the next deploy rather than
      pinning someone to an old build
- [x] PWA-04 `vercel.json` build command runs the post-step, so the deployed site is the PWA
- [ ] PWA-05 **Verify on a real device** — install prompt, add to home screen, then aeroplane mode.
      No test here can do this and it is the only thing that proves it works
- [x] PWA-06 **Films are 12.8 MB each** — and 1816 plays two back to back, so one tap could cost
      24 MB. Now the "Watch the film" button carries the real size and anything over 2 MB opens a
      `DataGate` **before the `<video>` mounts** (mounting it *is* the download). It states the cost,
      leads with "Play it anyway", and remembers "don't ask again on this device" — a warning, not a
      toll gate. The one thing a checkbox cannot silence is an active **data saver**: that switch is
      something a person turned on in their browser today. Sizes live next to each `require()` and
      `journey-media.test.ts` stats the real files, because a stale number quotes a reader the wrong
      price for their airtime. **Transcoding was not done** — the films are unchanged; this makes the
      cost honest rather than smaller

### Measured payload (29 Aug) — the numbers behind the low-data claim

| | Files | Total | Average |
|---|---:|---:|---:|
| App shell — **what a first open costs** | 10 | **4.1 MB** | — |
| Scene images (webp) | 232 | 30.8 MB | 136 KB |
| Audio (mp3) | 228 | 183.0 MB | 822 KB |
| Films (mp4) | 3 | 37.6 MB | **12.8 MB** |
| Fonts (ttf) | 36 | 11.7 MB | 333 KB |

Read a story ≈ **0.3 MB** (two scenes). Read it again ≈ **0 MB**. Nothing but the shell is precached —
media is cached only once actually viewed, which is the point on a metered connection.

### Alongside — the language picker follows the country (27 Aug)

- [x] LANG-01 `content/country-languages.ts` — a **sourced** country → language map, plus tests that pin the claims
- [x] LANG-02 `LanguagePicker` groups by the selected country, and names the languages we do **not** have rather than hiding them
- [ ] LANG-03 Extend the map beyond Southern Africa — **each country needs its own citation**; an unmapped country falls back to the flat list, which is the honest default
- [x] LANG-04 Choosing a country also **switches** the active language — but only while the reader has not picked one by hand. Once they choose a language themselves, nothing overrides it again

### Alongside — ElevenLabs becomes the narration voice, where it can be (30 Aug)

Tumo's key was tested live: valid, **starter tier, 40 000 characters/month** (12 953 already spent
when checked), instant voice cloning available, and **four South African English voices** on the
account. Decisions taken with Tumo on 30 Aug: **per-language routing, cached**, voice = **Amara —
Warm African-British**.

- [x] EL-01 `services/tts/elevenlabs.ts` — pure request builder + `refuseReason` + the async edge.
      `POST /v1/text-to-speech/{voice}` returning raw MP3 bytes, wrapped to a data URI.
      Output is **`mp3_22050_32`**, not 128 kbps: the same line is 34 KB at 128 and 6 KB at 32, and
      PWA-06 had just finished measuring what generosity costs on a metered line
- [x] EL-02 `LanguageMeta.elevenlabs` — a **sourced** claim, verified against `GET /v1/models`:
      ElevenLabs covers **English and Afrikaans** of our eleven and **none** of the nine indigenous
      languages
- [x] EL-03 `select.ts` — the provider **ladder**, chosen per language. ElevenLabs for en/af ·
      Botlhale for the nine · device underneath everything, always last, always present.
      **No indigenous language is ever routed to ElevenLabs**, not even as a last resort: it does not
      reject unsupported text, it returns fluent, confident, wrong pronunciation. `select.test.ts`
      asserts that for all nine, under every key combination
- [x] EL-04 `cache.ts` + `cache-key.ts` + IndexedDB store — the same passage is synthesised **once**.
      One passage is ~800 of the month's 40 000 characters; without this the Listen button stops
      working partway through the month
- [ ] EL-05 **Listen to a clip and judge it.** No test here can hear anything. Wanted: one English
      passage through Amara, and confirmation that the Afrikaans `eleven_v3` path sounds right
- [ ] EL-06 **Rotate the key after the demo.** `EXPO_PUBLIC_*` is compiled into the web bundle and is
      readable by anyone who opens the deployed site — on a **paid** account. Longer term this wants a
      proxy behind `EXPO_PUBLIC_ELEVENLABS_BASE_URL` rather than a shipped key
- [ ] EL-07 Pre-render the fixed narration (T031's cinematic intro) at author time instead of live,
      so the demo never depends on quota or a network at all

### Later — the voice fits the story, and the tone carries the feeling (planned 30 Aug, not started)

Tumo's ask: **the voice that speaks should suit the story and its theme, and the tone should carry
the emotion.** Today one voice — Amara — reads everything in English, at the API's default settings,
so *Mhudi*'s war-and-exile chapters and a Kids-mode heritage card are delivered in exactly the same
register. Deferred on purpose; this is polish, and it lands after the game layer.

**Three things make this harder than picking voices, and each is a task below:** the cache key does
not currently include the delivery settings, so two tones of one voice would collide; **none of the
nine indigenous languages can be given a tone at all** (Botlhale takes no voice parameter and
ElevenLabs must never speak them — EL-03); and re-casting a module invalidates every clip already
paid for out of a 40 000-character month.

- [ ] VOICE-01 **Cast the voices with Tumo — and write down why.** The account carries four South
      African voices (Amara, Declan – SA News, Andreas, Travis) plus instant voice cloning. Which
      voice reads Mqhayi's courtroom, which reads Mutwa's oral epic, which reads Vilakazi's poetry,
      which reads Kids mode. **Casting is an interpretive act on someone else's literature**, so it
      is a decision recorded with its reasoning, not a constant chosen quietly in a service file
- [ ] VOICE-02 `content/narration-voice.ts` — the cast as **data**: `moduleId → { voiceId, settings,
      why }`, with Amara as the default so an uncast module sounds exactly as it does today
- [ ] VOICE-03 Delivery settings per cast entry — `voice_settings` (`stability`, `similarity_boost`,
      `style`, `use_speaker_boost`) on the request body, and `eleven_v3` audio tags where the model
      supports them. **Verify both against the live API before shipping either**, the way EL-02
      verified language support against `GET /v1/models` — the docs are not the contract
- [ ] VOICE-04 **`narrationKey` must include the delivery settings — and this lands *before* any tone
      varies.** [cache-key.ts](../app/src/services/tts/cache-key.ts) hashes provider + lang + voice +
      text. Two tones of the *same* voice on the *same* passage produce the same key, so the reader
      would hear whichever was rendered first, forever, and a re-cast would look like a no-op. One
      field and one test
- [ ] VOICE-05 **The nine indigenous languages get no tone, and the UI must not imply they do.**
      Botlhale takes no voice parameter at all, and ElevenLabs is never routed to them (EL-03). If a
      "voice" or "mood" control appears anywhere, it must be absent or visibly unavailable in those
      languages rather than present and inert — a Setswana reader should not be shown a promise the
      app cannot keep
- [ ] VOICE-06 **Budget the re-synthesis.** Extra voices cost no extra characters, but changing a
      module's cast invalidates its cached clips and re-spends them out of 40 000/month — the four
      literary modules are ~15 700 characters of English prose. Cast changes are batched and dated,
      not tuned live
- [ ] VOICE-07 **Listen and judge**, as with EL-05: no test in this repo can hear a performance. One
      passage per cast voice, and an honest answer to whether the emotion helps the text or acts on
      top of it
