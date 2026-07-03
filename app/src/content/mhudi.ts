import type { Module } from "./types";

// Grounded in Sol Plaatje, *Mhudi* (1930) — see docs/04-humanities-sources.md.
// NOTE(setswana): the `tn` fields are AI-assisted DRAFTS and must be reviewed by a
// Setswana speaker before submission (setswana-i18n skill + integrity rule).

export const mhudi: Module = {
  id: "mhudi",
  title: "Mhudi",
  author: "Sol T. Plaatje",
  year: 1930,
  source: "Sol T. Plaatje, *Mhudi* (written c.1917, published 1930)",
  audience: "Young adults & adults — resilience, displacement, agency",
  blurb: {
    en: "The first English novel by a Black South African. After the Mfecane scatters the Barolong, Mhudi and Ra-Thaga forge an egalitarian life in the wilderness — overturning the colonial pastoral myth.",
    tn: "Buka ya ntlha ya Seesemane e e kwadilweng ke Mo-Aforika Montsho wa Borwa. Morago ga Mfecane, Mhudi le Ra-Thaga ba aga botshelo jo bo lekanang mo nageng.",
  },
  references: [
    "Tim Couzens & Brian Willan — criticism of Mhudi (enotes.com)",
    "Sol Plaatje University — 'Mhudi: A century later' (BKO Magazine)",
    "'Plotting South African history: narrative in Sol Plaatje's Mhudi' (journals.co.za)",
  ],
  scenes: [
    {
      id: "forest-home",
      title: { en: "The Forest Home", tn: "Legae la Sekgwa" },
      text: {
        en: "After the Matabele attack scattered the Barolong and destroyed the town of Kunana, Mhudi and Ra-Thaga met as survivors in the wilderness. Far from elders and the obligations of the village, they built a home of their own and named it Re-Nosi — 'We-are-alone.' Their union was not arranged by custom but forged in survival, grounded in mutual respect.",
        tn: "Morago ga tlhaselo ya Matebele e e phatlaladitseng Barolong le go senya motse wa Kunana, Mhudi le Ra-Thaga ba kopana e le batshedi mo nageng. Kgakala le bagolwane, ba aga legae la bone mme ba le bitsa Re-Nosi — 'Re le rosi.' Lenyalo la bone le ne le sa rulaganngwa ke ngwao, le tlhomilwe mo go tshedisanang ka tlotlo.",
      },
      childText: {
        en: "Long ago, a great attack scattered Mhudi's people and destroyed her town. Alone in the wild, Mhudi met Ra-Thaga, another survivor. Together they built a little home and called it Re-Nosi, which means 'We are alone.' They cared for and respected each other.",
        tn: "Bogologolo, tlhaselo e kgolo e ne ya phatlalatsa batho ba ga Mhudi. A le esi mo nageng, Mhudi a kopana le Ra-Thaga. Mmogo ba aga legae le bannye ba le bitsa Re-Nosi, e leng 'Re le rosi.' Ba ne ba tlotlana.",
      },
      imagePrompt:
        "A lone homestead at the edge of a vast Southern African savanna at golden dawn, a Barolong man and woman building a shelter together, acacia trees, warm cinematic light, painterly, 4k, historically grounded, artistic interpretation",
      seed: 1017,
      sourceNote: "Plaatje, Mhudi (1930), ch. 5 'The Forest Home' — the sanctuary Re-Nosi.",
    },
    {
      id: "the-lion",
      title: { en: "Mhudi and the Lion", tn: "Mhudi le Tau" },
      text: {
        en: "In the wilderness Mhudi proved the equal of anyone. When a lion threatened them, it was Mhudi whose courage and quick judgement saved Ra-Thaga — one of several moments in which Plaatje portrays her strength and agency, overturning colonial stereotypes of African women as passive.",
        tn: "Mo nageng Mhudi a itshupa a lekana le mongwe le mongwe. Fa tau e ne e ba tshosetsa, e ne e le Mhudi yo bopelokgale jwa gagwe bo bolokileng Ra-Thaga — mongwe wa metsotso e Plaatje a bontshang maatla a gagwe.",
      },
      childText: {
        en: "One day a lion came near. Mhudi was brave and clever, and she saved Ra-Thaga from danger. In this story, Mhudi is strong and wise — a hero.",
        tn: "Letsatsi lengwe tau ya atamela. Mhudi o ne a pelokgale e bile a le botlhale, mme a boloka Ra-Thaga mo kotsing. Mo kanegelong e, Mhudi ke mogaki yo o nonofileng.",
      },
      imagePrompt:
        "A courageous Barolong woman shielding a man from a lion at dusk on the open veld, dramatic tension, dust and amber light, cinematic, painterly, 4k, artistic interpretation",
      seed: 2042,
      sourceNote: "Plaatje, Mhudi (1930) — Mhudi saves Ra-Thaga from a lion; her agency and courage.",
    },
  ],
};
