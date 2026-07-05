import type { LocalizedText } from "./types";

// The Cultural Atlas "Journey" — a cinematic, auto-playing slideshow (image + music) that carries
// children and parents through South Africa's heritage as the pictures change. Each slide is a
// self-contained "Visual Heritage Series" title card (image carries its own headline); the short
// caption below adds a child-friendly line of context. Data-driven: append more slides as the
// picture set grows (design/AIpics → assets/journey). A shared, non-repeating soundtrack playlist
// (see ./soundtrackClips + services/soundtrack) plays a different clip under each journey, cycling
// through all 202 clips before any repeats.
// Grounding: captions state only true, general heritage — no invented history (AGENTS.md).

// Every heritage card in the series is 1376×768 — frames use this ratio so artwork shows in full.
export const CARD_ASPECT = 1376 / 768;

export type JourneySlide = {
  id: string;
  /** Bundled title-card image (require) — 16:9, headline baked in. */
  image: number;
  /** Optional short, child-friendly line of context. Omit when the card's baked subtitle says enough. */
  caption?: LocalizedText;
};

// ── Cultural Atlas journey ───────────────────────────────────────────────
export const atlasJourney: JourneySlide[] = [
  {
    id: "cover",
    image: require("../../assets/journey/cover.webp"),
    caption: {
      en: "A living map of our peoples, places and memory.",
      tn: "Mmapa o o tshelang wa batho, mafelo le kgakologelo ya rona.",
    },
  },
  {
    id: "peopling",
    image: require("../../assets/journey/peopling.webp"),
    caption: {
      en: "Where do we all come from? From the first San to the great nations.",
      tn: "Re tswa kae rotlhe? Go tloga go Basarwa ba ntlha go ya go merafe e megolo.",
    },
  },
  {
    id: "peoples",
    image: require("../../assets/journey/peoples.webp"),
    caption: {
      en: "Many peoples, many cultures — woven into one South Africa.",
      tn: "Batho ba bantsi, ditso tse dintsi — di logilwe go nna Aforika Borwa e le nngwe.",
    },
  },
  {
    id: "traditions",
    image: require("../../assets/journey/traditions.webp"),
    caption: {
      en: "Beliefs, ancestors and the customs that guide us.",
      tn: "Ditumelo, badimo le mekgwa e e re kaelang.",
    },
  },
  {
    id: "marriage",
    image: require("../../assets/journey/marriage.webp"),
    caption: {
      en: "Lobola, patlo and umtshato — how two families become one.",
      tn: "Bogadi, patlo le lenyalo — ka moo malapa a mabedi a nnang bongwe.",
    },
  },
  {
    id: "food",
    image: require("../../assets/journey/food.webp"),
    caption: {
      en: "The tastes of home — pap, braai, bunny chow and more.",
      tn: "Ditatso tsa gae — bogobe, braai, bunny chow le tse dingwe.",
    },
  },
  { id: "khoisan-first-peoples", image: require("../../assets/journey/khoisan-first-peoples.webp") },

  {
    id: "peoples",
    image: require("../../assets/journey/peoples.webp"),
    caption: {
      en: "Many peoples, many cultures — woven into one South Africa.",
      tn: "Batho ba bantsi, ditso tse dintsi — di logilwe go nna Aforika Borwa e le nngwe.",
    },
  },
  { id: "amazulu", image: require("../../assets/journey/amazulu.webp") },
  { id: "amaxhosa", image: require("../../assets/journey/amaxhosa.webp") },
  { id: "basotho", image: require("../../assets/journey/basotho.webp") },
  { id: "batswana", image: require("../../assets/journey/batswana.webp") },
  { id: "bapedi", image: require("../../assets/journey/bapedi.webp") },
  { id: "vhavenda", image: require("../../assets/journey/vhavenda.webp") },
  { id: "vatsonga", image: require("../../assets/journey/vatsonga.webp") },
  { id: "amandebele", image: require("../../assets/journey/amandebele.webp") },
  { id: "cape-malay-community", image: require("../../assets/journey/cape-malay-community.webp") },
  { id: "indian-south-africans", image: require("../../assets/journey/indian-south-africans.webp") },
  { id: "afrikaner-communities", image: require("../../assets/journey/afrikaner-communities.webp") },

  {
    id: "traditions",
    image: require("../../assets/journey/traditions.webp"),
    caption: {
      en: "Beliefs, ancestors and the customs that guide us.",
      tn: "Ditumelo, badimo le mekgwa e e re kaelang.",
    },
  },
  { id: "ubuntu", image: require("../../assets/journey/ubuntu.webp") },
  { id: "the-ancestors", image: require("../../assets/journey/the-ancestors.webp") },
  { id: "the-sangoma", image: require("../../assets/journey/the-sangoma.webp") },
  { id: "throwing-the-bones", image: require("../../assets/journey/throwing-the-bones.webp") },
  { id: "ukuthwasa", image: require("../../assets/journey/ukuthwasa.webp") },
  { id: "rain-and-the-land", image: require("../../assets/journey/rain-and-the-land.webp") },
  { id: "muthi-and-healing", image: require("../../assets/journey/muthi-and-healing.webp") },
  { id: "clan-names", image: require("../../assets/journey/clan-names.webp") },
  { id: "cattle-and-wealth", image: require("../../assets/journey/cattle-and-wealth.webp") },

  {
    id: "marriage",
    image: require("../../assets/journey/marriage.webp"),
    caption: {
      en: "Lobola, patlo and umtshato — how two families become one.",
      tn: "Bogadi, patlo le lenyalo — ka moo malapa a mabedi a nnang bongwe.",
    },
  },
  { id: "imbeleko", image: require("../../assets/journey/imbeleko.webp") },
  { id: "birth-and-naming", image: require("../../assets/journey/birth-and-naming.webp") },
  { id: "coming-of-age", image: require("../../assets/journey/coming-of-age.webp") },
  { id: "ulwaluko", image: require("../../assets/journey/ulwaluko.webp") },
  { id: "lebollo", image: require("../../assets/journey/lebollo.webp") },
  { id: "umkhosi-womhlanga", image: require("../../assets/journey/umkhosi-womhlanga.webp") },
  { id: "manhood", image: require("../../assets/journey/manhood.webp") },
  { id: "womanhood", image: require("../../assets/journey/womanhood.webp") },
  { id: "lobola", image: require("../../assets/journey/lobola.webp") },
  { id: "the-traditional-wedding", image: require("../../assets/journey/the-traditional-wedding.webp") },
  { id: "mourning-and-memory", image: require("../../assets/journey/mourning-and-memory.webp") },
  { id: "the-elders", image: require("../../assets/journey/the-elders.webp") },
  { id: "becoming-an-ancestor", image: require("../../assets/journey/becoming-an-ancestor.webp") },

  {
    id: "food",
    image: require("../../assets/journey/food.webp"),
    caption: {
      en: "The tastes of home — pap, braai, bunny chow and more.",
      tn: "Ditatso tsa gae — bogobe, braai, bunny chow le tse dingwe.",
    },
  },
  { id: "pap-and-vleis", image: require("../../assets/journey/pap-and-vleis.webp") },
  { id: "the-braai", image: require("../../assets/journey/the-braai.webp") },
  { id: "umngqusho", image: require("../../assets/journey/umngqusho.webp") },
  { id: "chakalaka-and-morogo", image: require("../../assets/journey/chakalaka-and-morogo.webp") },
  { id: "boerewors", image: require("../../assets/journey/boerewors.webp") },

  {
    id: "heroes",
    image: require("../../assets/journey/heroes.webp"),
    caption: {
      en: "The heroes our history almost forgot.",
      tn: "Bagaki ba hisitori ya rona e batlileng go ba lebala.",
    },
  },
];

// ── Literature journey — the Four Pillars (captions omitted; each card is self-titled) ────────────
export const literatureJourney: JourneySlide[] = [
  { id: "four-pillars", image: require("../../assets/journey/the-four-pillars.webp"), caption: { en: "Four foundational works that gave our stories a written home.", tn: "Dingwalo tse nne tsa motheo tse di neileng dikanegelo tsa rona legae le le kwadilweng." } },
  { id: "sol-plaatje", image: require("../../assets/journey/sol-plaatje.webp") },
  { id: "mhudi", image: require("../../assets/journey/mhudi.webp") },
  { id: "mhudi-the-barolong", image: require("../../assets/journey/mhudi-the-barolong.webp") },
  { id: "native-life", image: require("../../assets/journey/native-life-in-south-africa.webp") },
  { id: "mqhayi", image: require("../../assets/journey/s-e-k-mqhayi.webp") },
  { id: "ityala-lamawele", image: require("../../assets/journey/ityala-lamawele.webp") },
  { id: "xhosa-praise-poetry", image: require("../../assets/journey/xhosa-praise-poetry.webp") },
  { id: "credo-mutwa", image: require("../../assets/journey/credo-mutwa.webp") },
  { id: "indaba-my-children", image: require("../../assets/journey/indaba-my-children.webp") },
  { id: "african-cosmology", image: require("../../assets/journey/african-cosmology.webp") },
  { id: "vilakazi", image: require("../../assets/journey/b-w-vilakazi.webp") },
  { id: "inkondlo-kazulu", image: require("../../assets/journey/inkondlo-kazulu.webp") },
  { id: "vilakazi-street", image: require("../../assets/journey/vilakazi-street.webp") },
  { id: "oral-tradition", image: require("../../assets/journey/the-oral-tradition.webp") },
  { id: "power-of-the-word", image: require("../../assets/journey/the-power-of-the-word.webp") },
];

// ── Provinces journey — the nine provinces (captions omitted; each card is self-titled) ───────────
export const provincesJourney: JourneySlide[] = [
  { id: "prov-cover", image: require("../../assets/journey/prov-cover.webp") },
  { id: "gauteng", image: require("../../assets/journey/prov-gauteng.webp") },
  { id: "kwazulu-natal", image: require("../../assets/journey/prov-kwazulu-natal.webp") },
  { id: "western-cape", image: require("../../assets/journey/prov-western-cape.webp") },
  { id: "eastern-cape", image: require("../../assets/journey/prov-eastern-cape.webp") },
  { id: "free-state", image: require("../../assets/journey/prov-free-state.webp") },
  { id: "limpopo", image: require("../../assets/journey/prov-limpopo.webp") },
  { id: "mpumalanga", image: require("../../assets/journey/prov-mpumalanga.webp") },
  { id: "north-west", image: require("../../assets/journey/prov-north-west.webp") },
  { id: "northern-cape", image: require("../../assets/journey/prov-northern-cape.webp") },
];

// ── Presidents journey — democratic era, then the pre-1994 heads of state (documented, not celebrated) ─
export const presidentsJourney: JourneySlide[] = [
  { id: "pres-cover", image: require("../../assets/journey/pres-cover.webp") },
  { id: "mandela", image: require("../../assets/journey/pres-mandela.webp") },
  { id: "mbeki", image: require("../../assets/journey/pres-mbeki.webp") },
  { id: "motlanthe", image: require("../../assets/journey/pres-motlanthe.webp") },
  { id: "zuma", image: require("../../assets/journey/pres-zuma.webp") },
  { id: "ramaphosa", image: require("../../assets/journey/pres-ramaphosa.webp") },
  { id: "before", image: require("../../assets/journey/pres-before.webp") },
  { id: "louis-botha", image: require("../../assets/journey/pres-louis-botha.webp") },
  { id: "smuts", image: require("../../assets/journey/pres-smuts.webp") },
  { id: "hertzog", image: require("../../assets/journey/pres-hertzog.webp") },
  { id: "malan", image: require("../../assets/journey/pres-malan.webp") },
  { id: "strijdom", image: require("../../assets/journey/pres-strijdom.webp") },
  { id: "verwoerd", image: require("../../assets/journey/pres-verwoerd.webp") },
  { id: "vorster", image: require("../../assets/journey/pres-vorster.webp") },
  { id: "pw-botha", image: require("../../assets/journey/pres-pw-botha.webp") },
  { id: "de-klerk", image: require("../../assets/journey/pres-de-klerk.webp") },
];
