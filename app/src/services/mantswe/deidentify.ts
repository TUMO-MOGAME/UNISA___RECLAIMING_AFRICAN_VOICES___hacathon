// Mantswe a Batho — de-identification (deterministic layer).
//
// POPIA: a person's voice + words are personal information. Before a testimony can be clustered or
// shown, direct identifiers are stripped. This is the DETERMINISTIC belt — structured identifiers
// (phone, SA ID, email) removed by regex. The braces is a Gemini redaction pass (names/relationships),
// and the final gate is human review. We deliberately do NOT strip historical names/places — those are
// the CONTENT (the history itself), not the speaker's identity.
//
// Pure logic → unit-tested under `node --test`.

export type RedactionType = "phone" | "id" | "email";
export type Redaction = { type: RedactionType; count: number };
export type DeidentifyResult = {
  /** The testimony with structured identifiers replaced by neutral tags. */
  text: string;
  /** What was removed — types + counts only, never the removed values. */
  redactions: Redaction[];
};

const EMAIL = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
// South African ID number: 13 consecutive digits.
const SA_ID = /\b\d{13}\b/g;
// South African phone: +27 or 0, then 9 more digits (spaces/dashes allowed between).
const SA_PHONE = /(?:\+27|0)(?:[\s-]?\d){9}\b/g;

function countAndReplace(text: string, re: RegExp, tag: string): { text: string; count: number } {
  const count = (text.match(re) || []).length;
  return { text: count ? text.replace(re, tag) : text, count };
}

/** Strip structured direct identifiers. Order matters: emails and 13-digit IDs are removed before the
 * phone pass so a phone pattern can't nibble the digits of an ID. */
export function deidentify(raw: string): DeidentifyResult {
  const redactions: Redaction[] = [];
  let text = raw;

  const email = countAndReplace(text, EMAIL, "[email removed]");
  text = email.text;
  if (email.count) redactions.push({ type: "email", count: email.count });

  const id = countAndReplace(text, SA_ID, "[ID removed]");
  text = id.text;
  if (id.count) redactions.push({ type: "id", count: id.count });

  const phone = countAndReplace(text, SA_PHONE, "[phone removed]");
  text = phone.text;
  if (phone.count) redactions.push({ type: "phone", count: phone.count });

  return { text, redactions };
}
