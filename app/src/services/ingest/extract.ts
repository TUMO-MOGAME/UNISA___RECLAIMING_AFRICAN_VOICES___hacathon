// Pure text extraction/cleaning for ingested plain-text sources.
//
// v1 handles plain text (Project Gutenberg .txt, a local .txt, or a URL returning text). PDF text
// extraction + OCR for scanned books are a follow-up. The integrity rule holds: we NEVER invent or
// alter the work — we only strip external boilerplate and normalise layout so the preserved canon
// stays verbatim.
//
// Pure logic → unit-tested under `node --test`.

const GUTENBERG_START = /^\*\*\*\s*START OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*$/im;
const GUTENBERG_END = /^\*\*\*\s*END OF (?:THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*$/im;

/** Strip Project Gutenberg's legal header/footer, keeping only the work itself. If the markers are
 * absent (not a Gutenberg text) the input is returned trimmed but otherwise unchanged. */
export function stripGutenbergBoilerplate(raw: string): string {
  let text = raw;
  const start = text.match(GUTENBERG_START);
  if (start && start.index !== undefined) {
    text = text.slice(start.index + start[0].length);
  }
  const end = text.match(GUTENBERG_END);
  if (end && end.index !== undefined) {
    text = text.slice(0, end.index);
  }
  return text.trim();
}

/** Normalise extracted text without changing its words:
 *  - CRLF/CR → LF
 *  - re-join words hyphenated across a line break ("govern-\nment" → "government")
 *  - drop trailing spaces
 *  - collapse runs of 3+ newlines to a single blank line (paragraph breaks preserved) */
export function normalizeText(raw: string): string {
  return raw
    .replace(/\r\n?/g, "\n")
    .replace(/([A-Za-z])-\n([a-z])/g, "$1$2")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
