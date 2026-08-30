// ElevenLabs TTS provider — the narration voice for the languages ElevenLabs actually speaks.
// https://elevenlabs.io/docs/api-reference/text-to-speech
//
// Contract confirmed against the live API on 30 Aug 2026 (key validated, audio returned):
//   POST https://api.elevenlabs.io/v1/text-to-speech/{voice_id}?output_format=mp3_22050_32
//   headers: xi-api-key: <key>, Content-Type: application/json
//   body:    { text, model_id, language_code? }
//   200 -> raw MP3 BYTES (not JSON — this is the one real difference from the Botlhale provider,
//          which returns a URL in a JSON envelope).
//
// TWO THINGS THIS FILE REFUSES TO DO, both deliberate:
//
// 1. IT WILL NOT SPEAK A LANGUAGE ELEVENLABS DOES NOT KNOW. `GET /v1/models` lists English and
//    Afrikaans of our eleven and none of the nine indigenous languages. The API does not reject
//    unsupported text — it returns fluent, confident, wrong pronunciation. Shipping that as the
//    voice of Setswana literature would be the exact harm AGENTS.md §4 exists to prevent, so
//    `elevenLabsSynthesize` throws on an unsupported language rather than producing something.
//    The selector should not route those languages here in the first place; this is the second lock.
//
// 2. IT WILL NOT SILENTLY BURN THE QUOTA. The account is on the starter tier: 40 000 characters a
//    month, and the four literary modules are ~15 700 characters of English prose alone. One
//    unguarded loop over the content would spend the month. So there is a hard per-request character
//    ceiling here, and every clip the app plays goes through the cache in ./cache.ts — the same
//    passage is never paid for twice.
//
// Split the same way as botlhale.ts: a PURE request builder with no imports and no I/O (unit-tested
// under `node --test`), and a thin async edge that performs the fetch and throws on any failure so
// useTts can fall back.

import { toElevenLabsCode, type LangCode } from "../../i18n/languages.ts";

/**
 * Amara — Warm African-British, professional, South African accent. Chosen with Tumo on 30 Aug 2026
 * from the four South African voices on the account (also Declan – SA News, Andreas, Travis).
 * A warm storyteller register rather than a news register, because this narrates literature.
 */
export const DEFAULT_VOICE_ID = "fFAtoTPtP0TtMyhbR3L9";

/**
 * 32 kbps mono MP3. Speech, not music — and PWA-06 measured what generosity costs a reader on a
 * metered line. The same line came back as 34 KB at 128 kbps and 6 KB at 32 kbps; a whole passage is
 * the difference between ~950 KB and ~220 KB. `mp3_22050_32` is available on every tier.
 */
export const OUTPUT_FORMAT = "mp3_22050_32";

/**
 * Model per language. `eleven_multilingual_v2` is the well-understood choice for English narration;
 * Afrikaans appears only in the v3 family, so Afrikaans needs `eleven_v3`.
 */
const MODEL_BY_LANG: Partial<Record<LangCode, string>> = {
  en: "eleven_multilingual_v2",
  af: "eleven_v3",
};

/** A single request may not exceed this. A guard against a caller looping the whole library. */
export const MAX_CHARS_PER_REQUEST = 2500;

export type ElevenLabsTtsRequest = {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: string; // application/json
};

const DEFAULT_BASE_URL = "https://api.elevenlabs.io";

/** Pure: build the HTTP request for a synthesis call. No I/O — testable. */
export function buildElevenLabsTtsRequest(opts: {
  text: string;
  languageCode: string;
  modelId: string;
  apiKey: string;
  voiceId?: string;
  baseUrl?: string;
}): ElevenLabsTtsRequest {
  const base = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
  const voice = opts.voiceId || DEFAULT_VOICE_ID;
  return {
    url: `${base}/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=${OUTPUT_FORMAT}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "xi-api-key": opts.apiKey,
    },
    body: JSON.stringify({
      text: opts.text,
      model_id: opts.modelId,
      language_code: opts.languageCode,
    }),
  };
}

/** Pure: which model voices this language, or null if ElevenLabs does not speak it at all. */
export function modelFor(lang: LangCode): string | null {
  return MODEL_BY_LANG[lang] ?? null;
}

/**
 * Pure: everything that has to be true before a request is worth making. Returns the reason it is
 * not, so the caller (and the tests) can be specific rather than swallowing a generic failure.
 */
export function refuseReason(opts: { lang: LangCode; text: string; apiKey: string }): string | null {
  if (!opts.apiKey) return "no API key";
  const trimmed = opts.text.trim();
  if (!trimmed) return "empty text";
  if (trimmed.length > MAX_CHARS_PER_REQUEST) {
    return `text is ${trimmed.length} characters, over the ${MAX_CHARS_PER_REQUEST} limit`;
  }
  if (!toElevenLabsCode(opts.lang)) {
    return `ElevenLabs does not speak ${opts.lang} — it would mispronounce it confidently`;
  }
  if (!modelFor(opts.lang)) return `no ElevenLabs model mapped for ${opts.lang}`;
  return null;
}

/** Pure: MP3 bytes -> a data URI the audio player can take straight. */
export function bytesToDataUri(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  // Chunked so a long clip cannot blow the argument limit of String.fromCharCode.
  const CHUNK = 0x8000;
  for (let i = 0; i < view.length; i += CHUNK) {
    binary += String.fromCharCode(...view.subarray(i, i + CHUNK));
  }
  const b64 =
    typeof btoa === "function"
      ? btoa(binary)
      : // eslint-disable-next-line no-undef
        Buffer.from(view).toString("base64");
  return `data:audio/mpeg;base64,${b64}`;
}

/**
 * Async edge: synthesise and return a playable data URI, or THROW so useTts falls back to the next
 * engine. Every refusal above is a throw too — a caller must never get silence it mistakes for audio.
 */
export async function elevenLabsSynthesize(opts: {
  text: string;
  lang: LangCode;
  apiKey: string;
  voiceId?: string;
  baseUrl?: string;
}): Promise<string> {
  const refusal = refuseReason(opts);
  if (refusal) throw new Error(`ElevenLabs TTS refused: ${refusal}`);

  const req = buildElevenLabsTtsRequest({
    text: opts.text.trim(),
    languageCode: toElevenLabsCode(opts.lang) as string,
    modelId: modelFor(opts.lang) as string,
    apiKey: opts.apiKey,
    voiceId: opts.voiceId,
    baseUrl: opts.baseUrl,
  });

  const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
  if (!res.ok) {
    // 401 bad key · 422 bad voice/model · 429 quota exhausted. All are "fall back", not "crash".
    throw new Error(`ElevenLabs TTS ${res.status}`);
  }
  const buf = await res.arrayBuffer();
  if (!buf || buf.byteLength === 0) throw new Error("ElevenLabs TTS: empty audio");
  return bytesToDataUri(buf);
}
