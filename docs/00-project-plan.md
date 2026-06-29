# 00 — Project Plan & Timeline

## Goal

Ship a **demo-ready Lentswe prototype by the concept deadline (9 July 2026, 16:00)** and, if selected
as a finalist, polish it for the **showcase on 16 July 2026**. The hackathon accepts a "functional
prototype or clearly presented working concept" + a 2–3 min video + a written narrative.

## Strategy: a spine that always demos

We can't risk a "big bang" where nothing works until the end. We build a **thin end-to-end spine
first**, then thicken it. At any checkpoint there is something real to show.

**The spine (never cut):** open the app → pick a literary module (*Mhudi*) → read a cinematic scene
(AI-generated background image + overlaid text) → toggle Child/Adult mode → toggle Setswana/English.
That alone hits Humanities Depth (30%) + Creativity (15%) + Accessibility (20%).

**Highest-value differentiator (build next):** the **Community Archive** — record an elder's voice →
POPIA consent gate → save locally → (stretch) transcribe via Lelapa + sync to Supabase. This is what
wins Community Impact (25%).

**Cut order if time runs short** (record any de-scope in [STATUS.md](../STATUS.md)):
ElevenLabs intro narration → cloud sync (keep local-only) → 4th module (Vilakazi) → Adult↔Child live
Gemini calls (pre-generate instead).

## Phases & timeline (today: 2026-06-29)

| Phase | Deliverable | Window | Demo-able output |
|-------|-------------|--------|------------------|
| **0. Scaffold** | Governance + docs + Expo boots + 1 module renders a cinematic AI image | **29–30 Jun** | app opens on web; *Mhudi* scene shows a Pollinations image + text |
| **1. Story core** | 3 modules (*Mhudi*, *Ityala Lamawele*, *Indaba*) · cinematic Reader · Child/Adult (Gemini) · ST/EN toggle · home gallery | **1–3 Jul** | browse modules; read any scene; switch mode + language |
| **2. Community + offline** | Oral-history recorder · POPIA consent flow · local save (WatermelonDB) · Supabase + Lelapa transcribe (stretch) | **4–6 Jul** | record a story, consent, see it saved & (stretch) transcribed |
| **3. Polish + submit** | Accessibility pass · "About the sources" screen · ElevenLabs intro · demo video · written narrative | **7–9 Jul** | the submission package |
| **🏁 Concept submission** | Prototype link/build + 2–3 min video + written narrative | **9 Jul 16:00** | — |
| **4. Showcase prep** | (if finalist) bug-fix, performance, presentation | **13–16 Jul** | live showcase build |

## Definition of "concept-ready" (what 9 July looks like)

A judge can: open Lentswe → see a striking home gallery of the four pillars → enter *Ityala Lamawele*
→ watch the *inkundla* scene render cinematically → switch to Child Mode and to Setswana → open the
Community Archive → hit "Record", see a clear POPIA consent screen, record a short clip, and see it
saved with the option to delete it. The "About the sources" screen credits Plaatje, Mqhayi, Mutwa,
Vilakazi with real references. Everything works offline for reading; the demo is screen-recorded.

## Daily rhythm

- Start: read [STATUS.md](../STATUS.md). End: update it + add a Log line.
- Commit working code to `main`; keep it demo-able every night.
- After each phase: confirm the spine still works and map new features to the
  [rubric](06-judging-criteria.md).

## Top risks & mitigations

| Risk | Mitigation |
|------|------------|
| Only ~10 days to concept (blueprint assumed 4 weeks) | Phased spine; documented cut order; core never cut |
| Free API rate limits during judging | Pre-generate + cache images and Child/Adult text; ElevenLabs static-only |
| POPIA mistakes on voice data | Consent gate + erasure built *with* the recorder, not after — see [05](05-popia-compliance.md) |
| Inventing history to fill gaps | Integrity rule: `[NEEDS SOURCE]`, never guess — see [AGENTS.md](../AGENTS.md) + [04](04-humanities-sources.md) |
| Cross-platform styling drift (web vs native) | NativeWind config locked early; test web + Expo Go each phase |
| Judges see a pretty shell with shallow content | Humanities-first: write the module content before polishing visuals |
