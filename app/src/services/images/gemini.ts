// Gemini image generation — used OFFLINE (build-time) to pre-render cinematic, dignified scene
// imagery, cached as local assets. NEVER called from the client at runtime: the API key is
// build-time-only and image gen costs quota (pre-generate + cache; see docs/03-ai-pipeline.md).
//
// Pure request builder + response parser (unit-tested, no imports) + a thin async caller. The
// offline script scripts/generate-scene-images.mjs uses these. Integrity rule: generated images are
// artistic interpretations, labelled as such — never fake photos of real named people.
//
// Contract (Google Generative Language API, image-capable model):
//   POST .../v1beta/models/<model>:generateContent?key=KEY
//   { contents:[{ parts:[{ text }] }], generationConfig:{ responseModalities:["IMAGE"] } }
//   -> candidates[0].content.parts[].inlineData { mimeType, data(base64) }
// [NEEDS: confirm the current image model name — defaults to gemini-2.5-flash-image.]

export const DEFAULT_IMAGE_MODEL = "gemini-2.5-flash-image";

export type GeminiImageRequest = {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: string; // JSON
};

export function buildGeminiImageRequest(opts: {
  prompt: string;
  apiKey: string;
  model?: string;
}): GeminiImageRequest {
  const model = opts.model || DEFAULT_IMAGE_MODEL;
  return {
    url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(opts.apiKey)}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: opts.prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
  };
}

export type GeneratedImage = { mimeType: string; base64: string };

/** Pure: pull the first inline image out of a generateContent response (camel or snake case). */
export function imageDataFromResponse(json: unknown): GeneratedImage | null {
  if (!json || typeof json !== "object") return null;
  const candidates = (json as any).candidates;
  if (!Array.isArray(candidates)) return null;
  for (const c of candidates) {
    const parts = c?.content?.parts;
    if (!Array.isArray(parts)) continue;
    for (const p of parts) {
      const inline = p?.inlineData ?? p?.inline_data;
      const data = inline?.data;
      if (typeof data === "string" && data.length > 0) {
        return { mimeType: inline.mimeType ?? inline.mime_type ?? "image/png", base64: data };
      }
    }
  }
  return null;
}

/** Async edge: generate an image, or throw so the script can log + skip. */
export async function geminiGenerateImage(opts: {
  prompt: string;
  apiKey: string;
  model?: string;
}): Promise<GeneratedImage> {
  const req = buildGeminiImageRequest(opts);
  const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
  if (!res.ok) throw new Error(`Gemini image ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const img = imageDataFromResponse(await res.json());
  if (!img) throw new Error("Gemini image: no image in response");
  return img;
}
