# 02 — Tech Stack (locked)

Every choice optimises for: **(a)** one solo builder, **(b)** ~10 days, **(c)** zero monthly cost
(free tier only), **(d)** the rubric (accessibility + sustainability reward exactly these choices).

| Layer | Choice | Why | Free-tier reality |
|-------|--------|-----|-------------------|
| App framework | **Expo / React Native** | One TS codebase → web + Android + iOS. No separate builds. | Free, open source |
| Styling | **NativeWind** (Tailwind for RN) | Same utility classes on web + native; fast cinematic layouts (overlays, opacity, absolute). | Free |
| Animation | **Lottie** (lottie-react-native) | Lightweight JSON animations for loading/transitions; tiny vs GIF/MP4. | Free (LottieFiles) |
| Image generation | **Pollinations.ai** | Cinematic images from a URL — **no key, no SDK, no backend**. The visual differentiator. | Free; IP rate-limited → cache |
| Narrative AI | **Google Gemini Flash** | Child/Adult tone adaptation + image-prompt enrichment. Generous free tier. | ~15 req/min, 1M tok/min (Flash) |
| Cinematic narration | **ElevenLabs** | High-impact intro trailer voice. | 10k chars/month → **static only**, pre-render mp3 |
| Indigenous voice | **Lelapa AI / Vulavula** | SA-language STT + translation; understands **code-switching**. Decolonised, African-built. | Trial keys; HTTP POST |
| Backend | **Supabase** | Postgres + storage + auth; Row-Level Security for POPIA. | 500MB db, 1GB files, 50k MAU, 5GB egress |
| Offline DB | **WatermelonDB** | SQLite-backed, RN-optimised, built-in sync; true offline-first. | Free, open source |

## Hard rules

- **Pollinations needs no key.** Never put a backend in front of it — that defeats the point. Build the
  URL on the client, cache the result.
- **ElevenLabs is static-only.** Generate intro narration *once*, commit the mp3 to `assets/`, never
  call it at runtime. The 10k char/month cap would be exhausted during judging otherwise.
- **Cache everything generated.** Gemini Child-text and Pollinations images are cached by a stable key
  (module + scene + mode + language). Re-fetching wastes quota and data.
- **Secrets live in `app/.env`** (gitignored). `app/.env.example` documents every key. Never hardcode.

## Environment variables (`app/.env`)

```
EXPO_PUBLIC_GEMINI_API_KEY=          # Google AI Studio (free)
EXPO_PUBLIC_LELAPA_API_KEY=          # Lelapa AI / Vulavula (trial)
EXPO_PUBLIC_SUPABASE_URL=            # Supabase project URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=       # Supabase anon/public key
# Pollinations.ai needs NO key.
# ElevenLabs is used offline to pre-render intro audio — not called at runtime.
```

> Note: `EXPO_PUBLIC_*` vars are bundled into the client. Only put **public/anon** keys here. The
> Supabase anon key is safe *only* with Row-Level Security enabled (see [05](05-popia-compliance.md)).
> Gemini/Lelapa keys in a public bundle are acceptable for a hackathon demo but should move behind a
> Supabase Edge Function before any real public release — noted as a sustainability follow-up.

## Install notes

NativeWind, Lottie, Expo AV, Supabase, and WatermelonDB are added during Phase 1–2 as each feature
lands (not all upfront) to keep the dependency surface small and the app booting at every step. The
exact add commands live in [08-content-pipeline.md](08-content-pipeline.md) and the task backlog
([specs/tasks.md](../specs/tasks.md)).
