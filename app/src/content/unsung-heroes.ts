import type { Module } from "./types";

// Cultural Atlas — "Unsung Heroes". Grounded in cited sources (South African History Online, Ditsong
// Museums, SciELO SA). Integrity rule: only mainstream/peer-reviewed sourcing; contested claims are
// framed as such. NOTE(setswana): `tn` fields are AI-assisted DRAFTS for review by a Setswana speaker.

export const unsungHeroes: Module = {
  id: "unsung-heroes",
  kind: "atlas",
  title: "Unsung Heroes",
  author: "Reclaimed Voices",
  source: "South African History Online; Ditsong Museums; SciELO South Africa — see references.",
  audience: "All ages — resistance, memory, justice",
  blurb: {
    en: "Not all who resisted oppression are famous. Meet the leaders, martyrs and young people history nearly forgot — from Kgosi Galeshewe to the youth of 1976.",
    tn: "Ga se botlhe ba ba lwantsheng kgatelelo ba ba itsegeng. Kopana le baeteledipele le basha ba hisitori e batlileng go ba lebala — go tswa go Kgosi Galeshewe go ya go basha ba 1976.",
  },
  archivePrompt: {
    en: "Does your family remember a hero history forgot? Add their voice to the archive.",
    tn: "A lelapa la gago le gakologelwa mogaki yo hisitori e mo lebetseng? Tsenya lentswe la gagwe mo polokelong.",
  },
  references: [
    "Ditsong Museums — 'Kgosi Galeshewe: a chief of the Batlhaping and anti-colonial revolutionary'",
    "Wikipedia — 'Nyabêla'; South African History Online — 'Ndebele'",
    "SciELO South Africa — 'James Anta: Missionary, Martyr and unsung Hero…'",
    "South African History Online — 'The June 16 Soweto Youth Uprising'",
  ],
  scenes: [
    {
      id: "galeshewe",
      title: { en: "Kgosi Galeshewe", tn: "Kgosi Galeshewe" },
      text: {
        en: "Kgosi Galeshewe of the Batlhaping led armed resistance against the Cape Colony — first in the Phokwane Rebellion of 1878, then the Langenberg Rebellion of 1896–97, sparked by land dispossession and the forced culling of cattle during the rinderpest epidemic. Allied with the Barolong and Tlharo, he fought for nine months. He was imprisoned on Robben Island for ten years and was later honoured, posthumously, with the Order of Mendi for Bravery.",
      },
      childText: {
        en: "Kgosi Galeshewe was a Batlhaping leader who fought to protect his people's land and cattle from colonial rulers. He was sent to prison on Robben Island, but today he is remembered as a brave hero.",
      },
      imagePrompt:
        "A dignified 19th-century Batlhaping Tswana chief on the northern Cape highveld, resolute and proud, warm golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 3101,
      sourceNote:
        "Ditsong Museums, 'Kgosi Galeshewe — a chief of the Batlhaping and anti-colonial revolutionary'; South African History Online.",
    },
    {
      id: "nyabela",
      title: { en: "King Nyabela", tn: "Kgosi Nyabela" },
      text: {
        en: "King Nyabela of the Ndzundza-Ndebele defied the Boer republic in the Transvaal. In 1882 he gave sanctuary to the Pedi chief Mampuru, triggering the Mapoch War. For eight months in 1883 his people withstood a Boer siege from their mountain fortress at KoNomtsharhelo, using a network of hidden tunnels. After his defeat his people were indentured on Boer farms to break their unity, and Nyabela was sentenced to life imprisonment — yet he endures as a symbol of Ndebele resistance.",
      },
      childText: {
        en: "King Nyabela protected people who came to him for safety, even when powerful settlers demanded he hand them over. His community hid in tunnels and defended their mountain home for months. He is remembered as a symbol of Ndebele courage.",
      },
      imagePrompt:
        "A 19th-century Ndebele king standing before a rocky mountain stronghold, defiant, dramatic sky, cinematic, painterly, artistic interpretation, no text",
      seed: 3202,
      sourceNote: "Wikipedia, 'Nyabêla'; South African History Online, 'Ndebele'.",
    },
    {
      id: "moleli-anta",
      title: { en: "Moleli & Anta", tn: "Moleli le Anta" },
      text: {
        en: "Modumedi Moleli (Sotho/Tswana) and James Anta (Xhosa) were teacher-evangelists who carried literacy and learning into Mashonaland in the late 19th century. Both were killed during the Shona uprisings of 1896–97. Moleli was later honoured with a school named for him; Anta, a young Xhosa visionary, remains almost entirely unremembered — a stark example of how history keeps some names and forgets others.",
      },
      childText: {
        en: "Two teachers, Moleli and Anta, travelled far to help others learn to read. Both lost their lives. One is remembered with a school in his name; the other was almost forgotten. Their story reminds us to remember everyone who gave so much.",
      },
      imagePrompt:
        "Two 19th-century African teacher-evangelists holding books, warm reverent light, quiet dignity, cinematic, painterly, artistic interpretation, no text",
      seed: 3303,
      sourceNote: "SciELO South Africa, 'James Anta: Missionary, Martyr and unsung Hero of the Wesleyan Methodist Church'.",
    },
    {
      id: "youth-1976",
      title: { en: "The Youth of 1976", tn: "Basha ba 1976" },
      text: {
        en: "On 16 June 1976, Soweto's students rose against Bantu Education — the system designed to school Black children only for servitude. Young leaders like Tsietsi Mashinini, Khotso Seatlholo and Sibongile Mkhabela faced the full force of the apartheid state. The uprising, and the lives it cost, changed the course of the nation.",
      },
      childText: {
        en: "In 1976, school students in Soweto bravely protested against an unfair education made to hold them back. Young leaders stood up to a powerful government, and their courage helped change South Africa.",
      },
      imagePrompt:
        "Determined South African students marching in 1976 Soweto, raised fists, dust and morning light, documentary cinematic style, artistic interpretation, no text",
      seed: 3404,
      sourceNote: "South African History Online, 'The June 16 Soweto Youth Uprising'; Sunday World, 'Unsung Heroes'.",
    },
  ],
};
