# docs/12 — The Living Archive: Many Voices, the Ingestion Library & the Built-With row

> **Status:** planning locked, execution started 2026-07-05.
> **Governs:** three new capabilities that turn Ubuntu Heritage from a curated cinematic reader into a
> *living, crowdsourced, AI-synthesised* archive of South African history — from many mouths.
> **Integrity law (non-negotiable, from [AGENTS.md](../AGENTS.md) §4):** *AI reports and connects — it
> never invents or adjudicates.* Every claim traces to a source you can open.

---

## North star — three layers that feed each other

| Layer | What it is | Where it lives | Property |
|-------|-----------|----------------|----------|
| **The Canon** (books) | Verbatim, fingerprinted, permanent | `chain/` → Solana + `heritage.data.ts` | permanence |
| **The Voices** (people) | Many accounts of the same history | Supabase (later) + device | privacy, erasable |
| **The Bridge** (AI) | Turns raw books + raw voices into the cinematic, multilingual experience already built | `services/` + `scripts/` | grounded, cited |

The AI is the bridge, never the judge. It counts, clusters, translates, and links. It does not decide
what is true.

---

## Decisions locked (2026-07-05)

1. **Feature A name:** **Mantswe a Batho** — *"Voices of the People."* (Sibling to the tagline
   *Mantswe a Maloba*.)
2. **Contested history:** **show disagreement plainly, always cited.** "Of N accounts: 87 recall X,
   9 recall Y, 4 add a detail no one else does." AI surfaces divergence; it never crowns a winner.
3. **Ingestion scope (v1):** **public-domain / explicitly-licensed works only.** Rights status is a
   first-class field per source.
4. **Footer "Built with":** **official logo images** (each brand's real mark → webp), rendered as a
   row *distinct* from "In partnership with" — tech-used ≠ endorsement. Carries an asset-sourcing step.

---

## How this maps onto the code that already exists

The exploration confirmed most of the scaffolding is already here — we **extend**, we don't rebuild.

| New capability | Builds on (real files) |
|----------------|------------------------|
| Built-With footer row | `app/src/components/HomeGallery.tsx` footer (L321–403), `partnersLabel`/`partnerMarks`/`partnerPlate` pattern; assets in `app/assets/brand/*.webp` |
| Recording persistence | `app/src/components/ArchiveScreen.tsx` (`Recording` type L22–28, `setRecordings` L125, `remove()` L184); `ConsentSheet.tsx` (`Visibility`) |
| Many Voices consensus | Same recorder + consent; new `services/` transforms; Supabase (new dep) + Lelapa/Vulavula (locked stack) |
| Ingestion Library | `Module`/`Scene` types (`content/types.ts`), `scripts/*.mjs` build-time pattern, `services/images/gemini.ts`, `services/translate/botlhale.ts` |
| Heritage anchoring of the aggregate | `chain/anchor.mjs`, `content/heritage.ts` + `heritage.data.ts` (extend, never touch the live devnet tx) |

**Test philosophy (matches the repo):** pure transforms unit-tested with golden fixtures via
`node --test` (like `botlhale.test.ts`); AI stages gated by **human review**; POPIA flows tested for
**real deletion + recompute**.

---

## Feature A — Mantswe a Batho ("Voices of the People")

100 people record what they remember about the same event. We transcribe, strip identity, and show —
beautifully — where they agree and where they differ. Oral history is about *multiplicity*; this is
academically sound, not a compromise.

### Pipeline (each step a testable stage)

| # | Stage | AI's exact role | Grounding onto repo |
|---|-------|-----------------|---------------------|
| 1 | **Capture** | — | `ArchiveScreen` recorder + `ConsentSheet` (exist) |
| 2 | **Transcribe** | Lelapa/Vulavula STT, indigenous + code-switching | new `services/transcribe/vulavula.ts` (mirror `translate/botlhale.ts` shape) |
| 3 | **De-identify** | Gemini redaction pass **+** deterministic regex (phones/IDs) — belt & suspenders → human review. Keep historical names/places (those are content) | new `services/deidentify/` — **pure**, golden-fixture tested |
| 4 | **Tag & link** | Gemini classifies → topic node (event / place / era / president / Atlas entry) | links to existing `Module` ids + a new `topics` registry |
| 5 | **Cluster** | Multilingual embeddings + vector similarity | new `services/cluster/` |
| 6 | **Synthesize** | Gemini, low-temp, **hard-constrained to cite**; may **not** resolve contradictions, only surface them | new `services/consensus/` — output schema is testable |
| 7 | **Present** | — | new `MantsweScreen.tsx`: consensus + divergences + listen to anonymised voices |

### Guardrails (these *are* the feature, not overhead)

- **No orphan facts.** Every synthesised claim links back to the raw testimonies. Click a claim →
  see/hear the accounts.
- **AI never adjudicates.** "Most said X" ≠ "X is true." It counts.
- **POPIA lifecycle** (per [docs/05](05-popia-compliance.md) + skill): voice = personal information →
  consent with stated purpose → de-identify → private, erasable storage → **on withdrawal, the
  testimony is deleted AND the consensus recomputes.** The aggregate is *derived*, never frozen with a
  person's data.
- **Moderation gate.** Crowdsourced content carries hate/trauma/misinfo risk. AI flags → **human
  approves** before anything goes public.

### Add-ons this unlocks

- **Timeline reconstruction** — from dated accounts, an event timeline with confidence bands.
- **Memory Map** — accounts tagged by place → a map of where SA's memories come from.
- **Living Heritage Anchor** — periodically hash the *synthesis* (never personal data) onto Solana:
  tamper-evident "as of this date, this is what the community collectively remembered." Permanence for
  the aggregate, privacy for the person — extends `chain/` cleanly.
- **Generational Bridge** — pipe a community consensus story through the existing Child/Adult adapter
  so kids learn *their own community's* history.

---

## Feature B — The Ingestion Library (books → animated modules)

Feed a historical book (PDF / document / link) → out comes a **draft** `Module`: cinematic scenes,
child/adult text, images, 11 languages — grounded in and citing the real source. Build-time & offline
(like `gen:images`); runtime stays static & free.

### Pipeline (build-time `scripts/*.mjs`)

1. **Ingest** — PDF / document / URL.
2. **Extract** — text extraction; OCR (vision model) for scanned old books; readability for links.
3. **Segment & tag** — chapters, metadata, **rights status** (public-domain check — legal, first-class).
4. **Preserve verbatim** — the fingerprinted canon layer.
5. **Adapt → scenes** — Gemini turns a chapter into the `Module` shape (title / adult / child /
   imagePrompt / sourceNote), **citing the passage**, labelled *adaptation*.
6. **Imagery** — Gemini/Pollinations → bundled webp (existing pipeline).
7. **Translate** — Botlhale/Gemini drafts, labelled *unreviewed* (existing `drafts.data.ts` path).
8. **Fingerprint & anchor** — SHA-256 + IPFS + Solana (extend `chain/`).
9. **Human review gate** — nothing ships unreviewed.

**CLI:** `npm run ingest -- <pdf|url>` → draft module + assets + a review checklist. The "library" is a
`app/src/content/sources/` registry with **rights status per work**.

### Rights (v1 = public-domain / licensed only)

SA copyright is life + 50. The existing canon already qualifies — **verify each before ingest**:

| Work | Author d. | PD since | v1? |
|------|-----------|----------|-----|
| *Mhudi* | Plaatje 1932 | ~1983 | ✅ |
| *Ityala Lamawele* | Mqhayi 1945 | 1996 | ✅ |
| new works | — | **rights check required** | flag |

### Add-ons

- **"Read the original" toggle** in the reader — flip cinematic adaptation ↔ verbatim source.
- **Citation graph** — books ↔ Atlas topics ↔ testimonies. A knowledge graph of SA heritage.
- **Auto study questions** (education mode), grounded in the text — the school-use angle.

---

## Feature C — Footer "Built with" row (official logos)

A row **distinct** from "In partnership with" (honesty: tech-used ≠ endorsement). Decision locked to
**official logo images**, so this carries an asset step. Candidates: **Solana** (Heritage Ledger),
**Lelapa AI / Vulavula** (voice & language, once wired), **Supabase** (when the archive lands),
optionally **Expo**, **IPFS/Arweave**.

**Trademark care:** use each brand's *official* asset per its brand guidelines (do not generate logos —
[[feedback-no-self-generated-images]]); convert to webp; store in `app/assets/brand/`. Render by
mirroring `partnersLabel` + `partnerMarks` in `HomeGallery.tsx` (~L357/384).

---

## Build order (each gate is a real test before moving on)

| # | Step | Effort | Gate |
|---|------|--------|------|
| 0 | **This plan doc + memory** | done | committed |
| 1 | **Footer "Built with" row** — source official webp logos, render distinct row | hours + asset sourcing | tsc clean · tests green · web export green · eyeball |
| 2 | **Device-persistent recordings** — recordings survive refresh, still no server | small | record → refresh → still there → delete works; tiny POPIA burden |
| 3 | **Ingestion pipeline v1** — one public-domain book end-to-end | medium | golden fixtures on pure extract/segment; human-review the draft module | ✅ **infra built** — `npm run ingest` (rights gate → strip → normalise → segment → draft + review.md); pure core golden-tested (11); PDF/OCR + Gemini adaptation deferred; awaiting a first PD title |
| 4 | **Mantswe a Batho** — Supabase + Lelapa; consensus/divergence | large | fixture testimonies → asserted consensus/divergence structure (deterministic, like `botlhale.test.ts`) + **POPIA delete-recomputes** test |

Step 1 is visible and safe *once assets are in hand*; step 2 is the smallest real code win with almost
no POPIA burden; steps 3–4 are the differentiators.

## Open items / dependencies

- **Footer:** obtain official brand assets for Solana / Supabase / Expo (+ Lelapa when wired). Until
  then, the row is blocked on assets — the *code* pattern is trivial.
- **Mantswe a Batho:** needs Supabase project (URL + anon key) and a Lelapa/Vulavula key — both still
  outstanding per [STATUS.md](../STATUS.md).
- **Ingestion:** confirm PD status per new work before ingest; pick a first public-domain title.

---

_This plan is subordinate to the humanities. Technology is the bridge; the voices — on the page and in
the mouths of the people — are the point._
