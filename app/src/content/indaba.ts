import type { Module } from "./types";

// Grounded in Vusamazulu Credo Mutwa, *Indaba, My Children* (1964).
// See docs/04-humanities-sources.md. Handle traditional material honestly + with context.
// NOTE(setswana): `tn` fields are AI-assisted DRAFTS — review with a Setswana speaker before submission.

export const indaba: Module = {
  id: "indaba",
  title: "Indaba, My Children",
  author: "Vusamazulu Credo Mutwa",
  year: 1964,
  source: "Vusamazulu Credo Mutwa, *Indaba, My Children* (1964)",
  audience: "Children & adults — cosmology, myth, preservation",
  blurb: {
    en: "A Zulu sanusi broke a vow of secrecy to write down oral tradition before it could be lost. A sweeping cosmology — Ninavanhu-Ma the Great Mother, the Tree of Life, migrations, and rites of passage.",
    tn: "Sanusi wa Mozulu o ne a roba kano ya sephiri go kwala dingwao tsa molomo pele di ka latlhega. Tlhamo e kgolo ya legodimo — Ninavanhu-Ma Mmagolo, Setlhare sa Botshelo, le mafulo a setso.",
  },
  references: [
    "'Indaba, My Children' — chapter summary (bookey.app)",
    "'Vusamazulu Credo Mutwa' — Wikipedia",
    "'Creation Myths in Indaba, My Children' (MISJ Vol.1)",
  ],
  scenes: [
    {
      id: "ninavanhu-ma",
      title: { en: "Ninavanhu-Ma, the Great Mother", tn: "Ninavanhu-Ma, Mmagolo" },
      text: {
        en: "Indaba, my children. So begins Credo Mutwa's telling of the old creation story. In the beginning, he recounts, came Ninavanhu-Ma — the Great Mother — and the Tree of Life from which the peoples of the earth would spring. Mutwa, a Zulu sanusi, set these oral traditions down in 1964, breaking a custodian's vow of secrecy because he feared that under colonialism and apartheid they might be lost forever.",
        tn: "Indaba, bana ba me. Ke jalo Credo Mutwa a simololang kanegelo ya kgale ya tlholego. Kwa tshimologong, o anela, go ne ga tla Ninavanhu-Ma — Mmagolo — le Setlhare sa Botshelo se merafe ya lefatshe e neng e tla tswa mo go sone. Mutwa, sanusi wa Mozulu, o ne a kwala dingwao tse ka 1964, a roba kano ya sephiri ka a tshaba gore di ka latlhega ka bokoloni le tlhaolele.",
      },
      childText: {
        en: "'Indaba, my children' means 'I have a story for you, my children.' That is how Credo Mutwa began the very old story of how the world was made. He told of Ninavanhu-Ma, the Great Mother, and the Tree of Life that all peoples came from. Mutwa wrote these stories down so they would never be forgotten.",
        tn: "'Indaba, bana ba me' e raya 'Ke na le kanegelo ya lona, bana ba me.' Ke ka fa Credo Mutwa a neng a simolola kanegelo ya kgalekgale ya ka fa lefatshe le neng la dirwa ka teng. O ne a bua ka Ninavanhu-Ma, Mmagolo, le Setlhare sa Botshelo se batho botlhe ba tswang mo go sone. Mutwa o ne a kwala dikanegelo tse gore di se ka tsa lebalwa.",
      },
      imagePrompt:
        "A vast mythic African creation scene, the Great Mother Ninavanhu-Ma and a luminous cosmic Tree of Life rising over an ancient landscape, stars, deep gold and indigo, breathtaking, cinematic, painterly, 4k, artistic interpretation",
      seed: 1964,
      sourceNote: "Mutwa, Indaba, My Children (1964) — creation myth of Ninavanhu-Ma & the Tree of Life; his decision to record oral tradition.",
    },
    {
      id: "keeping-the-story-alive",
      title: { en: "Keeping the Story Alive", tn: "Go Boloka Kanegelo e Tshela" },
      text: {
        en: "Beyond the creation myth, Indaba, My Children carries the migrations of the Bantu-speaking peoples, the codes of warriors, and the rites that marked the great passages of life. Mutwa did not sanitise this history — he recorded its hardships alongside its beauty. To read him is to inherit a cosmology, and a warning about what is lost when a people's stories go unpreserved.",
        tn: "Kwa ntle ga tlholego, Indaba, My Children e tshola mafulo a merafe ya Sebantu, melao ya bagale, le ditirelo tse di neng di tshwaya dikgato tse dikgolo tsa botshelo. Mutwa ga a ka a phepafatsa hisitori e — o ne a kwala mathata mmogo le bontle. Go mmala ke go rua tlhamo ya legodimo, le tlhagiso ka se se latlhegang fa dikanegelo tsa batho di sa bolokwe.",
      },
      childText: {
        en: "Credo Mutwa's book holds many stories — of long journeys, of brave warriors, and of the special ceremonies that marked growing up. He told the whole truth, the hard parts and the beautiful parts. His stories remind us why it matters to keep our history alive.",
        tn: "Buka ya ga Credo Mutwa e na le dikanegelo tse dintsi — tsa maeto a maleele, tsa bagale ba pelokgale, le tsa meletlo e e kgethegileng ya go gola. O ne a bolela boammaaruri jotlhe, dikarolo tse di thata le tse dintle. Dikanegelo tsa gagwe di re gakolola gore ke goreng go le botlhokwa go boloka hisitori ya rona e tshela.",
      },
      imagePrompt:
        "A long line of ancient Bantu-speaking people migrating across a dramatic Southern African landscape at dawn, carrying their stories and traditions, epic scale, warm golden light, cinematic, painterly, 4k, artistic interpretation",
      seed: 2064,
      sourceNote: "Mutwa, Indaba, My Children (1964) — migrations of Bantu-speaking peoples, warrior codes, rites of passage; an unflinching record.",
    },
  ],
};
