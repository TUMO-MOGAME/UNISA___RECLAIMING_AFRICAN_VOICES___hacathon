# 10 — Status & Roadmap (what's built, what's planned)

This is the single honest source of truth for **what actually runs today**, **what is built but waits on
a key**, and **what is deliberately deferred for time** but planned. It exists so nothing in the
narrative or the demo overclaims — the integrity rule (*truth only*) applies to our own status too.

> Legend: **✅ Live** (works now, no key) · **🔑 Built, needs a key** (wired; degrades gracefully until a
> key is added) · **⏳ Planned** (designed/partly built; deferred for time).

---

## 1. What we're building (one paragraph)

**Ubuntu Heritage** is a cinematic, multilingual, offline-first Expo app that reclaims South Africa's
foundational indigenous literature and heritage: it reads four canonical texts as dual-mode
(Child/Adult) illustrated scenes, maps the heritage around them in a cited Cultural Atlas and a walkable
history Journey, lets communities record and **own** their own oral histories under POPIA consent, and
notarises the public-domain canon on a public blockchain. Humanities first; technology subordinate.

## 2. How we approached it

- **Humanities-led.** Every feature traces to a text, a custom, or a community need — not to a piece of
  tech we wanted to show off.
- **Grounded.** Real sources, per-scene citations, contested history framed as contested. AI images and
  machine translations are **always labelled**.
- **Free-tier + offline-first.** Zero monthly cost; reading and the Journey work offline; images cached.
- **Data, not hardcode.** Content and languages are data (`app/src/content`, `app/src/i18n`), so adding
  a text or a language never touches app logic.
- **Honest degradation.** Key-gated features fall back to a working state and tell the user.

---

## 3. Implemented — ✅ live now (no key required)

**Reading & literature**
- ✅ Cinematic **Reader** for all four pillars — full-bleed AI image + scrim + overlaid text, a real
  page-turn book, ambient soundtrack, **Child/Adult** toggle, scene navigation.
- ✅ **Listen** (read-aloud) via on-device speech (`expo-speech`) — works offline in every language.
- ✅ **11-language UI** — the whole interface switches across all official SA languages.
- ✅ **Machine-draft literary translations** for the 4 pillars in the 9 not-yet-reviewed languages,
  rendered **labelled "unreviewed"** (EN + Setswana are human-reviewed).

**Heritage & history**
- ✅ **Cultural Atlas** — Unsung Heroes, Rites of Passage (Marriage), Peopling of SA.
- ✅ **Totems & Clans** — 22 animal totems with real photos + curated sounds.
- ✅ **The Nine Provinces** (grid → province → city history).
- ✅ **The Presidents** (incl. pre-1994 heads of state, framed honestly).
- ✅ **Heroes & Heroines** (searchable roll).
- ✅ **National Days** (calendar order; poem + "Perspectives" article reader).
- ✅ **The Journey** — a walkable 1652→today timeline: a walking character, 25 grounded big-dot
  pictures (AI, labelled), full-screen "dot stories," and films where supplied (1652; 1816 plays two).

**Community, provenance, guide**
- ✅ **Community Archive** — POPIA consent → record → play → **delete (real erasure)**; audio survives a
  refresh via durable IndexedDB.
- ✅ **Community cloud sharing — LIVE online.** "Share to community" uploads the audio to Supabase behind
  **anonymous auth + hCaptcha**, inserts a public row under **Row-Level Security**, and it appears in a
  **community feed** anyone can stream (signed URLs); deleting syncs erasure to the cloud (row + object).
  Verified end-to-end on the deployed site (DB row + readable audio confirmed).
- ✅ **Heritage Ledger** — the canon is notarised **live on Solana devnet** (real memo tx + IPFS CIDs +
  SHA-256); in-app "Verify on Solana" links.
- ✅ **"Ask Ubuntu"** guide — deterministic navigation ("take me to the provinces") + **conversational,
  grounded answers via Google Gemini** (falls back to grounded snippets with no key); chrome + replies
  localized across all 11 languages.

**Engineering**
- ✅ `tsc` clean · **85 pure-logic unit tests** · `expo export --platform web` green · low-data reading ·
  cached images · deployed on Vercel + a custom domain.

---

## 4. Built but needs a key — 🔑 (activates on adding a key)

| Feature | What's built | Key needed |
|---|---|---|
| **Indigenous neural voice** (Listen upgrades from on-device to Botlhale) | `services/tts/botlhale.ts` — real API contract wired | `EXPO_PUBLIC_BOTLHALE_API_KEY` |
| **Automatic transcription** of shared recordings (Lelapa/Vulavula, code-switching) | service layer + Mantswe pure core | Lelapa key |
| **Chatbot on Claude instead of Gemini** (optional swap) | Anthropic SDK agent w/ `navigate_to` tool | `EXPO_PUBLIC_ANTHROPIC_API_KEY` |

The app runs fully without these; each simply upgrades or swaps an already-working path.
(Community cloud sharing and the Gemini chatbot are now **live** — see section 3.)

---

## 5. Deferred for time — ⏳ planned next

- ⏳ **Native offline persistence** (WatermelonDB): web recordings persist via IndexedDB today; on native
  (Expo Go) they're session-only. Next: WatermelonDB so native survives reload + syncs.
- ⏳ **Native inline video** for the Journey films (currently web-only `<video>`; native shows the
  picture + description). Wire `expo-video` for native playback.
- ⏳ **Deeper per-text engagement** — each pillar currently has ~2 scenes; expand to more scenes per text
  before adding new sections (depth over breadth).
- ⏳ **Human review of the 9-language literary drafts** (Tumo, native speakers) → promote reviewed
  languages to `reviewedContent: true`.
- ⏳ **Automatic transcription of shared recordings** (Lelapa/Vulavula) — the cloud archive is live;
  next, transcribe each shared clip in its own language (code-switching aware) for search + captions.
- ⏳ **Mantswe a Batho** (oral-history AI consensus that surfaces agreement/divergence, never adjudicates)
  — pure de-identify + aggregate core is built and tested; UI + Lelapa/Gemini/Supabase wiring pending.
- ⏳ **Ingestion Library** — `npm run ingest` turns a rights-cleared public-domain book into a draft
  module; the Gemini adapt→scenes stage needs a key.
- ⏳ **ElevenLabs static cinematic intro narration** (quota-protected, build-time).
- ⏳ **Certificate NFT minting** (Metaplex named NFTs to Phantom) — Heritage Ledger Phase B.
- ⏳ **The 2–3 minute demo video** — to be recorded to `specs/demo-video-script.md`.

---

## 6. Known limitations (stated plainly)

- The **demo video** is not yet recorded — a required submission deliverable.
- The 9-language literary translations are **unreviewed machine drafts** (labelled as such).
- The **community loop** (transcribe → share → aggregate) is **local-only** until Supabase + Lelapa keys
  are added; today it's a consent-gated personal recorder with real erasure.
- Indigenous-language **Listen** uses a generic on-device engine (mispronunciation risk) until the
  Botlhale key lands.
- On a **native** build, the Journey walker and films degrade to placeholders/stills (web is the demo
  target and is fully featured).

---

## 7. Roadmap after the hackathon

1. Turn on the African-AI loop (Botlhale voice + Lelapa transcription + Supabase sharing) so Community
   Impact is *demonstrated*, not conceptual.
2. Native parity (WatermelonDB persistence + `expo-video`).
3. Depth pass on the four pillars; native-speaker review of translations.
4. Ship Mantswe a Batho + the Ingestion Library so the archive grows itself.
5. Heritage Ledger Phase B (named certificate NFTs).

_See [STATUS.md](../STATUS.md) for the running change log, and
[06-judging-criteria.md](06-judging-criteria.md) for how each of these maps to the rubric._
