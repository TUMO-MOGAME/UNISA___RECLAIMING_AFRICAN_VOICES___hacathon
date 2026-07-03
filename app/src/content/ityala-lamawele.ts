import type { Module } from "./types";

// Grounded in S.E.K. Mqhayi, *Ityala Lamawele* ("The Lawsuit of the Twins", 1914).
// See docs/04-humanities-sources.md. Integrity rule: every fact traces to the source.
// NOTE(setswana): `tn` fields are AI-assisted DRAFTS — review with a Setswana speaker before submission.

export const ityalaLamawele: Module = {
  id: "ityala-lamawele",
  title: "Ityala Lamawele",
  author: "S.E.K. Mqhayi",
  year: 1914,
  source: "S.E.K. Mqhayi, *Ityala Lamawele* — 'The Lawsuit of the Twins' (1914)",
  audience: "Academic & general — indigenous law, restorative justice",
  blurb: {
    en: "A landmark Xhosa text and a defence of pre-colonial law. Twin brothers dispute their succession before the inkundla — revealing a sophisticated system built on ubulungisa (justice) and communal harmony.",
    tn: "Mokwalo o o tlhomologileng wa Sexhosa le tshireletso ya molao wa pele ga bokoloni. Mawelana a omana ka boswa fa pele ga inkundla — go senola molao o o batlang ubulungisa (tshiamiso) le kutlwano.",
  },
  references: [
    "'The conception and application of justice in S.E.K. Mqhayi's Ityala Lamawele' (SciELO SA / Tydskrif vir Letterkunde)",
    "'Ityala lamawele' — Wikipedia",
  ],
  scenes: [
    {
      id: "the-lawsuit",
      title: { en: "The Lawsuit of the Twins", tn: "Tsheko ya Mawele" },
      text: {
        en: "In the time of King Hintsa, two twin brothers — Wele and Babini — came before the inkundla, the traditional Xhosa court. Their father had died, and because they were born on the same day, neither could simply claim the seniority that decided inheritance and succession. Their dispute would test the wisdom of umthetho (the law) and its pursuit of ubulungisa (justice).",
        tn: "Mo motlheng wa Kgosi Hintsa, mawelana ba babedi — Wele le Babini — ba tla fa pele ga inkundla, kgotla ya setso ya Sexhosa. Rraabo o ne a tlhokafetse, mme ka ba tsetswe ka letsatsi le le lengwe, ope o ne a sa kgone go ipolela bogolo jo bo neng bo laola boswa. Tsheko ya bone e ne e tla leka botlhale jwa umthetho (molao) le ubulungisa (tshiamiso).",
      },
      childText: {
        en: "Long ago, twin brothers named Wele and Babini had a problem. Their father had died, and because they were born on the same day, no one knew which brother was the elder. So they went to the inkundla — the people's court — to find a fair answer.",
        tn: "Bogologolo, mawelana ba bidiwa Wele le Babini ba ne ba na le bothata. Rraabo o ne a tlhokafetse, mme ka ba tsetswe ka letsatsi le le lengwe, go ne go sa itsiwe gore ke mang yo mogolo. Jalo ba ya kwa inkundla — kgotla ya batho — go batla karabo e e siameng.",
      },
      imagePrompt:
        "Two young Xhosa twin brothers standing with dignity before a traditional inkundla court of seated elders under a great tree, 19th-century Eastern Cape, warm cinematic light, painterly, 4k, artistic interpretation",
      seed: 1914,
      sourceNote: "Mqhayi, Ityala Lamawele (1914) — set in the reign of King Hintsa; the twins' succession dispute.",
    },
    {
      id: "wisdom-of-the-inkundla",
      title: { en: "The Wisdom of the Inkundla", tn: "Botlhale jwa Inkundla" },
      text: {
        en: "The inkundla did not rush. Councillors weighed evidence and cross-examined; the midwives were called to testify about the custom that had marked the second-born at birth. Step by step the court reasoned toward the truth. In the end the brothers humbled themselves, each honouring the other's seniority — for in Xhosa law the aim was not one brother's victory but the restoration of harmony between them. This is restorative justice: ubulungisa that heals the community.",
        tn: "Inkundla ga e a ka ya itlhaganela. Bagakolodi ba sekaseka bosupi ba botsolotsa; ababelegisi ba bidiwa go ntsha bosupi ka ngwao e e neng ya tshwaya yo mongwe wa mawele fa a tsalwa. Kgato ka kgato kgotla ya batla boammaaruri. Kwa bofelong bana ba ikokobetsa, mongwe le mongwe a tlotla bogolo jwa yo mongwe — gonne mo molaong wa Sexhosa maikaelelo e ne e se phenyo ya mongwe, e le go busa kutlwano. Se ke tshiamiso e e fodisang setšhaba.",
      },
      childText: {
        en: "The court listened carefully. Wise councillors asked questions, and the midwives who were there at the twins' birth told what they remembered. Slowly the truth became clear. In the end, each brother chose to honour the other. The court did not want a winner and a loser — it wanted peace between the brothers and their family.",
        tn: "Kgotla ya reetsa ka kelotlhoko. Bagakolodi ba botlhale ba botsa dipotso, mme ababelegisi ba ba neng ba le teng fa mawele a tsalwa ba bolela se ba se gakologelwang. Ka iketlo boammaaruri jwa senega. Kwa bofelong, ngwana mongwe le mongwe a tlotla yo mongwe. Kgotla ga e a ka ya batla mofenyi le mofenngwi — e ne e batla kagiso.",
      },
      imagePrompt:
        "A circle of Xhosa elders and councillors deliberating gravely in a traditional inkundla, one elder speaking with authority, dusk firelight, solemn and dignified, cinematic, painterly, 4k, artistic interpretation",
      seed: 1835,
      sourceNote: "Mqhayi, Ityala Lamawele (1914) — councillors' cross-examination, midwives' testimony, and the restorative resolution honouring communal harmony.",
    },
  ],
};
