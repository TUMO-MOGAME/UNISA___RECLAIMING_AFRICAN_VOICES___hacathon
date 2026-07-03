// Botlhale AI Translation — used OFFLINE (pre-generation) to DRAFT translations of scene text into
// the SA languages we don't yet have human-reviewed copy for. Drafts are always labelled "unreviewed
// machine translation" in the UI (integrity rule / setswana-i18n skill) — never passed off as
// authoritative. Pre-generate + cache; never call at runtime during judging (rate limits).
//
// Contract confirmed from docs-apis.botlhale.xyz (/translate/v2, JSON):
//   POST {base}/translate/v2   Authorization: Bearer <token>   Content-Type: application/json
//   { org_id, text, language_code (source), target_code (target) }  ->  { translation, ... }
//
// Pure builder + parser (unit-tested, no imports) + a thin async caller.
// [NEEDS: confirm with Botlhale contact] the org_id value, and that language_code=source /
// target_code=target (the docs list both as optional).

export type BotlhaleTranslateRequest = {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: string; // JSON
};

const DEFAULT_BASE_URL = "https://api.botlhale.xyz";

/** Pure: build the HTTP request for a translation call. No I/O, no imports — testable. */
export function buildBotlhaleTranslateRequest(opts: {
  text: string;
  sourceCode: string;
  targetCode: string;
  orgId: string;
  apiKey: string;
  baseUrl?: string;
}): BotlhaleTranslateRequest {
  const base = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
  return {
    url: `${base}/translate/v2`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${opts.apiKey}`,
    },
    body: JSON.stringify({
      org_id: opts.orgId,
      text: opts.text,
      language_code: opts.sourceCode,
      target_code: opts.targetCode,
    }),
  };
}

/** Pure: pull the translated string out of the response (tolerant of v1/v2 casing). */
export function translationFromResponse(json: unknown): string | null {
  if (!json || typeof json !== "object") return null;
  const j = json as Record<string, unknown>;
  const val = j.translation ?? j.Translation;
  return typeof val === "string" && val.length > 0 ? val : null;
}

/** Async edge: translate `text` from source to target, or throw. */
export async function botlhaleTranslate(opts: {
  text: string;
  sourceCode: string;
  targetCode: string;
  orgId: string;
  apiKey: string;
  baseUrl?: string;
}): Promise<string> {
  const req = buildBotlhaleTranslateRequest(opts);
  const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
  if (!res.ok) throw new Error(`Botlhale translate ${res.status}`);
  const out = translationFromResponse(await res.json());
  if (!out) throw new Error("Botlhale translate: no translation in response");
  return out;
}
