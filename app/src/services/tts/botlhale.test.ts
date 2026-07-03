import { test } from "node:test";
import assert from "node:assert/strict";
import { buildBotlhaleTtsRequest, audioUriFromResponse } from "./botlhale.ts";

test("builds a POST to /tts with bearer auth and a form-encoded body", () => {
  const req = buildBotlhaleTtsRequest({
    text: "Dumela",
    languageCode: "tn-ZA",
    apiKey: "secret-token",
  });
  assert.equal(req.method, "POST");
  assert.equal(req.url, "https://api.botlhale.xyz/tts");
  assert.equal(req.headers.Authorization, "Bearer secret-token");
  assert.equal(req.headers["Content-Type"], "application/x-www-form-urlencoded");
  // form fields per Botlhale's documented curl/python examples
  const form = new URLSearchParams(req.body);
  assert.equal(form.get("text_msg"), "Dumela");
  assert.equal(form.get("language_code"), "tn-ZA");
});

test("url-encodes text with special characters", () => {
  const req = buildBotlhaleTtsRequest({
    text: "Xa ufuna & cofa iqhosha?",
    languageCode: "xh-ZA",
    apiKey: "k",
  });
  assert.equal(new URLSearchParams(req.body).get("text_msg"), "Xa ufuna & cofa iqhosha?");
});

test("honours the api-dev host and trims trailing slashes", () => {
  const req = buildBotlhaleTtsRequest({
    text: "hi",
    languageCode: "en-ZA",
    apiKey: "k",
    baseUrl: "https://api-dev.botlhale.xyz/",
  });
  assert.equal(req.url, "https://api-dev.botlhale.xyz/tts");
});

test("reads audio from a remote-URL response (snake or camel case)", () => {
  assert.equal(audioUriFromResponse({ audioUrl: "https://cdn/x.mp3" }), "https://cdn/x.mp3");
  assert.equal(audioUriFromResponse({ audio_url: "https://cdn/y.mp3" }), "https://cdn/y.mp3");
});

test("wraps a bare base64 payload as a data URI", () => {
  assert.equal(audioUriFromResponse({ audioContent: "AAAA" }), "data:audio/mp3;base64,AAAA");
});

test("passes through an already-formed data URI untouched", () => {
  const uri = "data:audio/wav;base64,ZZZZ";
  assert.equal(audioUriFromResponse({ audio: uri }), uri);
});

test("returns null when there is no audio (so the caller falls back)", () => {
  assert.equal(audioUriFromResponse({}), null);
  assert.equal(audioUriFromResponse(null), null);
  assert.equal(audioUriFromResponse("nope"), null);
});
