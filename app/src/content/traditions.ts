import type { Module } from "./types";

// Cultural Atlas — "Beliefs & Traditions". Grounded in the project's sourced history document
// (marriage & death customs, ancestors, Indigenous Knowledge Systems) and standard references.
// Sensitive material (initiation, death rites) is handled with respect and context — neither
// sanitised nor sensationalised (integrity rule §6). NOTE(setswana): `tn` fields are AI-assisted
// DRAFTS for review by a Setswana speaker. [REVIEW]

export const traditions: Module = {
  id: "traditions",
  kind: "atlas",
  title: "Beliefs & Traditions",
  author: "Living Custom",
  source: "Project history document (customs, death rites, Indigenous Knowledge Systems); standard references.",
  audience: "All ages — the ancestors, the life-cycle, the sacred",
  blurb: {
    en: "The ancestors, the coming of age, the passage of death, the diviner and the sacred land — the beliefs and rites that carry South Africa's peoples through the great moments of life.",
    tn: "Badimo, go gola, loso, ngaka le naga e e boitshepo — ditumelo le meetlo e e isang batho ba Aforika Borwa mo dinakong tse dikgolo tsa botshelo.",
  },
  archivePrompt: {
    en: "What rites and beliefs does your family keep? Record them, with respect, for those who come after.",
    tn: "Ke meetlo le ditumelo dife tse lelapa la gago le di bolokang? Di gatise ka tlotlo mo go ba ba tlang.",
  },
  references: [
    "Project history document — 'Marriage & Death customs', 'Erosion of pre-colonial culture & IKS'.",
    "Standard references on ancestral belief (Badimo / Amadlozi) across Sotho-Tswana & Nguni.",
    "Standard references on initiation (ulwaluko, Domba, Umemulo) and on traditional healing (sangoma / inyanga).",
    "Indigenous Knowledge Systems research — sacred sites (Lake Fundudzi, Machovhela).",
  ],
  scenes: [
    {
      id: "ancestors",
      title: { en: "The Ancestors", tn: "Badimo" },
      text: {
        en: "Across South Africa's peoples, the ancestors are not gone — they are family who have crossed over and who watch, guide and must be honoured. Known as Badimo in Setswana and Amadlozi in isiZulu, they are approached with respect, remembrance and ritual: a slaughtered beast, home-brewed beer, a quiet word at a graveside. Reverence for the ancestors is one of the deepest threads shared by the Sotho-Tswana and Nguni families alike.",
      },
      childText: {
        en: "Many South African families believe their ancestors — the family members who have passed on — still watch over them and guide them. They are remembered and honoured with respect. In Setswana they are called Badimo, and in isiZulu, Amadlozi.",
      },
      imagePrompt:
        "A reverent family gathering at dusk honouring the ancestors, an elder pouring, soft firelight and long shadows, dignified, cinematic, painterly, artistic interpretation, no text",
      seed: 7601,
      sourceNote: "Project history document, 'commonalities' (Badimo / Amadlozi); standard references on ancestral belief.",
    },
    {
      id: "coming-of-age",
      title: { en: "Coming of Age", tn: "Go Gola" },
      text: {
        en: "The passage from child to adult is marked by initiation. Among the Xhosa and several other peoples, young men undergo ulwaluko, a period of seclusion, teaching and circumcision after which a boy is recognised as a man. Among the Venḓa, the Domba — the famous 'python dance' — prepares young women for adulthood and marriage. A young Zulu woman who has come of age may be honoured in the Umemulo ceremony. These are serious, sacred rites of teaching and belonging, guarded by the community.",
      },
      childText: {
        en: "Becoming an adult is marked by special ceremonies of teaching and belonging. Among the Xhosa, young men go through ulwaluko; among the Venḓa, young women learn through the Domba dance; and a young Zulu woman may be honoured with the Umemulo. These are respected, sacred moments.",
      },
      imagePrompt:
        "A dignified coming-of-age gathering, elders teaching young initiates, ceremonial blankets and firelight at dawn, respectful distance, cinematic, painterly, artistic interpretation, no text",
      seed: 7702,
      sourceNote: "Project history document (Domba, Umemulo); standard references on ulwaluko. Handled respectfully (integrity rule).",
    },
    {
      id: "death-passage",
      title: { en: "Death & the Passage", tn: "Loso le Tsela" },
      text: {
        en: "In many South African cultures death is not an ending but a perilous passage — the moving of the soul from the world of the living to the realm of the ancestors. Because a death brings a spiritual 'darkness' that must be cleansed, families keep careful rites: washing with specific herbs, the slaughter of a beast, and mourning observed with great care. In Zulu custom, a branch of the umphafa tree may be used to carry home the spirit of one who died far away, so that it can rest with its people. These rites are about tending the living and settling the dead with dignity.",
      },
      childText: {
        en: "In many cultures, death is seen not as an ending but as a journey — the soul moving to join the ancestors. Families keep careful, caring rituals to say goodbye and to help the spirit rest with its people. It is a time of great respect.",
      },
      imagePrompt:
        "A solemn, respectful memory of mourning and passage — a quiet gathering under a large tree at dusk, muted tones, dignity and care, cinematic, painterly, artistic interpretation, no text",
      seed: 7803,
      sourceNote: "Project history document, 'Death & the transition of the soul' (Zulu cleansing, umphafa branch). Handled with care, not sensationalised.",
    },
    {
      id: "healers",
      title: { en: "Healers & Diviners", tn: "Dingaka le Boramaatla" },
      text: {
        en: "Traditional health knowledge is carried by two kinds of practitioner. The sangoma is a diviner, called by the ancestors, who mediates between the living and the spirit world through divination and ritual. The inyanga is a herbalist, a master of medicinal plants and remedies. Far from the 'superstition' colonial writers dismissed, this is a deep body of Indigenous Knowledge — ecological, medical and spiritual — that many South Africans still turn to today, often alongside modern medicine.",
      },
      childText: {
        en: "South Africa has traditional healers. A sangoma is a healer guided by the ancestors, and an inyanga is an expert in medicine from plants. Their deep knowledge has been passed down for many generations, and many people still trust it today.",
      },
      imagePrompt:
        "A dignified traditional healer with beads and medicinal herbs in a warm interior, baskets and roots, respectful and knowledgeable, cinematic, painterly, artistic interpretation, no text",
      seed: 7904,
      sourceNote: "Project history document (Indigenous Knowledge Systems); standard references on sangoma & inyanga. Framed with respect, not as superstition (integrity rule).",
    },
    {
      id: "sacred-land",
      title: { en: "The Sacred Land", tn: "Naga e e Boitshepo" },
      text: {
        en: "For many peoples, certain places are holy and protected by custom. Among the Vhavenḓa of Limpopo, strict taboos, totemic reverence for particular plants and animals, and the guarding of sacred sites — Lake Fundudzi, the Machovhela rock pools, the Thathe Vondo forest — long acted as a powerful, culturally enforced way of conserving nature. What outsiders once dismissed as mere superstition was, in truth, a sophisticated Indigenous Knowledge System that kept a fragile ecology in balance.",
      },
      childText: {
        en: "For many peoples, some places are sacred and must be protected. The Vhavenḓa people care for holy places like Lake Fundudzi. Their rules and respect for nature were a wise way of protecting the land and its animals for the future.",
      },
      imagePrompt:
        "A hidden sacred lake in a misty forested valley of the far north, still water, protected and reverent, soft green light, cinematic, painterly, artistic interpretation, no text",
      seed: 7905,
      sourceNote: "Project history document, 'Erosion of pre-colonial culture & IKS' (Fundudzi, Machovhela, Vhavenḓa taboos).",
    },
  ],
};
