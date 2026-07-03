// Lookup for pre-generated machine-draft translations (see drafts.data.ts). Returns a draft string
// for a specific module/scene/field/language, or undefined if none exists — in which case the
// resolver falls back to English. Drafts are always shown labelled "unreviewed" (integrity rule).

import type { LangCode } from "../i18n/languages";
import { DRAFT_DATA } from "./drafts.data";

export type DraftField = "title" | "text" | "childText";

export function draftText(
  moduleId: string,
  sceneId: string,
  field: DraftField,
  lang: LangCode
): string | undefined {
  return DRAFT_DATA[moduleId]?.[sceneId]?.[field]?.[lang];
}
