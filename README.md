<div align="center">

# Lentswe · *Mantswe a Afrika*

**Reclaiming African Voices — a cinematic, multilingual, offline-first heritage storytelling app.**

*Lentswe* is Setswana for **"voice / word."**

</div>

---

Lentswe brings South Africa's foundational indigenous literature to life as an interactive, cinematic
graphic novel — and invites communities to add their own voices to the archive. Built for the
**Advancing African Digital Humanities Ideation Hub (AADHIH) "Reclaiming African Voices" hackathon**
(UNISA · BaobabX Academy).

## Why it matters

African histories, laws, and cosmologies have too often survived only through fragile oral tradition
or been filtered through colonial archives. Lentswe digitises four pillars of South African letters —
not as dry summaries, but as living, visual, multilingual stories — and gives ordinary people the
tools to record and own their families' histories.

## The four pillars (the heart of the app)

| Source | Author | What the module does |
|--------|--------|----------------------|
| ***Mhudi*** | Sol Plaatje (1930) | "The Forest Home" interactive survival narrative; pre-colonial history, egalitarian partnership, subversion of the colonial pastoral myth. |
| ***Ityala Lamawele*** | S.E.K. Mqhayi (1914) | Virtual *inkundla* (traditional Xhosa court) — indigenous jurisprudence and restorative justice. |
| ***Indaba, My Children*** | Credo Mutwa (1964) | "Myth & Origin" visual novel — cosmology, creation myths, initiation rites. |
| ***Inkondlo kaZulu*** | B.W. Vilakazi (1935) | Audio-visual praise poetry — the journey from oral *izimbongi* to the written word. |

Plus a **Community Archive**: record an elder's story, get it transcribed in indigenous languages
(code-switching aware) via Lelapa AI, and choose to keep it private or share it — all POPIA-compliant.

## The stack (100% free tier — zero monthly cost)

- **App:** Expo / React Native — one codebase → **web + Android + iOS** · NativeWind (Tailwind) · Lottie
- **Cinematic visuals:** [Pollinations.ai](https://pollinations.ai) — free, URL-based image generation (no key)
- **Narrative AI:** Google Gemini Flash — Child/Adult tone adaptation + image-prompt engineering
- **Voice:** ElevenLabs (static cinematic intro only) + **Lelapa AI / Vulavula** (indigenous STT + translation)
- **Backend:** Supabase (Postgres + storage + auth) · **WatermelonDB** (offline-first local DB + sync)

See [docs/02-tech-stack.md](docs/02-tech-stack.md) for the full rationale and free-tier limits.

## Quick start

```bash
cd app
cp .env.example .env     # then fill in your free API keys (Pollinations needs none)
npm install              # if not already installed
npm run web              # open in the browser
# or: npm run start  -> scan the QR code with Expo Go on your phone
```

## Documentation

Start here: **[CLAUDE.md](CLAUDE.md)** (project context) → **[AGENTS.md](AGENTS.md)** (working rules) →
**[STATUS.md](STATUS.md)** (live board). Deep dives live in [docs/](docs/), the concept-submission
narrative and task backlog in [specs/](specs/).

## Ethics & ownership

Built on the integrity rule **truth only — no invented heritage** ([AGENTS.md](AGENTS.md)), full
**POPIA** compliance ([docs/05-popia-compliance.md](docs/05-popia-compliance.md)), and respect for
community ownership of recorded voices.
