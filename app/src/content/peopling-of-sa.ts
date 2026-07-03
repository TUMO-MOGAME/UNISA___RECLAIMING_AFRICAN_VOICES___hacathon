import type { Module } from "./types";

// Cultural Atlas — "The Peopling of South Africa". Grounded in cited sources (South African History
// Online; Wikipedia entries for Nguni/Xhosa/Zulu/Ndebele; genetic & archaeological syntheses).
// Integrity: migration is described from mainstream scholarship; contested lineage-chronology claims
// are framed as "took shape / branched", NOT as a settled ranking, and genetic-identity data is
// deliberately excluded. NOTE(setswana): `tn` fields are AI-assisted drafts for review.

export const peoplingOfSa: Module = {
  id: "peopling-of-sa",
  kind: "atlas",
  title: "The Peopling of South Africa",
  author: "Migrations & Peoples",
  source: "South African History Online; Wikipedia (Nguni, Xhosa, Zulu, Ndebele peoples); archaeological & genetic syntheses — see references.",
  audience: "All ages — origins, migration, identity",
  blurb: {
    en: "Where do South Africa's peoples come from? Trace the journey from the first Khoisan to the Sotho-Tswana and Nguni nations.",
    tn: "Batho ba Aforika Borwa ba tswa kae? Sala morago loeto go tloga go Khoisan wa ntlha go ya go merafe ya Sotho-Tswana le Nguni.",
  },
  archivePrompt: {
    en: "What does your family remember of where they came from? Record your origins.",
    tn: "Lelapa la gago le gakologelwa eng ka kwa le tswang teng? Gatisa ditlholego tsa gago.",
  },
  references: [
    "South African History Online — 'Oral tradition and indigenous knowledge'; 'Tswana'",
    "Wikipedia — 'Nguni peoples', 'Xhosa people', 'Zulu people', 'Southern Ndebele people'",
    "Wikipedia — 'Sotho people', 'Pedi people'",
    "Genetic & archaeological syntheses of South African Bantu-speaker history (PMC)",
  ],
  scenes: [
    {
      id: "first-people",
      title: { en: "The First People", tn: "Batho ba Ntlha" },
      text: {
        en: "Long before any other settlement, the Khoisan — hunter-gatherers and pastoralists — lived across Southern Africa for tens of thousands of years, leaving their record in rock art across the land. Their languages, their deep knowledge of the veld, and their legacy remain woven into the region's peoples and tongues.",
      },
      childText: {
        en: "The very first people of Southern Africa were the Khoisan. They lived here for a very, very long time and painted beautiful pictures on rocks that we can still see today.",
      },
      imagePrompt:
        "Ancient San rock art beside a vast Southern African landscape at dawn, hunter-gatherers in the distance, ochre earth tones, reverent cinematic light, artistic interpretation, no text",
      seed: 5101,
      sourceNote: "South African History Online, 'Oral tradition and indigenous knowledge'.",
    },
    {
      id: "great-migration",
      title: { en: "The Great Migration", tn: "Bofaladi jo Bogolo" },
      text: {
        en: "From the mid-first millennium CE, Bantu-speaking farmers moved south from West and Central Africa, bringing iron-working, cattle, and sorghum. Settling across the Limpopo and Vaal basins, they gradually formed two great cultural clusters: the Sotho-Tswana of the central highveld, and the Nguni of the eastern coast.",
      },
      childText: {
        en: "Long ago, farming peoples moved south into this land, bringing iron tools and cattle. Over time they grew into two big family groups: the Sotho-Tswana of the inland plains and the Nguni of the coast.",
      },
      imagePrompt:
        "Bantu-speaking farmers with cattle and iron tools migrating across the African savanna, epic warm light, sense of journey, cinematic, painterly, artistic interpretation, no text",
      seed: 5202,
      sourceNote: "Wikipedia, 'Nguni peoples'; archaeological & genetic syntheses (PMC).",
    },
    {
      id: "highveld-peoples",
      title: { en: "The Highveld Peoples", tn: "Batho ba Godimodimo" },
      text: {
        en: "On the central highveld the Sotho-Tswana built large agro-towns, governed through the Kgotla under a Kgosi, and prized letsema — communal cooperation. Senior lineages such as the Hurutshe, Kwena and Rolong took shape; the Pedi later branched off to build the Marota kingdom, and the Basotho nation was forged in the upheavals of the Mfecane by Moshoeshoe I at his mountain stronghold, Thaba Bosiu.",
      },
      childText: {
        en: "On the inland highveld, the Sotho-Tswana built big towns and made decisions together at a meeting place called the Kgotla. From them came groups like the Tswana, Pedi and Basotho, whose great leader Moshoeshoe kept his people safe on a flat-topped mountain.",
      },
      imagePrompt:
        "A large Sotho-Tswana agro-town on the highveld with a central kgotla meeting place, cattle and stone-walled homesteads, golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 5303,
      sourceNote:
        "SAHO, 'Tswana'; Wikipedia, 'Sotho people' / 'Pedi people'. Lineage chronology is debated among scholars. [Review by a Setswana speaker.]",
    },
    {
      id: "coastal-peoples",
      title: { en: "The Coastal Peoples", tn: "Batho ba Lotshitshi" },
      text: {
        en: "Along the eastern seaboard the Nguni moved south. The Xhosa were the vanguard, reaching the Great Fish River and living in long contact with the Khoisan — heard today in isiXhosa's click sounds. The Zulu, once a minor clan, rose in the early 19th century under Shaka into a centralised power. The Ndebele charted their own path inland after a breakaway led by Chief Musi. Each people forged a distinct identity from a shared root.",
      },
      childText: {
        en: "Along the coast, the Nguni peoples moved south. The Xhosa went furthest and learned click sounds from the Khoisan. The Zulu grew powerful under the leader Shaka, and the Ndebele moved inland to make their own home. They all share the same distant roots.",
      },
      imagePrompt:
        "Nguni peoples along the green eastern coast of Southern Africa, cattle and beadwork, rolling hills meeting the sea, golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 5404,
      sourceNote:
        "Wikipedia, 'Xhosa people' / 'Zulu people' / 'Southern Ndebele people'; South African History Online.",
    },
  ],
};
