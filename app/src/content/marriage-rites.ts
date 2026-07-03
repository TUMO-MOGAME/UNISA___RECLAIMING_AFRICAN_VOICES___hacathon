import type { Module } from "./types";

// Cultural Atlas — "Rites of Passage: Marriage". Grounded in cited sources (BeingAfrican culture
// panels, SciELO SA, South African Tourism). Customs are described with respect; where practices are
// contested today, that context is kept. NOTE(setswana): Tswana content especially needs review by a
// Setswana speaker; `tn` fields are AI-assisted drafts.

export const marriageRites: Module = {
  id: "marriage-rites",
  kind: "atlas",
  title: "Rites of Passage: Marriage",
  author: "Living Customs",
  source: "BeingAfrican culture panels; SciELO South Africa; South African Tourism — see references.",
  audience: "All ages — family, alliance, belonging",
  blurb: {
    en: "Lobola, Patlo, Umtshato, Umabo — how South Africa's peoples turn a marriage into an alliance of families, lineages and ancestors.",
    tn: "Bogadi, Patlo, Umtshato, Umabo — ka fa merafe ya Aforika Borwa e fetolang lenyalo go nna kgolagano ya malapa le badimo.",
  },
  archivePrompt: {
    en: "How was marriage celebrated in your family? Record the customs, songs and words.",
    tn: "Lenyalo le ne le ketekwa jang mo lelapeng la gago? Gatisa ngwao, dipina le mafoko.",
  },
  references: [
    "BeingAfrican — 'Tswana / Xhosa Marriage Practices'",
    "SciELO South Africa — 'mahadi [bride price] and young Basotho couples'",
    "JoyRibbons — 'Lobola, Umembeso, Umabo: a Zulu Wedding's Three Stages'",
    "Umtsimba (Wikipedia); Emdoneni Lodge — 'Zulu Wedding – Umabo'",
  ],
  scenes: [
    {
      id: "lobola",
      title: { en: "Lobola — More Than a Gift", tn: "Bogadi — Go Feta Mpho" },
      text: {
        en: "Across South Africa's Bantu-speaking peoples — bogadi or magadi in Sotho-Tswana, ikhazi in isiXhosa, lobola in isiZulu — marriage joins not two individuals but two families and their ancestral lineages. Often misread as a 'bride price', lobola is an act of respect and alliance: it thanks the bride's family, affirms the couple's new bond, and, through the exchange of cattle, ties the union to the ancestors.",
      },
      childText: {
        en: "In many South African cultures, marriage joins two whole families, not just two people. A gift called lobola shows respect and thanks between the families. It is a way of saying the two families are now bonded together.",
      },
      imagePrompt:
        "Two African families meeting warmly to discuss a marriage, elders in traditional dress, cattle nearby, golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 4101,
      sourceNote: "BeingAfrican culture panels; SciELO SA, 'mahadi and young Basotho couples'.",
    },
    {
      id: "patlo",
      title: { en: "Patlo — The Search", tn: "Patlo" },
      text: {
        en: "In Sotho-Tswana tradition, marriage unfolds as Patlo — a careful, multi-stage negotiation. The Malome (maternal uncle) leads as chief negotiator, and the Rakgadi (paternal aunt) speaks for her family. It opens with Pulamolomo, a gift to 'open the mouth' and begin talks, and moves through the setting of magadi to Lenyalo, the celebration, where the bride is dressed as a married woman. Basotho brides often wear vibrant Shweshwe, and grooms the iconic Basotho blanket.",
      },
      childText: {
        en: "Among Sotho and Tswana people, a wedding is arranged step by step between the families. A special uncle and aunt help guide the talks. At the celebration, the bride wears beautiful traditional clothes to show that she is now married.",
      },
      imagePrompt:
        "A joyful Sotho-Tswana wedding, bride in vibrant Shweshwe cloth, groom in a Basotho blanket, ululating women, golden highveld light, cinematic, painterly, artistic interpretation, no text",
      seed: 4202,
      sourceNote:
        "BeingAfrican, 'Tswana Marriage Practices'; South African Tourism. [Review by a Setswana speaker.]",
    },
    {
      id: "umtshato",
      title: { en: "Umtshato — Becoming Family", tn: "Umtshato" },
      text: {
        en: "The Xhosa marriage, Umtshato, is a long journey of integration. Ilobola is settled through named gifts, and a joyful bridal party — the Uduli or Umtsimba — escorts the bride to her new home. There she is welcomed into the groom's clan and its ancestral protection, often through utsiki or amasi (sour milk). A period of Ukuhota follows: a time of deep respect toward her new family as she learns its ways.",
      },
      childText: {
        en: "A Xhosa wedding takes many steps to join the two families. A happy group of young people walks the bride to her new home, where she is welcomed into the family. Afterwards she shows great respect to her new relatives as she settles in.",
      },
      imagePrompt:
        "A vibrant Xhosa bridal procession in traditional umbhaco cloth, ochre and white, singing and dancing, coastal light, cinematic, painterly, artistic interpretation, no text",
      seed: 4303,
      sourceNote: "BeingAfrican, 'Xhosa Marriage Practices'; Umtsimba (Wikipedia).",
    },
    {
      id: "umabo",
      title: { en: "Umabo — The Wedding", tn: "Umabo" },
      text: {
        en: "In Zulu custom, after lobola comes Umembeso — the groom's family presenting gifts — reciprocated by the bride's family's Umbondo. The wedding itself, Umabo, is held at the groom's home. The bride leaves her childhood home covered in a blanket, instructed not to look back: a deliberate spiritual break with the past. Amid dancing and gift-giving, playful rituals bring warmth to the solemn joining of two families.",
      },
      childText: {
        en: "A Zulu wedding, Umabo, is full of dancing, gifts and celebration. The bride leaves her old home without looking back, showing she is starting a new life. The two families share gifts and joy as they become one.",
      },
      imagePrompt:
        "A vibrant Zulu wedding with dancing, colourful beadwork and shields, rolling KwaZulu-Natal hills, golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 4404,
      sourceNote: "JoyRibbons, 'Lobola, Umembeso, Umabo'; Emdoneni Lodge, 'Zulu Wedding – Umabo'.",
    },
  ],
};
