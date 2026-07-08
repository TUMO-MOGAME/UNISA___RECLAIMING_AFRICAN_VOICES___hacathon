# STATUS — Maloba live board

> Source of truth for "what's going on right now." Read first, update last. Treat updating it as part
> of "done."

_Last updated: 2026-07-07 — by Tumo (via Claude)_

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

## ⏭️ Next action

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
3. When keys arrive: `services/gemini.ts` (T017) · Supabase + RLS upload (T027) · Lelapa transcribe (T028).
   **Botlhale TTS:** contract now wired from their public docs — `POST api.botlhale.xyz/tts`,
   form-encoded `text_msg`+`language_code`, Bearer token, returns `audio_url`; Setswana = `tn-ZA`.
   Paste a Bearer token into `app/.env` (`EXPO_PUBLIC_BOTLHALE_API_KEY`) → Listen auto-upgrades to real
   Setswana audio. **3 residual unknowns for the contact** (marked in `botlhale.ts`): (a) field name
   `text` vs `text_msg`; (b) dev vs prod host; (c) refresh_token→IdToken flow (using a ready token for
   the demo).
4. Persistence: WatermelonDB so recordings survive reload (T024). Optional: NativeWind (T006).
5. Phase 3: ElevenLabs static intro · record the 2–3 min demo video · finalise the written narrative.

## 🗓️ Timeline (today: 2026-06-29)

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
