# Concept Submission — Maloba

> The hackathon requires a **written narrative** covering: the problem/gap addressed, the communities or
> narratives centred, and the project's relevance to African digital humanities. This document is that
> narrative. It is kept grounded — every claim about a text, custom, or history traces to a real source
> (see [docs/04-humanities-sources.md](../docs/04-humanities-sources.md) /
> [docs/09-research-summary.md](../docs/09-research-summary.md), and the per-scene `sourceNote`s and
> `references` in `app/src/content/*.ts`); no invented history.
> _Status: pre-submission draft, refine before 9 July 2026 16:00._

## Project: **Maloba** — *Mantswe a maloba* (Voices of Yesterday)

*Maloba* is Setswana for **"yesterday"** — the app brings yesterday's voices to life today.

A cinematic, multilingual, offline-first app that brings South Africa's foundational indigenous
literature **and heritage** to life — and invites communities to add their own voices to the archive.

---

## 1. The problem / gap addressed

African histories, indigenous legal systems, and cosmologies have survived largely through fragile oral
tradition, or been filtered through colonial archives that classified and diminished them. Three gaps
follow:

- **A reading gap:** the foundational texts that *do* preserve these worlds — Plaatje's *Mhudi*,
  Mqhayi's *Ityala Lamawele*, Mutwa's *Indaba, My Children*, Vilakazi's poetry — are dense, often out of
  print, and inaccessible to younger or non-specialist readers.
- **A memory gap:** the heroes, customs, and migrations that shaped South Africa's peoples — a Batlhaping
  chief who resisted the Cape Colony, the meaning of *lobola* and *patlo*, the journey from the first
  Khoisan to the Sotho-Tswana and Nguni nations — are scattered, unevenly remembered, and easily lost.
- **An archive gap:** ordinary families' histories (initiations, weddings, migrations, resistance) sit
  largely *outside* the formal record, and the tools to capture them rarely work in indigenous
  languages, offline, or on cheap phones.

Maloba closes all three: it makes the canonical texts **vivid, multilingual, and free**; it builds a
grounded **Cultural Atlas** of the heritage around them; and it gives communities a **POPIA-compliant
tool to record and own** their own oral histories.

## 2. The communities and narratives centred

- **Indigenous South African literature and its custodians** — Sol Plaatje, S.E.K. Mqhayi, Credo Mutwa,
  B.W. Vilakazi — and the worlds they preserved: pre-colonial Barolong society and Mhudi's
  proto-feminist agency; Xhosa customary law and restorative justice in the *inkundla*; Zulu cosmology
  and initiation rites; the *izimbongi* oral-praise-poetry tradition carried into written verse.
- **The heritage those texts sit inside** — surfaced in the **Cultural Atlas**: resistance leaders and
  martyrs history nearly forgot (Kgosi Galeshewe, King Nyabela, Moleli & Anta, the youth of 1976);
  marriage rites as alliances of families and ancestors (*lobola*, *patlo*, *umtshato*, *umabo*); and
  the peopling of South Africa from the first Khoisan to the Sotho-Tswana and Nguni nations. Every entry
  is cited, and contested history is framed as contested — never flattened into a single "official" story.
- **Everyday community members and elders**, who become **archivists of their own families' histories**
  through the Community Archive — recorded in their own languages, including natural code-switching. Each
  Atlas entry invites exactly this: *"record your family's version."*
- **Speakers of under-resourced SA languages**, treated as first-class (Setswana + English now,
  designed to extend to all 11), served by **African-built language technology** — Lelapa AI / Vulavula
  for transcription and translation, and Botlhale AI for indigenous-language speech.

## 3. Relevance to African digital humanities

Maloba is digital humanities done **on African terms**: technology is **subordinate to the texts**, not
the other way around. It reinterprets the canon through an African lens, extends it into a grounded
heritage Atlas, democratises the archive, treats indigenous languages as first-class, and embeds
**decolonial + ethical practice** — community ownership, consent, and the right to erasure — into the
architecture itself. It deliberately leans on **African-built AI** (Lelapa, Botlhale) rather than only
importing foreign models, so the tools that reclaim African voices are themselves African. It even
**notarises the provenance of the public-domain canon on a public blockchain** — hashes and citations
only, never anyone's personal data — so the record of *what these works are and where they come from*
is permanent and independently verifiable. And because it runs entirely on **free-tier infrastructure
with zero monthly cost**, it is **sustainable beyond the hackathon** — a living platform, not a
throwaway prototype.

## 4. How it works (one paragraph)

Open Maloba and choose a pillar of South African letters, or an entry in the **Cultural Atlas**. Each
scene is rendered as a cinematic image (generated free by Pollinations.ai, or pre-generated with Google
Gemini and cached for offline use) with the text overlaid; toggle **Child/Adult** reading levels (tone
adapts, never facts) and the reading language (Setswana + English now, framework built for all 11). A
**Listen** control reads the scene aloud — using on-device speech offline today, and built to speak in
**Botlhale AI's indigenous-language neural voices** so the literature can be *heard*, not only read.
Reading works **offline**. In the **Community Archive**, record an elder's story — after a clear
**POPIA consent** step — keep it private or share it, have it transcribed in your language, and delete it
at any time. A **Heritage Ledger** screen shows the on-chain provenance record for each canonical work
(content hash + IPFS reference + a "Verify on Solana" link).

## 5. Rubric alignment (why it scores)

| Criterion | Weight | Maloba's claim |
|-----------|-------:|-----------------|
| Humanities Depth | 30% | Four real foundational texts, critically framed, **plus a cited Cultural Atlas** of heroes, customs and migrations; tech serves the humanities |
| Community Impact | 25% | Community Archive: users become owners of their own recorded histories; every Atlas entry invites a family's own version |
| Accessibility | 20% | Offline-first, low-data, multilingual, Child/Adult, **read-aloud**, cheap Android + web |
| Creativity | 15% | Cinematic AI graphic novel + indigenous-language narration + **on-chain heritage provenance**, all on a free-tier pipeline |
| Sustainability | 10% | Zero cost, POPIA-compliant, community-owned, content-as-data, African-built AI, **verifiable provenance** |

## 6. Demo video shot list (2–3 min)

1. **Hook (0:00–0:20):** home gallery — four literary pillars + the Cultural Atlas — with the tagline
   *Mantswe a maloba*.
2. **Depth (0:20–1:00):** enter *Ityala Lamawele*; the *inkundla* scene; explain the twins' case +
   restorative justice (*ubulungisa*, *umthetho*); open "About the Sources" to show the real citations.
3. **Breadth (1:00–1:25):** open the **Cultural Atlas** — e.g. Kgosi Galeshewe (Unsung Heroes) or
   *lobola* (Marriage Rites); note the per-entry sources and the *"record your family's version"* prompt.
4. **Access (1:25–2:00):** toggle Child Mode + Setswana; tap **Listen** to hear the scene; turn off
   Wi-Fi → still reads.
5. **Community + ethics (2:00–2:40):** open Community Archive; show the **POPIA consent screen**; record
   a short clip; show private/public + delete (erasure).
6. **Provenance + close (2:40–3:00):** flash the **Heritage Ledger** ("Verify on Solana"); close on
   "zero cost, community-owned, on African terms — built with African AI."

## Open TODO before submission

- [x] 4 literary modules + 3 Atlas modules with real, sourced content (no `[NEEDS SOURCE]` remaining).
- [ ] Emma's Setswana review of content + UI strings (incl. the "Reetsa" Listen label) — see the
      review handoff in `specs/` / STATUS.md for the exact flagged files.
- [ ] Emma's cultural-accuracy review of the Atlas customs (esp. Sotho-Tswana marriage terms).
- [ ] Record the demo video to the shot list above (see `specs/demo-video-script.md`).
- [ ] Confirm demo target (web vs Expo Go) and that Listen + record/consent/delete all work in it.
- [ ] Final proofread for grounding and honesty (claims match what the demo actually shows) — including
      that the Heritage Ledger is described as a Solana **devnet** provenance record, not overclaimed.
