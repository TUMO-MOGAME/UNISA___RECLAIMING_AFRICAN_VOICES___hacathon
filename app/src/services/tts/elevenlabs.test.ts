import { test } from "node:test";
import assert from "node:assert/strict";
import {
  buildElevenLabsTtsRequest,
  refuseReason,
  modelFor,
  bytesToDataUri,
  DEFAULT_VOICE_ID,
  OUTPUT_FORMAT,
  MAX_CHARS_PER_REQUEST,
} from "./elevenlabs.ts";
import { LANGUAGES } from "../../i18n/languages.ts";

const KEY = "sk_test_key";

test("builds a JSON POST to /v1/text-to-speech/{voice} with the xi-api-key header", () => {
  const req = buildElevenLabsTtsRequest({
    text: "Yesterday speaks.",
    languageCode: "en",
    modelId: "eleven_multilingual_v2",
    apiKey: KEY,
  });
  assert.equal(req.method, "POST");
  assert.equal(
    req.url,
    `https://api.elevenlabs.io/v1/text-to-speech/${DEFAULT_VOICE_ID}?output_format=${OUTPUT_FORMAT}`
  );
  assert.equal(req.headers["xi-api-key"], KEY);
  assert.equal(req.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(req.body), {
    text: "Yesterday speaks.",
    model_id: "eleven_multilingual_v2",
    language_code: "en",
  });
});

test("the key travels in a header, never in the URL", () => {
  const req = buildElevenLabsTtsRequest({ text: "hi", languageCode: "en", modelId: "m", apiKey: KEY });
  assert.equal(req.url.includes(KEY), false, "a key in a URL ends up in logs and referrers");
});

test("the output format is the low-bitrate one — 32 kbps, not 128", () => {
  // PWA-06 measured what generosity costs on a metered line: the same line is 34 KB at 128 kbps and
  // 6 KB at 32 kbps. If this ever changes, it should be a decision, not a drift.
  assert.equal(OUTPUT_FORMAT, "mp3_22050_32");
});

test("honours a custom base URL and trims trailing slashes", () => {
  const req = buildElevenLabsTtsRequest({
    text: "hi",
    languageCode: "en",
    modelId: "m",
    apiKey: KEY,
    baseUrl: "https://proxy.example.com///",
  });
  assert.ok(req.url.startsWith("https://proxy.example.com/v1/text-to-speech/"));
});

test("a voice id with awkward characters is encoded, not concatenated", () => {
  const req = buildElevenLabsTtsRequest({
    text: "hi",
    languageCode: "en",
    modelId: "m",
    apiKey: KEY,
    voiceId: "a/b?c",
  });
  assert.ok(req.url.includes("a%2Fb%3Fc"));
});

test("a model is mapped for exactly the languages ElevenLabs speaks", () => {
  for (const l of LANGUAGES) {
    const speaks = l.elevenlabs !== null;
    assert.equal(
      modelFor(l.code) !== null,
      speaks,
      `${l.code}: a model must exist iff ElevenLabs lists the language`
    );
  }
  assert.equal(modelFor("en"), "eleven_multilingual_v2");
  // Afrikaans appears only in the v3 family — multilingual_v2 does not carry it.
  assert.equal(modelFor("af"), "eleven_v3");
});

test("it refuses every language ElevenLabs cannot speak, and says why", () => {
  for (const l of LANGUAGES) {
    const reason = refuseReason({ lang: l.code, text: "Sengwe le sengwe.", apiKey: KEY });
    if (l.elevenlabs === null) {
      assert.match(
        String(reason),
        /does not speak/,
        `${l.code} must be refused — fluent mispronunciation is worse than no audio`
      );
    } else {
      assert.equal(reason, null, `${l.code} should be allowed through`);
    }
  }
});

test("it refuses a missing key, empty text, and a passage over the ceiling", () => {
  assert.match(String(refuseReason({ lang: "en", text: "hi", apiKey: "" })), /no API key/);
  assert.match(String(refuseReason({ lang: "en", text: "   ", apiKey: KEY })), /empty text/);

  const huge = "a".repeat(MAX_CHARS_PER_REQUEST + 1);
  assert.match(String(refuseReason({ lang: "en", text: huge, apiKey: KEY })), /over the/);
  // Exactly at the ceiling is allowed — the guard is against a runaway loop, not against long prose.
  assert.equal(refuseReason({ lang: "en", text: "a".repeat(MAX_CHARS_PER_REQUEST), apiKey: KEY }), null);
});

test("bytesToDataUri produces a playable audio data URI", () => {
  // "ID3" — the first three bytes of every MP3 the API returned in testing.
  const uri = bytesToDataUri(new Uint8Array([0x49, 0x44, 0x33, 0x04]));
  assert.equal(uri, "data:audio/mpeg;base64,SUQzBA==");
});

test("bytesToDataUri survives a clip long enough to blow a naive fromCharCode", () => {
  const big = new Uint8Array(200_000).fill(65);
  const uri = bytesToDataUri(big);
  assert.ok(uri.startsWith("data:audio/mpeg;base64,"));
  assert.equal(Buffer.from(uri.split(",")[1], "base64").length, 200_000);
});

test("bytesToDataUri accepts a raw ArrayBuffer as well as a view", () => {
  const view = new Uint8Array([1, 2, 3]);
  assert.equal(bytesToDataUri(view.buffer), bytesToDataUri(view));
});
