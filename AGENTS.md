# AGENTS.md — how we work on Maloba

The shared contract for every contributor (human or AI). Read this and **[STATUS.md](STATUS.md)** at the
start of every session. The rules are tool-agnostic — they apply whether you're in Claude Code, an IDE,
or anything else.

---

## 1. What we're building & why it must win

Maloba is judged against the **Reclaiming African Voices rubric** (see
[docs/06-judging-criteria.md](docs/06-judging-criteria.md)). The weighting decides our priorities:

| Criterion | Weight | What it means for our choices |
|-----------|-------:|-------------------------------|
| Humanities Depth & Relevance | **30%** | Real texts, real history, critical reflection. Tech serves the story. |
| Community Impact | **25%** | The Community Archive turns users into archivists of their own families' voices. |
| Accessibility & Inclusivity | **20%** | Offline-first, low-data, multilingual, Child/Adult modes, runs on cheap Android. |
| Creativity & Innovation | **15%** | Cinematic AI graphic-novel; free-tier generative pipeline. |
| Sustainability & Future Potential | **10%** | POPIA-compliant, community-owned, zero monthly cost. |

**Implication:** a beautiful app with shallow content *loses*. Depth + community + access come first;
visual polish amplifies them. Never let the tech overshadow the culture.

## 2. The integrity rule — truth only, no invented heritage (non-negotiable)

This is a humanities project about *real people's history*. Getting it wrong is not a bug, it is a harm.

- **Never fabricate** a historical fact, character, custom, law, date, or quote. Every claim about
  *Mhudi*, *Ityala Lamawele*, *Indaba, My Children*, Vilakazi's poetry, or any custom must trace to a
  real source — the text itself or a citation in [docs/04-humanities-sources.md](docs/04-humanities-sources.md)
  / [docs/09-research-summary.md](docs/09-research-summary.md).
- When a needed fact isn't yet sourced, write `[NEEDS SOURCE]` and leave it — do **not** guess.
- **AI-generated images are illustration, not evidence.** Label them as artistic interpretations;
  never present a Pollinations render as a historical photograph or a real person.
- When Gemini simplifies a text for Child Mode, it **adapts tone, never facts.** Summaries stay
  faithful to the source. See [docs/03-ai-pipeline.md](docs/03-ai-pipeline.md).
- Handle hard material (e.g. the "Frog's Bride" forced-marriage custom in Mutwa) **honestly and with
  context**, not sanitised and not sensationalised.

## 3. Ethical & community rules (the rubric rewards this, the code of conduct requires it)

- **Acknowledge sources and communities.** Every module credits its author and source text. An
  "About the sources" screen names Plaatje, Mqhayi, Mutwa, Vilakazi and links real references.
- **Avoid extractive representation.** We center African epistemologies on African terms — we are not
  decorating tech with culture, we are using tech to serve the culture.
- **Community ownership.** Oral histories belong to the people who record them. They choose private vs
  public, and can delete their data at any time (POPIA right to erasure).

## 4. POPIA & data protection (mandatory — it's also 10% of the score via Sustainability/Ethics)

Any personal information — and **a person's voice is personal information** — must follow
[docs/05-popia-compliance.md](docs/05-popia-compliance.md):

1. **Explicit consent** before the mic is ever activated (clear, non-technical opt-in).
2. **Purpose transparency** — state that audio goes to Lelapa AI (transcription) and Supabase (storage).
3. **Row-Level Security** — private recordings isolated to their uploader until marked public.
4. **Right to erasure** — one tap deletes a user's recordings + transcripts.

No PII collection path ships without all four. If you build a recording feature, you build the consent
gate in the same change.

## 5. Accessibility is a feature, not a polish item (20% of the score)

Build these in from the start, not at the end:

- **Offline-first** — content readable with no connection (WatermelonDB local cache).
- **Low-data** — cache generated images; never re-fetch; lazy-load; respect data cost.
- **Multilingual** — Setswana + English at minimum, designed to extend to all 11 SA languages.
- **Child/Adult modes** — same story, two reading levels.
- **Legible by default** — large tap targets, high contrast, scalable text, works on small cheap phones.

## 6. Git discipline (solo, but stay clean)

- Keep `main` working and demo-able. Commit small, message clearly: `feat(reader): cinematic scene view`.
- Work risky/large changes on a branch (`feat/community-archive`), merge when it works.
- **Never commit secrets.** API keys live in `app/.env` (gitignored); `.env.example` documents them.
- Commit when something works; don't leave `main` broken overnight.

## 7. Honesty in STATUS.md

After any meaningful step, before you stop:
1. Update the relevant section of [STATUS.md](STATUS.md) (Current focus, Next action, phase tracker).
2. Add a one-line dated entry to the **Log** at the bottom.
3. **Report failures honestly** — a broken build or a blocked task is logged, not hidden.

## 8. Definition of Done (every feature)

- [ ] Works on web **and** at least one mobile target (Expo Go is fine for the demo).
- [ ] Content is grounded — no invented history; sources credited.
- [ ] If it touches personal data: POPIA consent + erasure path present.
- [ ] Accessible: works offline or degrades gracefully; legible; multilingual-ready.
- [ ] STATUS.md updated + Log entry added.
- [ ] Maps to a rubric criterion you can name out loud.
