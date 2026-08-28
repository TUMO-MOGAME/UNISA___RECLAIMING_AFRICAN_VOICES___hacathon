// Which languages are spoken in which country — so choosing a country in the header reorders the
// language picker to that country's languages instead of always leading with South Africa's.
//
// INTEGRITY (AGENTS.md §4). Two rules govern this file:
//
//  1. **Every entry cites the instrument that makes the claim.** "What they speak in country X" is a
//     factual, contestable statement, and getting it wrong is exactly the kind of harm this project
//     exists to avoid. Countries are mapped ONLY where the official-language position is documented
//     in a constitution or a government source. Everything else is deliberately absent, and an absent
//     country simply shows the full language list — the behaviour the app had before.
//
//  2. **`notYet` names languages we do NOT have, out loud.** Most of this continent's languages are
//     not in Ubuntu Heritage. Silently omitting them would imply a country speaks only what we happen
//     to support. Naming them says the honest thing: we know, and we don't have it yet.
//
// A NOTE ON A TRAP THIS FILE AVOIDS. Zimbabwe's "Ndebele" is **Northern** Ndebele (isiNdebele
// saseNyakatho, ISO `nd`), which is NOT the Southern Ndebele (`nr`) of South Africa — they are
// different languages. Mapping one onto the other would be a plausible-looking falsehood, so
// Zimbabwe's Ndebele is listed under `notYet`, not under `supported`.

import type { LangCode } from "../i18n/languages";

export type CountryLanguages = {
  /**
   * The one language the picker leads with, and the one the app switches to when a country is
   * chosen before the reader has picked a language for themselves (LANG-04). Always a member of
   * `supported`, and always justified in `sourceNote` — "which language leads" is itself a claim.
   */
  lead: LangCode;
  /**
   * Languages Ubuntu Heritage actually speaks that are official or nationally recognised here,
   * most prominent first. Never a guess — see `sourceNote`.
   */
  supported: LangCode[];
  /** Languages spoken there that the app does not have. Named rather than quietly dropped. */
  notYet: string[];
  /** The instrument or government source the claim rests on. */
  sourceNote: string;
};

export const countryLanguages: Record<string, CountryLanguages> = {
  za: {
    lead: "zu",
    supported: ["zu", "xh", "af", "en", "nso", "tn", "st", "ts", "ss", "ve", "nr"],
    notYet: ["South African Sign Language"],
    sourceNote:
      "Constitution of the Republic of South Africa, 1996, §6 — eleven official languages, which the Constitution lists without ranking. The ORDER here is by first home language at the 2022 Census (isiZulu the largest), which is why isiZulu leads; the Constitution is the source for the list, the Census for the order.",
  },
  bw: {
    lead: "tn",
    supported: ["tn", "en"],
    notYet: ["Ikalanga", "Shekgalagari", "Khoisan languages"],
    sourceNote:
      "Botswana: English is the official language and Setswana the national language (Constitution of Botswana; Government of Botswana).",
  },
  ls: {
    lead: "st",
    supported: ["st", "en"],
    notYet: [],
    sourceNote: "Constitution of Lesotho, 1993, §3(1) — Sesotho and English are the official languages.",
  },
  sz: {
    lead: "ss",
    supported: ["ss", "en"],
    notYet: [],
    sourceNote: "Constitution of the Kingdom of Eswatini, 2005, §3(1) — siSwati and English are the official languages.",
  },
  na: {
    lead: "en",
    supported: ["en", "af"],
    notYet: ["Oshiwambo", "Otjiherero", "Khoekhoegowab", "RuKwangali", "German"],
    sourceNote:
      "Constitution of Namibia, Article 3(1) — English is the sole official language. Afrikaans remains a widely used lingua franca, and the languages listed are among those spoken at home.",
  },
  zw: {
    // Of Zimbabwe's sixteen officially recognised languages, these are the ones that are the SAME
    // language Ubuntu Heritage already speaks. Shona and Ndebele — the two largest — are not.
    // `lead` is English on an honest technicality: Zimbabwe's two largest languages are Shona and
    // Ndebele, and Ubuntu Heritage has neither. English leads because it is the most used of the
    // languages we actually speak there — not because it is the country's main language.
    lead: "en",
    supported: ["en", "ve", "ts", "st", "tn", "xh"],
    notYet: ["Shona", "Ndebele", "Chewa", "Chibarwe", "Kalanga", "Nambya", "Ndau", "Tonga", "Koisan", "Zimbabwean Sign Language"],
    sourceNote:
      "Constitution of Zimbabwe Amendment (No. 20) Act, 2013, §6 — sixteen officially recognised languages. Zimbabwe's Shangani corresponds to Xitsonga; its Ndebele is Northern Ndebele, a different language from South Africa's isiNdebele.",
  },
};

/** The language map for a country, or undefined where we have not sourced one. */
export const languagesFor = (countryCode: string): CountryLanguages | undefined =>
  countryLanguages[countryCode];

/** True when we can honestly say anything about this country's languages. */
export const hasLanguageMap = (countryCode: string): boolean => countryCode in countryLanguages;
