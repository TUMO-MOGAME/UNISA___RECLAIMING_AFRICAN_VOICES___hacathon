// Botlhale AI TTS provider — real indigenous-language neural speech (incl. Setswana).
// https://botlhale.ai/apis · docs: https://docs-apis.botlhale.xyz
//
// Contract confirmed from the public docs:
//   POST https://api.botlhale.xyz/tts   (form-encoded)   Authorization: Bearer <token>
//   body:  text_msg=<text>&language_code=<xx-ZA>
//   200 -> JSON { audio_url, language_code, text, sampling_rate, date_received }
//
// Split in two: a PURE request builder (unit-tested under `node --test`, no imports) and a thin
// async `botlhaleSynthesize` that performs the fetch. Any failure is thrown so the caller can
// fall back to on-device speech — the Listen button must never dead-end.
//
// [NEEDS: confirm with Botlhale contact] three residual unknowns:
//   1. Field name — docs prose says `text`, the curl/python examples say `text_msg`. Using `text_msg`.
//   2. Host — examples use `api-dev.botlhale.xyz`; prod is `api.botlhale.xyz`. Using prod as default.
//   3. Auth — the token is an IdToken exchanged from a refresh_token via `/auth/generate`; for the
//      demo we accept a ready bearer token in EXPO_PUBLIC_BOTLHALE_API_KEY. Refresh flow = later.

export type BotlhaleTtsRequest = {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: string; // application/x-www-form-urlencoded
};

const DEFAULT_BASE_URL = "https://api.botlhale.xyz";

/** Pure: build the HTTP request for a TTS synthesis call. No I/O, no imports — testable. */
export function buildBotlhaleTtsRequest(opts: {
  text: string;
  languageCode: string;
  apiKey: string;
  baseUrl?: string;
}): BotlhaleTtsRequest {
  const base = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const form = new URLSearchParams();
  form.set("text_msg", opts.text);
  form.set("language_code", opts.languageCode);
  return {
    url: `${base}/tts`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: form.toString(),
  };
}

/** Pure: normalise whatever the API returns into a playable URI (remote URL or base64 data URI). */
export function audioUriFromResponse(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const j = json as Record<string, unknown>;
  const url = j.audioUrl ?? j.audio_url ?? j.url;
  if (typeof url === "string" && url.length > 0) return url;
  const b64 = j.audioContent ?? j.audio_content ?? j.audio;
  if (typeof b64 === "string" && b64.length > 0) {
    return b64.startsWith("data:") ? b64 : `data:audio/mp3;base64,${b64}`;
  }
  return null;
}

/** Async edge: call Botlhale and return a playable audio URI, or throw so the caller can fall back. */
export async function botlhaleSynthesize(opts: {
  text: string;
  languageCode: string;
  apiKey: string;
  baseUrl?: string;
}): Promise<string> {
  const req = buildBotlhaleTtsRequest(opts);
  const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
  if (!res.ok) throw new Error(`Botlhale TTS ${res.status}`);
  const uri = audioUriFromResponse(await res.json());
  if (!uri) throw new Error("Botlhale TTS: no audio in response");
  return uri;
}
