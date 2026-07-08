// Gemini text generation for the "Ask Ubuntu" chatbot — the conversational Q&A path when a Gemini key
// is present (EXPO_PUBLIC_GEMINI_API_KEY) and no Anthropic key is set. Navigation is handled
// deterministically BEFORE the LLM (see agent.ts), so Gemini only writes the grounded prose answer.
//
// Pure request builder + response parser (unit-tested, no imports) + a thin async caller — mirrors
// services/images/gemini.ts. Contract (Google Generative Language API):
//   POST .../v1beta/models/<model>:generateContent?key=KEY
//   { systemInstruction:{parts:[{text}]}, contents:[{role,parts:[{text}]}], generationConfig:{...} }
//   -> candidates[0].content.parts[].text

export const DEFAULT_CHAT_MODEL = "gemini-2.5-flash";

export type GeminiTurn = { role: "user" | "model"; text: string };

export type GeminiChatRequest = {
  url: string;
  method: "POST";
  headers: Record<string, string>;
  body: string;
};

export function buildGeminiChatRequest(opts: {
  apiKey: string;
  system: string;
  turns: GeminiTurn[];
  model?: string;
  maxOutputTokens?: number;
}): GeminiChatRequest {
  const model = opts.model || DEFAULT_CHAT_MODEL;
  return {
    url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(opts.apiKey)}`,
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: opts.system }] },
      contents: opts.turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
      // thinkingBudget:0 — Gemini 2.5 "thinking" models otherwise spend the output budget on internal
      // reasoning and return EMPTY text for short answers. This chatbot wants the answer, not thoughts.
      generationConfig: {
        maxOutputTokens: opts.maxOutputTokens ?? 900,
        temperature: 0.4,
        thinkingConfig: { thinkingBudget: 0 },
      },
    }),
  };
}

/** Pure: join the text parts of the first candidate (empty string if none / blocked). */
export function textFromGeminiResponse(json: unknown): string {
  const cands = (json as any)?.candidates;
  if (!Array.isArray(cands) || cands.length === 0) return "";
  const parts = cands[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts
    .map((p: any) => (typeof p?.text === "string" ? p.text : ""))
    .join("")
    .trim();
}

/** Async edge: returns the generated text, or "" on any error (caller falls back to retrieval). */
export async function geminiChat(opts: {
  apiKey: string;
  system: string;
  turns: GeminiTurn[];
  model?: string;
  maxOutputTokens?: number;
}): Promise<string> {
  try {
    const req = buildGeminiChatRequest(opts);
    const res = await fetch(req.url, { method: req.method, headers: req.headers, body: req.body });
    if (!res.ok) return "";
    return textFromGeminiResponse(await res.json());
  } catch {
    return "";
  }
}
