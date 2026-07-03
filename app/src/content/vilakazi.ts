import type { Module } from "./types";

// Grounded in B.W. Vilakazi, *Inkondlo kaZulu* (1935) — the first published volume of Zulu poetry.
// See docs/04-humanities-sources.md. NOTE(setswana): `tn` fields are AI-assisted DRAFTS — review.

export const vilakazi: Module = {
  id: "vilakazi",
  title: "Inkondlo kaZulu",
  author: "B.W. Vilakazi",
  year: 1935,
  source: "B.W. Vilakazi, *Inkondlo kaZulu* (1935)",
  audience: "Literature lovers — language preservation",
  blurb: {
    en: "The first published volume of Zulu poetry. Vilakazi carried the oral genius of the izimbongi (praise poets) onto the page — a meta-story about how a language survives by adapting to new media.",
    tn: "Lokwalo lwa ntlha lo lo gatisitsweng lwa maboko a Sezulu. Vilakazi o ne a tlisa botlhale jwa molomo jwa izimbongi mo pampiring — kanegelo ka ga ka fa puo e tshelang ka teng ka go fetoga.",
  },
  references: [
    "'B.W. Vilakazi: the poet as inspired prophet' (journals.co.za)",
    "Prof. N. Zondi — 'Revisiting the poetry of Benedict Wallet Vilakazi' (UP)",
    "'B.W. Vilakazi and the birth of the Zulu novel' (Semantic Scholar)",
  ],
  scenes: [
    {
      id: "mouth-to-page",
      title: { en: "From the Mouth to the Page", tn: "Go tswa Molomong go ya Pampiring" },
      text: {
        en: "Before the printing press, Zulu history lived in the mouths of the izimbongi — the praise poets — who performed it from memory. In 1935 B.W. Vilakazi published Inkondlo kaZulu, the first volume of written Zulu poetry, carrying that oral genius onto the page. He wrestled with a hard question: how do you fix performance, memory, and breath in ink without losing their living essence?",
        tn: "Pele ga motšhine wa go gatisa, hisitori ya Sezulu e ne e tshela mo melomong ya izimbongi — baboki — ba ba neng ba e bua ka tlhaloganyo. Ka 1935 B.W. Vilakazi o ne a gatisa Inkondlo kaZulu, lokwalo lwa ntlha lwa maboko a a kwadilweng a Sezulu. O ne a lwa le potso e e thata: o tshwara jang tiragatso, tlhaloganyo, le mowa mo enkeng ntle le go latlhegelwa ke botshelo jwa tsone?",
      },
      childText: {
        en: "Long ago, Zulu poems and history were not written down. Special poets called izimbongi remembered them and performed them out loud. In 1935, B.W. Vilakazi wrote the first book of Zulu poems, called Inkondlo kaZulu, so the poems could live on paper too.",
        tn: "Bogologolo, maboko le hisitori ya Sezulu di ne di sa kwalwe. Baboki ba ba kgethegileng ba bidiwa izimbongi ba ne ba di gakologelwa ba bo ba di bua ka lentswe le legolo. Ka 1935, B.W. Vilakazi o ne a kwala buka ya ntlha ya maboko a Sezulu, e e bidiwang Inkondlo kaZulu.",
      },
      imagePrompt:
        "A Zulu imbongi (praise poet) performing with a raised staff before a gathering at dusk, spoken words seeming to rise into the air and become written verse, evocative, cinematic, painterly, 4k, artistic interpretation",
      seed: 1935,
      sourceNote: "Vilakazi, Inkondlo kaZulu (1935) — first published volume of Zulu poetry; transition from oral izimbongi to written verse.",
    },
    {
      id: "why-preservation",
      title: { en: "Why Preservation Matters", tn: "Goreng go Boloka go le Botlhokwa" },
      text: {
        en: "Vilakazi's achievement was also a warning. A language not written, not taught, not renewed can fade. By moving the izimbongi from breath to book, he extended the life of Zulu letters — just as today that same heritage must move from book to screen. This is the lineage Maloba joins: another act of preservation, on the people's own terms.",
        tn: "Katlego ya ga Vilakazi e ne gape e le tlhagiso. Puo e e sa kwalweng, e sa rutweng, e sa ntlafadiweng e ka nyelela. Ka go suta izimbongi go tswa mong wa mowa go ya bukeng, o ne a oketsa botshelo jwa dingwalo tsa Sezulu — fela jaaka gompieno boswa joo bo tshwanetse go suta go tswa bukeng go ya skrineng. Ke yone tatelano e Maloba e tsenang mo go yone.",
      },
      childText: {
        en: "Vilakazi showed something important: if we don't write down and share our languages, they can disappear. He helped Zulu poetry live on in books. Today, apps like this one help that same heritage live on screens — so it is never lost.",
        tn: "Vilakazi o bontshitse selo sa botlhokwa: fa re sa kwale re bo re abelane dipuo tsa rona, di ka nyelela. O thusitse maboko a Sezulu go tshela mo dibukeng. Gompieno, di-app tse di tshwana le e, di thusa boswa joo go tshela mo dikrineng — gore bo se ka jwa latlhega.",
      },
      imagePrompt:
        "An open book of Zulu poetry transforming into glowing light and a modern screen, bridging generations, a young person reading with wonder, warm hopeful cinematic light, painterly, 4k, artistic interpretation",
      seed: 2035,
      sourceNote: "Vilakazi, Inkondlo kaZulu (1935) — preservation meta-narrative; adaptation of African letters to new media. (The link to Maloba's mission is our framing, not a claim about Vilakazi.)",
    },
  ],
};
