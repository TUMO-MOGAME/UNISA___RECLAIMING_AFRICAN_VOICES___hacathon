# STATUS — Maloba live board

> Source of truth for "what's going on right now." Read first, update last. Treat updating it as part
> of "done."

_Last updated: 2026-06-29 — by Emma (via Claude)_

---

## 🎯 Current focus

| Area | Status |
|------|--------|
| Project scaffold (docs, governance, .claude) | ✅ done |
| Expo app initialized (SDK 56) + web bundle green | ✅ done |
| HomeGallery + nav across **4** grounded pillars | ✅ done |
| Cinematic Reader: Child/Adult + EN/Setswana + scene nav + back | ✅ done |
| "About the Sources" screen (credits + references + integrity note) | ✅ done |
| **Community Archive**: POPIA consent → record → list → play → delete | ✅ done (session-state) |
| NativeWind wiring | ⬜ optional (T006) |

## ⏭️ Next action

1. Run it: `cd app && npm run start` → **Expo Go on a phone** (best for recording) or `npm run web`.
   Browse 4 pillars, open any, toggle Child/Adult + EN/TSW; open About the Sources; open Community
   Archive → Record → see the POPIA consent sheet → record → play → delete.
2. **Review the Setswana** `tn` drafts in `app/src/content/*.ts` + the consent/UI strings (you're the authority).
3. When keys arrive: `services/gemini.ts` (T017) · Supabase + RLS upload (T027) · Lelapa transcribe (T028).
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

## 🗒️ Log

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
