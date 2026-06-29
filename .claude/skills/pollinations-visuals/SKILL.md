---
name: pollinations-visuals
description: How Maloba generates cinematic scene images with Pollinations.ai (free, key-less, URL-based). Use WHENEVER building or editing the Reader/SceneImage components, writing image prompts, wiring the pollinations service, or anything to do with generating/caching/falling-back scene visuals. Keeps the "cinematic graphic novel" look working within free-tier rate limits.
---

# Pollinations Visuals — cinematic, free, key-less

Pollinations.ai turns a text prompt into an image via a plain URL — **no API key, no SDK, no backend.**
It is the visual differentiator. (See [docs/03-ai-pipeline.md](../../../docs/03-ai-pipeline.md).)

## The one correct way to build the URL

```ts
// app/src/services/pollinations.ts
export function sceneImageUrl(prompt: string, opts?: { w?: number; h?: number; seed?: number }) {
  const { w = 1024, h = 1024, seed } = opts ?? {};
  const p = encodeURIComponent(prompt);
  const s = seed != null ? `&seed=${seed}` : "";
  return `https://image.pollinations.ai/prompt/${p}?model=flux&width=${w}&height=${h}${s}`;
}
```

## Rules

1. **Build the URL on the client. Never put a backend in front of it** — that defeats the point.
2. **Always pass a stable `seed`** per scene (store it in the scene data). Same seed → same image →
   cacheable + consistent across reloads.
3. **Render with `expo-image`** (disk cache built in), full-bleed, `resizeMode="cover"`, with a Lottie
   shimmer placeholder while loading.
4. **Always provide a scrim/gradient** behind overlaid text so it stays legible (accessibility).
5. **Always have a fallback:** on error, show a bundled static image — never a hung spinner or crash.
6. **Cache, don't re-fetch.** The same scene must not hit the network twice (low-data + rate-limit).
7. **Honesty:** label every generated image an *artistic interpretation* — never a historical photo or
   a real person ([humanities-grounding](../humanities-grounding/SKILL.md)).

## Prompt style that looks cinematic + grounded

Short evocative base prompt in the scene data; let Gemini expand it. Aim for:
`"<subject + action>, <Southern African setting>, cinematic, dramatic lighting, rich color, 4k,
historically grounded, artistic interpretation"`. Avoid naming real living people.

## Pre-render the heroes

For the home gallery + a couple of signature scenes, generate once and commit the image to
`app/assets/` so the first impression is instant and quota-free. Let the long tail generate live.
