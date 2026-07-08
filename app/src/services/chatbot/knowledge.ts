// The chatbot's knowledge base — the ONLY thing it is allowed to answer from. Built entirely from the
// app's own grounded content-as-data (the same modules the screens render), so the assistant can never
// speak about anything that isn't actually in the website (integrity rule). Each chunk carries a `page`
// target so an answer can offer to open the relevant screen.
//
// Pure builder (no React, no side effects) so it can be reused by the retriever and unit-tested.

import { allModules } from "../../content";
import { provinces } from "../../content/provinces";
import { presidents } from "../../content/presidents";
import { heroes } from "../../content/heroes";
import { nationalDays } from "../../content/national-days";
import { totems, totemsIntro, totemsLessons } from "../../content/totems";

export type KnowledgeChunk = {
  id: string;
  /** Section this fact lives in — used to label the answer and offer navigation. */
  page: string;
  /** Short human title of the chunk (e.g. "Mhudi", "Nelson Mandela"). */
  title: string;
  /** The grounded text the assistant may quote/paraphrase. English base. */
  body: string;
};

const join = (...parts: (string | undefined | null)[]) => parts.filter(Boolean).join(" ");

// Grounded facts ABOUT the app itself, so the bot can answer "what is this?", "what languages?",
// "is my data safe?" from the real project record (STATUS.md / docs / footer) rather than guessing.
const APP_FACTS: KnowledgeChunk[] = [
  {
    id: "app-what",
    page: "home",
    title: "About Ubuntu Heritage",
    body: "Ubuntu Heritage · South Africa (tagline 'Mantswe a maloba — Voices of Yesterday') is a cinematic, multilingual, offline-first app that brings South Africa's foundational indigenous literature and heritage to life. It was built for the AADHIH 'Reclaiming African Voices' hackathon (UNISA / BaobabX Academy). It covers four literary pillars, a Cultural Atlas, the nine provinces, the presidents, national days, totems and clans, and heroes of the nation — all grounded in cited sources with an integrity rule of no invented history. Created by Tumo Olorato Mogame.",
  },
  {
    id: "app-languages",
    page: "home",
    title: "Languages",
    body: "The whole interface can switch between all 11 official South African languages using the language picker. The literary and heritage content is human-authored and human-reviewed in English and Setswana; the other nine languages are shown as machine translations that are clearly labelled 'unreviewed' until a native speaker reviews them, and otherwise fall back to English so nothing is ever passed off as authoritative.",
  },
  {
    id: "app-offline-popia",
    page: "archive",
    title: "Offline-first and POPIA privacy",
    body: "The app is offline-first and runs on a 100% free-tier stack. The Community Archive lets you record an elder's story, a memory or a tradition in your own words. It is POPIA-compliant: recording only happens after a consent step, recordings are kept on your device (durable in the browser), and deleting a recording is real erasure of the audio.",
  },
  {
    id: "app-partners",
    page: "about",
    title: "Partners, credits and technology",
    body: "Ubuntu Heritage is built in partnership with UNISA (University of South Africa) and Botlhale AI (South African indigenous-language AI). Ambient sounds and music are credited to the African Tribe Echoes YouTube channel. It is built with Solana, which anchors the on-chain Heritage Ledger. The full source list is on the About the Sources screen.",
  },
  {
    id: "app-heritage-ledger",
    page: "heritage",
    title: "Heritage Ledger (on-chain)",
    body: "The Heritage Ledger notarises the provenance of the four literary works on the Solana blockchain (devnet). Only public works and their content hashes / citations are stored on-chain — never personal data or recordings — so it is POPIA-safe. Each work shows its IPFS CID and SHA-256 hash with a 'Verify on Solana' link.",
  },
];

function moduleChunks(): KnowledgeChunk[] {
  return allModules.map((m) => ({
    id: `module-${m.id}`,
    page: m.id,
    title: m.title,
    body: join(
      `${m.title} by ${m.author}${m.year ? ` (${m.year})` : ""}.`,
      m.blurb.en,
      ...m.scenes.map((s) => join(`${s.title.en}:`, s.text.en)),
    ),
  }));
}

function provinceChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  for (const p of provinces) {
    chunks.push({
      id: `province-${p.id}`,
      page: "provinces",
      title: p.name,
      body: join(
        `${p.name} province. Capital: ${p.capital}. Formed: ${p.formed}. Population: ${p.populationStat.value}. Languages: ${p.languages}.`,
        p.overview,
        p.cities.length ? `Cities: ${p.cities.map((c) => c.name).join(", ")}.` : "",
      ),
    });
    for (const c of p.cities) {
      chunks.push({
        id: `city-${c.id}`,
        page: "provinces",
        title: `${c.name} (${p.name})`,
        body: join(`${c.name}${c.subtitle ? ` — ${c.subtitle}` : ""}, founded ${c.founded}.`, c.beforeTheCity, c.origins),
      });
    }
  }
  return chunks;
}

function presidentChunks(): KnowledgeChunk[] {
  return presidents.map((p) => ({
    id: `president-${p.id}`,
    page: "presidents",
    title: p.name,
    body: join(
      `${p.name}${p.clan ? ` (${p.clan})` : ""} — ${p.role}. Term: ${p.term}.`,
      p.born ? `Born ${p.born}.` : "",
      p.died ? `Died ${p.died}.` : "",
      p.party ? `Party: ${p.party}.` : "",
      p.struggle,
      p.know?.join(" "),
      p.quote ? `Quote: "${p.quote.text}" — ${p.quote.attr}.` : "",
    ),
  }));
}

function heroChunks(): KnowledgeChunk[] {
  return heroes.map((h) => ({
    id: `hero-${h.id}`,
    page: "heroes",
    title: h.name,
    body: join(
      `${h.name}${h.honorific ? ` (${h.honorific})` : ""} — ${h.role}. ${h.dates}.`,
      h.movement ? `Movement: ${h.movement}.` : "",
      h.contribution,
      h.know?.join(" "),
      h.quote ? `Quote: "${h.quote.text}" — ${h.quote.attr}.` : "",
    ),
  }));
}

function dayChunks(): KnowledgeChunk[] {
  return nationalDays.map((d) => ({
    id: `day-${d.id}`,
    page: "days",
    title: `${d.name} (${d.date})`,
    body: join(`${d.name}, ${d.date}${d.notPublicHoliday ? " (commemorative, not a public holiday)" : ""}. Commemorates: ${d.commemorates}.`, d.history),
  }));
}

function totemChunks(): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [
    ...totemsIntro.map((e) => ({ id: `totem-intro-${e.id}`, page: "totems", title: e.title, body: e.body.join(" ") })),
    ...totemsLessons.map((e) => ({ id: `totem-lesson-${e.id}`, page: "totems", title: e.title, body: e.body.join(" ") })),
  ];
  for (const t of totems) {
    const terms = join(t.terms.sothoTswana, t.terms.nguni, t.terms.venda);
    chunks.push({
      id: `totem-${t.id}`,
      page: "totems",
      title: `${t.animal} (totem)`,
      body: join(`${t.animal} totem${terms ? ` — ${terms}` : ""}. Clans: ${t.clans}.`, t.meaning, t.story?.join(" ")),
    });
  }
  return chunks;
}

let CACHE: KnowledgeChunk[] | null = null;

/** The full knowledge base, built once and memoised. */
export function buildKnowledge(): KnowledgeChunk[] {
  if (CACHE) return CACHE;
  CACHE = [
    ...APP_FACTS,
    ...moduleChunks(),
    ...provinceChunks(),
    ...presidentChunks(),
    ...heroChunks(),
    ...dayChunks(),
    ...totemChunks(),
  ];
  return CACHE;
}
