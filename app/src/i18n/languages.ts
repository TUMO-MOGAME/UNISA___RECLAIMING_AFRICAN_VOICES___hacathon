// The language registry — the single source of truth for every language Maloba speaks.
// Data-driven so adding/extending a language is a data edit, never an app-logic change
// (see .claude/skills/setswana-i18n). Pure & dependency-free so it unit-tests under `node --test`.
//
// All 11 official South African languages (Constitution §6). `endonym` is the language's own name
// for itself (first-class, not an English label). `bcp47` drives on-device speech + the web; `botlhale`
// is the code for Botlhale AI's speech/translation APIs. `reviewedContent` = we have human-authored /
// human-reviewed literary text in this language today (integrity rule: no machine text passed off as
// authoritative). The rest fall back to English text, clearly marked, until real translations land.

export type LangCode =
  | "en" // English
  | "af" // Afrikaans
  | "nr" // isiNdebele (Southern Ndebele)
  | "xh" // isiXhosa
  | "zu" // isiZulu
  | "nso" // Sepedi (Northern Sotho / Sesotho sa Leboa)
  | "st" // Sesotho (Southern Sotho)
  | "tn" // Setswana
  | "ss" // siSwati
  | "ve" // Tshivenḓa
  | "ts"; // Xitsonga

export type LanguageMeta = {
  code: LangCode;
  english: string; // English name
  endonym: string; // the language's own name for itself
  bcp47: string; // IETF tag for on-device speech / web
  botlhale: string; // Botlhale AI language_code
  /**
   * ElevenLabs language id, or `null` where ElevenLabs does not speak this language.
   *
   * VERIFIED AGAINST THE API, 30 Aug 2026: `GET /v1/models` was read and every model's `languages`
   * list checked against our eleven. Of them ElevenLabs covers **English and Afrikaans only**
   * (eleven_v3 and eleven_v3_conversational, 74 languages each; multilingual_v2 and flash/turbo v2.5
   * carry English but not Afrikaans). NONE of the nine indigenous languages appears in any model.
   *
   * `null` is therefore a sourced claim, not a placeholder. It matters because the API does not
   * refuse unsupported text — send it Setswana and it returns confident, fluent, wrong audio. That
   * is the failure docs/14 blocks challenge format F4 over: unreviewed pronunciation in a child's
   * ear, presented as authoritative. So the selector never routes those languages here.
   */
  elevenlabs: string | null;
  reviewedContent: boolean; // human-authored/-reviewed story text exists today
};

// Order: English first, then the indigenous languages. [NEEDS: confirm the exact Botlhale codes for
// nr/ss/ve with the contact — their public table only fully listed en/zu/xh/st/nso/ts/af/tn.]
export const LANGUAGES: LanguageMeta[] = [
  { code: "en", english: "English", endonym: "English", bcp47: "en-ZA", botlhale: "en-ZA", elevenlabs: "en", reviewedContent: true },
  { code: "tn", english: "Tswana", endonym: "Setswana", bcp47: "tn-ZA", botlhale: "tn-ZA", elevenlabs: null, reviewedContent: true },
  { code: "zu", english: "Zulu", endonym: "isiZulu", bcp47: "zu-ZA", botlhale: "zu-ZA", elevenlabs: null, reviewedContent: false },
  { code: "xh", english: "Xhosa", endonym: "isiXhosa", bcp47: "xh-ZA", botlhale: "xh-ZA", elevenlabs: null, reviewedContent: false },
  { code: "nso", english: "Northern Sotho (Sepedi)", endonym: "Sepedi", bcp47: "nso-ZA", botlhale: "nso-ZA", elevenlabs: null, reviewedContent: false },
  { code: "st", english: "Southern Sotho", endonym: "Sesotho", bcp47: "st-ZA", botlhale: "st-ZA", elevenlabs: null, reviewedContent: false },
  { code: "ts", english: "Tsonga", endonym: "Xitsonga", bcp47: "ts-ZA", botlhale: "ts-ZA", elevenlabs: null, reviewedContent: false },
  { code: "af", english: "Afrikaans", endonym: "Afrikaans", bcp47: "af-ZA", botlhale: "af-ZA", elevenlabs: "af", reviewedContent: false },
  { code: "ss", english: "Swati", endonym: "siSwati", bcp47: "ss-ZA", botlhale: "ss-ZA", elevenlabs: null, reviewedContent: false },
  { code: "nr", english: "Southern Ndebele", endonym: "isiNdebele", bcp47: "nr-ZA", botlhale: "nr-ZA", elevenlabs: null, reviewedContent: false },
  { code: "ve", english: "Venda", endonym: "Tshivenḓa", bcp47: "ve-ZA", botlhale: "ve-ZA", elevenlabs: null, reviewedContent: false },
];

export const DEFAULT_LANG: LangCode = "en";

const BY_CODE: Record<string, LanguageMeta> = {};
for (const l of LANGUAGES) BY_CODE[l.code] = l;

export function languageByCode(code: string): LanguageMeta {
  return BY_CODE[code] ?? BY_CODE[DEFAULT_LANG];
}

/** IETF/BCP-47 tag for on-device speech (expo-speech) and the web. */
export function toBcp47(code: LangCode): string {
  return languageByCode(code).bcp47;
}

/** Botlhale AI language_code for TTS / translation. */
export function toBotlhaleCode(code: LangCode): string {
  return languageByCode(code).botlhale;
}

/** ElevenLabs language id, or null where ElevenLabs does not speak the language at all. */
export function toElevenLabsCode(code: LangCode): string | null {
  return languageByCode(code).elevenlabs;
}

/** Whether ElevenLabs can actually voice this language — see `LanguageMeta.elevenlabs`. */
export function elevenLabsSupports(code: LangCode): boolean {
  return languageByCode(code).elevenlabs !== null;
}

/** Whether we trust on-device speech for this language. Conservative: only English is reliable
 *  across cheap Android/web engines — indigenous voices are exactly why Botlhale is the primary. */
export function deviceLikelySupports(code: LangCode): boolean {
  return code === "en";
}
