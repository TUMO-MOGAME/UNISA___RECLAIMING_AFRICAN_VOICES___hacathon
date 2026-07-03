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
  reviewedContent: boolean; // human-authored/-reviewed story text exists today
};

// Order: English first, then the indigenous languages. [NEEDS: confirm the exact Botlhale codes for
// nr/ss/ve with the contact — their public table only fully listed en/zu/xh/st/nso/ts/af/tn.]
export const LANGUAGES: LanguageMeta[] = [
  { code: "en", english: "English", endonym: "English", bcp47: "en-ZA", botlhale: "en-ZA", reviewedContent: true },
  { code: "tn", english: "Tswana", endonym: "Setswana", bcp47: "tn-ZA", botlhale: "tn-ZA", reviewedContent: true },
  { code: "zu", english: "Zulu", endonym: "isiZulu", bcp47: "zu-ZA", botlhale: "zu-ZA", reviewedContent: false },
  { code: "xh", english: "Xhosa", endonym: "isiXhosa", bcp47: "xh-ZA", botlhale: "xh-ZA", reviewedContent: false },
  { code: "nso", english: "Northern Sotho (Sepedi)", endonym: "Sepedi", bcp47: "nso-ZA", botlhale: "nso-ZA", reviewedContent: false },
  { code: "st", english: "Southern Sotho", endonym: "Sesotho", bcp47: "st-ZA", botlhale: "st-ZA", reviewedContent: false },
  { code: "ts", english: "Tsonga", endonym: "Xitsonga", bcp47: "ts-ZA", botlhale: "ts-ZA", reviewedContent: false },
  { code: "af", english: "Afrikaans", endonym: "Afrikaans", bcp47: "af-ZA", botlhale: "af-ZA", reviewedContent: false },
  { code: "ss", english: "Swati", endonym: "siSwati", bcp47: "ss-ZA", botlhale: "ss-ZA", reviewedContent: false },
  { code: "nr", english: "Southern Ndebele", endonym: "isiNdebele", bcp47: "nr-ZA", botlhale: "nr-ZA", reviewedContent: false },
  { code: "ve", english: "Venda", endonym: "Tshivenḓa", bcp47: "ve-ZA", botlhale: "ve-ZA", reviewedContent: false },
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

/** Whether we trust on-device speech for this language. Conservative: only English is reliable
 *  across cheap Android/web engines — indigenous voices are exactly why Botlhale is the primary. */
export function deviceLikelySupports(code: LangCode): boolean {
  return code === "en";
}
