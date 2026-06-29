# 01 — Architecture

## One codebase, three targets

Maloba is a single **Expo / React Native** app that compiles to **web, Android, and iOS** from one
TypeScript codebase. This is the core accessibility + sustainability bet: a judge can open it in a
browser, and a community member can run it on a cheap Android phone, with no separate builds.

```
┌──────────────────────────────────────────────────────────────┐
│                     Maloba (Expo app)                        │
│  web · Android · iOS — one codebase, NativeWind styling       │
├──────────────────────────────────────────────────────────────┤
│  UI layer                                                     │
│   • Home gallery (four pillars + Community Archive)           │
│   • Cinematic Reader (bg image + overlaid text + controls)    │
│   • Mode toggle (Child / Adult)   • Language toggle (ST/EN/…) │
│   • Community Archive (record · consent · list · delete)      │
│   • About the Sources (credits + references)                  │
├──────────────────────────────────────────────────────────────┤
│  Domain / content layer                                       │
│   • Literary modules = structured JSON (scenes, text, prompts)│
│   • Story state (current module, scene, mode, language)       │
├──────────────────────────────────────────────────────────────┤
│  Services layer (thin clients, all swappable)                 │
│   • pollinations  → cinematic scene images (URL, no key)      │
│   • gemini        → Child/Adult tone adaptation + prompts     │
│   • lelapa        → indigenous STT + translation              │
│   • elevenlabs    → static intro narration (pre-rendered mp3) │
│   • supabase      → auth, storage, Postgres (cloud archive)   │
├──────────────────────────────────────────────────────────────┤
│  Persistence                                                  │
│   • WatermelonDB (SQLite) — offline-first local store         │
│   • Sync engine → Supabase when online (stretch)              │
└──────────────────────────────────────────────────────────────┘
```

## Folder layout (inside `app/`)

```
app/
  App.tsx                  # entry; providers + root navigation
  index.ts                 # Expo registerRootComponent
  src/
    content/               # the humanities — structured story data (JSON/TS)
      mhudi.ts
      ityala-lamawele.ts
      indaba.ts
      vilakazi.ts
      index.ts             # registry of all modules
    components/            # CinematicReader, SceneImage, ModeToggle, LanguageToggle, ConsentSheet…
    screens/               # HomeGallery, ModuleScreen, ReaderScreen, ArchiveScreen, AboutSourcesScreen
    services/              # pollinations.ts, gemini.ts, lelapa.ts, elevenlabs.ts, supabase.ts
    i18n/                  # setswana + english strings; language context
    db/                    # WatermelonDB schema + models + sync
    theme/                 # colors, spacing, typography tokens (the cinematic look)
    state/                 # story + settings context/stores
  assets/                  # fonts, lottie, pre-rendered intro audio, static fallbacks
  .env                     # keys (gitignored)
  .env.example
```

## Key principles

- **Content is data, not code.** Each literary module is a structured object (title, author, source,
  scenes[] with `text`, `childText`, `imagePrompt`, `setswana`). New stories = new data files. This
  keeps the humanities legible and reviewable, and lets non-developers contribute content.
- **Services are thin and swappable.** Every external API sits behind a small typed function. If
  Pollinations is down we fall back to a bundled static image; if Gemini is rate-limited we use
  pre-generated Child text. The app degrades, never crashes.
- **Offline-first.** Reading content ships with the app (or caches on first load). The Community
  Archive writes locally first (zero latency), then syncs when a connection exists.
- **Graceful degradation everywhere** — see [07-accessibility.md](07-accessibility.md).

## Data flow: rendering a cinematic scene

1. Reader opens scene *N* of a module from local content.
2. It builds a Pollinations URL from `scene.imagePrompt` (optionally enriched by Gemini) and renders it
   as a full-bleed background `<Image>`, with a Lottie shimmer as placeholder while it loads.
3. Overlaid text shows `scene.text` (Adult) or `scene.childText` (Child), in the selected language.
4. Generated image URLs are cached so the same scene never re-fetches (low-data + rate-limit safety).

## Data flow: recording a community story

1. User taps **Record** → **POPIA consent sheet** appears (must opt in; choose private/public).
2. On consent, mic records to a local file (Expo AV); metadata written to WatermelonDB immediately.
3. (Stretch, online) audio uploads to Supabase Storage with Row-Level Security; Lelapa transcribes;
   transcript saved back. User can mark public or **delete** (erasure) at any time.
