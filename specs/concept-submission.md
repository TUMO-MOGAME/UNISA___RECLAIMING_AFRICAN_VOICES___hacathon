# Concept Submission — Ubuntu Heritage

> The hackathon requires a **written narrative** covering: the problem/gap addressed, the communities or
> narratives centred, and the project's relevance to African digital humanities. This document is that
> narrative. It is kept grounded — every claim about a text, custom, or history traces to a real source
> (see [docs/04-humanities-sources.md](../docs/04-humanities-sources.md) /
> [docs/09-research-summary.md](../docs/09-research-summary.md), and the per-scene `sourceNote`s and
> `references` in `app/src/content/*.ts`); no invented history. Where a feature is built but not yet
> switched on, this document says so plainly — it describes what the demo actually shows.
> _Status: pre-submission draft, refine before the submission deadline._

## Project: **Ubuntu Heritage** — *Mantswe a maloba* (Voices of Yesterday)

*Maloba* is Setswana for **"yesterday"**; the tagline *Mantswe a maloba* — "Voices of Yesterday" — names
what the app does: it brings yesterday's voices to life today. **Ubuntu Heritage** is a cinematic,
multilingual, offline-first app that brings South Africa's foundational indigenous literature **and
heritage** to life — and invites communities to add their own voices to the archive.

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

Ubuntu Heritage closes all three: it makes the canonical texts **vivid, multilingual, and free**; it
builds a grounded **Cultural Atlas** of the heritage around them; and it gives communities a
**POPIA-compliant tool to record and own** their own oral histories.

## 2. The communities and narratives centred

- **Indigenous South African literature and its custodians** — Sol Plaatje, S.E.K. Mqhayi, Credo Mutwa,
  B.W. Vilakazi — and the worlds they preserved: pre-colonial Barolong society and Mhudi's
  proto-feminist agency; Xhosa customary law and restorative justice in the *inkundla*; Zulu cosmology
  and initiation rites; the *izimbongi* oral-praise-poetry tradition carried into written verse.
- **The heritage those texts sit inside** — surfaced in the **Cultural Atlas**, which has grown from the
  four literary pillars into several grounded, cited sections: **Unsung Heroes** (Kgosi Galeshewe, King
  Nyabela, Moleli & Anta, the youth of 1976); **Rites of Passage: Marriage** (*lobola*, *patlo*,
  *umtshato*, *umabo*); **The Peopling of South Africa** (Khoisan → Sotho-Tswana & Nguni); **Totems &
  Clans**; **the Nine Provinces**; **the Presidents** (including pre-1994 heads of state, framed
  honestly); and **National Days**. Every entry is cited, and contested history is framed as contested —
  never flattened into a single "official" story.
- **A guided walk through the history** — an interactive **Journey** timeline (1652 → today) lets a
  reader walk the story milestone by milestone, each opening a dignified, clearly-labelled visual
  interpretation (and, where supplied, film).
- **Everyday community members and elders**, who become **archivists of their own families' histories**
  through the Community Archive — recorded in their own languages, including natural code-switching. Each
  Atlas entry invites exactly this: *"record your family's version."*
- **Speakers of under-resourced SA languages**, treated as first-class: the **entire interface switches
  across all 11 official languages**, and the literature is offered in-language, served by
  **African-built language technology** — Lelapa AI / Vulavula for transcription and translation, and
  Botlhale AI for indigenous-language speech.

## 3. Relevance to African digital humanities

Ubuntu Heritage is digital humanities done **on African terms**: technology is **subordinate to the
texts**, not the other way around. It reinterprets the canon through an African lens, extends it into a
grounded heritage Atlas, democratises the archive, treats indigenous languages as first-class, and
embeds **decolonial + ethical practice** — community ownership, consent, and the right to erasure — into
the architecture itself. It deliberately leans on **African-built AI** (Lelapa, Botlhale) rather than
only importing foreign models, so the tools that reclaim African voices are themselves African. It also
**notarises the provenance of the public-domain canon on a public blockchain** — hashes and citations
only, never anyone's personal data — so the record of *what these works are and where they come from* is
permanent and independently verifiable. And because it runs entirely on **free-tier infrastructure with
zero monthly cost**, it is **sustainable beyond the hackathon** — a living platform, not a throwaway
prototype.

## 4. How it works (one paragraph)

Open Ubuntu Heritage and choose a pillar of South African letters, or an entry in the **Cultural Atlas**.
Each scene is rendered as a cinematic image (generated free by Pollinations.ai, or pre-generated with
Google Gemini and cached for offline use) with the text overlaid; toggle **Child/Adult** reading levels
(tone adapts, never facts) and the reading language. A **Listen** control reads the scene aloud. Reading
works **offline**. In the **Community Archive**, record an elder's story — after a clear **POPIA
consent** step — keep it private or share it, and delete it at any time. A **Heritage Ledger** screen
shows the on-chain provenance record for each canonical work (content hash + IPFS reference + a "Verify
on Solana" link). A floating **"Ask Ubuntu"** guide answers questions strictly from the site's own
grounded content and can navigate you to any section.

## 5. What is live now vs. what activates with a key (honesty note)

The prototype is **functional end-to-end on the web build** without any paid keys. Some headline
integrations are **built and wired**, and switch from a fallback to the full experience the moment a key
is added — the demo is honest about which is which:

| Capability | State in the demo |
|---|---|
| Reading, Child/Adult, cinematic images, offline, 11-language UI, the Journey, Heritage Ledger, "Ask Ubuntu" navigation/retrieval | ✅ **Live, key-free** |
| Community Archive: consent → record → local save → play → delete | ✅ **Live on web** (durable local storage; erasure is real) |
| Literary text in the 9 not-yet-reviewed languages | ✅ **Shown as machine-draft, clearly labelled "unreviewed"** (EN + Setswana are human-reviewed) |
| **Listen** in indigenous-language neural voice (Botlhale) | 🔑 built + wired — **falls back to on-device speech** until a Botlhale key is added |
| Transcription (Lelapa) + cloud sharing (Supabase) | 🔑 built + wired — **local-only** until keys are added |
| Full "Ask Ubuntu" LLM conversation (Anthropic) | 🔑 navigation + site answers work key-free; **full chat** activates with a key |

## 6. Rubric alignment (why it scores)

| Criterion | Weight | Ubuntu Heritage's claim |
|-----------|-------:|-----------------|
| Humanities Depth | 30% | Four real foundational texts, critically framed, **plus a cited, multi-section Cultural Atlas** of heroes, customs, peoples and provinces; tech serves the humanities |
| Community Impact | 25% | Community Archive: users become owners of their own recorded histories; every Atlas entry invites a family's own version |
| Accessibility | 20% | Offline-first, low-data, **whole UI in all 11 official languages**, Child/Adult, read-aloud, cheap Android + web |
| Creativity | 15% | Cinematic AI graphic novel + a walkable history Journey + indigenous-language narration + on-chain heritage provenance, all on a free-tier pipeline |
| Sustainability | 10% | Zero cost, POPIA-compliant, community-owned, content-as-data, African-built AI, verifiable provenance |

## 7. Demo video shot list (2–3 min)

1. **Hook (0:00–0:20):** home landing — the literary pillars + the Cultural Atlas — with the tagline
   *Mantswe a maloba*.
2. **Depth (0:20–1:00):** enter *Ityala Lamawele*; the *inkundla* scene; explain the twins' case +
   restorative justice (*ubulungisa*, *umthetho*); open "About the Sources" to show the real citations.
3. **Breadth (1:00–1:25):** open the **Cultural Atlas** — e.g. Kgosi Galeshewe (Unsung Heroes) or
   *lobola* (Marriage Rites); note the per-entry sources and the *"record your family's version"* prompt.
   Optionally walk a step of the **Journey** timeline.
4. **Access (1:25–2:00):** switch the whole UI to another language; toggle Child Mode; tap **Listen** to
   hear the scene; turn off Wi-Fi → still reads.
5. **Community + ethics (2:00–2:40):** open Community Archive; show the **POPIA consent screen**; record
   a short clip; show private/public + delete (erasure).
6. **Provenance + close (2:40–3:00):** flash the **Heritage Ledger** ("Verify on Solana"); close on
   "zero cost, community-owned, on African terms — built with African AI."

## Open TODO before submission

- [x] 4 literary modules + a multi-section Atlas with real, sourced content (no `[NEEDS SOURCE]` remaining).
- [ ] Tumo's Setswana review of content + UI strings (incl. the "Reetsa" Listen label) — see the
      review handoff in `specs/` / STATUS.md for the exact flagged files.
- [ ] Tumo's cultural-accuracy review of the Atlas customs (esp. Sotho-Tswana marriage terms) and of the
      9-language machine-draft literary translations.
- [ ] Record the demo video to the shot list above (see `specs/demo-video-script.md`).
- [ ] Confirm demo target (web) and that Listen + record/consent/delete all work in it.
- [ ] Final proofread for grounding and honesty (claims match what the demo actually shows) — including
      that the Heritage Ledger is described as a Solana **devnet** provenance record, not overclaimed.
