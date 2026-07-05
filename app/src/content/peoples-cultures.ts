import type { Module } from "./types";

// Cultural Atlas — "Peoples & Cultures". Grounded in the project's sourced history document
// ("South African History And Culture.txt") and standard references. Integrity guardrails applied:
//  · The genetic-admixture table (Table 1) is DELIBERATELY EXCLUDED — race-science risk.
//  · Lineage chronology (e.g. "Tswana oldest") is framed as scholarly evidence, not a settled ranking.
//  · Customs are described with respect and context, neither sanitised nor sensationalised.
// NOTE(setswana): `tn` fields are AI-assisted DRAFTS for review by a Setswana speaker. [REVIEW]

export const peoplesCultures: Module = {
  id: "peoples-cultures",
  kind: "atlas",
  title: "Peoples & Cultures",
  author: "The Nations of South Africa",
  source: "Project history document (peopling, culture & custom); standard ethnographic references — see references.",
  audience: "All ages — identity, custom, kinship",
  blurb: {
    en: "Who are South Africa's peoples? The Sotho-Tswana and Nguni families — Tswana, Pedi, Sotho, Zulu, Xhosa, Ndebele, Venḓa and Tsonga — each with a distinct history, language and way of life.",
    tn: "Batho ba Aforika Borwa ke bomang? Malapa a Sotho-Tswana le Nguni — Batswana, Bapedi, Basotho, Zulu, Xhosa, Ndebele, Vhavenḓa le Vatsonga — mongwe le mongwe ka hisitori le puo ya gagwe.",
  },
  archivePrompt: {
    en: "What are your people's customs, praise-names and traditions? Record them for the archive.",
    tn: "Ngwao, maboko le ditso tsa batho ba gaeno ke eng? Di gatise mo polokelong.",
  },
  references: [
    "Project history document — 'Peopling of South Africa', 'Marriage & Death customs', 'Erosion of pre-colonial culture'.",
    "Standard references on the Sotho-Tswana (Hurutshe, Kwena, Rolong; Kgotla; letsema).",
    "Standard references on the Nguni (Xhosa, Zulu, Ndebele) and on the Vhavenḓa and Vatsonga.",
    "South African History Online — peoples of South Africa.",
  ],
  scenes: [
    {
      id: "two-families",
      title: { en: "Two Great Families", tn: "Malapa a Mabedi a Magolo" },
      text: {
        en: "From the mid-first millennium CE, Bantu-speaking farmers settled across the Limpopo and Vaal basins, bringing iron, cattle and sorghum. Over centuries they formed two great cultural clusters: the Sotho-Tswana of the central highveld, and the Nguni of the eastern coast. They share a deep ancestry — patrilineal societies that measure wealth in cattle, keep age-set organisation, practise bride-wealth, and revere the ancestors (Badimo in Setswana, Amadlozi in isiZulu) — yet each nation forged a distinct identity.",
      },
      childText: {
        en: "Long ago, farming peoples settled here with iron tools and cattle. Over time they grew into two big families: the Sotho-Tswana of the inland plains and the Nguni of the coast. They share old roots — respect for cattle and for their ancestors — but each became its own nation.",
      },
      imagePrompt:
        "Two broad African cultural landscapes meeting — highveld agro-town and coastal hills, cattle and homesteads, warm golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 6101,
      sourceNote: "Project history document, 'Peopling of South Africa'; standard Bantu-migration scholarship.",
    },
    {
      id: "tswana",
      title: { en: "The Batswana", tn: "Batswana" },
      text: {
        en: "The evidence of archaeology, language and oral history points to the Tswana (Western Sotho) as the senior foundational lineages of the Sotho-Tswana cluster, with settlements from around the 13th–14th centuries. Ancient chiefdoms — the Hurutshe, Kwena and Rolong — are remembered as the founding houses; oral tradition celebrates Morolong, 'the forger who danced to iron'. The Batswana built large agro-towns governed through the Kgotla under a Kgosi — decentralised, consensus-driven — and prized letsema, communal cooperation, alongside trade and renowned metalwork. (Exact chronology is still debated among scholars.)",
      },
      childText: {
        en: "The Batswana are among the oldest of the inland peoples. They built big towns and made decisions together at a meeting place called the Kgotla, led by a Kgosi. They valued working together — letsema — and were famous for farming, trade and working iron.",
      },
      imagePrompt:
        "A large Sotho-Tswana agro-town on the highveld, a central kgotla meeting place, cattle and stone-walled homesteads, elders in council, golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 6202,
      sourceNote: "Project history document, 'Sotho-Tswana Cluster'; SAHO 'Tswana'. Chronology framed as debated (integrity rule).",
    },
    {
      id: "pedi",
      title: { en: "The Bapedi", tn: "Bapedi" },
      text: {
        en: "The Pedi (Northern Sotho) branched from the Kgatla, a Tswana-speaking group that migrated eastward and settled near the Steelpoort River in the mid-17th century. Over generations they built the formidable Marota kingdom — especially under King Thulare (about 1780–1820) — absorbing neighbouring clans and forging a distinct Northern Sotho identity woven into the mountains of Sekhukhuneland.",
      },
      childText: {
        en: "The Bapedi grew from a Tswana group that moved east and settled by the Steelpoort River. They built a strong kingdom, the Marota, and made their home among the mountains of Sekhukhuneland.",
      },
      imagePrompt:
        "A Northern Sotho mountain kingdom in Sekhukhuneland, stone homesteads on rugged slopes, cattle, warm dusk light, cinematic, painterly, artistic interpretation, no text",
      seed: 6303,
      sourceNote: "Project history document, 'The Pedi'; standard histories of the Marota kingdom.",
    },
    {
      id: "sotho",
      title: { en: "The Basotho", tn: "Basotho" },
      text: {
        en: "The Basotho (Southern Sotho) emerged as a unified nation much later, forged in the Mfecane (Difaqane) — the upheavals of the 1820s. King Moshoeshoe I gathered fragmented Sotho-Tswana clans and Nguni refugees fleeing the Zulu expansion and consolidated them at his mountain fortress, Thaba Bosiu, synthesising a new Southern Sotho identity and laying the foundation of the modern nation of Lesotho.",
      },
      childText: {
        en: "The Basotho nation was brought together in a time of great upheaval in the 1820s. Their wise leader, Moshoeshoe I, gathered many people and kept them safe on a flat-topped mountain called Thaba Bosiu — the beginning of the nation of Lesotho.",
      },
      imagePrompt:
        "A flat-topped mountain fortress at dawn (Thaba Bosiu), people gathering below in blankets, Maloti mountains beyond, reverent light, cinematic, painterly, artistic interpretation, no text",
      seed: 6404,
      sourceNote: "Project history document, 'The Basotho'; standard histories of Moshoeshoe I & Thaba Bosiu.",
    },
    {
      id: "xhosa",
      title: { en: "The amaXhosa", tn: "amaXhosa" },
      text: {
        en: "The Xhosa were the vanguard of the Nguni's southward push, reaching the Great Fish River by the 18th century as the southernmost Nguni group. Long contact with the Khoisan is heard today in isiXhosa's click consonants. The Xhosa kingdom was formalised well before the 15th century by King Tshawe, who consolidated Nguni and Khoekhoe clans into a single polity. The amaXhosa gave the modern nation many of its foremost leaders and writers — among them S.E.K. Mqhayi, author of Ityala Lamawele.",
      },
      childText: {
        en: "The amaXhosa travelled furthest south along the coast, reaching the Great Fish River. From long friendship and contact with the Khoisan, their language gained its famous click sounds. Theirs is the language of the writer Mqhayi.",
      },
      imagePrompt:
        "Xhosa homesteads on the green rolling hills of the Eastern Cape, people in ochre umbhaco cloth, cattle, coastal light, cinematic, painterly, artistic interpretation, no text",
      seed: 6506,
      sourceNote: "Project history document, 'The Xhosa'; links to the Ityala Lamawele module (Mqhayi).",
    },
    {
      id: "zulu",
      title: { en: "The amaZulu", tn: "amaZulu" },
      text: {
        en: "For centuries the Zulu were a minor Nguni clan, said to be founded by Zulu kaMalandela around 1574. It was in the early 19th century, under King Shaka, that the Zulu conquered and absorbed surrounding groups — the Mthethwa, the Ndwandwe — into a large, centralised kingdom. Shaka replaced circumcision-based initiation with the amabutho age-regiment system, shifting loyalty to the king and forging a disciplined military state. The Zulu traditionally lived in dispersed homesteads across the hills of Natal. Vilakazi's Inkondlo kaZulu carried their praise-poetry onto the page.",
      },
      childText: {
        en: "The Zulu began as a small clan. In the early 1800s, under King Shaka, they grew into a large and powerful kingdom, organised around regiments loyal to the king. Theirs is the language of the poet Vilakazi.",
      },
      imagePrompt:
        "Zulu homesteads of rounded thatch dwellings across the rolling green hills of KwaZulu-Natal, cattle and beadwork, dramatic light, cinematic, painterly, artistic interpretation, no text",
      seed: 6606,
      sourceNote: "Project history document, 'The Zulu'; links to the Inkondlo kaZulu module (Vilakazi).",
    },
    {
      id: "ndebele",
      title: { en: "The amaNdebele", tn: "amaNdebele" },
      text: {
        en: "The Ndebele share Nguni roots but charted their own path. Under Chief Musi in the early 1600s a faction broke away from the coastal Nguni and migrated inland toward the Pretoria region. After Musi's death a dispute between his sons split the people into the Manala and the Ndzundza. Living among the Sotho-Tswana, the Northern Ndebele absorbed much Sotho influence, while the Southern Ndebele held to a language closer to their Nguni forebears — and became world-famous for their bold geometric mural art and beadwork.",
      },
      childText: {
        en: "The Ndebele share roots with the coastal peoples but moved inland long ago under Chief Musi. Later they split into two groups. The Southern Ndebele are famous around the world for their bright, bold painted houses and beadwork.",
      },
      imagePrompt:
        "A Southern Ndebele homestead with bold geometric painted walls in bright colours, a woman in beaded neck-rings, highveld light, cinematic, painterly, artistic interpretation, no text",
      seed: 6707,
      sourceNote: "Project history document, 'The Ndebele'; standard references on Ndebele art & history.",
    },
    {
      id: "venda-tsonga",
      title: { en: "Vhavenḓa & Vatsonga", tn: "Vhavenḓa le Vatsonga" },
      text: {
        en: "In the far north, the Vhavenḓa hold a distinct language and a deep tradition of sacred places — Lake Fundudzi, the Thathe Vondo forest, the stone-walled kingdoms of Dzata and Thulamela. Their Indigenous Knowledge Systems — taboos, totemic reverence and protected sacred sites — long served as effective conservation. The Domba, the famous python dance, is a pre-marital initiation that prepares young women for adulthood. The Vatsonga of the eastern Lowveld keep their own customs, including a courtship in which a suitor sends a grass ring, and a strong ethic of collective family obligation.",
      },
      childText: {
        en: "In the far north, the Vhavenḓa have their own language and many sacred places, like Lake Fundudzi. Their famous python dance, the Domba, prepares young women for adulthood. Their neighbours the Vatsonga keep their own customs and a strong sense of caring for family.",
      },
      imagePrompt:
        "A misty sacred lake in a forested valley of the far north (Venḓa), dancers in a slow python line, reverent green light, cinematic, painterly, artistic interpretation, no text",
      seed: 6808,
      sourceNote: "Project history document, 'Venda and Tsonga Customs' & 'Indigenous Knowledge Systems' (Fundudzi, Machovhela, Domba).",
    },
  ],
};
