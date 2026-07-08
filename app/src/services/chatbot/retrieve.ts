// Pure retrieval + navigation-intent matching for the chatbot. No LLM, no network — so the
// orchestrator ("take me to the provinces") works with ZERO API key, and the LLM answer path gets its
// grounding context from here. Dependency-free (only local data types) so it unit-tests under `node --test`.

import type { KnowledgeChunk } from "./knowledge";
import type { PageTarget } from "./pages";

const STOP = new Set([
  "the", "a", "an", "of", "to", "in", "on", "and", "or", "is", "are", "was", "were", "for", "with",
  "what", "who", "when", "where", "why", "how", "which", "that", "this", "it", "as", "at", "by",
  "me", "my", "i", "you", "your", "please", "can", "do", "does", "tell", "about", "show", "give",
]);

/** Lowercase word tokens, stop-words removed, length >= 2. */
export function tokenize(text: string): string[] {
  return (text.toLowerCase().match(/[a-zà-ÿ0-9']+/gi) || [])
    .filter((w) => w.length >= 2 && !STOP.has(w));
}

export type ScoredChunk = { chunk: KnowledgeChunk; score: number };

/**
 * Rank knowledge chunks against a query by weighted term overlap (a light TF/IDF): rarer query terms
 * count more, a title hit counts extra. Returns the top `k` with score > 0.
 */
export function retrieve(query: string, chunks: KnowledgeChunk[], k = 6): ScoredChunk[] {
  const qTerms = Array.from(new Set(tokenize(query)));
  if (qTerms.length === 0) return [];

  // Document frequency for IDF weighting.
  const df: Record<string, number> = {};
  const docTokens = chunks.map((c) => {
    const toks = new Set(tokenize(`${c.title} ${c.body}`));
    for (const t of toks) df[t] = (df[t] || 0) + 1;
    return toks;
  });
  const N = chunks.length;

  const scored: ScoredChunk[] = chunks.map((c, i) => {
    const titleToks = new Set(tokenize(c.title));
    let score = 0;
    for (const t of qTerms) {
      if (!docTokens[i].has(t)) continue;
      const idf = Math.log(1 + N / (1 + (df[t] || 0)));
      score += idf * (titleToks.has(t) ? 2.5 : 1);
    }
    return { chunk: c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k);
}

// Phrases that signal the user wants to be taken somewhere (vs. asking a question).
const NAV_TRIGGERS = [
  "take me to", "go to", "open", "show me", "navigate to", "bring me to", "jump to",
  "i want to see", "i want to go", "can you open", "let's go to", "visit", "head to", "goto",
];

/**
 * Decide whether a message is a navigation command and, if so, which page. Returns the matched page
 * or null. Deliberately conservative: it only navigates on an explicit trigger phrase OR a message
 * that is essentially just a page name, so ordinary questions still get answered.
 */
export function matchNavigation(query: string, pages: PageTarget[]): PageTarget | null {
  const q = ` ${query.toLowerCase().trim()} `;
  const hasTrigger = NAV_TRIGGERS.some((t) => q.includes(` ${t} `) || q.includes(`${t} `));

  // Best page by longest matching keyword (so "national days" beats "days").
  let best: { page: PageTarget; len: number } | null = null;
  for (const page of pages) {
    for (const kw of page.keywords) {
      if (q.includes(` ${kw} `) || q.includes(` ${kw}`) || q.includes(`${kw} `)) {
        if (!best || kw.length > best.len) best = { page, len: kw.length };
      }
    }
  }
  if (!best) return null;

  // A question ("Who was…?", "What are totems?") should be ANSWERED, not navigated — unless the user
  // also used an explicit "take me to" style trigger.
  const isQuestion =
    /\?\s*$/.test(query) || /^\s*(who|what|which|where|when|why|how|is|are|was|were|does|do|did|can|could|tell|explain)\b/i.test(query);

  // Navigate if there's an explicit trigger, or the message is short and basically just the page name.
  const wordCount = tokenize(query).length;
  if (hasTrigger) return best.page;
  if (wordCount <= 4 && !isQuestion) return best.page;
  return null;
}
