import { test } from "node:test";
import assert from "node:assert/strict";
import { buildBotlhaleTranslateRequest, translationFromResponse } from "./botlhale.ts";

test("builds a JSON POST to /translate/v2 with bearer auth", () => {
  const req = buildBotlhaleTranslateRequest({
    text: "Yesterday",
    sourceCode: "en-ZA",
    targetCode: "zu-ZA",
    orgId: "org-123",
    apiKey: "tok",
  });
  assert.equal(req.method, "POST");
  assert.equal(req.url, "https://api.botlhale.xyz/translate/v2");
  assert.equal(req.headers.Authorization, "Bearer tok");
  assert.equal(req.headers["Content-Type"], "application/json");
  assert.deepEqual(JSON.parse(req.body), {
    org_id: "org-123",
    text: "Yesterday",
    language_code: "en-ZA",
    target_code: "zu-ZA",
  });
});

test("honours a custom base URL and trims trailing slashes", () => {
  const req = buildBotlhaleTranslateRequest({
    text: "hi",
    sourceCode: "en-ZA",
    targetCode: "xh-ZA",
    orgId: "o",
    apiKey: "k",
    baseUrl: "https://api-dev.botlhale.xyz/",
  });
  assert.equal(req.url, "https://api-dev.botlhale.xyz/translate/v2");
});

test("reads the translation from v2 (lower) and v1 (capitalised) responses", () => {
  assert.equal(translationFromResponse({ translation: "Izolo" }), "Izolo");
  assert.equal(translationFromResponse({ Translation: "Izolo" }), "Izolo");
});

test("returns null when there is no translation", () => {
  assert.equal(translationFromResponse({}), null);
  assert.equal(translationFromResponse(null), null);
  assert.equal(translationFromResponse("nope"), null);
});
