// Localized-string resolution with an honest English fallback. Pure & dependency-free
// (only a type import, which Node erases) so it unit-tests under `node --test`.
//
// `en` is the required base for every localized value; other languages are optional. When a value
// is missing in the requested language we fall back to English and SAY SO (`isFallback`) — the UI
// must never pretend an untranslated passage is authoritative in that language (integrity rule).

import type { LangCode } from "./languages";

/** A translatable value: English always present, other languages optional. */
export type Localized = { en: string } & Partial<Record<LangCode, string>>;

// "reviewed" = human-authored/-reviewed text in the requested language.
// "draft"    = machine translation (Botlhale) in the requested language — must be labelled unreviewed.
// "fallback" = no copy in the requested language, so English is shown instead.
export type ResolveStatus = "reviewed" | "draft" | "fallback";

export type Resolved = {
  text: string;
  /** The language the returned text is ACTUALLY in (equals the request, or "en" on fallback). */
  lang: LangCode;
  status: ResolveStatus;
};

function present(s: unknown): s is string {
  return typeof s === "string" && s.trim().length > 0;
}

/**
 * Resolve a localized value for `lang`, preferring human-reviewed copy, then an optional machine
 * `draft` for that language, then an honest English fallback. `draft` is the pre-generated Botlhale
 * translation for this exact value + language (or undefined).
 */
export function resolveText(value: Localized, lang: LangCode, draft?: string): Resolved {
  if (present(value[lang])) return { text: value[lang] as string, lang, status: "reviewed" };
  if (present(draft)) return { text: draft as string, lang, status: "draft" };
  return { text: value.en, lang: "en", status: lang === "en" ? "reviewed" : "fallback" };
}

/** Convenience: just the string (English fallback applied). */
export function t(value: Localized, lang: LangCode): string {
  return resolveText(value, lang).text;
}
