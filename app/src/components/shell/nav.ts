import { Lang } from "../../content/types";

// The D1 navigation — one source of truth for the desktop header, the mobile tab bar and the
// chatbot's `navigate_to` orchestrator, so the three can never drift apart.
// See docs/13-architecture-v2-plan.md §2 (D1) and §4.

/** Every room the shell can navigate to. Mirrors the `Route` union in App.tsx. */
export type NavId =
  | "home"
  | "journey"
  | "watch"
  | "atlas"
  | "archive"
  | "kids"
  | "schools"
  | "passport"
  | "countries";

export type NavItem = {
  id: NavId;
  /** Label in all 11 languages; falls back to EN honestly (see i18n/localize). */
  label: Record<Lang, string>;
};

export const NAV: NavItem[] = [
  {
    id: "journey",
    label: {
      en: "Journey", tn: "Leeto", af: "Reis", zu: "Uhambo", xh: "Uhambo",
      nso: "Leeto", st: "Leeto", ss: "Luhambo", ts: "Riendzo", nr: "Ikhambo", ve: "Lwendo",
    },
  },
  {
    id: "watch",
    label: {
      en: "Watch", tn: "Lebelela", af: "Kyk", zu: "Buka", xh: "Bukela",
      nso: "Lebelela", st: "Sheba", ss: "Buka", ts: "Languta", nr: "Buka", ve: "Lavhelesa",
    },
  },
  {
    id: "atlas",
    label: {
      en: "Atlas", tn: "Atlase", af: "Atlas", zu: "I-Athulasi", xh: "I-Atlasi",
      nso: "Atlase", st: "Atlase", ss: "I-Athilasi", ts: "Atlasi", nr: "I-Athulasi", ve: "Atlasi",
    },
  },
  {
    id: "archive",
    label: {
      en: "Archive", tn: "Polokelo", af: "Argief", zu: "Ingobo", xh: "Uvimba",
      nso: "Polokelo", st: "Polokelo", ss: "Ingobo", ts: "Vuhlayiselo", nr: "Ingobo", ve: "Vhuvhulungeli",
    },
  },
  {
    id: "kids",
    label: {
      en: "Kids", tn: "Bana", af: "Kinders", zu: "Izingane", xh: "Abantwana",
      nso: "Bana", st: "Bana", ss: "Bantfwana", ts: "Vana", nr: "Abantwana", ve: "Vhana",
    },
  },
  {
    id: "schools",
    label: {
      en: "Schools", tn: "Dikolo", af: "Skole", zu: "Izikole", xh: "Izikolo",
      nso: "Dikolo", st: "Dikolo", ss: "Tikolo", ts: "Swikolo", nr: "Iimtjhana", ve: "Zwikolo",
    },
  },
];

/** The four rooms that get a bottom tab on phones. Everything else is reached from within a room. */
export const TABS: NavId[] = ["journey", "watch", "atlas", "passport"];

export const PASSPORT_LABEL: Record<Lang, string> = {
  en: "Passport", tn: "Pasepoto", af: "Paspoort", zu: "Iphasipoti", xh: "Iphasipoti",
  nso: "Pasepoto", st: "Pasepoto", ss: "Iphasiphothi", ts: "Phasiphoto", nr: "Iphasiphoti", ve: "Phasiphoto",
};

/** Short tab-bar label for the Passport — "Me" reads better than "Passport" under an icon. */
export const ME_LABEL: Record<Lang, string> = {
  en: "Me", tn: "Nna", af: "Ek", zu: "Mina", xh: "Mna",
  nso: "Nna", st: "Nna", ss: "Mine", ts: "Mina", nr: "Mina", ve: "Nṋe",
};

/** The breakpoint where the header's nav row gives way to the bottom tab bar. */
export const WIDE_MIN = 900;
