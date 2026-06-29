# 03 — AI Pipeline

Four AI services, each used for exactly what it's best at. **AI is subordinate to the humanities** —
it amplifies the texts, it never replaces or invents them.

## 1. Gemini Flash — narrative adaptation (text → text)

**Job:** turn dense early-20th-century prose into an accessible reading level *without changing the
facts*, and enrich image prompts.

- **Child Mode:** "Rewrite this passage for a 10-year-old in simple, warm language. Keep every fact,
  name, and event accurate. Do not add events that aren't in the text." → `scene.childText`.
- **Translation assist:** draft Setswana/other-language renderings for review (human-checked before
  shipping — machine translation of literary text is a *draft*, not authority).
- **Prompt engineering:** expand a short `imagePrompt` into a rich, comma-separated Pollinations prompt
  ("cinematic, dramatic lighting, 4k, historically grounded Southern African setting, …").

**Discipline:** temperature low for faithfulness; **pre-generate and cache** Child text per scene so we
don't call Gemini live during judging (rate-limit safety). Cached output is reviewed against the source
(integrity rule, [AGENTS.md](../AGENTS.md)).

## 2. Pollinations.ai — cinematic visuals (text → image)

**Job:** render each scene as a full-bleed background image, making the app a living graphic novel.

```ts
// services/pollinations.ts (shape)
export function sceneImageUrl(prompt: string, opts?: { w?: number; h?: number; seed?: number }) {
  const p = encodeURIComponent(prompt);
  const { w = 1024, h = 1024, seed } = opts ?? {};
  const s = seed != null ? `&seed=${seed}` : "";
  return `https://image.pollinations.ai/prompt/${p}?model=flux&width=${w}&height=${h}${s}`;
}
```

- **No key, no backend.** Build the URL on the client, render in `<Image>`.
- **Stable `seed` per scene** so the same scene always looks the same (consistency + caching).
- **Cache** the resolved image (file cache) so it never re-fetches — low-data + rate-limit safety.
- **Fallback:** if the request fails, show a bundled static image and a Lottie shimmer; never block.
- **Honesty:** every generated image is labelled an *artistic interpretation*, never a historical
  photo or a real person (integrity rule).

## 3. ElevenLabs — cinematic intro narration (static only)

**Job:** one emotive English (and one Setswana) intro line that plays on first open — the "wow" moment.

- Generated **once, offline**, saved as mp3 in `assets/audio/`. **Never called at runtime** (10k
  char/month cap). This preserves the cinematic quality without risking the quota during judging.

## 4. Lelapa AI / Vulavula — indigenous voice (speech → text, text → text)

**Job:** the Community Archive engine. Transcribe and translate recorded oral histories in SA
languages, including **code-switching** (the authentic way people actually speak) — something Western
STT models handle poorly.

- Flow: record locally → (on consent + online) POST audio to Vulavula transcribe → store transcript →
  optional translate. See [01-architecture.md](01-architecture.md) and [05](05-popia-compliance.md).
- This is the decolonial heart: indigenous languages treated as **first-class**, by an African-built
  model.

## The end-to-end "magic" pipeline (one sentence)

> A real passage from *Indaba, My Children* → **Gemini** adapts it to the reader's level & language →
> **Gemini** expands its image prompt → **Pollinations** renders a cinematic scene → the user reads it
> over the image → and in the Community Archive, **Lelapa** turns their own elder's spoken story into
> preserved, searchable text.

## Caching & quota table

| Service | Live at runtime? | Cache key | Fallback |
|---------|------------------|-----------|----------|
| Pollinations | yes (first view) | module+scene+seed | bundled static image |
| Gemini Child/translate | **pre-generated** | module+scene+mode+lang | ship cached text |
| ElevenLabs | **never** (static) | — | — |
| Lelapa | on record + online | recording id | queue + retry when online |
