<div align="center">

# Ubuntu Heritage · *Mantswe a maloba*

**Reclaiming African Voices — a cinematic, multilingual, offline-first heritage storytelling app.**

*Maloba* is Setswana for **"yesterday"**; the tagline *Mantswe a maloba* means **"Voices of Yesterday."**

</div>

---

Ubuntu Heritage brings South Africa's foundational indigenous literature **and heritage** to life as an
interactive, cinematic graphic novel — and invites communities to add their own voices to the archive.
Built for the **Advancing African Digital Humanities Ideation Hub (AADHIH) "Reclaiming African Voices"
hackathon** (UNISA · BaobabX Academy).

## What we're building

A single Expo app (web + Android + iOS) that does four things, humanities first:

1. **Reads the canon.** Four foundational texts, rendered as cinematic, dual-mode (Child/Adult),
   multilingual scenes — never dry summaries.
2. **Maps the heritage around them.** A grounded, cited **Cultural Atlas** — heroes, customs, peoples,
   provinces, presidents, national days — plus a walkable **Journey** through the history (1652 → today).
3. **Gives the archive back.** A POPIA-compliant **Community Archive** where elders' stories are recorded,
   owned, and erasable by the people who make them.
4. **Proves provenance.** An on-chain **Heritage Ledger** notarises the public-domain canon (hashes +
   citations only — never anyone's personal data).

## How we approached it

- **Humanities before technology.** The rubric weights Humanities Depth (30%) + Community Impact (25%)
  above everything; every feature traces back to a text, a custom, or a community need.
- **Truth only — no invented heritage.** Every historical claim traces to a real source (see
  [docs/04-humanities-sources.md](docs/04-humanities-sources.md) and per-scene `sourceNote`s). Where a
  fact isn't sourced, it's marked, not fabricated. AI-generated images and machine translations are
  **always labelled as such**.
- **Free-tier, offline-first, low-data.** Designed to cost nothing to keep alive and to work on a cheap
  Android phone with poor connectivity.
- **Honest about state.** Some headline integrations are built and wired but activate only when an API
  key is added; the app degrades gracefully and says so. The full breakdown is in
  **[docs/10-status-and-roadmap.md](docs/10-status-and-roadmap.md)**.

## The four pillars (the heart of the app)

| Source | Author | What the module does |
|--------|--------|----------------------|
| ***Mhudi*** | Sol Plaatje (1930) | Survival, egalitarian partnership, and the subversion of the colonial pastoral myth; Mhudi's proto-feminist agency. |
| ***Ityala Lamawele*** | S.E.K. Mqhayi (1914) | The *inkundla* (traditional Xhosa court) — indigenous jurisprudence and restorative justice (*ubulungisa*). |
| ***Indaba, My Children*** | Credo Mutwa (1964) | Cosmology and creation myth (Ninavanhu-Ma, the Tree of Life); an act of oral-tradition preservation. |
| ***Inkondlo kaZulu*** | B.W. Vilakazi (1935) | The journey from oral *izimbongi* to written verse — a meta-story about how a language survives. |

Around them: the **Cultural Atlas** (Unsung Heroes · Marriage Rites · Peopling of SA · Totems & Clans ·
the Nine Provinces · the Presidents · National Days), the interactive **Journey** timeline, the
**Community Archive**, the **Heritage Ledger**, and an **"Ask Ubuntu"** guide that answers strictly from
the site's own grounded content.

## Languages

The **entire interface switches across all 11 official South African languages**. Literary content is
**human-reviewed in English + Setswana**; the other nine languages are shown as **machine-draft,
clearly labelled "unreviewed,"** pending native-speaker review — never passed off as authoritative.

## The stack (100% free tier — zero monthly cost)

- **App:** Expo / React Native — one codebase → **web + Android + iOS**
- **Cinematic visuals:** [Pollinations.ai](https://pollinations.ai) (free, key-less) + Google Gemini
  (pre-generated, cached local images)
- **Narrative + language AI:** Google Gemini (image/tone) · Anthropic Claude (chatbot + translation
  drafting) · **Lelapa AI / Vulavula** (indigenous STT + translation) · **Botlhale AI** (indigenous TTS)
- **Voice:** ElevenLabs (static cinematic sounds only, build-time)
- **Backend:** Supabase (Postgres + storage + auth) · **WatermelonDB** (offline-first local DB + sync)
- **Provenance:** Solana (devnet) + IPFS content IDs for the Heritage Ledger

See [docs/02-tech-stack.md](docs/02-tech-stack.md) for the rationale and free-tier limits, and
[docs/10-status-and-roadmap.md](docs/10-status-and-roadmap.md) for exactly what runs today vs. what
activates with a key.

## Quick start

```bash
cd app
cp .env.example .env      # optional keys; Pollinations + the core app need none
npm install
npm run web               # open in the browser (primary demo target)
# or: npm run start       # scan the QR code with Expo Go on your phone
npm run typecheck && npm test   # 79 unit tests, pure-logic
```

The app is **fully usable with no keys**. Adding keys upgrades specific features (see the roadmap doc).

## Documentation

Start here: **[CLAUDE.md](CLAUDE.md)** (project context) → **[AGENTS.md](AGENTS.md)** (working rules) →
**[STATUS.md](STATUS.md)** (live log) → **[docs/10-status-and-roadmap.md](docs/10-status-and-roadmap.md)**
(implemented vs. planned). Deep dives live in [docs/](docs/); the concept-submission narrative and task
backlog in [specs/](specs/).

## Ethics & ownership

Built on the integrity rule **truth only — no invented heritage** ([AGENTS.md](AGENTS.md)), full
**POPIA** compliance ([docs/05-popia-compliance.md](docs/05-popia-compliance.md)), honest labelling of
all AI-generated content, and respect for community ownership of recorded voices (private/public +
real erasure).

## Credits

Created by **Tumo Olorato Mogame**. In partnership with UNISA · BaobabX Academy. Ambient music/soundscapes
credited in-app to *African Tribe Echoes*.
