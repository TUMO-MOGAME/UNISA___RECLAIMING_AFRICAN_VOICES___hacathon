// The chatbot brain. Wraps the whole app in a conversational guide that (a) answers questions ONLY
// from the website's own grounded content (RAG over knowledge.ts) and (b) can take the user to any
// page (the navigate_to orchestrator tool). Built on Anthropic's official SDK with Claude tool use.
//
// (We originally wired this with LangChain; its tracing dependency `langsmith` crashes the Expo web
// dev server under Metro's Fast Refresh, so we moved to the Anthropic SDK — same agent design, works
// in dev AND production, lighter bundle.)
//
// Design for the demo (see the judging notes on "nothing gated behind keys"):
//   • Navigation ("take me to the provinces") is resolved DETERMINISTICALLY first — it needs no key
//     and no network, so the orchestrator always works.
//   • Q&A uses Claude when EXPO_PUBLIC_ANTHROPIC_API_KEY is present; without a key it still answers
//     from the site content (a plain retrieval answer), so the assistant is never dead.
//
// Model defaults to claude-opus-4-8; set EXPO_PUBLIC_CHATBOT_MODEL (e.g. claude-haiku-4-5) for a
// faster / cheaper chat widget. The key is client-side for the demo only — rotate it after the event.

import Anthropic from "@anthropic-ai/sdk";
import { buildKnowledge } from "./knowledge";
import { retrieve, matchNavigation } from "./retrieve";
import { PAGES, pageById } from "./pages";
import { languageByCode, type LangCode } from "../../i18n";

export type ChatTurn = { role: "user" | "assistant"; text: string };

export type ChatResult =
  | { type: "text"; text: string; sources: string[] }
  | { type: "navigate"; pageId: string; label: string; text: string };

const KEY =
  process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY || process.env.EXPO_PUBLIC_CLAUDE_API_KEY || "";
const MODEL = process.env.EXPO_PUBLIC_CHATBOT_MODEL || "claude-opus-4-8";

/** Whether the conversational (LLM) path is available. Navigation works regardless. */
export function chatbotHasKey(): boolean {
  return !!KEY;
}

// The orchestrator tool. Claude *asks* to navigate; we read the tool call and let the UI perform it.
const NAV_TOOL: Anthropic.Tool = {
  name: "navigate_to",
  description:
    "Open a page/section of the Ubuntu Heritage app for the user. Call this when the user asks to " +
    "go to, open, show, or visit a section. Valid page ids: " +
    PAGES.map((p) => `${p.id} (${p.label})`).join(", ") +
    ".",
  input_schema: {
    type: "object",
    properties: { page: { type: "string", description: "The id of the page to open, from the valid list." } },
    required: ["page"],
  },
};

const SYSTEM = (context: string, langName: string, endonym: string) =>
  `You are "Ubuntu", the friendly in-app guide for the app *Ubuntu Heritage · South Africa* — a ` +
  `cinematic, multilingual archive of South Africa's foundational literature and heritage.\n\n` +
  `RULES:\n` +
  `• Answer ONLY using the CONTEXT below. It is drawn from this website's own grounded, cited content.\n` +
  `• If the answer is not in the CONTEXT, say you don't have that on the site yet and point to a related ` +
  `section. NEVER invent history, dates, names, quotes, or sources — this project's rule is truth only.\n` +
  `• Keep replies short and warm: 2–4 sentences, plain language. Name the section the fact comes from.\n` +
  `• If the user wants to be taken somewhere, call the navigate_to tool instead of describing it.\n` +
  `• Write your reply in ${langName} (${endonym}). Keep proper nouns, titles, and cited source names ` +
  `in their original form. If you cannot write fluently in ${langName}, answer in English instead.\n\n` +
  `CONTEXT:\n${context}`;

const snippet = (s: string) => (s.length > 320 ? s.slice(0, 320).replace(/\s+\S*$/, "") + "…" : s);

/**
 * Ask the guide a question or give it a command. Returns either text to show or a navigation request
 * for the UI to perform.
 */
export async function askChatbot(
  query: string,
  history: ChatTurn[] = [],
  lang: LangCode = "en"
): Promise<ChatResult> {
  const q = query.trim();
  if (!q) return { type: "text", text: "Ask me anything about the app, or say e.g. 'take me to the provinces'.", sources: [] };

  // 1) Deterministic navigation — no key, no network.
  const nav = matchNavigation(q, PAGES);
  if (nav) return { type: "navigate", pageId: nav.id, label: nav.label, text: `Opening ${nav.label}…` };

  // 2) Ground the answer in the site's content.
  const kb = buildKnowledge();
  const hits = retrieve(q, kb, 6);
  const sources = Array.from(new Set(hits.map((h) => h.chunk.title)));

  const retrievalAnswer = (): ChatResult => {
    if (!hits.length) {
      return {
        type: "text",
        text:
          "I can only answer from what's on this site, and I couldn't find that here. Try the four books, " +
          "the Cultural Atlas, the nine provinces, the presidents, national days, totems, or heroes.",
        sources: [],
      };
    }
    return {
      type: "text",
      text: hits.slice(0, 2).map((h) => `**${h.chunk.title}** — ${snippet(h.chunk.body)}`).join("\n\n"),
      sources,
    };
  };

  // 3) No key → still answer, straight from the retrieved site content.
  if (!KEY) return retrievalAnswer();

  // 4) Conversational answer with Claude, grounded in the retrieved context, navigate_to available.
  try {
    const context = hits.length
      ? hits.map((h, i) => `[${i + 1}] ${h.chunk.title} — ${h.chunk.body}`).join("\n\n")
      : "(no matching site content found)";
    const meta = languageByCode(lang);

    const client = new Anthropic({ apiKey: KEY, dangerouslyAllowBrowser: true });
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 900,
      // NOTE: no `temperature` — Opus 4.8 rejects it; omitting it keeps the request valid.
      system: SYSTEM(context, meta.english, meta.endonym),
      tools: [NAV_TOOL],
      messages: [
        // Recent conversation memory so the guide remembers what was said earlier in the chat.
        ...history.slice(-10).map((t) => ({ role: t.role, content: t.text })),
        { role: "user" as const, content: q },
      ],
    });

    const toolUse = res.content.find((b) => b.type === "tool_use" && b.name === "navigate_to");
    if (toolUse && toolUse.type === "tool_use") {
      const page = pageById(String((toolUse.input as any)?.page || ""));
      if (page) return { type: "navigate", pageId: page.id, label: page.label, text: `Opening ${page.label}…` };
    }

    const text = res.content
      .filter((b) => b.type === "text")
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    if (text) return { type: "text", text, sources };
  } catch (e: any) {
    console.warn("[chatbot] LLM error:", e?.message || e);
  }

  // LLM empty / errored → fall back to the site-content answer so the widget never dies.
  return retrievalAnswer();
}
