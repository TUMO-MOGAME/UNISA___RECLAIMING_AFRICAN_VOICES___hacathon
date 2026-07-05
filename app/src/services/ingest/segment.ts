// Pure chapter segmentation.
//
// Detects common chapter headings ("CHAPTER I", "Chapter 1") and splits the body into chapters. Each
// chapter later becomes the sourceNote anchor for its scenes — the grounding spine of the draft. Any
// text before the first heading (title page, preface) is dropped from the chapter list; the full
// verbatim text is preserved separately by the caller. No heading found → the whole text is one chapter.
//
// Pure logic → unit-tested under `node --test`.

export type Chapter = {
  /** 1-based sequence in the book. */
  number: number;
  /** Heading line as printed, e.g. "CHAPTER I. THE EXODUS." — may be "" if the book has no headings. */
  heading: string;
  /** Verbatim chapter body (everything between this heading and the next). */
  body: string;
};

// Line beginning with "chapter" (any case) + an arabic or roman numeral. Kept strict to avoid matching
// prose like "chapter house". Spelled-out numbers ("Chapter One") are a follow-up.
const HEADING = /^[ \t]*chapter\s+(?:\d+|[ivxlcdm]+)\b[^\n]*$/gim;

export function segmentChapters(text: string): Chapter[] {
  const marks: { index: number; heading: string }[] = [];
  let m: RegExpExecArray | null;
  HEADING.lastIndex = 0;
  while ((m = HEADING.exec(text)) !== null) {
    marks.push({ index: m.index, heading: m[0].trim() });
  }

  if (marks.length === 0) {
    return [{ number: 1, heading: "", body: text.trim() }];
  }

  const chapters: Chapter[] = [];
  for (let i = 0; i < marks.length; i++) {
    const start = marks[i].index;
    const end = i + 1 < marks.length ? marks[i + 1].index : text.length;
    const block = text.slice(start, end);
    const nl = block.indexOf("\n");
    const body = (nl >= 0 ? block.slice(nl + 1) : "").trim();
    chapters.push({ number: i + 1, heading: marks[i].heading, body });
  }
  return chapters;
}
