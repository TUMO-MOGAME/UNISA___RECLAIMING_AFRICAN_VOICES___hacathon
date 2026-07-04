import type { Module } from "./types";

// Cultural Atlas — "Food & Flavour". Grounded in standard South African culinary references (SA
// Tourism, standard cookery & food histories). Food is described as living culture, with its origins
// (indigenous, Cape Malay, Indian, settler) named honestly. NOTE(setswana): `tn` fields are
// AI-assisted DRAFTS for review by a Setswana speaker. [REVIEW]

export const food: Module = {
  id: "food",
  kind: "atlas",
  title: "Food & Flavour",
  author: "The South African Table",
  source: "Standard South African culinary references; South African Tourism — see references.",
  audience: "All ages — the table, family, celebration",
  blurb: {
    en: "A plate of South Africa: the braai fire, pap and morogo, biltong, the Cape Malay table and Durban's bunny chow — food is where the country's many peoples meet.",
    tn: "Sejo sa Aforika Borwa: mollo wa braai, papa le morogo, segwapa, tafole ya Cape Malay le bunny chow ya Durban — dijo ke fa merafe e kopanang teng.",
  },
  archivePrompt: {
    en: "What does your family cook for a celebration? Record the recipe, the story and the song.",
    tn: "Lelapa la gago le apaya eng mo moketeng? Gatisa resepe, kanegelo le pina.",
  },
  references: [
    "South African Tourism — 'Traditional South African food'.",
    "Standard references on Cape Malay cuisine (bobotie, bredie, koesisters).",
    "Standard references on Durban's Indian cuisine (bunny chow, breyani).",
    "Standard references on indigenous staples (pap, umngqusho / samp & beans, morogo).",
  ],
  scenes: [
    {
      id: "braai",
      title: { en: "The Braai", tn: "Braai" },
      text: {
        en: "The braai — cooking meat over an open fire — is a national institution that crosses every community. It is a verb and a gathering as much as a meal: friends and family around the coals, often with boerewors (a coiled farmer's sausage), sosaties, chops and 'pap and vleis'. In the townships the same fire is shisa nyama. Heritage Day, 24 September, is so widely marked with a braai that many simply call it National Braai Day.",
      },
      childText: {
        en: "A braai is cooking meat over a fire with family and friends — one of South Africa's favourite ways to gather. On Heritage Day many people light a braai together to celebrate.",
      },
      imagePrompt:
        "A warm South African braai gathering at dusk, meat and boerewors over glowing coals, family around the fire, golden light, cinematic, painterly, artistic interpretation, no text",
      seed: 7101,
      sourceNote: "South African Tourism; standard references on the braai & Heritage/Braai Day.",
    },
    {
      id: "staples",
      title: { en: "Pap, Samp & Morogo", tn: "Papa, Samp le Morogo" },
      text: {
        en: "Maize is the daily bread of much of the country. Pap — a stiff maize porridge (papa in Setswana, uphuthu in isiZulu) — is eaten with a relish of tomato and onion (sheba) or chakalaka, and with morogo, the leafy wild greens gathered and cooked as a vegetable. Umngqusho — samp (broken dried maize) slow-cooked with sugar beans — is a beloved Xhosa dish, famously Nelson Mandela's favourite.",
      },
      childText: {
        en: "Maize is food for every day. Pap is a thick maize porridge, eaten with a tasty tomato relish and with morogo — green leaves cooked like spinach. Samp and beans, called umngqusho, was Nelson Mandela's favourite meal.",
      },
      imagePrompt:
        "A humble, warm South African home meal — a bowl of white maize pap with tomato relish and green morogo, earthenware, soft daylight, cinematic, painterly, artistic interpretation, no text",
      seed: 7202,
      sourceNote: "Standard references on indigenous staples (pap, umngqusho, morogo); Mandela biography (umngqusho).",
    },
    {
      id: "biltong",
      title: { en: "Biltong & the Dried Meats", tn: "Segwapa" },
      text: {
        en: "Long before refrigeration, meat was preserved by drying and curing — a skill shared by the Khoikhoi and later shaped by settler methods. Biltong is air-dried, spiced, cured meat (beef or game), sliced thin; droëwors is a dried sausage. Both are everyday snacks and road-trip staples, and a good example of how an old survival technique became a national favourite.",
      },
      childText: {
        en: "Before fridges, people kept meat from spoiling by drying it. Biltong is dried, spiced meat, and droëwors is a dried sausage. Today they are favourite South African snacks.",
      },
      imagePrompt:
        "Strips of spiced air-dried biltong hanging to cure in a farm pantry, warm rustic light, close and inviting, cinematic, painterly, artistic interpretation, no text",
      seed: 7303,
      sourceNote: "Standard references on biltong & South African cured meats (Khoikhoi & settler methods).",
    },
    {
      id: "cape-malay",
      title: { en: "The Cape Malay Table", tn: "Tafole ya Cape Malay" },
      text: {
        en: "At the Cape, people enslaved and brought from Southeast Asia and elsewhere created a distinct cuisine of gentle spice — the Cape Malay table. Its signature is bobotie: spiced minced meat baked under a savoury egg custard, sweet with fruit and studded with almonds. Alongside it stand bredie (slow stews), denningvleis, and sweet koesisters — a syrup-soaked, coconut-rolled treat quite different from the Afrikaans koeksister. This food carries the memory of slavery at the Cape and the community that turned it into something beautiful.",
      },
      childText: {
        en: "At the Cape, people brought from far away created a special way of cooking with gentle spices. Its most famous dish is bobotie — spiced mince baked with a soft egg topping. They also make sweet, spiced koesisters. This food remembers a hard history and the community that made it beautiful.",
      },
      imagePrompt:
        "A Cape Malay kitchen table with a golden bobotie in a dish, fragrant spices, Bo-Kaap colours in the background, warm light, cinematic, painterly, artistic interpretation, no text",
      seed: 7404,
      sourceNote: "Standard references on Cape Malay cuisine (bobotie, bredie, koesisters) & Cape slavery history. Handle the history honestly (integrity rule).",
    },
    {
      id: "durban-curry",
      title: { en: "Durban Curry & Bunny Chow", tn: "Keri ya Durban" },
      text: {
        en: "From the 1860s, indentured labourers from India brought their spices to Natal, and Durban became one of the great curry cities of the world. Its most famous street food is the bunny chow — a hollowed-out half-loaf of white bread filled with curry, said to have been invented so workers could carry a meal by hand. Rich breyani (biryani) is cooked for weddings and celebrations.",
      },
      childText: {
        en: "People who came from India long ago brought their spices to Durban, which became famous for curry. The bunny chow is a half-loaf of bread hollowed out and filled with curry — a clever, tasty meal you can carry in your hand.",
      },
      imagePrompt:
        "A Durban bunny chow — a hollowed half-loaf filled with fragrant curry — on a street stall, steam rising, vivid warm light, cinematic, painterly, artistic interpretation, no text",
      seed: 7505,
      sourceNote: "Standard references on Durban Indian cuisine (bunny chow, breyani) & the history of indenture in Natal.",
    },
  ],
};
