# STATUS — Lentswe live board

> Source of truth for "what's going on right now." Read first, update last. Treat updating it as part
> of "done."

_Last updated: 2026-06-29 — by Emma (via Claude)_

---

## 🎯 Current focus

| Area | Status |
|------|--------|
| Project scaffold (docs, governance, .claude) | ✅ done |
| Expo app initialized (SDK 56) + web bundle green | ✅ done |
| First module (*Mhudi*) renders in CinematicReader w/ Pollinations image | ✅ done |
| NativeWind wiring | ⬜ next (T006) |

## ⏭️ Next action

1. Run it: `cd app && npm run web` (or `npm run start` → Expo Go) — see the *Mhudi* scene, toggle
   Child/Adult + EN/TSW, page between the two scenes.
2. **Get the free API keys** into `app/.env` (Gemini, Lelapa, Supabase) — see `app/.env.example`.
3. T006: wire NativeWind (babel/metro/tailwind), verify web↔Expo Go parity.
4. Phase 1: HomeGallery + add *Ityala Lamawele* and *Indaba, My Children* modules (grounded).
5. **Have a Setswana speaker review** the `tn` draft text in `app/src/content/mhudi.ts`.

## 🗓️ Timeline (today: 2026-06-29)

| Phase | What | Target window | Status |
|-------|------|---------------|--------|
| **0. Scaffold** | Governance + docs + Expo boots + 1 module renders | 29–30 Jun | ✅ done |
| **1. Story core** | 3 literary modules · cinematic Reader · Child/Adult (Gemini) · ST/EN toggle | 1–3 Jul | ⬜ not started |
| **2. Community + offline** | Oral-history recorder · POPIA consent · Supabase · offline cache | 4–6 Jul | ⬜ not started |
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
- Name **Lentswe** chosen (Setswana "voice"); alternatives if we reconsider: *Ngwao* (heritage),
  *Setso* (tradition), *Dinaane* (folktales).
- Decide demo target for the video: web (easiest to screen-record) vs Expo Go on a phone.

## 🗒️ Log

- **2026-06-29** — Project kicked off. Read hackathon brief + rubric + architectural blueprint PDF +
  FrameFlow reference. Created governance scaffold, docs set, .claude skills, specs, and initialized
  the Expo app with a first cinematic literary module.
