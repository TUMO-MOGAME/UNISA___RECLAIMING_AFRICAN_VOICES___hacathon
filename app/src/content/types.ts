// Content-as-data — the humanities layer. New stories = new data files, not new code.
// See docs/08-content-pipeline.md. Every fact must trace to `sourceNote` (integrity rule, AGENTS.md).

export type Lang = "en" | "tn"; // tn = Setswana
export type Mode = "adult" | "child";

export type LocalizedText = { en: string; tn: string };

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
  title: string;
  author: string;
  year: number;
  source: string;
  blurb: LocalizedText;
  audience: string;
  scenes: Scene[];
  references: string[];
};
