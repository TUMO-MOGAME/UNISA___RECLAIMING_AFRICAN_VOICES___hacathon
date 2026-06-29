// Pollinations.ai — free, key-less, URL-based cinematic image generation.
// See .claude/skills/pollinations-visuals + docs/03-ai-pipeline.md.
// Build the URL on the client. Never put a backend in front of it. Always pass a stable seed.

export function sceneImageUrl(
  prompt: string,
  opts: { w?: number; h?: number; seed?: number } = {}
): string {
  const { w = 1024, h = 1024, seed } = opts;
  const p = encodeURIComponent(prompt);
  const s = seed != null ? `&seed=${seed}` : "";
  return `https://image.pollinations.ai/prompt/${p}?model=flux&width=${w}&height=${h}${s}&nologo=true`;
}
