# Ubuntu Heritage — Submission Documentation

*Reclaiming African Voices · AADHIH (UNISA · BaobabX Academy)*
*Created by Tumo Olorato Mogame*

**Live:** https://ubuntuheritage.tumomogame.co.za · https://unisa-reclaiming-african-voices-hac.vercel.app
**Tagline:** *Mantswe a Maloba* — "Voices of Yesterday"

---

## 1. Type of Tool or Platform

**Ubuntu Heritage is a multilingual, cinematic digital-humanities platform** that combines four tool
types in one offline-capable app (a single Expo/React Native codebase → web + Android + iOS):

- **Interactive storytelling platform** — a cinematic "graphic-novel" reader that turns four
  foundational South African texts into illustrated, dual-mode (Child/Adult), read-aloud scenes.
- **Community oral-history archive** — a POPIA-compliant recorder where people capture, own, share
  and erase their own family histories; shared recordings sync to a live community feed.
- **Cultural & historical atlas + interactive timeline** — grounded, cited "map" of the heritage
  around the texts (heroes, customs, peoples, provinces, presidents, national days), plus a walkable
  1652 → today history Journey.
- **Creative / AI project** — cinematic AI-generated scene imagery and an "Ask Ubuntu" conversational
  guide, all built on a free-tier stack, with a blockchain **Heritage Ledger** for provenance.

**In one line:** *a storytelling platform + community archive + cultural atlas that reclaims South
Africa's foundational literature and heritage — and lets ordinary people become its authors.*

---

## 2. Methods & Approaches Used

**Humanities-first design.** Every feature traces back to a text, a custom, or a community need — not
to a technology we wanted to show off. Technology is deliberately kept *subordinate* to the humanities.

**Grounding & integrity ("truth only — no invented heritage").** Every historical claim traces to a
real source (the literature itself or cited references), surfaced as per-scene source notes and an
"About the Sources" screen. Contested history is presented *as contested*, never flattened into a
single official story. All AI-generated images and machine translations are **explicitly labelled** so
nothing machine-made is passed off as authoritative.

**Content-as-data architecture.** Texts, atlas entries, and all 11 languages live as structured data,
not hard-coded UI. Adding a new text or language is a data edit, never an app rewrite — which is what
makes the platform extensible and maintainable.

**Multilingual by construction.** The entire interface switches across all 11 official South African
languages. Literary content is **human-reviewed in English and Setswana**; the other nine are provided
as **machine-draft translations, clearly labelled "unreviewed,"** pending native-speaker review.

**Accessibility & connectivity-aware.** Built low-data and offline-capable: the reading core (text,
cached images, on-device narration) keeps working on poor or intermittent connections and cheap
Android phones. Dual Child/Adult reading levels, large tap targets, high contrast, scalable text.

**AI pipeline (free-tier, quota-safe).**
- *Cinematic imagery* — Google Gemini (pre-generated and cached as local assets) with a keyless
  Pollinations.ai fallback; images are dignified artistic interpretations, never fake photos of real
  named people.
- *Conversational guide ("Ask Ubuntu")* — a **retrieval-augmented (RAG)** assistant that answers
  **only from the site's own grounded content**; navigation is resolved deterministically (works with
  no key), and conversational replies use **Google Gemini** (grounded, truth-only prompt, replies in
  the chosen language), with a graceful key-free fallback to grounded snippets.
- *African-built AI (indigenous-first)* — wired to **Lelapa AI / Vulavula** (indigenous
  transcription/translation) and **Botlhale AI** (indigenous-language speech), so the tools that
  reclaim African voices are themselves African.

**Ethical data practice (POPIA by design).** A person's voice is personal information. Recording is
gated behind an explicit **consent** step; recordings are **private by default**, and the user can
**delete** them at any time (real erasure — bytes removed, on device and in the cloud). Cloud sharing
is protected by **Supabase Row-Level Security + anonymous authentication + hCaptcha**: private
recordings are readable by no one but their owner; only recordings the user chooses to share become
public.

**Verifiable provenance (blockchain, POPIA-safe).** The public-domain canon is notarised on a public
blockchain (Solana devnet) — content hashes (SHA-256) + IPFS references + citations only, **never any
personal data** — so the record of what these works are and where they come from is permanent and
independently verifiable.

**Sustainability.** The whole stack runs on **free-tier infrastructure at zero monthly cost**, so the
platform can outlive the hackathon as a living, community-owned resource.

**Engineering discipline.** Pure logic is unit-tested (85 tests under Node's test runner); the web
build is verified green (`expo export`); the app is deployed on Vercel and a custom domain. The cloud
community archive was verified **end-to-end on the live site** (a shared recording confirmed present
in the database with readable audio).

**What is deferred (time-boxed, planned next).** Native-build offline persistence (WatermelonDB) and
inline film playback (web works today); deeper per-text scene coverage; native-speaker review to
promote the nine machine-draft languages; live Lelapa transcription and Botlhale neural voices (wired,
key-gated); "Mantswe a Batho," an oral-history *consensus* layer that surfaces agreement/divergence
without adjudicating; an Ingestion Library that turns public-domain books into cited modules; and
named heritage-certificate NFTs as a Phase-B extension of the ledger.

---

## 3. Images & Screenshots

> Capture each screen from the live site and paste it under the matching caption. Recommended: 1280px
> wide, PNG. (Placeholders below — replace `![…](…)` with your image.)

**3.1 Home / landing** — the masthead, the four literary pillars and the Cultural Atlas entries.
`![Home — Ubuntu Heritage landing](screenshots/01-home.png)`

**3.2 The Journey (interactive timeline)** — the walking figure on the 1652 → today trail, and a
full-screen "dot story" with its labelled *Artistic interpretation* image.
`![The Journey — walking through South African history](screenshots/02-journey.png)`

**3.3 Cinematic Reader** — a scene (e.g. *Ityala Lamawele*, the *inkundla*) showing the Child/Adult
toggle, the Listen control, and the language picker.
`![Cinematic Reader — a scene with Child/Adult + Listen](screenshots/03-reader.png)`

**3.4 Integrity in action** — the Reader in one of the nine machine-draft languages, showing the
"machine translation — unreviewed" label (truth-only rule made visible).
`![Honest labelling of machine-draft translations](screenshots/04-reader-draft-label.png)`

**3.5 Cultural Atlas** — an index and one grounded entry (e.g. Unsung Heroes or Marriage Rites) with
its citations.
`![Cultural Atlas — grounded, cited heritage](screenshots/05-atlas.png)`

**3.6 Totems & Clans** — the animal-totem compendium (real photos + sounds).
`![Totems & Clans](screenshots/06-totems.png)`

**3.7 The Nine Provinces** — the grid and a province/city history.
`![The Nine Provinces](screenshots/07-provinces.png)`

**3.8 POPIA consent** — the consent sheet shown *before* the microphone is ever used.
`![POPIA consent before recording](screenshots/08-consent.png)`

**3.9 Community Archive (cloud, live)** — a recording marked **Shared ✓** and the **From the
community** feed with a shared story. *(You already have this screenshot.)*
`![Community Archive — shared to the live community feed](screenshots/09-community-archive.png)`

**3.10 Ask Ubuntu** — a grounded conversational answer (Gemini) and/or a navigation command.
`![Ask Ubuntu — grounded conversational guide](screenshots/10-ask-ubuntu.png)`

**3.11 Heritage Ledger** — the on-chain provenance record with a "Verify on Solana" link.
`![Heritage Ledger — on-chain provenance](screenshots/11-heritage-ledger.png)`

**3.12 Language picker** — all 11 official languages, indigenous languages first-class.
`![All 11 official South African languages](screenshots/12-languages.png)`

---

*Documentation prepared for the AADHIH "Reclaiming African Voices" submission. Full technical detail:
see `docs/` (architecture, AI pipeline, POPIA compliance, accessibility, status & roadmap) and the
written narrative in `specs/concept-submission.md`.*
