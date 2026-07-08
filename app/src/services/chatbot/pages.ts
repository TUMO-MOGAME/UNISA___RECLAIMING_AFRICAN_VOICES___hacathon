// The pages the chatbot's orchestrator can take the user to. Each id maps to a route in App.tsx
// (see App's `navigateTo` resolver). `keywords` drive the deterministic, key-free navigation matcher
// (retrieve.ts) so "take me to the provinces" works with zero LLM calls; the LLM's navigate_to tool
// uses the same id set. Pure data — no imports — so it unit-tests under `node --test`.

export type PageTarget = {
  id: string;
  /** Human label shown in the chat ("Opening The Nine Provinces…"). */
  label: string;
  /** Synonyms / phrases a user might use for this destination (lowercase). */
  keywords: string[];
};

export const PAGES: PageTarget[] = [
  { id: "home", label: "Home", keywords: ["home", "start", "landing", "front page", "beginning", "main page", "top"] },
  // The four literary pillars (open in the cinematic Reader).
  { id: "mhudi", label: "Mhudi (Sol Plaatje)", keywords: ["mhudi", "sol plaatje", "plaatje", "barolong"] },
  { id: "ityala-lamawele", label: "Ityala Lamawele (S.E.K. Mqhayi)", keywords: ["ityala lamawele", "ityala", "mqhayi", "the twins", "twins", "xhosa law"] },
  { id: "indaba", label: "Indaba, My Children (Credo Mutwa)", keywords: ["indaba", "indaba my children", "credo mutwa", "mutwa"] },
  { id: "vilakazi", label: "B.W. Vilakazi", keywords: ["vilakazi", "bw vilakazi", "b.w. vilakazi", "zulu poetry", "zulu poet"] },
  // Sections.
  { id: "atlas", label: "Cultural Atlas", keywords: ["cultural atlas", "atlas", "customs", "rites", "peopling", "marriage", "lobola"] },
  { id: "provinces", label: "The Nine Provinces", keywords: ["provinces", "province", "nine provinces", "cities", "the land", "towns"] },
  { id: "presidents", label: "The Presidents", keywords: ["presidents", "president", "leaders", "heads of state", "mandela", "democratic leaders"] },
  { id: "days", label: "National Days", keywords: ["national days", "days", "public holidays", "holidays", "freedom day", "youth day", "women's day", "heritage day", "commemorative"] },
  { id: "totems", label: "Totems & Clans", keywords: ["totems", "totem", "clans", "clan", "animals", "diboko", "iziduko", "mitupo"] },
  { id: "heroes", label: "Heroes & Heroines", keywords: ["heroes", "heroines", "hero", "struggle heroes", "freedom fighters"] },
  { id: "archive", label: "Community Archive", keywords: ["community archive", "archive", "record a story", "oral history", "my voice", "record my", "record an elder"] },
  { id: "heritage", label: "Heritage Ledger (on-chain)", keywords: ["heritage ledger", "ledger", "blockchain", "solana", "on-chain", "onchain", "provenance", "verify on solana"] },
  { id: "about", label: "About the Sources", keywords: ["about", "sources", "credits", "references", "citations", "bibliography"] },
];

export const pageById = (id: string): PageTarget | undefined => PAGES.find((p) => p.id === id);
