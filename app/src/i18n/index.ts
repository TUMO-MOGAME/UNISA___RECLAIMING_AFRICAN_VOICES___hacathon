// i18n barrel — languages are data, strings resolve through here (see setswana-i18n skill).
export {
  LANGUAGES,
  DEFAULT_LANG,
  languageByCode,
  toBcp47,
  toBotlhaleCode,
  deviceLikelySupports,
} from "./languages";
export type { LangCode, LanguageMeta } from "./languages";
export { t, resolveText } from "./localize";
export type { Localized, Resolved } from "./localize";
