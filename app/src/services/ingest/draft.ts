// Pure draft-Module builder.
//
// Turns a rights-cleared source + its segmented chapters into a DRAFT Module in the app's exact shape
// (content/types.ts), with one scene stub per chapter. The adapted adult/child text and image prompt
// are left as [NEEDS ADAPTATION] — that is the Gemini "adapt → scenes" stage, which is gated behind a
// human-review pass (integrity rule: no fact ships unreviewed, AGENTS.md §4). The sourceNote is
// pre-filled with a verbatim excerpt so every future scene is anchored to real text.
//
// Pure logic → unit-tested under `node --test`.

import type { Module, Scene } from "../../content/types";
import type { SourceRights } from "./rights";
import type { Chapter } from "./segment";

export const NEEDS_ADAPTATION = "[NEEDS ADAPTATION]";

/** Deterministic seed from a string → a stable, cacheable scene image seed (matches the Scene.seed
 * contract: same input → same image). */
export function seedFrom(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(h, 31) + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 1_000_000;
}

/** A short, single-line verbatim excerpt for the sourceNote anchor (never the adapted text). */
export function excerpt(body: string, max = 240): string {
  const clean = body.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max).trimEnd() + "…" : clean;
}

export function toDraftModule(source: SourceRights, chapters: Chapter[]): Module {
  const scenes: Scene[] = chapters.map((ch) => {
    const label = ch.heading || `Chapter ${ch.number}`;
    return {
      id: `${source.id}-ch${ch.number}`,
      title: { en: label },
      text: { en: NEEDS_ADAPTATION },
      childText: { en: NEEDS_ADAPTATION },
      imagePrompt: "",
      seed: seedFrom(`${source.id}-${ch.number}`),
      sourceNote: `${source.title}, ${label}: “${excerpt(ch.body)}”`,
    };
  });

  return {
    id: source.id,
    kind: "literature",
    title: source.title,
    author: source.author,
    source: source.basis ? `${source.title} — ${source.basis}` : source.title,
    blurb: { en: NEEDS_ADAPTATION },
    audience: NEEDS_ADAPTATION,
    scenes,
    references: source.basis ? [source.basis] : [],
  };
}
