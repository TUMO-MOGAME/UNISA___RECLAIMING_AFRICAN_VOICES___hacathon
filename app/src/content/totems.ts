// Totems & Clans — "The Zoo-Cosmological Constitution": Southern African totemism, lineage fission and
// indigenous socio-ecological governance. A Cultural Atlas compendium rendered on the sidebar layout.
//
// GROUNDING (humanities-grounding skill + AGENTS.md §4): every claim traces to a published source or is
// framed openly as oral tradition. Per the project's integrity choice we DO NOT use grokipedia; the
// citations below are reputable ethnographic/academic/heritage sources. Oral genesis stories are
// presented AS oral tradition — how the communities themselves carry them — not as settled fact.
//
// LANGUAGES: the animal terms (Tau, Nkwe, Kwena…) are the real Sotho-Tswana / Nguni / Tshivenḓa words —
// data, shown in every language. The English essays/meanings are the base text; Setswana + other
// languages fall back to English (labelled) until reviewed. [NEEDS: Tumo's Setswana + cultural review.]

import type { ImageSourcePropType } from "react-native";

export type TotemTerms = {
  /** Sesotho / Setswana / Sepedi (Seboko). */
  sothoTswana?: string;
  /** Nguni — Zulu / Xhosa / Ndebele / Swati (isiduko / isibongo). */
  nguni?: string;
  /** Tshivenḓa (mutupo). */
  venda?: string;
};

export type Totem = {
  /** kebab id — matches the image filename in assets/animals. */
  id: string;
  animal: string;
  image: ImageSourcePropType;
  terms: TotemTerms;
  /** Associated clans / peoples. */
  clans: string;
  /** Core symbolic / philosophical meaning. */
  meaning: string;
  /** Deeper grounded narrative (optional) — genesis stories are oral tradition. */
  story?: string[];
  /** Reputable source(s) for this entry. */
  sourceNote: string;
};

export type TotemEssay = {
  id: string;
  title: string;
  body: string[];
  sourceNote?: string;
};

const img = (name: string): ImageSourcePropType => IMAGES[name];

// One static require per file (react-native needs literal paths).
const IMAGES: Record<string, ImageSourcePropType> = {
  lion: require("../../assets/animals/lion.webp"),
  leopard: require("../../assets/animals/leopard.webp"),
  crocodile: require("../../assets/animals/crocodile.webp"),
  elephant: require("../../assets/animals/elephant.webp"),
  porcupine: require("../../assets/animals/porcupine.webp"),
  "vervet-monkey": require("../../assets/animals/vervet-monkey.webp"),
  baboon: require("../../assets/animals/baboon.webp"),
  duiker: require("../../assets/animals/duiker.webp"),
  kudu: require("../../assets/animals/kudu.webp"),
  eland: require("../../assets/animals/eland.webp"),
  zebra: require("../../assets/animals/zebra.webp"),
  fish: require("../../assets/animals/fish.webp"),
  aardvark: require("../../assets/animals/aardvark.webp"),
  "wild-pig": require("../../assets/animals/wild-pig.webp"),
  buffalo: require("../../assets/animals/buffalo.webp"),
  "sacred-python": require("../../assets/animals/sacred-python.webp"),
  beetle: require("../../assets/animals/beetle.webp"),
  owl: require("../../assets/animals/owl.webp"),
  rat: require("../../assets/animals/rat.webp"),
  rabbit: require("../../assets/animals/rabbit.webp"),
  "scaly-finch": require("../../assets/animals/scaly-finch.webp"),
  bees: require("../../assets/animals/bees.webp"),
};

// ── Opening essays — the ontology and the history of the system ──────────────────────────────────

export const totemsIntro: TotemEssay[] = [
  {
    id: "ontology",
    title: "The ontology of the totem",
    body: [
      "Across the indigenous societies of Southern Africa, the bond between a human collective and the natural world is carried by a structured system of totemic affiliation — diboko or liboko among the Sotho-Tswana, iziduko or izithakazelo among the Nguni (Zulu, Xhosa, Ndebele), and mitupo among the Vhavenda. A totem — usually a wild animal, sometimes a plant or object — is not a badge or a self-chosen “spirit animal”. It is an ancestral guardian and the foundation of a clan's social identity.",
      "Unlike individualistic Western notions, a Southern African totem is inherited patrilineally — a standing contract binding each generation to a specific lineage. The Tshivenḓa proverb “Mutupo u tevhela ṅombe” (the totem follows the cattle) captures it: a child takes the father's totem, secured through the bridewealth (lobola / magadi) that moves with marriage.",
      "The system works as a socio-cosmological constitution: it sets the rules of exogamy that prevent incest, defines the hospitality owed to a travelling stranger, structures political rank under hereditary rulers, and serves as a map of memory — a way to read migrations, resolve splits, and hold ecological balance with the land.",
    ],
    sourceNote:
      "National Museum Publications, “Totems and their cultural significance in South Africa”; Noyam Journals, “The Role of Nicknames and Totems in Tshivenḓa Surnames”; BeingAfrican, Clans & Totems (Zulu / Xhosa / Ndebele / Tswana).",
  },
  {
    id: "fission",
    title: "Lineage fission: how totems are born",
    body: [
      "Totems emerged with the dynamics of Bantu migration and political fission. Sotho-Tswana and Nguni polities grew by “hiving off” — a junior chief or ambitious royal sibling breaking away to found a new group. The name Batswana itself is read as “the separatists”, those who could not hold together.",
      "When a group split, it needed a fresh marker: to tell itself apart from close kin, to avoid marrying its own relatives, and to anchor its new authority. So a new clan either adopted a new totem after a decisive event, or shifted the meaning of an old one.",
      "The “United Phofu (Eland) Confederacy” is the classic case. Around the 14th–15th centuries a series of succession crises broke it apart, and out of that fission came the Bahurutshe, Bakwena, Bangwaketse and Bangwato chiefdoms — each taking up its own totem for its own road.",
    ],
    sourceNote:
      "Michigan State University, “Origins of the Tswana”; South African History Online, “Tswana”; Wikipedia, “Sotho-Tswana peoples”.",
  },
];

// ── The compendium of totems ─────────────────────────────────────────────────────────────────────

export const totems: Totem[] = [
  {
    id: "lion",
    animal: "Lion",
    image: img("lion"),
    terms: { sothoTswana: "Tau", nguni: "Ibhubesi / Ingonyama", venda: "Ngala" },
    clans: "Bataung, Mapulana, Zulu Royal House",
    meaning: "Absolute sovereignty, military power, physical courage, and the authority to decide.",
    story: [
      "Bataung oral tradition — the “People of the Lion” — traces the totem to Thuloane, who in the mid-17th century led the clan across the Vaal into a land thick with lions. Rather than a war of extermination they made a relationship with the predator, adopting it as their seboko and branding their cattle with its image — placing their wealth under the apex beast.",
      "Among the amaZulu the lion is bound into the office of the monarch, addressed as Ingonyama, “the master of all flesh”; a king was expected to take a male lion before his coronation and to wear its skin at high ceremony. The Setswana honorific Tautona (“Great Lion”) still addresses the President of Botswana — totemic language shaping modern office.",
    ],
    sourceNote:
      "BeingAfrican, Clans & Totems in Zulu Culture; South African History Online, “Tswana”; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "leopard",
    animal: "Leopard",
    image: img("leopard"),
    terms: { sothoTswana: "Nkwe", nguni: "Ingwe", venda: "Yingwe" },
    clans: "Zulu, Basotho and Tswana royalty",
    meaning: "Noble kingship, honourable warriorhood, and spiritual, healing authority.",
    story: [
      "In many Southern African courts the leopard commands even greater reverence than the lion. Its skin is the chosen attire of kings, chiefs, warriors and traditional healers. In older Tswana politics a supreme ruler over subordinate chiefs was saluted nkwetona, “the male leopard” — the sense being that where the lion rules by force, the leopard rules by cunning, agility and spiritual wisdom.",
    ],
    sourceNote: "National Museum Publications, “Totems and their cultural significance in South Africa”; BeingAfrican, Clans & Totems in Tswana Culture.",
  },
  {
    id: "crocodile",
    animal: "Crocodile",
    image: img("crocodile"),
    terms: { sothoTswana: "Kwena", nguni: "Ingwenya / Ngwenya", venda: "Ngwenya" },
    clans: "Bakwena, Vhavenda (Singo), Bapo, Bafokeng",
    meaning: "Judicial coolness, ancestral water-guardianship, silent strength and patience.",
    story: [
      "The Bakwena form the historical core of the Basotho, yet their mountain homeland is too cold and high for crocodiles. The totem therefore works as an oral archive — charting the clan's origins back to the warm Marico and Limpopo river systems. Tradition traces the line to Kwena, said to have led a splinter group south from the Bahurutshe after a severe drought around 1450–1480, taking the crocodile as an independent emblem.",
      "In Bakwena cosmology the crocodile is the clan's “godly father”: to kill one deliberately is likened to patricide, a taboo believed to disturb the rains. When a chief presides over the kgotla he is saluted “Ee, kwena!” (Yes, crocodile!), invoking the animal's patient, calculating judgment.",
    ],
    sourceNote:
      "Wikipedia, “Kwena clan”; National Museum Publications, “Crocodiles: facts, myths and symbolism in Africa”; Michigan State University, “Origins of the Tswana”.",
  },
  {
    id: "elephant",
    animal: "Elephant",
    image: img("elephant"),
    terms: { sothoTswana: "Tlou", nguni: "Ndlovu", venda: "Nzou / Zhou" },
    clans: "Batloung, Balobedu, EmaSwati",
    meaning: "Unstoppable momentum, deep intelligence, and matriarchal leadership.",
    story: [
      "The words tlou and ndlovu carry the sense of “to crash through” or “to force a way” — the animal that clears any obstacle. The Batloung are literally “the people who revere the elephant”.",
      "In the Zulu and Swati kingdoms the elephant structures royal gender: while the king is the male lion, the Queen Mother is the Ndlovukazi / Ndlovukati, the “Great She-Elephant”. Modelled on the matriarchal lead of a wild herd, she is the institutional check on the king and the custodian between the royal house and the ancestors.",
    ],
    sourceNote: "BeingAfrican, Clans & Totems in Zulu Culture; Inhlase, “Eswatini culture”; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "porcupine",
    animal: "Porcupine",
    image: img("porcupine"),
    terms: { sothoTswana: "Noko", nguni: "Ngungumbane", venda: "Noko" },
    clans: "Bapedi (Maroteng), Baroka, Banoko",
    meaning: "Active defensive resilience, territorial integrity, and self-protection.",
    story: [
      "Bapedi oral history holds that the ruling Maroteng broke away from the Tswana-speaking Bakgatla (whose totem was the monkey). Crossing the Leolo Mountains, they found a porcupine quill resting on an antheap and read it as an ancestral sign — the quill, the porcupine's defence, meant these mountains would be an impenetrable fortress. They abandoned the monkey for the noko.",
      "The lesson is the porcupine's own: a peaceful herbivore that seeks no fight, but raises quills that can kill a lion when cornered. The Bapedi under Sekwati and Sekhukhune I turned the rugged terrain of Sekhukhuneland into exactly that shield against 19th-century incursions.",
    ],
    sourceNote: "Wikipedia, “Pedi people”; Encyclopedia.com, “Pedi”; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "vervet-monkey",
    animal: "Vervet Monkey",
    image: img("vervet-monkey"),
    terms: { sothoTswana: "Kgabo", nguni: "Nkawu", venda: "Nkawu" },
    clans: "Bakgatla (ba-Kgafela and related houses)",
    meaning: "Intellectual adaptability, collective coordination, agility and quick recovery.",
    story: [
      "For the Bakgatla the word kgabo means both “monkey” and “flame” — and their warriors are praised as the flames that consume the enemy. Tradition tells of a Mfecane-era escape: fleeing enemy regiments and blocked by a swollen river, the clan followed a vervet monkey through the canopy to a safe crossing. The monkey is also remembered as a sentry whose alarm cries warned the warriors of an approaching enemy.",
    ],
    sourceNote: "BeingAfrican, Clans & Totems in Tswana Culture; Bakgatla-Ba-Kgafela Traditional Authority; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "baboon",
    animal: "Baboon",
    image: img("baboon"),
    terms: { sothoTswana: "Tshwene", nguni: "Imfene", venda: "Tshwene" },
    clans: "Bahurutshe, Bahananwa",
    meaning: "Cunning, territorial watchfulness, and raw strength.",
    story: [
      "The Bahurutshe once shared the Phofu (eland) totem. Tradition explains the change through the molomo first-fruits ceremony: on its eve a troop of baboons broke in and ate the ritual melons. The junior line refused the spoiled fruit in disgust; the senior line, led by the woman-chief Mohurutshe, saw awe instead — the baboons had “beaten them to the first bite” — and took tshwene as the new totem.",
      "The Bahananwa of the Blouberg made a more practical choice: fleeing across the Limpopo, they dropped an earlier springbuck totem (its snoring risked betraying their hiding places) and adopted the baboon, abundant in the cliffs that became their stronghold.",
    ],
    sourceNote: "Sunday Standard, “History of Bahurutshe”; Bennett, “Women chiefs and precolonial Tswana patriarchy”; BeingAfrican, Clans & Totems in Tswana Culture.",
  },
  {
    id: "duiker",
    animal: "Duiker",
    image: img("duiker"),
    terms: { sothoTswana: "Phuthi", nguni: "Impunzi", venda: "Phuthi" },
    clans: "Maphuthing, Baphuthi, Bangwato, Bangwaketse",
    meaning: "Strategic camouflage, diplomatic humility, and quick, adaptive flight.",
    story: [
      "The Bangwato honour the duiker for saving Chief Khama III: hidden in a cave during a raid, he was passed over when a startled duiker bolted from the entrance and his pursuers assumed no human could be near. In gratitude the chief made the animal sacred. For the Maphuthing the duiker marked the abundance of their ancestral land, and the Baphuthi (of Nguni descent) took the totem — and the name — after integrating with them.",
    ],
    sourceNote: "Africa's indigenous cultural heritage (kara.co.za); knowbotswana, “Proudly Botswana – tribes and totems”; National Museum Publications.",
  },
  {
    id: "kudu",
    animal: "Kudu",
    image: img("kudu"),
    terms: { sothoTswana: "Tholo", nguni: "Iqudu", venda: "Tholo" },
    clans: "Barolong, Batlhaping",
    meaning: "Guidance in drought, natural resourcefulness, and aesthetic grace.",
    story: [
      "The Barolong were early ironworkers whose first totem was tshipi (iron). Tradition tells that, crossing a desert in severe drought and near death from thirst, they followed a herd of kudu — antelope adapted to finding water — to a hidden source, and lived. In gratitude they took the kudu, and members are still greeted as namane tsa tholo, “the calves of the kudu”. Its spiral horns were kept as royal wind-instruments (diphala).",
    ],
    sourceNote: "Barolong Boo Ratshidi, “Our Totem”; EcoTraining, “How the Kudu got its Name”.",
  },
  {
    id: "eland",
    animal: "Eland",
    image: img("eland"),
    terms: { sothoTswana: "Phofu", nguni: "Mpofu / Mhofu", venda: "Mhofu / Nhuka" },
    clans: "Early Bahurutshe, Vahera, Ndebele, Swati (Gamas)",
    meaning: "Primordial ancestral power, abundance, endurance and warrior pride.",
    story: [
      "The largest antelope in the region, the eland was the original emblem of the “United Phofu Confederacy” before its fission scattered the Tswana chiefdoms. For the Vahera and related Ndebele and Swati clans the eland (shava / mpofu) stands for self-sufficiency and warrior energy; among the Swati, clans such as the Gamas hold a strict taboo against eating its meat, keeping the animal sacred.",
    ],
    sourceNote: "Wikipedia, “Shava Totem”; Inhlase, “Eswatini culture”; Michigan State University, “Origins of the Tswana”.",
  },
  {
    id: "zebra",
    animal: "Zebra",
    image: img("zebra"),
    terms: { sothoTswana: "Pitsi", nguni: "Idube", venda: "Mangwa" },
    clans: "Dube, Madhuve",
    meaning: "Aesthetic pride, physical beauty, grace and familial charm.",
    sourceNote: "BeingAfrican, Clans & Totems in Zulu Culture; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "fish",
    animal: "Fish",
    image: img("fish"),
    terms: { sothoTswana: "Tlhapi", nguni: "Inhlanzi", venda: "Tlhapi" },
    clans: "Batlhaping",
    meaning: "Emergency survivalism, pragmatic resourcefulness, and breaking a boundary to live.",
    story: [
      "The Batlhaping — the “People of the Fish” — split from the Barolong and settled near the meeting of the Vaal and Harts rivers. Tradition holds that in a severe famine they met Khoekhoe (Korana) who took fish from the rivers, and, to survive, broke the old inland taboo against eating aquatic creatures. That act of survival became a permanent marker of identity: the fish, tlhapi.",
    ],
    sourceNote: "South African History Online, “Tswana”; africanbudgetsafaris, “The African Culture of Botswana, its People and Totems”.",
  },
  {
    id: "aardvark",
    animal: "Aardvark / Ant Bear",
    image: img("aardvark"),
    terms: { sothoTswana: "Thakadu", nguni: "Isambane", venda: "Thakadu" },
    clans: "Batlokwa, Xaniqwee",
    meaning: "Strategic camouflage, hidden defence, and the finding of water.",
    story: [
      "The Batlokwa honour the aardvark for its gift of burrowing and hiding — tactics they mirrored in war, evading enemies in caves and earthworks. For the Xaniqwee of the Okavango it is a saviour: crossing the dry Kalahari, they survived by drinking water trapped in the deep hollows of abandoned aardvark burrows, and made the animal taboo to hunt.",
    ],
    sourceNote: "africanbudgetsafaris, “Botswana, its People and Totems”; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "wild-pig",
    animal: "Wild Pig / Warthog",
    image: img("wild-pig"),
    terms: { sothoTswana: "Kolobe", nguni: "Ingulube", venda: "Kolobe" },
    clans: "Balobedu, Bafula, Ndebele",
    meaning: "Hardworking generosity, sociability, abundance and earth-bound strength.",
    sourceNote: "National Museum Publications, “Totems and their cultural significance”; BeingAfrican, Clans & Totems in Ndebele Culture.",
  },
  {
    id: "buffalo",
    animal: "Buffalo",
    image: img("buffalo"),
    terms: { sothoTswana: "Nare", nguni: "Nyathi", venda: "Nare" },
    clans: "Balete, Babirwa, Ndebele",
    meaning: "Ruthless group defence, collective strength and wise persistence.",
    sourceNote: "BeingAfrican, Clans & Totems in Ndebele Culture; National Museum Publications, “Totems and their cultural significance”.",
  },
  {
    id: "sacred-python",
    animal: "Sacred Python",
    image: img("sacred-python"),
    terms: { sothoTswana: "Tlhware", nguni: "Inhlwathi", venda: "Tharu" },
    clans: "Vhavenda (Singo, Luvhimbi royal lines)",
    meaning: "Regulation of the water cycle, rainfall, fertility and ancestral cooling.",
    story: [
      "For the Vhavenda, Lake Fundudzi in the Soutpansberg is home to the Great White Python, a deity of fertility and rain; every stream and pool is linked to its presence. The bond is renewed in the Domba, the final initiation of young women: to the beat of the sacred drum they move in a single close-linked line, winding like a python, aligning human fertility with the rains the land needs.",
    ],
    sourceNote: "South African Tourism, “Meet the Venda”; Mhondoro, “Venda Traditions”; Wikipedia, “Venda kingdom”.",
  },
  {
    id: "beetle",
    animal: "Beetle",
    image: img("beetle"),
    terms: { sothoTswana: "Khukhwane", nguni: "Ibhungane", venda: "Khukhwane" },
    clans: "Ndlanzi (Zulu)",
    meaning: "Direct problem-solving, navigation, and guidance in hard decisions.",
    sourceNote: "BeingAfrican, Clans & Totems in Zulu Culture.",
  },
  {
    id: "owl",
    animal: "Owl",
    image: img("owl"),
    terms: { sothoTswana: "Mankgikhikhisiri", nguni: "Isikhova", venda: "Zwithukhutshu" },
    clans: "Cebekhulu (Zulu)",
    meaning: "Nocturnal fortune and ancestral warning, read with care.",
    story: [
      "Widely feared elsewhere as an omen of witchcraft, the owl is welcomed by the Cebekhulu as a sign of good fortune. A visit is treated as positive — though the family will still consult a sangoma to read the specific message the ancestors are sending.",
    ],
    sourceNote: "BeingAfrican, Clans & Totems in Zulu Culture.",
  },
  {
    id: "rat",
    animal: "Rat",
    image: img("rat"),
    terms: { sothoTswana: "Peba", nguni: "Igundane", venda: "Mbeba" },
    clans: "Bhebhe (Zulu)",
    meaning: "Domestic ancestral presence, household harmony and protection.",
    story: [
      "For the Bhebhe a rat seen in the homestead is an ancestral visitor and is never harmed. If the family keeps a cat, they will move it to a neighbour while they perform the rites to guide the rat safely back to the wild.",
    ],
    sourceNote: "BeingAfrican, Clans & Totems in Zulu Culture.",
  },
  {
    id: "rabbit",
    animal: "Rabbit / Hare",
    image: img("rabbit"),
    terms: { sothoTswana: "Mmutla", nguni: "Umvundla", venda: "Muvhundla" },
    clans: "Bafokeng, Batswapong",
    meaning: "High survival skill, grace, and the evasion of needless conflict.",
    sourceNote: "National Museum Publications, “Totems and their cultural significance”; knowbotswana, “tribes and totems”.",
  },
  {
    id: "scaly-finch",
    animal: "Scaly Finch",
    image: img("scaly-finch"),
    terms: { sothoTswana: "Thlhantlhagane", nguni: "Inyoni", venda: "Lutshelatshini" },
    clans: "Bakone",
    meaning: "Humility, environmental adaptability, social coordination and focus.",
    sourceNote: "BeingAfrican, Clans & Totems (Nguni/Sotho-Tswana); National Museum Publications.",
  },
  {
    id: "bees",
    animal: "Bees",
    image: img("bees"),
    terms: { sothoTswana: "Nose", nguni: "Inyosi", venda: "Mutshedzi" },
    clans: "AmaXesibe",
    meaning: "Industrious productivity, spirited defence of territory, and social unity.",
    sourceNote: "BeingAfrican, Clans & Totems in Xhosa Culture.",
  },
];

// ── Closing essays — the governance lessons the system encodes ────────────────────────────────────

export const totemsLessons: TotemEssay[] = [
  {
    id: "conservation",
    title: "Conservation by distributed taboo",
    body: [
      "At heart, totemism is an indigenous conservation system. A strict taboo (go ila) against hunting, killing or eating a clan's totem builds a living protection around that species — enforced by deep belief; consuming one's totem was said to bring loss of teeth or hair, or a skin affliction.",
      "Because a single chiefdom held many clans together, the taboos were spread across many species at once. While the Bataung shielded lions, the Batloung shielded elephants, the Bakwena crocodiles and the Bakgatla monkeys — so no one species carried concentrated hunting pressure, and biodiversity could hold.",
    ],
    sourceNote:
      "University of Bologna, “African Totems: Cultural Heritage for Sustainable Environmental Conservation”; “Sotho-Tswana mythic animals: stratagem for environmental conservation” (Semantic Scholar).",
  },
  {
    id: "diplomacy",
    title: "Kinship, hospitality and refuge",
    body: [
      "A totem is shared collectively, so two strangers with the same totem treat each other as kin — even across chiefdoms and hundreds of kilometres. For a traveller, trader or refugee this was a lifeline: declare your totem in a foreign village and any family sharing it owed you food, shelter and protection.",
      "It framed diplomacy too. When duiker-revering Bangwato sought refuge with the Bangwaketse, the host chief settled them in a dedicated “Phuting ward” — the place of the duiker — using totemic alignment to fold newcomers peacefully into the nation.",
    ],
    sourceNote: "National Museum Publications, “Totems and their cultural significance”; knowbotswana, “Proudly Botswana – tribes and totems”.",
  },
  {
    id: "exogamy",
    title: "Exogamy and genetic health",
    body: [
      "One of the most practical functions is the prevention of inbreeding. In these patrilineal societies, marriage between two people of the same totem is forbidden — they count as one bloodline. Before a union, families would investigate both partners' totems and praise-lineages (izithakazelo / diboko).",
      "This rule of exogamy worked as a biological safeguard, keeping genetic diversity and avoiding the harms of close-kin marriage — centuries before modern genetics could explain why.",
    ],
    sourceNote: "National Museum Publications, “Totems and their cultural significance”; BeingAfrican, Clans & Totems (izithakazelo).",
  },
];

// ── Sources (reputable only — grokipedia deliberately excluded, per the project's integrity choice) ──

export const totemsSources: string[] = [
  "National Museum Publications — “Totems and their cultural significance in South Africa”; “Crocodiles: facts, myths and symbolism in Africa”",
  "BeingAfrican — Clans and Totems in Zulu / Xhosa / Ndebele / Tswana Culture",
  "South African History Online — “Tswana”",
  "Wikipedia — “Sotho-Tswana peoples”, “Kwena clan”, “Pedi people”, “Venda kingdom”, “Shava Totem”",
  "Barolong Boo Ratshidi — “Our Totem”",
  "EcoTraining — “How the Kudu got its Name”",
  "Michigan State University — “Origins of the Tswana”",
  "B. S. Bennett — “Women chiefs and precolonial Tswana patriarchy”",
  "Noyam Journals — “Nicknames and Totems in the Development of Tshivenḓa Surnames”",
  "University of Bologna — “African Totems: Cultural Heritage for Sustainable Environmental Conservation”",
  "South African Tourism — “Meet the Venda”; Mhondoro — “Venda Traditions”",
  "Inhlase — “Eswatini culture”; knowbotswana & africanbudgetsafaris — Botswana tribes and totems",
];
