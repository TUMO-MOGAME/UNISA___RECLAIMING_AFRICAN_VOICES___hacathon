# STATUS — Ubuntu Heritage live board

> Source of truth for "what's going on right now." Read first, update last. Treat updating it as part
> of "done." For the structured **implemented vs. planned** view, see
> [docs/10-status-and-roadmap.md](docs/10-status-and-roadmap.md).

_Last updated: 2026-08-30 — by Tumo (via Claude)_

---

## 🎯 Current focus

| Area | Status |
|------|--------|
| Project scaffold (docs, governance, .claude) | ✅ done |
| Expo app initialized (SDK 56) + web bundle green | ✅ done |
| HomeGallery + nav across **4** grounded pillars | ✅ done |
| Cinematic Reader: Child/Adult + EN/Setswana + scene nav + back | ✅ done |
| "About the Sources" screen (credits + references + integrity note) | ✅ done |
| **Community Archive**: POPIA consent → record → list → play → delete | ✅ done — **web: durable IndexedDB (survives refresh)**; native: session (T024) |
| **Reader "Listen" (TTS)**: pluggable Botlhale AI → on-device fallback | ✅ done (device path live; Botlhale on key) |
| **All 11 SA languages**: data-driven registry + picker + TTS + honest EN fallback | ✅ framework done (EN/TSW text authored) |
| **Machine-draft translations** (Botlhale): service + draft-aware Reader + gen script | ✅ built, awaiting token+org_id to run |
| **Machine-draft translations (Claude)**: `npm run gen:claude-drafts` → 9 languages into `drafts.data.ts` | ✅ built + typecheck/bundle green, **awaiting `ANTHROPIC_API_KEY` to run** |
| **"Ask Ubuntu" chatbot**: Claude tool-use (Anthropic SDK), RAG over site content only + `navigate_to` orchestrator | ✅ built + **runs in `expo start` dev + prod** (widget wired app-wide; **chrome localized in all 11 languages** + LLM replies in the picked language; nav + site answers work key-free; full chat on `EXPO_PUBLIC_ANTHROPIC_API_KEY`). Moved off LangChain — its `langsmith` dep TDZ-crashed the Expo web dev server. |
| **Visual polish**: cinematic fonts · gradients · image fade+KenBurns · motion · branded launch | ✅ done (compiles; eyeball via `npm run web`) |
| **Cinematic hero art**: Gemini, cached local PNGs — all **7 modules** (4 literary + 3 Atlas) | ✅ done (idempotent gen; quota-safe) |
| **Submission package**: written narrative (7 modules + Heritage Ledger) · demo script · review handoff | ✅ drafted (video + Emma's review pending) |
| NativeWind wiring | ⬜ optional (T006) |
| **Reader "Listen" — ElevenLabs** for the languages it actually speaks (EN/AF), Botlhale for the nine, device underneath | ✅ built 30 Aug + **live key tested** · cached so a passage is paid for once · **nobody has listened to a clip yet (EL-05)** |
| **🎮 Know the Road — the game layer (Phase 6)** | 🟡 **2 of 10** — KTR-01 + KTR-02 done (27–30 Aug); solving now moves you *and* is worth something · plan: [docs/14-game-architecture.md](docs/14-game-architecture.md) |
| **🏗️ Architecture v2 — multi-page transformation** | 🟢 **30 of 31 tasks done (26–27 Aug)** — every room is live and the Watch page carries its provenance block; the one open task is the **V2-12 browser re-walk** · plan: [docs/13-architecture-v2-plan.md](docs/13-architecture-v2-plan.md) |

---

## 🏗️ Architecture v2 — the current programme

The app is moving from **one long scrolling page** to a **site with rooms**: a persistent shell, a
browsable cinematic library, and a watch → quiz → collect loop. Full plan, task IDs and week gates in
**[docs/13-architecture-v2-plan.md](docs/13-architecture-v2-plan.md)**.

**Six decisions locked with Tumo on 2026-08-26:**

| # | Decision |
|---|----------|
| D1 | Nav = `Journey · Watch · Atlas · Archive · Kids · Schools` + country ▾ + language ▾ + Passport chip |
| D2 *(revised)* | The hero SA-road trail is the **free trailer** — it opens **in place**, exactly as before. The deeper staged `/journey` page is reached from the nav and is where future chapters get locked. |
| D3 | Country selection **moves** to a new `/countries` page — the 54 flags + national anthems move with it |
| D4 | **Keep** the current palette (black `#000000` + sa-blue `#1A85A7`); take the new designs' structure, not their gold/brown skin |
| D5 | Progress is **local-only** — no accounts, no PII. Schools ships over seeded demo data |
| D6 | The **hero section** and the **footer** are kept byte-for-byte and reused everywhere |

| Week | Window | Focus | Gate |
|------|--------|-------|------|
| **1** | 26 Aug → 1 Sep | Shell, persistent header/footer, `/countries` + anthems, Atlas hub | Every nav item lands on a real page; hero + footer visually unchanged |
| **2** | 2 Sep → 8 Sep | `/watch` library + player, `/journey` stages, quiz, heritage cards, progress store | Watch → quiz → reward completes and survives a refresh |
| **3** | 9 Sep → 15 Sep | Passport, Kids mode, Schools dashboard, i18n sweep, a11y, POPIA review | All 11 languages · no new PII · tsc + bundle + tests green |

**De-scope order if the window tightens:** Schools → Kids stage flow → quiz chapters beyond 3 → Watch search.
**Never cut:** the shell, the kept hero/footer, `/countries` + anthems, i18n, POPIA.

---

## ⏭️ Next action

> **30 Aug:** KTR-02, PWA-06 and the ElevenLabs narration voice all landed — typecheck clean,
> **179/179 tests** (up from 136), `npm run build:web` green. **V2-12 is unchanged and still the
> highest-value open item: nobody has re-walked the routes in a browser.** Three of the four things
> now waiting need a human — a pair of eyes on a layout (V2-12), a pair of ears on a narration clip
> (EL-05), and a real phone in aeroplane mode (PWA-05).

Architecture v2 is **30 of 31**. V2-07, V2-11 and V2-15 all landed on 27 Aug. **One task is still
open, and it is the one a machine cannot finish:**

- **V2-12 — the Week 1 gate.** Three of its four conditions are met and re-verified: typecheck
  clean, web bundle green, and route wiring now pinned by a test
  ([app/src/routes.test.ts](app/src/routes.test.ts)) that fails the build if a route loses its
  `case`, if the nav points at a room that does not exist, or if the chatbot cannot open one.
  **What is still not done is the part that matters: nobody has re-walked every pre-v2 route in a
  browser and looked at it.** No test in this repo can see a layout. This needs Tumo at the keyboard
  (`npm run web`), walking Home → Reader → Atlas → Provinces → Province → City → Presidents →
  President → Heroes → Hero → Totems → Days → Archive → Ledger → About, plus the new rooms, and
  confirming the **hero and the footer look exactly as they did** (D6). Until that happens V2-12
  stays unticked.

### Now building — Phase 6, Know the Road

The v2 loop looks like a game and is not one: `StageScreen.finish()` awards the card and all 50 stars
**whether or not a single answer was right**, and `recordQuiz` / `stampCountry` are tested code that
nothing calls. Decisions D7–D9 and the build order are in
[docs/14-game-architecture.md](docs/14-game-architecture.md).

- ~~**KTR-01 — solve-gated stage completion.**~~ ✅ done 27 Aug.
- ~~**KTR-02 — the first-try bonus, the streak, and the `solve` progress slice.**~~ ✅ done 30 Aug.
  `recordSolve` replaces the bare `recordQuiz` call. A question answered without a correction pays a
  bonus star; a run of cleanly-solved stages is counted, and the best run ever reached is kept
  forever. Four rules are pinned by tests: **nothing is ever taken away** · the bonus pays the
  **improvement**, once (re-walking a stage you aced pays nothing) · the run advances on a stage's
  **first** clean solve only, so re-opening one easy stage seven times cannot "earn" a streak of
  seven · **a milestone with no authored question decides nothing** — neither a win nor a break,
  which matters while 12 of the 25 have none. The `progress.test.ts` allow-list grew by exactly one
  key, `solve`, three counters, as a reviewed line of the change.
- **KTR-03 is next** — `content/challenges.ts` with the non-optional `sourceRef`, F0 (the existing
  quiz) as the first generator so the abstraction is proved against working content.

Then:

1. **Tumo's language review.** The v2 UI strings are machine-quality across the 10 non-English
   languages. The **Setswana** especially wants your eye — the nav (`shell/nav.ts`), the Kids
   greetings (`KidsScreen.tsx`), and the Passport privacy copy. **New on 27 Aug and unreviewed:**
   the Watch page's provenance labels (`WatchItemScreen.tsx` — "Sources & provenance", "Adapted
   from", "The passage behind each scene"), the new Home sections (`HomeGallery.tsx` — the Journey
   preview, the continent band, Kids/Schools) and the Archive's Trust chips (`ArchiveScreen.tsx`).
   These sit on the most integrity-sensitive surface in the app, so a wrong word costs more here
   than elsewhere. **New on 30 Aug and unreviewed:** the reward card's first-try bonus
   (`StageScreen.tsx` — `UI.bonus`), the Passport's two new counters (`PassportScreen.tsx` —
   `UI.solvedClean`, `UI.bestRun`), and the whole of the data gate (`DataGate.tsx` — "Play on
   Wi-Fi?", the size sentence, the data-saver note, "Don't ask again on this device"). The gate is
   the one place in the app that talks to someone about **money**, so its Setswana wants your eye
   more than most.
2. **Accessibility retrofit on the pre-v2 screens** — 25 unlabelled controls, listed in the
   2026-08-27 log entry. Its own task, deliberately not folded into v2.
3. **Native persistence for progress** — web persists; native is session-only and says so. Lands with
   WatermelonDB alongside the Archive's own native persistence (T024).
4. **Quiz coverage** — 14 questions across 13 of the 25 milestones. The remaining 12 need sourced
   questions before those stages feel finished.
5. **Locked chapters on `/journey`** — the free/paid split Tumo described. The hero trailer is free
   and stays free; the gating mechanism itself is not built.

### The narration voice — what ElevenLabs can and cannot do (30 Aug)

Tumo's key was tested live. It works: **starter tier, 40 000 characters a month** (12 953 spent when
checked), instant voice cloning available, and **four South African English voices** already on the
account — Amara (Warm African-British), Declan (SA News), Andreas, Travis. **Amara is the chosen
narration voice.**

**The finding that shaped the wiring.** `GET /v1/models` was read and every model's language list
checked against our eleven. ElevenLabs covers **English and Afrikaans**. It does **not** cover
Setswana, isiZulu, isiXhosa, Sepedi, Sesotho, siSwati, Xitsonga, Tshivenḓa or isiNdebele — none of
them appears in any model. And it does not *refuse* text in a language it does not know; it returns
fluent, confident, wrong pronunciation. Putting that in a child's ear as the voice of Setswana
literature is precisely what [AGENTS.md §4](AGENTS.md) forbids and why
[docs/14](docs/14-game-architecture.md) blocks challenge format F4.

So the engine is chosen **per language**, and a test asserts the rule rather than trusting it:

| Language | Voice |
|---|---|
| English, Afrikaans | **ElevenLabs** (Amara) — the best voice we have, for the two it can actually speak |
| the nine indigenous languages | **Botlhale**, still the only engine that truly voices Setswana — and ElevenLabs is not even on their fallback ladder |
| anything, with no keys at all | **on-device** — free, offline, quota-free, and always the last rung so Listen never dead-ends |

Every remote clip is cached (IndexedDB on web) on text + language + voice, so one passage is paid for
once. That is not an optimisation: a passage is ~800 characters of a 40 000-character month, and
without the cache the Listen button would stop working around the 12th.

**Two things are still open, and both matter:**

- **EL-05 — nobody has listened to a clip.** No test in this repo can hear anything. The pipeline is
  verified end-to-end (real MP3 bytes, right size, right format); the *sound* is unjudged.
- **EL-06 — rotate the key after the demo.** `EXPO_PUBLIC_ELEVENLABS_API_KEY` is compiled into the
  web bundle and is readable by anyone who opens the deployed site, on a **paid** account. Same
  exposure the Anthropic chatbot key already carries. Longer term this wants a small proxy behind
  `EXPO_PUBLIC_ELEVENLABS_BASE_URL` rather than a shipped key.

### Parked (pre-v2, still open)

1. **Record the demo video** — follow the shot-by-shot script in [specs/demo-video-script.md](specs/demo-video-script.md)
   (~2:55, web target). Do one dry run of record→consent→delete first; art is cached so nothing pops
   in live on camera.
2. **Emma's review pass** — [specs/emma-review-handoff.md](specs/emma-review-handoff.md) lists exactly
   what needs your eyes, top-down: the 3 on-camera UI strings (**Reetsa** / Simolola go bala / Rekoto
   ya Boswa), the Setswana `tn` drafts across all 7 modules, and 3 cultural-accuracy questions (Atlas).
3. When keys arrive: `services/gemini.ts` (T017) · Supabase + RLS upload (T027) · Lelapa transcribe (T028).
   **Botlhale TTS:** contract now wired from their public docs — `POST api.botlhale.xyz/tts`,
   form-encoded `text_msg`+`language_code`, Bearer token, returns `audio_url`; Setswana = `tn-ZA`.
   Paste a Bearer token into `app/.env` (`EXPO_PUBLIC_BOTLHALE_API_KEY`) → Listen auto-upgrades to real
   Setswana audio. **3 residual unknowns for the contact** (marked in `botlhale.ts`): (a) field name
   `text` vs `text_msg`; (b) dev vs prod host; (c) refresh_token→IdToken flow (using a ready token for
   the demo).
4. Persistence: WatermelonDB so recordings survive reload (T024). Optional: NativeWind (T006).
5. Phase 3: ElevenLabs static intro · record the 2–3 min demo video · finalise the written narrative.

## 🗓️ Timeline (today: 2026-08-26)

### Architecture v2 (current programme)

| Phase | What | Target window | Status |
|-------|------|---------------|--------|
| **5.1 Shell** | Persistent header/footer · route split · `/countries` + anthems · Atlas hub | 26 Aug – 1 Sep | ✅ done |
| **5.2 Core loop** | `/watch` + player · `/journey` stages · quiz · heritage cards · progress store | 2 Sep – 8 Sep | ✅ done (early) |
| **5.3 Rooms + polish** | Passport · Kids · Schools · i18n sweep · a11y · POPIA review | 9 Sep – 15 Sep | ✅ done (early) |

### Hackathon (complete)

| Phase | What | Target window | Status |
|-------|------|---------------|--------|
| **0. Scaffold** | Governance + docs + Expo boots + 1 module renders | 29–30 Jun | ✅ done |
| **1. Story core** | 3 literary modules · cinematic Reader · Child/Adult · ST/EN toggle · gallery | 1–3 Jul | 🟡 mostly done (early) |
| **2. Community + offline** | Oral-history recorder · POPIA consent · local save · (Supabase/Lelapa stretch) | 4–6 Jul | 🟡 core done (early) |
| **3. Polish + submit** | Accessibility pass · intro narration · demo video · written narrative | 7–9 Jul | ⬜ not started |
| **🏁 Submit concept** | Prototype + 2–3 min video + narrative | **9 Jul 16:00** | ⬜ |
| **4. Showcase prep** | (if finalist) polish for live showcase | 13–16 Jul | ⬜ |

## 🧱 What's built so far

- Full governance + planning scaffold: `CLAUDE.md`, `AGENTS.md`, this board, `README.md`.
- `docs/` set (plan, architecture, tech stack, AI pipeline, humanities sources, POPIA, accessibility,
  judging map, research summary).
- `.claude/settings.json` + project skills (humanities-grounding, pollinations-visuals,
  popia-compliance, setswana-i18n).
- `specs/` concept-submission narrative draft + task backlog.

## 🛠️ Environment & access

- Node 24 / npm 11 / git — installed and working.
- API keys still needed (all free tier): **Gemini** (Google AI Studio), **Lelapa AI / Vulavula**,
  **Supabase** (URL + anon key), **ElevenLabs** (one-time static narration only). Put them in
  `app/.env` (see `app/.env.example`). Pollinations needs **no key**.

## ⚠️ Open decisions / risks

- **Tight timeline:** ~10 days to concept (not the 4 weeks the blueprint assumed). Phase 1 (story core)
  is the never-cut spine; Community Archive is the highest-value differentiator but cut to "record →
  consent → local save" first, add cloud sync only if time allows.
- Name **Maloba** chosen (Setswana "yesterday" — bringing yesterday's voices to life). Tagline
  *Mantswe a maloba* = "Voices of Yesterday".
- Decide demo target for the video: web (easiest to screen-record) vs Expo Go on a phone.

## 🔗 Blockchain (Phase A — on-chain heritage provenance)

- Plan: [docs/11-blockchain-heritage-plan.md](docs/11-blockchain-heritage-plan.md). Decision: build Phase A
  now; IPFS + custodial wallet; **POPIA-safe** (only public works + hashes on-chain, never recordings).
- `chain/` workspace anchors the canon: real **IPFS CIDs + SHA-256** computed for all 4 works, submits
  a **provenance memo tx**, and **mints a heritage certificate SPL token** (fixed supply 1) per work to
  a recipient wallet (`MALOBA_RECIPIENT` = Emma's Phantom address). In-app **Heritage Ledger** screen
  shows CID/hash + "Verify on Solana" + certificate links.
- **To complete live:** (1) Emma sends ~0.1 **testnet** SOL from Phantom to the custodial address;
  (2) provide Phantom testnet address; (3) run `cd chain && MALOBA_RECIPIENT=<addr> npm run anchor`.
  Certificates then appear in Phantom (unnamed on testnet — Metaplex metadata/naming is Phase B on
  devnet/mainnet).
- **✅ LIVE on Solana devnet.** The canon was notarised via a **browser Heritage Notary**
  (`chain/web/index.html`, served on :8090) where Emma connected **Phantom** and signed — no custodial
  wallet needed. RPC reachability solved with the keyless `solana-devnet.api.onfinality.io/public`
  (api.devnet.solana.com is blocked on this network). One tx carries all 4 provenance memos:
  `3SafBbHpT7YYBKDkkRP8rAi43eqVzCgnydiJwkGwH6im94sP1nxdS1Dh66MDxccSMxAF2mXy9g2LhU4Z6XhpmKax` — confirmed,
  err=null. Wired into `app/src/content/heritage.data.ts` (cluster=devnet); the in-app Heritage Ledger
  now shows live "Verify on Solana" links. Owner: `BDscn3fpj4hw7H9Jm8SKis2NmPSX8Rd5to4JzyNgkLWh`.
- Next: in-browser **certificate NFT minting** (Metaplex named NFTs to Phantom). Custodial keypair
  `9CW9…` (gitignored) retained for the headless `chain/anchor.mjs` path.

## 🧭 Cultural Atlas (levels up Humanities Depth)

- New **Cultural Atlas** section (3 grounded, cited modules): **Unsung Heroes** (Galeshewe, Nyabela,
  Moleli & Anta, Youth of 1976), **Rites of Passage: Marriage** (lobola/Patlo/Umtshato/Umabo),
  **The Peopling of SA** (Khoisan → Bantu → Sotho-Tswana & Nguni). Reuses the cinematic Reader.
- **Integrity choices (kept out on purpose):** the genetic-admixture % table (race-science risk),
  the hard "Tswana oldest" chronology (framed as debated), and `grokipedia` sourcing. Sensitive
  customs kept with context. Sources credited on the About screen. **Setswana + cultural content needs
  Emma's review** (marked in files).
- **Archive tie-in:** every Atlas entry has a "🎙 record your family's version" button → Community
  Archive. **Chain tie-in:** the on-chain Heritage Ledger already covers the literary canon; extending
  anchoring to Atlas heritage is a safe additive follow-up (won't touch the live devnet tx).

## 🗒️ Log

- **2026-08-30** — **KTR-02: a clean solve is finally worth more than a corrected one. PWA-06: a
  13 MB film asks before it spends someone's airtime. And ElevenLabs becomes the narration voice —
  for the two languages it can actually speak.**

  **KTR-02.** KTR-01 made a wrong answer *stop* you; it still left a stage solved perfectly worth
  exactly as much as one solved on the fourth attempt. `recordSolve` replaces the bare `recordQuiz`
  call: it keeps the best attempt, pays a bonus star per question answered without a correction, and
  counts a run of cleanly-solved stages. Four rules, each pinned by a test rather than by intent —
  **nothing is ever taken away** (stars, best run and the stored tally only rise); the bonus pays the
  **improvement**, once, so re-walking a stage you aced pays nothing and a shaky first pass can still
  be improved on later; the run advances on a stage's **first** clean solve and on nothing else,
  because otherwise re-opening one easy stage seven times "earns" a streak of seven; and **a
  milestone with no authored question decides nothing** — not a win, and emphatically not a break,
  which matters a great deal while 12 of the 25 milestones have no question yet. A broken run is
  never announced anywhere in the UI; `bestStreak` is stored separately precisely so the record of
  the best one survives. The `progress.test.ts` allow-list grew by exactly one key — `solve`, three
  counters, nothing time-stamped, nothing that identifies anyone — and it grew as a reviewed line of
  this change, which is the entire point of having an allow-list.

  **PWA-06.** The measured payload table said a story costs ~0.3 MB and a film costs 12.8 MB, and
  1816 plays **two** back to back — so one tap on "Watch the film" could pull 24 MB down a prepaid
  line with no warning at all. The low-data promise in [docs/07](docs/07-accessibility.md) was not
  honest while that was true, and caching does not help a first view. Now the button carries the real
  size and anything over 2 MB opens a gate **before the `<video>` element mounts**, because mounting
  it *is* the download. The gate states the cost and leads with "Play it anyway" — it exists to
  inform, not to talk anyone out of watching — and "don't ask again on this device" is remembered, so
  a reader on uncapped fibre meets it once. The one thing that checkbox cannot silence is an active
  **data saver**: that is a switch a person turned on in their browser or their phone, and a box
  ticked in this app last month does not get to cancel it. The sizes are declared next to each
  `require()` and `journey-media.test.ts` stats the real files, because a film re-cut without updating
  its number would quote a reader the wrong price for their airtime. **The films were not
  transcoded** — this change makes the cost honest, not smaller.

  **ElevenLabs.** Tumo's key was tested against the live API: valid, starter tier, 40 000 characters a
  month, instant voice cloning available, and four South African English voices already on the
  account. Then `GET /v1/models` was read, and it changed the design. Of our eleven languages
  ElevenLabs speaks **English and Afrikaans**; it does not speak Setswana, isiZulu, isiXhosa, Sepedi,
  Sesotho, siSwati, Xitsonga, Tshivenḓa or isiNdebele — and, crucially, it does not *say* so. Send it
  Setswana and it returns fluent, confident, wrong pronunciation. That is the exact harm
  [AGENTS.md §4](AGENTS.md) exists to prevent and the same reason
  [docs/14](docs/14-game-architecture.md) blocks challenge format F4. So the engine is chosen per
  language: ElevenLabs (Amara — Warm African-British) for English and Afrikaans, Botlhale for the
  nine, on-device underneath everything as the rung that always exists. `select.test.ts` asserts, for
  all nine and under every key combination, that ElevenLabs never appears on their ladder at all —
  the integrity rule as a test rather than a comment. Output is 32 kbps, not 128: PWA-06 had just
  finished measuring what generosity costs, and the same line is 34 KB against 6 KB. Every clip is
  cached on text + language + voice so a passage is paid for once, which is what lets the Listen
  button survive a month on 40 000 characters. Two things stay open and are logged as tasks, not
  hidden: **nobody has listened to a clip** (EL-05 — no test in this repo can hear), and the key is
  **bundled to the client** and must be rotated after the demo (EL-06).

  Verified: `npm run typecheck` clean · **179/179 tests** (136 before this session) ·
  `npm run build:web` green.

- **2026-08-27 (evening, later)** — **KTR-01 done: solving is now what moves you. Plus the language
  picker follows the country, and `countries/` opens for research.**
  **KTR-01.** A wrong answer no longer walks past you. It shows the sourced correction and hands the
  same question back with its options **reshuffled**, so answering again is a re-read rather than
  tapping a remembered position. You still cannot fail out — there is no penalty and no lost
  progress; what a wrong answer costs is the **first-try credit**. The reward card's score changed
  meaning accordingly: it now counts questions solved **without** a correction, which is the only
  version of that number that says anything. `recordQuiz` is finally called after being written and
  unit-tested since v2 — and it is called on re-visits too, because every reducer behind it is
  idempotent and `recordQuiz` keeps the best attempt, so returning to solve a stage cleanly can raise
  a score and never lower it.
  The shuffle lives in `content/quiz.ts`, not in the screen, specifically so it can be tested: three
  new tests pin that reordering keeps every option exactly once, never moves which one is correct,
  and actually permutes. A presentation trick that could silently change an answer is exactly the
  kind of thing that must fail a build rather than a reader.
  **The language picker now follows the country.** Choosing Botswana leads with **Setswana**, Lesotho
  with **Sesotho**, Eswatini with **siSwati** — because those genuinely are those countries' national
  languages, not because we mapped them by resemblance. It **groups, never filters**: a language you
  can read never disappears because of where you said you were.
  New sourced data in `content/country-languages.ts`, deliberately **only six countries** — `za` `bw`
  `ls` `sz` `na` `zw` — each citing the constitution or government source that makes the claim. Every
  other country falls back to the flat eleven-language list, which is the honest default. Filling in
  54 from memory would have been fabrication at scale.
  It also **names what we do not have**: pick Namibia and the picker says Oshiwambo, Otjiherero,
  Khoekhoegowab and German are spoken there and are not in Ubuntu Heritage. A picker showing only
  what we happen to support would quietly imply a country speaks only that.
  **The trap that shaped the data:** Zimbabwe's *Ndebele* is **Northern** Ndebele, a different
  language from South Africa's isiNdebele (`nr`). Mapping one to the other would have been a
  plausible-looking falsehood, so Zimbabwe's Ndebele is listed among the languages we lack — and a
  test now fails the build if anyone ever "fixes" that.
  **`countries/`** — a folder for Tumo's per-country research, one `.md` per nation, named by the same
  ISO code the flags use. Its README says which sections already feed code (Languages → the picker;
  Anthem → `/countries`) so the research lands somewhere instead of sitting in a drawer, and
  `za-south-africa.md` is filled in as a worked example from material already in the repo.
  **LANG-04, decided by Tumo the same evening: switch, but only while untouched.** Choosing a country
  now also switches the UI to that country's leading language — pick Botswana and the app comes up in
  Setswana. The moment the reader picks a language by hand, nothing overrides it again. Silently
  changing a language someone deliberately chose is worse than not being clever.
  Which language "leads" is itself a claim, so it is a `lead` field with its own justification rather
  than "whatever happened to be first in the array": South Africa leads with isiZulu (Census 2022
  home-language share — the Constitution lists the eleven **without** ranking, so the list and the
  order have different sources, and the note says so). Zimbabwe leads with English on an honest
  technicality, spelled out in the file: its two largest languages are Shona and Ndebele and we have
  neither, so English leads only among the languages we actually speak there.
  Verified: typecheck clean · **131/131 tests** · web bundle green.

- **2026-08-27 (evening)** — **Game layer decided: Know the Road v3, D7–D9.**
  Compared the "Know the Road v2" proposal against what the code actually does, and the proposal was
  right about the thing that matters. **The v2 loop looks like a game and is not one:**
  `StageScreen.finish()` awards the heritage card and all 50 stars **whether or not a single answer
  was right**; the score is rendered once and thrown away; and `recordQuiz` and `stampCountry` are
  written, unit-tested and **called by nothing** — the same dead-reducer pattern `setWatched` had
  until this morning. A reader can guess their way to a full Passport and the app congratulates them.
  On a project scored 30% on Humanities Depth that is the most expensive gap we have.
  **D7 — solving replaces landing.** Wrong answers are corrected and retried, never penalised.
  **D8 — no server, no accounts, no network play; competition is pass-and-play on one device.** The
  proposal's networked Arena would store a persistent per-device handle plus timestamps on a server:
  personal information by linkage, on a product used by children, where POPIA §35 applies. Its
  mitigation — "default off for under-13 Kids-mode devices" — **cannot be built**, because the app has
  no age signal and by design never will. Parked behind an explicit decision with Tumo, not rejected.
  **D9 — no timers outside pass-and-play.** Depth is the difficulty. A timer excludes the elders and
  children this is for.
  **Dropped from the proposal: the anti-AI hardening.** Canvas-rendered question text and answer-time
  forensics are cost with no return, and the proposal contradicts itself — F2 and F8 are plain text,
  pasteable inside a 15-second round, and are the two it schedules first. The real defence is that
  **winning buys nothing**: no wagering, no public losses, no rank.
  **Kept: the format catalogue**, which is the treasure and needs no competition to be worth building
  — F1 alone is free, since 22 totem calls are already bundled in `assets/animals/sounds/` and used
  only by Kids mode today. **F4 stays blocked**: its choices must be spoken in the language, and the
  only voices we could synthesise are the drafts already labelled unreviewed. No content, no format.
  **Corrected the record.** The proposal misdescribed the repo in four places, and two of the errors
  were ours: the quiz bank is **14 questions, not 17** (STATUS and docs/10 both said 17 — fixed);
  there are **27 totems, 22 with calls**; Supabase **Realtime is used nowhere**; and
  `roll-the-road-architecture.md`, which the proposal claims to supersede, **is not in this repo**.
  Plan: [docs/14-game-architecture.md](docs/14-game-architecture.md) · backlog: Phase 6, KTR-01…10.

- **2026-08-27 (later)** — **V2-15, V2-07 and V2-11 done. Architecture v2 is 30 of 31.**
  **V2-15 `WatchItemScreen` — the reason this was the load-bearing one.** `/watch` used to hand
  straight off to the `CinematicReader`. The Reader is a fine player but it is a *book*: a scene's
  sourcing lives in the margin of one paper page, visible only while you are on that page. The plan
  asked the watch page for a standing **Sources & provenance** block, and that is now what it has —
  what the film is adapted from (`module.source`), the passage behind **every** scene (each
  `scene.sourceNote`, tappable to jump there), the AI-imagery label, the full `references[]`, and the
  project's one rule in the reader's own language. **Not one word of it is authored**; it is all read
  off content that has been in `src/content/*.ts` since the modules were written. The data was always
  there — nothing had ever put it in front of a viewer.
  Also on the page: the scene player with a chapter-tick strip, the Child⇄Adult toggle, the language
  picker, Listen, "Continue the journey", "Open the full reader" (the Reader is unchanged and one tap
  away) and "Ask Ubuntu about this story".
  **Two things fell out of building it.** `progress.setWatched` existed, was unit-tested, and was
  **never called by anything** — so the "% watched" pill on the Watch cards was always 0. The watch
  page now reports its position and those pills mean something. And the chatbot had no way to be
  asked a question by a screen, so `services/chatbot/askBus.ts` is a one-listener bridge: the widget
  registers on mount, a page calls `askUbuntu(question)`. Deliberately a no-op when no widget is
  mounted rather than a crash.
  **V2-07 Home rebuilt to the planned order** — Hero → Continue → Watch rail → Journey preview →
  Countries → Atlas → Kids/Schools → Archive. The bookshelf **is** the watch rail (the four pillars
  are what the library leads with) and gained "Browse the whole library →". The Journey preview and
  the continent band read from `history-trail.ts` and `anthems.ts`, so the years, the milestone count
  and the 54 flags on the front page cannot drift from the data. **What changed for the worse and why
  it is still right:** Provinces, Presidents, Heroes, Totems and National Days each lost their own
  full-width band. They are rooms *inside* the Atlas hub, and six Atlas bands on one page was the old
  architecture arguing with the new one. They keep a labelled chip row under the single Atlas section,
  so nothing lost its shortcut from Home — but it is a real reduction and Tumo should look at it.
  **V2-11 Archive's Trust sub-nav** — the Heritage Ledger and Sources & provenance now sit at the top
  of the Archive itself, not only in the footer. A room that asks a person for their voice should show
  its own receipts in the same room.
  **V2-12 partly advanced, deliberately NOT ticked.** Added `src/routes.test.ts`: it parses the
  `Route` union, `renderRoute` and `nav.ts` and fails if a route loses its case, if a nav item or
  mobile tab points at a room that does not exist, or if the chatbot's orchestrator cannot open one.
  That closes the "dead nav item" class of regression. It does **not** close the gate — no test here
  can see a layout, and the browser re-walk still needs a human.
  Verified: typecheck clean · **117/117 tests** · web bundle green.

- **2026-08-27** — **Architecture v2: 27 of 31 tasks done — every room in the D1 nav is live and real.**
  **V2-20** the resume bar — and it renders **nothing** until a stage is actually finished. A bar
  reading "Chapter 1 · 0%" on a first visit makes an empty app look like a chore list.
  **V2-28 i18n as a test, not a sweep.** `i18n/ui-coverage.test.ts` walks every `const UI` block in
  every component and fails the build if a string is missing any of the 11 languages, or is an empty
  placeholder in one. It inspects **331 strings across 28 files** and all pass. I negative-tested it
  by deleting one `nr` string: it failed and named the exact file, key and language. Content is
  deliberately **out of scope** — a scene carries English plus what has actually been reviewed, and
  forcing 11 languages onto it would invite the fabrication the project forbids.
  **V2-29 a11y.** Every `Pressable` in every v2 room now carries a label and a role; 13 were missing.
  **Known gap, stated plainly:** 25 `Pressable`s in **pre-existing** screens (ArchiveScreen,
  CinematicReader, ConsentSheet, LanguagePicker, ProvincesScreens, SideIndexScroll, ArticleReader,
  HeritageLedgerScreen, ChatbotWidget, CountryPicker) still lack labels. Retrofitting them is real
  work on working code and was **not** in the v2 scope — it should be its own task, not smuggled in.
  **V2-30 POPIA** — reviewed and written up in
  [docs/05-popia-compliance.md](docs/05-popia-compliance.md). No v2 surface collects personal
  information; verified mechanically that no `fetch`, Supabase call or upload path exists anywhere in
  the new rooms or the progress store. The only text inputs are two search boxes, which are local
  filter state.
  Verified: typecheck clean · **112/112 tests** · web bundle green.

- **2026-08-26 (late night)** — **Week 3 rooms built: Passport, Kids, Schools (V2-22 → V2-27).**
  `PassportScreen` — level, stars, streak, journey progress, the 27-totem card grid with locked slots,
  country stamps, and a two-step **"Forget everything"** erasure. It deliberately holds no name, no
  photo and no account: a passport is normally the most identifying thing a person carries, and this
  one carries none of it, which is why it can be shown to a child with no consent flow.
  `KidsScreen` + `KidsStageScreen` — real greetings per language, an animal of the day, and a picture
  quiz that asks for the **real totem term** in the reader's own language family (Tau, Nkwe, Kwena),
  so a child learning "Tau is the lion" has learnt something true and sourced. No penalty, no timer.
  The grown-ups gate is a 3-second hold — friction, not security, and the comment says so rather than
  implying a lock that isn't there.
  `SchoolsScreen` — a working dashboard over **seeded demo data**, with the demo banner on screen at
  all times rather than in a footnote. Under D5 the app holds no learner records, so there is nothing
  real to show; a plausible-looking dashboard that didn't say so would be a lie told in UI.
  CAPS alignment is claimed only at **topic level** against the DBE Senior Phase document — no outcome
  codes are invented, and `schools.ts` says outright that any specific code must be read from CAPS itself.
  Deleted `ComingSoon.tsx` — every room is now real, which is what its own comment said to do.

- **2026-08-26 (late)** — **D2 reversed at Tumo's request, and the second sound credit got its face.**
  The hero walk is now confirmed as the **free trailer**: "Start the journey" opens the SA road in
  place, exactly as it always did, no lock and no sign-in. The deeper staged `/journey` page is reached
  from the nav and is where future chapters will be locked. `onStartJourney` stays in `useHomeJourney`
  as a documented escape hatch but is **deliberately unwired** — the comment now says that instead of
  claiming the opposite. Plan §2, §3 and V2-06 updated so the doc no longer contradicts the code.
  Footer: pulled the real **Baobab Roots Collective** channel avatar (the baobab-and-roots mark) and
  bundled it at 160×160 webp to match African Tribe Echoes exactly; the Lucide placeholder is gone.

- **2026-08-26 (late)** — **The core loop is closed: Journey + stages + quiz (V2-16 → V2-19).**
  `JourneyScreen` walks all **25 real milestones** from `history-trail.ts` rather than the source
  design's twelve invented chapters — sourced history costs nothing extra and is better history.
  A stage opens when the one before it is done; finished stages stay open, so progress is never taken
  away. `StageScreen` runs wireframe 2e: **WATCH → QUIZ → REWARD**, with a heritage card from
  `totems.ts` assigned in order so a stage always yields the same card.
  **Grounding (V2-17):** 14 questions across 13 milestones in `content/quiz.ts`, each answerable from
  the milestone's own cited note. Two rules hold: a distractor is normally a *real* fact from another
  milestone, so a half-remembered wrong answer is still true; and every question carries an
  explanation shown either way. The one deliberate exception is the "the land was empty" option at
  1652 — the terra nullius myth, offered **only** so choosing it is corrected on the spot. A test pins
  that it can never become the correct answer.
  **D2 is now live:** the hero's "Start the journey" hands off to `/journey` instead of opening its
  in-place overlay; the seam added in V2-06 is wired through `HomeGallery`.
  Verified: typecheck clean · **109/109 tests** · web bundle green.
  **Note on the toolchain:** the typecheck ran >7 min twice today and once reported an error against a
  file version that no longer existed on disk. Treat a single tsc result as suspect if files changed
  under it — re-run before believing it.

- **2026-08-27** — **The Journey is live: V2-16, V2-17, V2-18, V2-19 done. D2 closed.**
  **Quiz (V2-17)** `content/quiz.ts` — 14 questions across 14 milestones, each answerable from that
  milestone's own sourced note. The integrity rule is now **structural, not just intent**: 10 tests in
  `quiz.test.ts` enforce one correct answer, a real milestone link, an explanation, no duplicate
  options — and one test pins the 1652 question so the colonial "empty land" myth can never become the
  correct answer. Wrong options are mostly **real facts from other milestones**, so a wrong guess never
  teaches fiction.
  **Journey (V2-16)** All **25** grounded milestones as stages, not the source design's 12 invented
  chapters — more history, same effort. A stage unlocks when the one before it is done; finished
  stages stay open. Progress bar, stars, cards, level, and the trail's citation at the foot.
  **Stage (V2-18/19)** WATCH → QUIZ → REWARD. Honest about gaps: no film shows the picture and the
  record instead of faking one; no quiz goes straight to the reward instead of inventing a question.
  The reward is a real totem from `content/totems.ts` with its clans, its terms in three language
  groups, and its source shown.
  **D2 closed:** the hero's "Start the journey" now hands off to `/journey` via the `onStartJourney`
  seam left in Week 1. The in-place overlay path is retired.
  **Watch out — typecheck cost is trending badly.** Inlining the stage case in App's route switch made
  tsc walk the now 24-member route union per narrowing and **stop finishing at all** (two 5-minute
  timeouts). Extracting it to a top-level `StageRoute` component fixed it, but the full typecheck is
  now **157s, up from ~7s**. Week 3 adds three more routes. See "Open decisions" — this needs a real
  fix, not another extraction.
  Still open in Week 2: **V2-15** (the WatchItemScreen player page) and **V2-20** (the resume bar).
  Watch cards currently open the existing CinematicReader, which is a real player — the dedicated
  watch page with its provenance panel is still to come.
  Verified: typecheck clean · **109/109 tests** · web bundle green.

- **2026-08-26 (night)** — **Week 2 started: progress store + Watch library. Footer credits changed.**
  **V2-13** `services/progress/` — pure reducers in `progress.ts` (14 unit tests) plus the platform
  split the Archive uses: web persists to localStorage, native is session-only with `persists:false`
  so the Passport can say so honestly rather than implying a guarantee (no AsyncStorage dependency in
  this project yet). Holds **no personal data** — no name, no account, nothing identifying; a test
  asserts the shape's key list so nobody can quietly add an identifying field. Reducers are
  idempotent and never regress: a card cannot be collected twice, a re-watch cannot rewind progress,
  a retaken quiz cannot lower a score, and `normalise()` survives a corrupt stored blob.
  **V2-14** `WatchScreen` — the browsable library, built only from existing modules. The source
  design's Totems / National Days / Nine Provinces chips are **not** offered: in this codebase those
  are Atlas screens, not modules with scenes, so those chips would promise films that do not exist.
  Chips are All / The 4 Great Books / Cultural Atlas, plus search and real "% watched" from the store.
  **Bug I introduced and fixed:** the WatchScreen render first landed in `navigateTo` (the chatbot's
  orchestrator) instead of `renderRoute` — both switches open with the same `case "watch":` line. It
  typechecked cleanly because the orchestrator's return type is loose, so tsc would never have caught
  it; only reading the switch did. Worth remembering when scripting edits against this file.
  **Footer (Tumo's request):** UNISA and Botlhale AI partner plates removed; **tumoolo.tech** added as
  "Built by"; **Baobab Roots Collective** joins African Tribe Echoes under sound credits. Tumo's name
  stays. No avatar is bundled for the new channel, so a Lucide mark stands in — drop a webp into
  `assets/brand/` to swap it.
  Verified: typecheck clean · **99/99 tests** · web bundle green.

- **2026-08-26 (evening)** — **Countries + Atlas hub done (V2-08 → V2-10); branch pushed.**
  `CountriesScreen` carries all 54 nations, searchable, with the national anthems moved out of the
  hero dropdown (D3). `AtlasRooms` gathers Provinces · Presidents · Heroes · Totems · Days under the
  Atlas, which D1 left without a top-level slot; those five screens are untouched.
  **Grounding call:** the source design's per-country "atmosphere" copy (Ghana's kente, Mali's griots,
  Ethiopia's Adwa…) is **not** reproduced — it traces to nothing in this repo. Only South Africa has
  researched content, so only South Africa gets a journey; the other 53 carry an honest
  "not yet researched" note.
  Tumo asked whether the styling followed the source design — it did not, in three ways: the palette
  (D4, deliberate), the invented copy (integrity rule, deliberate), and the cinematic layout, which
  I had dropped **everywhere** including for South Africa. That third one was over-caution, not a
  principle: South Africa has real cached art, a real 12-chapter trail, real provinces. Fixed — the
  live country now gets the full treatment (Ken Burns backdrop from existing art, display name, and a
  "journey ahead" rail built from the **sourced** `history-trail` milestones with the citation shown);
  the other 53 keep the quiet panel. The design is earned by content rather than faked.
  Verified: typecheck clean · 85/85 tests · web bundle green.
  **Repo hygiene fix:** several files had been flipped LF → CRLF by scripted edits, which inflated the
  diff from ~2.2k real changed lines to ~6.2k and would have made the commit unreviewable. Normalised
  back to LF (this repo is LF) before committing. Worth remembering: write files with an explicit
  `newline=''` when scripting edits on Windows.
  Pushed as `feat/architecture-v2` (2 commits).

- **2026-08-26 (later still)** — **The shell is live: V2-01 → V2-04 done.** Tumo picked header
  **direction C, two-tier** from three mockups
  ([artifact](https://claude.ai/code/artifact/5259ecef-c9b6-46b4-bd46-e424feceb344)): tier 1 carries the
  wordmark + country ▾ + language ▾ + Passport chip, tier 2 carries the six D1 nav items, and the
  signature 8px sa-blue rule caps it. Built `shell/nav.ts` (one source of truth for the header, the tab
  bar **and** the chatbot's `navigate_to`, so the three can't drift), `SiteHeader`, `MobileTabBar`
  (4 tabs — Journey · Watch · Atlas · Me), `AppShell` (three modes: page / own-scroll / immersive) and
  `ComingSoon`. Extended the `Route` union with the nine v2 rooms; the country picker moved out of the
  hero into the header and its state is now app-wide (D3 groundwork). Added 7 Lucide icons.
  Unbuilt rooms serve an honest "being built · Week N" placeholder rather than a dead link — the Week 1
  gate says every nav item lands on a real page, and a page pretending to be finished fails it too.
  **Performance trap worth remembering:** writing the shell's route groupings as `Route["name"][]` and
  calling `.includes(route.name)` made tsc walk the whole (now much larger) union on every call — the
  typecheck went from seconds to not finishing in 7 minutes. Rewritten as module-level `Set<string>`
  with the route name widened to `string`; back to seconds. The union-recursion warning already in
  App.tsx now applies to lookups too, and there is a comment there saying so.
  Verified: typecheck clean · **85/85 tests** · `expo export --platform web` green.
  **Needs Tumo's eye:** the nav labels in `shell/nav.ts` are machine-quality across the 10 non-English
  languages — the Setswana especially should be checked (Leeto / Lebelela / Polokelo / Bana / Dikolo).

- **2026-08-26 (later)** — **V2-05 + V2-06 done: hero and footer extracted verbatim.** On branch
  `feat/architecture-v2`. The footer moved to `components/shell/SiteFooter.tsx` and the hero to
  `components/home/HomeHero.tsx`, both **byte-for-byte** — same markup, same styles, same strings (D6).
  One structural note: `JourneyStory` renders `position:absolute` and must stay a **sibling** of the
  ScrollView (inside it, "absolute" would resolve against the scroll *content*, so the full-screen film
  would sit at the top of the page instead of over the viewport). So the hero ships as a hook plus two
  pieces — `useHomeJourney` (shared state) + `HomeHero` (in-scroll) + `HomeJourneyStory` (sibling
  overlay) — which keeps behaviour identical and makes the Week 2 move to `/journey` a contained lift.
  Added the D2 seam: `onStartJourney` is optional and currently unwired, so "Start the journey" still
  opens the in-place overlay exactly as before. Pruned what the move orphaned: 4 imports, 13 UI strings,
  37 styles, 2 constants. `HomeGallery` is **1155 → 772 lines**. Verified: `npm run typecheck` clean ·
  **85/85 tests** · `expo export --platform web` green. **Pre-existing issue found (not caused by this
  work):** bare `npx tsc --noEmit` crashes with a stack overflow on this codebase — confirmed by
  stashing the changes and reproducing on clean `main`. `npm run typecheck` already carries the
  workaround (`node --stack-size=8000`); use that, not bare `tsc`.

- **2026-08-26** — **Architecture v2 planned and started.** Unpacked the three new standalone design
  bundles (Website, Countries, Wireframes 2a–2h) and read them against the live app. Found three
  conflicting navs across the source designs, and that the existing Atlas/Provinces/Presidents/Heroes/
  Totems/Days/Archive/Ledger screens had **no home** in any of them — resolved as **D1**. Confirmed Kids,
  Schools, quizzes, stars/streaks, heritage cards and the Passport are **entirely net-new** (zero code
  today), which is the bulk of the programme. Locked six decisions with Tumo (D1–D6): keep the hero
  SA-road trail and the footer byte-for-byte, move country selection **and the national anthems** to a
  new `/countries` page, keep the black + sa-blue palette rather than the designs' gold/brown, and keep
  all progress **local-only** so no minor's data ever leaves the device. Wrote the 3-week plan
  ([docs/13-architecture-v2-plan.md](docs/13-architecture-v2-plan.md)): 31 tasks, three week gates, a
  fixed de-scope order, and a definition of done. Backlog added as **Phase 5** in
  [specs/tasks.md](specs/tasks.md). Now starting Week 1 (the shell and the split).

- **2026-07-08** — **Journey walk-control fix + phone-mode pass.** Fixed the reported bug: on the guided
  walk, the floating "Keep walking" button sat *under* the caption card and its taps landed on "Play the
  story" instead (worst on phone, where the bottom row of dots crowds the caption). Moved the walk control
  **into the caption card** — `HistoryTrail` is now a `forwardRef` exposing `{ walkNext, restart }` and
  reports walk state via `onWalkChange`; `HomeGallery` renders the button in the caption. Styled the two
  actions distinctly so they're never confused: **Keep walking** = solid gold (primary), **Play the story**
  = outlined gold (secondary); they share one wrapping row so both stay tappable on narrow screens. Also
  **hide the floating chatbot for the whole journey** (not just during a story) so it never crowds the
  caption on a phone. The walker figure stays on the road. Verified: tsc clean · 79/79 tests · `expo export
  --platform web` green (bundles all 3 journey films + 25 dot images). **Phone note:** on mobile *web* the
  walker + films play; on a *native* build they still degrade (inline `<video>` is web-only by design) —
  flag for later if a native demo is needed. **Needs Tumo's eyeball:** open the journey on a phone browser,
  walk a few dots, confirm Keep walking / Play the story both press cleanly.
- **2026-07-08** — **1816 Zulu-kingdom dot — two films in order (ordered playlist support).** Tumo supplied
  two films for the 1816 "big dot": *Margaret Singana — We Are Growing* (the Shaka Zulu series theme) then
  *Shaka Zulu — Epic African Music (Song of Kings)*. Extended the dot-story model to a **playlist**:
  `JourneyMedia.videos?: number[]` (ordered; takes precedence over the single `video`), and `JourneyStory`
  now advances film→film (`onEnded`) and closes after the last; **Back** rewinds to the picture. Both films
  **web-optimized** with ffmpeg — H.264 360p (kept native res), CRF 29, AAC 96k, **`+faststart`** (moov atom
  up front so playback starts while streaming): 13.4MB→12.3MB and 18MB→12.9MB → `assets/journey/1816-we-are-
  growing.mp4` + `1816-song-of-kings.mp4`. So 1816 now plays: picture → We Are Growing → Song of Kings →
  close. tsc clean · 79/79 tests. **Needs an eyeball:** the picture→film1→film2 flow in a browser
  (`npm run web`, open the journey, tap 1816). Other big dots stay picture-only until Tumo adds their films.
- **2026-07-08** — **Big-dot journey pictures — all 24 remaining milestones (Gemini, Tumo-approved gen).**
  Extended the "dot story" treatment beyond 1652 to every **big dot** (the 24 top-level milestones in
  `history-trail.ts`). Added grounded, integrity-safe prompts to `scripts/generate-journey-images.mjs`
  and ran `npm run gen:journey-images` → `assets/journey/y<year>.webp` (24 new, 1652 skipped). Wired each
  into `content/journey-media.ts` as `image` + `imageIsAI:true` with **no film** — `JourneyStory` already
  degrades to picture + description + "Skip" when there's no video, and the "Watch the film" button
  auto-appears once Tumo adds a film per dot (branches/side-road dots deliberately have no media yet).
  **Integrity (humanities rule):** prompts depict the EVENT/SCENE, never a fabricated portrait of a real
  named person (Shaka/Mandela/Biko etc. shown via crowds/landscapes, not faces); Sharpeville + Madiba's
  passing kept sober and non-graphic; all labelled "Artistic interpretation" in the UI. Spot-checked the
  sensitive ones — Sharpeville (dropped passbooks + a lone shoe, no bodies), 1976 Soweto, 1955 Kliptown,
  1994 voting queue, 2013 mourning wall all read clearly South African + dignified; **1990 first came out
  European, regenerated with a Grand Parade / Table Mountain anchor** → now correct. tsc clean · 79/79
  tests. **Needs Tumo:** eyeball the 24 as a set (his call to keep/redo any); films land per-dot later.
- **2026-07-08** — **UI chrome finished in all 11 languages (in-session, no API).** Closed the last gaps
  in the fully-multilingual interface without the Gemini/Claude generation script — translated directly
  this session and wrote the strings into the inline `t({...})` chrome objects. Audit found most of the
  app was already all-11 (Reader, ConsentSheet, LanguagePicker, chatbot, Provinces, Presidents, Atlas,
  Totems, Archive were done); only **~39 chrome objects across 6 files** still had EN(+TSW)-only:
  **HeroesScreens** (16), **ArticleReader** (10), **HomeGallery** (7: heroes block, journey hint/title,
  daysSub), **NationalDays** (intro, mediaSoon, notHoliday), **HeritageLedger** (cid/hash labels),
  **CountryPicker** (moreSoon). All six now balance (en count == ve count per file). These are INTERFACE
  labels only — literary/heritage **content** stays honest EN-fallback / labelled drafts (integrity rule
  intact; scope confirmed with Tumo). tsc clean · **79/79 tests**. **Needs Tumo:** the `tn` Setswana was
  already authored; the 9 new languages are machine-quality chrome (af/zu/xh/nso/st/ss/ts/nr/ve) — a
  native-speaker eye welcome but not blocking, since chrome is explicitly best-effort.
- **2026-07-08** — **Interactive walking journey + "dot stories" on the home timeline.** Turned the
  history trail into a guided walk. (1) **Walker** — Tumo's Groovy walk-cycle, keyed white→transparent
  (VP9 alpha `assets/journey/walk.webm`), strolls the **main road** big-dot → big-dot along the real
  Catmull-Rom curve (reusing `HistoryTrail`'s `segAt`), facing the way it travels, stopping at each dot
  with its description + a **"Keep walking"** control (localized). (2) **Dot stories** — starting the
  journey opens a **full-screen story for 1652**: a picture first, then a film, with **Skip** (→ back to
  the walk) and **Back** (film → picture); a **"Play the story"** button re-opens it. `JourneyStory.tsx`
  + `content/journey-media.ts` (per-milestone media map). (3) **1652 picture** — the ONE Gemini image
  Tumo approved (`npm run gen:journey-images`, `assets/journey/y1652.webp`): Table Bay, VOC ships + fort
  **and** Khoekhoe herders in the foreground — honest, dignified, labelled "Artistic interpretation".
  **No other Gemini use.** (4) **1652 film** — Tumo's *They Came With Chains* compressed 39MB→7.3MB @720p
  (`assets/journey/1652.mp4`); streams on demand. Chatbot hides while a story plays. `metro.config.js`
  now bundles `.webm`/`.mp4`. **Only 1652 has media**; other dots show text until Tumo adds theirs.
  tsc clean · 79/79 tests · verified live (walker walks + faces correctly; story picture→film→skip).
  **Next:** branch turn-choices (keep walking vs turn to a side-road); more dots' media as Tumo sends them.

- **2026-07-08** — **Chatbot memory + home scroll cues + nav-matcher fix.** (1) **Conversation memory** —
  `services/chatbot/memory.ts`: device-local ONLY (web = localStorage, survives refresh; native = session),
  never uploaded (POPIA); the panel restores the prior chat on open and passes the last ~10 turns to Claude
  so it remembers context. Added a **"new chat" (↺) erase** button in the panel header — real erasure of the
  stored transcript. Verified live: sent a message → full page reload → conversation restored from
  localStorage. (2) **Scroll affordances on HomeGallery** — a bouncing **scroll-down chevron** on the right
  edge near the top, swapping to a **back-to-top arrow** near the bottom (both clear of the bottom-right
  chatbot); localized labels (`scrollDown`/`backToTop`). Verified live at top + bottom. (3) **Nav-matcher
  fix** — `matchNavigation` no longer hijacks short questions that name a page ("Who was Sol Plaatje?" is
  now answered, not navigated); unless an explicit "take me to" trigger is present. tsc clean · **79/79 tests**.
- **2026-07-07** — **Language (Claude drafts) + "Ask Ubuntu" chatbot (LangChain).** Two features toward
  the strict-scorecard gaps (Accessibility 12→ and a demonstrable AI wrapper). (1) **Claude translation
  pipeline** — new `scripts/generate-claude-translations.mjs` (`npm run gen:claude-drafts`) drafts every
  literary scene (title/adult/child) of the 4 pillars into the **9 not-yet-reviewed** SA languages using
  **Claude** (Anthropic SDK, model `claude-opus-4-8`, structured JSON output, resumable), guided by the
  human-reviewed Setswana as a register reference. Writes the existing `src/content/drafts.data.ts` that
  the Reader already renders + labels "machine translation — unreviewed" (integrity rule intact — no
  fabricated authority). **Gated on `ANTHROPIC_API_KEY` (build-time only)** to actually run. (2) **"Ask
  Ubuntu" chatbot** — `src/services/chatbot/` (knowledge base built ONLY from the app's own grounded
  content; pure retriever + nav-intent matcher w/ 8 unit tests; **LangChain `ChatAnthropic`** agent with
  a bound `navigate_to` orchestrator tool). Answers strictly from site content (RAG + no-invention system
  prompt); the orchestrator ("take me to the provinces") + retrieval answers work with **zero key**, and
  upgrade to full conversation on `EXPO_PUBLIC_ANTHROPIC_API_KEY`. Floating widget wired app-wide in
  `App.tsx` via a page→route resolver. **Chatbot chrome localized in all 11 languages** (`services/
  chatbot/uiStrings.ts` via `t()`; verified live switching the picker to isiZulu — header, greeting,
  chips, offline note, placeholder all switch); the LLM answer path is also told to **reply in the
  picked language** (grounded in EN site context). Installed `@anthropic-ai/sdk` + `@langchain/anthropic` +
  `@langchain/core`. **tsc clean · 77/77 tests · `expo export --platform web` green** (LangChain bundles;
  index 4.4MB). **Awaiting Tumo:** paste an Anthropic key into `app/.env` (both `ANTHROPIC_API_KEY` and
  `EXPO_PUBLIC_ANTHROPIC_API_KEY`, same value ok — see `.env.example`) → then run generation + live-drive
  the chatbot. Optional: `EXPO_PUBLIC_CHATBOT_MODEL` / `TRANSLATE_MODEL=claude-haiku-4-5` for a faster,
  cheaper path. **Update (same day):** localized the chatbot chrome in all 11 languages
  (`services/chatbot/uiStrings.ts`; verified live in isiZulu) + LLM replies in the picked language.
  Then **moved the chatbot off LangChain to the Anthropic SDK** — LangChain's `langsmith` dep
  TDZ-crashes the Expo *web dev server* under Fast Refresh (`Cannot access 'Client' before init`);
  production export was fine, but `expo start --web` white-screened. Same agent design (Claude tool-use
  + `navigate_to` + RAG), now runs in **dev AND prod**; uninstalled `@langchain/*`. Verified the dev
  server renders + the widget mounts with **zero runtime exceptions** (headless check). tsc clean · 77/77.
- **2026-07-06** — **Totems story — cinematic slideshow with per-animal sound.** Added a "Play the story"
  Journey on the Totems screen: all 22 animals, each showing the photo + name + a grounded one-line
  meaning while **its sound plays**. Extended the shared `Journey` (per-slide `sound`/`title`; the music
  bed is muted while slide sounds play) and added `totemsJourney`. **Sounds:** curated recordings from
  Tumo (`design/Animals sounds/`) imported + **web-optimized** via ffmpeg (`npm run import:sounds` →
  mono, capped ~6s with fade, ~96kbps → ~50–71KB each); the one animal with no curated file (duiker)
  keeps its **ElevenLabs**-generated sound (`npm run gen:sounds`, build-time only, key in gitignored
  `.env`). Runtime plays the **bundled** mp3s — the API is never called live. Sounds labelled honestly
  ("Real photos · AI-generated sounds"). `tsc` clean · tests pass · web export green.
- **2026-07-05** — **Totems & Clans — new Cultural Atlas compendium (grounded).** Added a full "Totems &
  Clans" screen (`TotemsScreen.tsx` + `content/totems.ts`) on the shared sidebar layout: the
  zoo-cosmological system of Southern African totemism — 22 animal totems (Sotho-Tswana / Nguni /
  Tshivenḓa terms, clans, meaning, oral genesis stories), two opening essays (ontology; lineage fission)
  and three governance lessons (conservation-by-distributed-taboo; kinship/hospitality; exogamy).
  **Grounding:** grokipedia dropped per the project's integrity rule; claims cited to reputable sources
  (National Museum Publications, BeingAfrican, SAHO, Wikipedia, Barolong official site, EcoTraining, MSU,
  Bennett, Noyam, U. Bologna, SA Tourism); oral origins framed as tradition. Home entry + route wired;
  11-language chrome. **Images:** 22 real photos → `assets/animals/*.webp` (52.6MB→6.3MB, 88% smaller);
  each shown at uniform width + its own natural height (measured on load) so nothing is cropped; cards
  laid out image-left / text-right on wide. **Shared UI:** the sidebar back link now sits atop the
  CONTENTS index on every index page (Atlas/Provinces/Presidents/Days/Totems) via `SideIndexScroll`
  `onBack` + `ScreenHeader` `showBack`. `tsc` clean · **66/66 tests** · web export green · ran locally &
  reviewed. **Needs Tumo:** Setswana + cultural review of the totems text (English-fallback for now).
- **2026-07-05** — **Mantswe a Batho pure core (Living Archive step 4, buildable half).** Built the
  no-key, testable heart of the oral-history consensus feature in `src/services/mantswe/`:
  **de-identify** (POPIA deterministic belt — strips SA phone/ID/email by regex, keeps historical
  names/places as content; reports types+counts, never the removed values) and **consensus**
  (`aggregate()` tallies claims across testimonies, links each back to its supporters, sorts most-voices
  first — it COUNTS and never crowns a winner; contradictions coexist). `withdraw()` + re-`aggregate()`
  implement the POPIA lifecycle: the aggregate is derived, so erasing a testimony recomputes it and its
  unique detail vanishes. 8 golden tests incl. **delete-recomputes**. `tsc` clean · **66/66 tests** ·
  web export green (services only, UI unaffected). **Gated on keys:** the Mantswe screen, Lelapa
  transcription, Gemini claim-extraction/redaction, and Supabase storage — the pure core is ready to
  wire the moment keys land.
- **2026-07-05** — **Ingestion Library v1 infra (Living Archive step 3).** Built `npm run ingest` — the
  build-time CLI that turns a rights-cleared public-domain plain-text book into a **draft literary
  `Module`** in the app's exact shape, grounded in and citing the source. Pure, golden-fixture-tested
  core in `src/services/ingest/`: **rights** (SA life+50 gate — v1 ingests only public-domain/licensed,
  blocks unverified), **extract** (strip Project Gutenberg boilerplate, de-hyphenate line breaks,
  normalise), **segment** (chapter detection), **draft** (one anchored scene stub per chapter; adult/
  child text emitted as `[NEEDS ADAPTATION]` behind the human-review gate — no fact invented). CLI
  writes `src/content/sources/<id>/` → `source.txt` (verbatim), `draft-module.json`, `review.md`
  (checklist). Verified end-to-end on a Gutenberg-format fixture (boilerplate stripped, `govern-\nment`
  → `government`, 2 chapters, anchored sourceNotes). `tsc` clean · **58/58 tests** (+11). Deferred:
  PDF/OCR extraction, the Gemini adapt→scenes stage (needs key). **Needs Tumo:** pick the first
  public-domain title to ingest for real.
- **2026-07-05** — **Living Archive plan + device-persistent recordings (Living Archive step 2).**
  Wrote [docs/12-living-archive-plan.md](docs/12-living-archive-plan.md) — the crowdsourced,
  AI-synthesised archive: **Mantswe a Batho** ("Voices of the People", oral history + AI consensus that
  *surfaces* agreement/divergence and never adjudicates), the **Ingestion Library** (public-domain books
  → draft `Module`s, cited), and a footer **"Built with"** row (locked to *official logo images*). 4 decisions locked. **Footer step
  1 (Solana):** sourced the official Solana horizontal logotype (`solana.com/branding`), converted it to
  `assets/brand/solana.webp` (transparent), and added a **"Built with"** row to the HomeGallery footer —
  distinct from "In partnership with", light logotype on the navy ground (Solana's high-contrast
  guideline), links to solana.com. Supabase/Lelapa/Expo marks deferred until those land. Then shipped
  **step 2**: recordings now
  persist device-locally via a platform-split store (`src/services/archive/`) — **web = durable
  IndexedDB** (audio Blob survives a refresh; delete is real erasure of the bytes), **native = in-session**
  fallback (WatermelonDB is still T024, now honestly flagged `persists:false`). Playback resolves a fresh
  object URL from the store, so it works after reload (the old `blob:` URL is dead). Pure list helpers
  unit-tested (7 new). `tsc` clean · **47/47 tests** · `expo export --platform web` green. **Needs an
  eyeball:** the mic-gated record→refresh→play→delete loop in a real browser (can't be automated here).
- **2026-07-03** — **In-app Lucide icons + UI audit/alignment + tsc fix.** Installed `lucide-react-native`
  + `react-native-svg`; replaced **all emoji/unicode glyphs** across the app (Home, Reader, Archive,
  Consent, Heritage, LanguagePicker, Provinces, Presidents) with a central `ui/Icon` set — mic, chevrons,
  lock, users, play, square, volume, trash, check, clock, arrow-up-right, sparkles, link2. **Alignment
  audit:** wrapped text-badges in `View` (province count, Est., stat pills) for clean centering, put all
  icon+label buttons in `flexDirection:row + gap` rows, swapped baseline-inconsistent `‹ › ▾ ● ✦` glyphs
  for centered SVGs. **Fixed a tsc stack-overflow**: lucide's ~1,500-icon barrel overflowed the type
  checker — `ui/Icon.tsx` now loads lucide via `require()` typed to a tiny local `IconProps`, so tsc
  never walks the barrel (runtime identical). Also refactored `App.tsx`'s route ternary → flat switch.
  `tsc` clean (stable across repeated runs) · **32/32 tests** · `expo export --platform web` green.
- **2026-07-03** — **B&W redesign lab + new features + app port (in progress).** In `design/` (throwaway
  lab, `index.html`) redesigned the whole app to a **pure black & white + gold-for-emphasis** system,
  zebra-inspired: black ground, white type, **colour photos**, gold/orange only on what matters
  (mission line, authors, primary actions). 10 lab screens (Launch, Home, Reader, Archive+consent,
  Heritage, Provinces grid/province/city, Presidents overview/detail). Added two grounded features:
  **Provinces → City history** (`design/provinces-content.md`) and **The Presidents** incl. **pre-1994
  heads of state** honestly framed (`design/presidents-content.md`) — all cited/flagged, controversies
  neither sanitised nor sensationalised. All lab icons are **Lucide** (Emma's rule). **App port started
  (staged, verified):** ✅ Launch (zebra + "UBUNTU HERITAGE" wordmark, `assets/brand/launch-bg.jpg`) ·
  ✅ Home (B&W + gold, colour photos, logo→wordmark). tsc clean · tests pass · web export green.
  **Port COMPLETE (all stages):** ✅ 1c — Reader/Archive/Heritage/About/ConsentSheet/LanguagePicker +
  the UI kit (Screen/Type/Card/ScreenHeader) all → B&W + gold, colour photos; cross-platform (pure RN
  StyleSheet, no web-only CSS). ✅ 2 — **Provinces feature** in-app (`content/provinces.ts` +
  `ProvincesScreens.tsx`: grid → province → city; 3 provinces, flagship cities, real colour photos in
  `assets/places/`; stats flagged cited/verify) + Home entry + nav. ✅ 3 — **Presidents feature**
  (`content/presidents.ts` + `PresidentsScreens.tsx`: overview with democratic-5 gold + pre-1994 grey,
  full detail w/ life timeline/family/quote/sources) + Home entry + nav. `tsc` clean · **32/32 tests** ·
  `expo export --platform web` green. **Pending Emma:** verify the ‘to verify’ stats (StatsSA/DBE);
  Setswana translations for the new features; optional in-app Lucide icons (emoji still in a few spots).
- **2026-07-03** — **Rebrand: Maloba → Ubuntu Heritage (product UI + logo).** Emma supplied a new emblem
  (sunburst of ndebele-patterned petals + rising sun over Table Mountain, rising from an open book) and
  chose to rename the app **Maloba → "Ubuntu Heritage · South Africa."** Scope this pass = **product UI +
  logo only** (docs/specs/narrative deferred; on-chain memos are immutable and keep the historical name).
  Done: logo added at `app/assets/brand/logo.png` (downscaled 6.8MB→1.5MB); **LaunchScreen** now shows the
  real logo on a warm-brown ground; **Home masthead** shows the logo on a gold-framed plate; renamed
  `app.json` name, About intro, and the Vilakazi content self-reference. **Kept** the Setswana tagline
  *Mantswe a maloba* ("voices of yesterday" — poetry, not the brand) and the `localize.test` "Maloba"=
  yesterday fixture. Design lab (`design/`) fully rebranded incl. a new **00·Launch** screen; all lab
  icons converted **emoji → Lucide** (Emma's standing rule). Verified: `tsc` clean · **32/32 tests** ·
  `expo export --platform web` green. **Deferred (needs go-ahead):** rename in docs, README, specs, and
  the judged `concept-submission.md`; a transparent-background emblem for non-plated placements.
- **2026-07-03** — **UI redesign pass (design lab → ported to app).** Built a throwaway `design/`
  sandbox (`index.html`) mocking the whole journey — Home, Reader, Archive+POPIA consent, Heritage
  Ledger — in a "cinematic editorial archive" direction on the locked brand palette. Emma-facing;
  delete the folder when done. **Ported the Home refinements into the real app:** added a **literary
  serif voice** (Playfair Display — already installed; now loaded in `App.tsx` + `fonts.serif/serifSemi/
  serifItalic` tokens) for work titles, blurbs and taglines; rebuilt the **Cultural Atlas as a 2-up
  image grid** (`AtlasChip`) instead of list rows; serif Reader scene title + Heritage work titles; a
  **live green status dot** on the on-chain Heritage Ledger button. Verified: `tsc` clean · **32/32
  tests** · `expo export --platform web` green (Playfair weights bundle). Remaining lab screens
  (Reader/Archive/Heritage full treatment) can follow once Emma signs off on the look.
- **2026-07-03** — **Submission-package + Atlas visual parity.** (1) **Atlas hero art:** wired the 3
  Cultural Atlas modules into the Gemini image pipeline and made `gen:images` **idempotent** (skips the
  4 cached literary heroes → no wasted quota; `--force` to regenerate). Generated 3 new cinematic heroes
  (Galeshewe, lobola, first-people) — dignified, no text, no fabricated author portraits; labelled AI
  interpretations. All **7 modules** now have local hero art. (2) **Written narrative** rewritten to
  match the app: folded in the Cultural Atlas (7 modules, not "four pillars"), the on-chain Heritage
  Ledger (described honestly as Solana **devnet** provenance — hashes/citations only, no PII), and a
  re-aligned rubric table + shot list. (3) New **demo-video script** ([specs/demo-video-script.md]) —
  shot-by-shot, ~2:55, web target. (4) New **review handoff** ([specs/emma-review-handoff.md]) — exact
  files/strings needing Emma's Setswana + cultural review, prioritised (3 on-camera strings first).
  Verified: `tsc` clean · **32/32 tests** · `expo export --platform web` green (exit 0, all new image
  `require()`s bundle). **Pending Emma:** record the video; Setswana review; Atlas cultural-accuracy pass.
- **2026-06-29** — Project kicked off. Read hackathon brief + rubric + architectural blueprint PDF +
  FrameFlow reference. Created governance scaffold, docs set, .claude skills, specs, and initialized
  the Expo app with a first cinematic literary module.
- **2026-06-29** — Renamed project **Lentswe → Maloba** ("yesterday"; tagline *Mantswe a maloba*).
  Added two more grounded pillars (*Ityala Lamawele*, *Indaba, My Children*) and a HomeGallery with
  gallery↔reader navigation + app-wide language. tsc + web bundle green.
- **2026-06-29** — Completed the **four pillars** (added Vilakazi), built the **About the Sources**
  screen, and shipped the **Community Archive**: POPIA `ConsentSheet` → record (expo-audio) → list →
  play → rename → delete (erasure). Session-state for now; cloud sync + WatermelonDB are stretch.
  tsc + web bundle green.
- **2026-07-02** — Researched **Botlhale AI** (SA indigenous-language ASR/TTS/translate; enterprise/
  sales-gated, no public free tier — Emma has a direct contact fast-tracking access). Built a
  **pluggable Reader TTS layer** (`app/src/services/tts/`): Botlhale neural voice as primary,
  **on-device `expo-speech` as a free offline fallback** so "Listen" works today and auto-upgrades to
  real Setswana audio when the key lands. Added a 🔊 Listen control to `CinematicReader`. Pure logic
  (lang mapping / request builder / provider select) unit-tested with Node's built-in runner —
  **12/12 pass**; `tsc --noEmit` clean; web bundle green (259 modules). New scripts: `npm test`,
  `npm run typecheck`. Follow-ups: confirm Botlhale endpoint/codes; Emma to review "Reetsa" label.
- **2026-07-02** — Refined the **written narrative** (`specs/concept-submission.md`) to submission
  quality: folded in the read-aloud/narration feature and the African-built-AI framing (Lelapa +
  Botlhale), updated the demo shot list + pre-submission TODO. Grounding preserved (no new facts).
  Drafted the Botlhale-contact request for TTS endpoint/key.
- **2026-07-03** — **Cultural Atlas — humanities depth level-up.** Added 3 grounded, cited modules
  (Unsung Heroes, Marriage Rites, Peopling of SA) from Emma's sourced history document, reusing the
  cinematic Reader (Child/Adult, 11-language framework, Listen). Applied the integrity guardrails:
  cut the genetic-% table, framed contested chronology as debated, dropped grokipedia sourcing, kept
  sensitive customs with context. New Home "Cultural Atlas" section; About screen now credits all 7
  modules; every Atlas entry links to the Community Archive ("record your family's version"). Extended
  `Module` (kind/archivePrompt/optional year). 32/32 tests; tsc clean; bundle green. **Needs Emma's
  Setswana + cultural-accuracy review** (flagged in files).
- **2026-07-02** — **On-chain heritage (Phase A).** Wrote the plan (docs/11) — honest case for
  blockchain (permanence + provenance + ownership), POPIA-safe design (no personal data on-chain,
  hash-anchor + consent only), what to tokenise (provenance cNFTs + custodian badges, never commodify
  heritage). Built `chain/` workspace (@solana/web3.js + ipfs-only-hash): `anchor.mjs` computes real
  SHA-256 + IPFS CID for all 4 canon works and submits a Memo tx (custodial wallet). Fixed the web
  `<Image>` source crash + `shadow*→boxShadow`. Added the in-app **Heritage Ledger** screen + nav +
  "Verify on Solana" links. Cluster = testnet (devnet RPC unreachable here); on-chain txs pending a
  faucet top-up. 32/32 tests; tsc clean; bundle green. `solana-ai-kit` reviewed for Phase B (Anchor
  program + cNFT minting).
- **2026-07-02** — **Consistency system + Gemini images.** Built a reusable **UI kit** (`src/ui/`:
  `Screen`, `ScreenHeader`, `Card`, `Rule`, and `Type` primitives) + a **page-building guide**
  (`src/ui/README.md`) so every screen — and any NEW tab — inherits the brief theme, Anton/Barlow type,
  colours and spacing by construction. Converted About + Archive onto the kit (light cream); modals +
  Reader stay dark-navy with gold accents (rule: orange on cream, gold on navy). Built the **Gemini
  image pipeline**: pure `services/images/gemini.ts` (+tests), offline `npm run gen:images` → cached
  local PNGs + manifest, app resolver auto-uses them (Pollinations fallback). Validated end-to-end
  (`gemini-2.5-flash-image`) and generated the **4 hero images**. 32/32 tests; tsc clean; bundle green
  (415 modules). Gemini key stored build-time-only in gitignored `app/.env`.
- **2026-07-02** — **Re-themed to the AADHIH brief identity** (Emma loved the brief's look): palette
  → deep **navy + burnt orange + gold on warm cream**; fonts → **Anton** (heavy caps display) +
  **Barlow** (body), repointed in `theme/tokens.ts` (all components inherit). Rebuilt **HomeGallery**
  in the light cream theme (Anton masthead, orange rules, featured pillar + numbered index, white cards
  with depth, navy CTA block) and **LaunchScreen** as a navy+orange banner. Tuned Pollinations prompts
  toward warm, dignified real-people photography. Other screens now render dark-navy (coherent) pending
  light conversion. Copied `frontend-design` + `brand-guidelines` skills into `.claude/skills/`.
  Stored the **Gemini key** in gitignored `app/.env` as build-time-only `GEMINI_API_KEY` (NOT
  EXPO_PUBLIC — never bundle a real key to the client; rotate after event). tsc clean; bundle green.
  Next: Gemini image pre-gen pipeline; convert remaining screens to the light theme.
- **2026-07-02** — **Visual polish pass** (all four picked): (1) **Cinematic typography** — Playfair
  Display (brand/titles) + Spectral (reading/UI) via bundled @expo-google-fonts (offline), centralized
  in `theme/tokens.ts` (`fonts`), applied across every component. (2) **Gradients + images** —
  `expo-linear-gradient` scrims (Reader + cards), `SceneImage` moved to `expo-image` (disk cache =
  offline/low-data win) with fade-in + slow Ken Burns on the Reader hero. (3) **Motion** — reusable
  `Motion.tsx` (Fade + PressScale): screen cross-fade on navigation, scene text cross-fade, press-
  scale on cards. (4) **Branded LaunchScreen** — animated "Maloba · Mantswe a maloba" over a dusk
  gradient while fonts load; root bg set to night (`app.json`) so no white flash. tsc clean; 27/27
  tests; web bundle green (410 modules). Note: final app-icon/splash PNG art still a designer asset.
- **2026-07-02** — Built the **machine-draft translation pipeline** (Emma's call: drafts once the
  Botlhale token lands). New `services/translate/botlhale.ts` (`/translate/v2` JSON, tested), resolver
  now 3-state **reviewed / draft / fallback**, drafts store (`content/drafts.ts` + generated
  `drafts.data.ts`), Reader labels drafts "machine translation, unreviewed" and narrates them in-
  language. Ready-to-run `npm run gen:drafts` script pre-generates drafts for the 9 not-yet-reviewed
  languages (gated on `EXPO_PUBLIC_BOTLHALE_API_KEY` + new `EXPO_PUBLIC_BOTLHALE_ORG_ID`). 27/27 tests
  pass; tsc clean; web bundle green (263 modules). [NEEDS from contact: org_id; confirm translate
  field semantics.]
- **2026-07-02** — Expanded to **all 11 official SA languages** as a data-driven framework: new
  `src/i18n/` (registry with endonyms + BCP-47 + Botlhale codes; `t`/`resolveText` with honest English
  fallback), widened `Lang` to 11 codes, `LocalizedText` non-EN fields now optional. Replaced the
  EN/TSW toggle with a **LanguagePicker** (all 11 by native name) in the gallery + Reader; migrated all
  47 string sites to `t()`. Reader shows a fallback badge + narrates in the *shown* language. TTS now
  covers all 11 (Botlhale primary + device fallback). Folded the old `tts/lang.ts` into the registry.
  **Honest state:** framework is all-11; human-reviewed *story text* is EN + Setswana — the other 9
  show English text (clearly labelled) until real translations land. 21/21 tests pass; tsc clean; web
  bundle green (262 modules). [NEEDS: confirm Botlhale codes for nr/ss/ve with contact.]
- **2026-07-02** — Researched Botlhale's public API docs and **wired the real TTS contract**:
  `POST api.botlhale.xyz/tts`, form-encoded (`text_msg`, `language_code`), Bearer token, JSON
  `audio_url` response; corrected Setswana code to `tn-ZA`. Updated `botlhale.ts`/`lang.ts`/tests +
  `.env.example`. 13/13 tests pass; tsc clean. 3 unknowns left for the contact (field name, host,
  token flow). **Next: lock demo target (web vs Expo Go).**
