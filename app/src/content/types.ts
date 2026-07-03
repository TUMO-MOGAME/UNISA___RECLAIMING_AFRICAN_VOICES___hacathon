// Content-as-data — the humanities layer. New stories = new data files, not new code.
// See docs/08-content-pipeline.md. Every fact must trace to `sourceNote` (integrity rule, AGENTS.md).

import type { LangCode } from "../i18n/languages";

// The app speaks all 11 official SA languages (see src/i18n/languages.ts). English is the base every
// text carries; other languages are optional and fall back to English (clearly marked) until a
// human-reviewed translation exists — machine text is never passed off as authoritative (integrity rule).
export type Lang = LangCode;
export type Mode = "adult" | "child";

export type LocalizedText = { en: string } & Partial<Record<Lang, string>>;

export type Scene = {
  id: string;
  title: LocalizedText;
  /** Adult reading level — faithful adaptation of the source. */
  text: LocalizedText;
  /** Child reading level — tone simplified only; facts unchanged. */
  childText: LocalizedText;
  /** Base prompt for Pollinations (Gemini may enrich it). */
  imagePrompt: string;
  /** Stable seed → consistent, cacheable image. */
  seed: number;
  /** The chapter/passage this scene is grounded in. No source → no scene. */
  sourceNote: string;
};

export type Module = {
  id: string;
  /** "literature" = the four literary pillars; "atlas" = Cultural Atlas heritage entries. */
  kind?: "literature" | "atlas";
  title: string;
  /** Literary author, or (for atlas entries) the category label. */
  author: string;
  /** Publication year for literary works; omitted for atlas topics. */
  year?: number;
  source: string;
  blurb: LocalizedText;
  audience: string;
  scenes: Scene[];
  references: string[];
  /** Community Archive tie-in — invites the reader to record their family's version. */
  archivePrompt?: LocalizedText;
};
