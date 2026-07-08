import { test } from "node:test";
import assert from "node:assert/strict";
import { buildGeminiChatRequest, textFromGeminiResponse, DEFAULT_CHAT_MODEL } from "./gemini.ts";

test("buildGeminiChatRequest targets generateContent with the key + system + mapped turns", () => {
  const req = buildGeminiChatRequest({
    apiKey: "k e y/&",
    system: "SYSTEM RULES",
    turns: [
      { role: "user", text: "hi" },
      { role: "model", text: "hello" },
      { role: "user", text: "who is Sol Plaatje?" },
    ],
  });
  assert.match(req.url, new RegExp(`/models/${DEFAULT_CHAT_MODEL}:generateContent\\?key=`));
  assert.ok(req.url.includes(encodeURIComponent("k e y/&")), "api key is url-encoded");
  const body = JSON.parse(req.body);
  assert.equal(body.systemInstruction.parts[0].text, "SYSTEM RULES");
  assert.equal(body.contents.length, 3);
  assert.deepEqual(body.contents[0], { role: "user", parts: [{ text: "hi" }] });
  assert.equal(body.contents[1].role, "model");
});

test("textFromGeminiResponse joins candidate text parts", () => {
  const json = { candidates: [{ content: { parts: [{ text: "Mhudi " }, { text: "was a novel." }] } }] };
  assert.equal(textFromGeminiResponse(json), "Mhudi was a novel.");
});

test("textFromGeminiResponse returns empty string when blocked / no candidates", () => {
  assert.equal(textFromGeminiResponse({ candidates: [] }), "");
  assert.equal(textFromGeminiResponse({}), "");
  assert.equal(textFromGeminiResponse(null), "");
});
