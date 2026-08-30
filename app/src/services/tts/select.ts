// Provider selection — pure, dependency-free (unit-tested under `node --test`).
//
// Which engine voices a passage is a LANGUAGE question, not a preference. Each provider is chosen
// where it is actually the best available voice for that language, and never where it is not:
//
//   ElevenLabs  English, Afrikaans — the only two of our eleven its models list (verified against
//               GET /v1/models, 30 Aug 2026; see LanguageMeta.elevenlabs). Best-sounding voice we
//               have, and the account carries four South African English voices.
//   Botlhale    the nine indigenous languages. The only engine that TRULY voices Setswana, and the
//               reason it stays first choice there even though ElevenLabs would happily return audio
//               for Setswana text. It would be fluent and it would be wrong.
//   device      always available, free, offline, quota-free. The floor: the Listen button works with
//               no keys at all, which is what makes it work in the demo and on a cheap phone.
//
// The order is deliberately NOT "best engine first". Routing an indigenous language to ElevenLabs
// because it sounds nicer would put confident mispronunciation in a child's ear as if it were
// authoritative — the harm AGENTS.md §4 exists to prevent, and the same reason docs/14 blocks
// challenge format F4.

import { elevenLabsSupports, type LangCode } from "../../i18n/languages.ts";

export type TtsProviderId = "elevenlabs" | "botlhale" | "device";

export function chooseProvider(opts: {
  lang: LangCode;
  hasElevenLabsKey: boolean;
  hasBotlhaleKey: boolean;
}): TtsProviderId {
  if (opts.hasElevenLabsKey && elevenLabsSupports(opts.lang)) return "elevenlabs";
  if (opts.hasBotlhaleKey) return "botlhale";
  return "device";
}

/**
 * The engines to try, in order, for one language. `chooseProvider` names the first; this is the
 * whole ladder, so a 429 or a dead network falls through to the next rather than dead-ending.
 *
 * "device" is always last and always present — the Listen button must never have nothing to try.
 */
export function providerLadder(opts: {
  lang: LangCode;
  hasElevenLabsKey: boolean;
  hasBotlhaleKey: boolean;
}): TtsProviderId[] {
  const ladder: TtsProviderId[] = [];
  if (opts.hasElevenLabsKey && elevenLabsSupports(opts.lang)) ladder.push("elevenlabs");
  if (opts.hasBotlhaleKey) ladder.push("botlhale");
  ladder.push("device");
  return ladder;
}
