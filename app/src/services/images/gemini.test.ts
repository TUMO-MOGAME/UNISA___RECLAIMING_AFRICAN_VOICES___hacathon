import { test } from "node:test";
import assert from "node:assert/strict";
import { buildGeminiImageRequest, imageDataFromResponse, DEFAULT_IMAGE_MODEL } from "./gemini.ts";

test("builds a generateContent POST with the key in the query and IMAGE modality", () => {
  const req = buildGeminiImageRequest({ prompt: "a baobab at dawn", apiKey: "k&y" });
  assert.equal(req.method, "POST");
  assert.ok(req.url.includes(`/models/${DEFAULT_IMAGE_MODEL}:generateContent`));
  assert.ok(req.url.includes("key=k%26y")); // key is url-encoded
  const body = JSON.parse(req.body);
  assert.equal(body.contents[0].parts[0].text, "a baobab at dawn");
  assert.deepEqual(body.generationConfig.responseModalities, ["IMAGE"]);
});

test("honours a custom model", () => {
  const req = buildGeminiImageRequest({ prompt: "x", apiKey: "k", model: "imagen-test" });
  assert.ok(req.url.includes("/models/imagen-test:generateContent"));
});

test("extracts inline image data (camelCase)", () => {
  const img = imageDataFromResponse({
    candidates: [{ content: { parts: [{ inlineData: { mimeType: "image/png", data: "AAAA" } }] } }],
  });
  assert.deepEqual(img, { mimeType: "image/png", base64: "AAAA" });
});

test("extracts inline image data (snake_case) and skips text parts", () => {
  const img = imageDataFromResponse({
    candidates: [{ content: { parts: [{ text: "here you go" }, { inline_data: { mime_type: "image/jpeg", data: "BBBB" } }] } }],
  });
  assert.deepEqual(img, { mimeType: "image/jpeg", base64: "BBBB" });
});

test("returns null when there is no image", () => {
  assert.equal(imageDataFromResponse({ candidates: [{ content: { parts: [{ text: "no image" }] } }] }), null);
  assert.equal(imageDataFromResponse({}), null);
  assert.equal(imageDataFromResponse(null), null);
});
