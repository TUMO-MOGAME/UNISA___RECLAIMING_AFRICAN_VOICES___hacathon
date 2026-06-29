# 08 — Content Pipeline & Build Notes

How a real text becomes a playable cinematic module, plus the concrete commands to wire each dependency
as we reach it.

## Content-as-data: the module shape

Each literary module is a typed object in `app/src/content/`. Content is **data, not code** — reviewable
by non-developers, and the unit that earns Humanities Depth.

```ts
// app/src/content/types.ts (shape)
export type Scene = {
  id: string;
  title: { en: string; tn: string };          // tn = Setswana
  text: { en: string; tn: string };            // Adult reading level (faithful to source)
  childText: { en: string; tn: string };       // Child reading level (tone only — facts unchanged)
  imagePrompt: string;                          // base prompt for Pollinations (enriched by Gemini)
  seed: number;                                 // stable seed → consistent, cacheable image
  sourceNote: string;                           // chapter/citation this scene is grounded in
};

export type Module = {
  id: "mhudi" | "ityala-lamawele" | "indaba" | "vilakazi";
  title: string;
  author: string;
  year: number;
  source: string;                               // full text title + citation
  blurb: { en: string; tn: string };
  audience: string;
  scenes: Scene[];
  references: string[];                         // pointers into docs/09-research-summary.md
};
```

## Authoring workflow (per scene)

1. **Ground it:** pick a real passage/chapter from the text (see [04](04-humanities-sources.md)); record
   the citation in `sourceNote`. No source → don't write the scene.
2. **Adult text:** faithful prose adaptation (concise, accurate, dignified).
3. **Child text:** Gemini-assisted simplification — *tone only, facts unchanged* — then human-checked.
4. **Image prompt:** a short evocative prompt; Gemini expands it; set a fixed `seed`.
5. **Translate:** Setswana draft (Gemini-assisted) → human review.
6. **Review against the integrity rule** ([AGENTS.md](../AGENTS.md)) before commit.

## Dependency wiring (add as you reach each feature — keep the app booting)

```bash
# Phase 1 — styling + reader
cd app
npx expo install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
npx tailwindcss init                 # then configure content globs + presets (NativeWind)
npx expo install lottie-react-native expo-image

# Phase 2 — recording, offline, backend
npx expo install expo-av expo-file-system
npx expo install @nozbe/watermelondb @morrowdigital/watermelondb-expo-plugin
npm install @supabase/supabase-js @react-native-async-storage/async-storage

# i18n
npm install i18next react-i18next
```

> NativeWind needs `babel.config.js` + `metro.config.js` + `tailwind.config.js` set correctly for
> web↔native parity (the known cross-platform gotcha). Lock this in Phase 1 and test on web **and**
> Expo Go before moving on.

## Caching strategy

- **Images:** `expo-image` has built-in disk caching; key by the Pollinations URL (prompt+seed make it
  stable). Optionally pre-fetch the next scene.
- **Gemini text:** pre-generate Child/translation text at author time and **commit it into the content
  file** — zero runtime calls during judging.
- **Audio (community):** local file first; upload on consent + connectivity.

## "Wow" without runtime cost

Pre-render the few hero images and the ElevenLabs intro **once**, commit them to `assets/`, and let
Pollinations handle the long-tail scenes live (cached). The demo looks rich and never hits a quota wall.
