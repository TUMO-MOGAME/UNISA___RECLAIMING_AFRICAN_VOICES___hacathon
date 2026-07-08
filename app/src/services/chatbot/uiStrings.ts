// Localized chrome for the "Ask Ubuntu" chatbot widget — resolved through the i18n layer (t()) so the
// panel switches with the app-wide language picker, like the rest of the interface (see setswana-i18n).
// These are best-effort INTERFACE translations (not literary/heritage content, which keeps its honest
// reviewed/fallback status). A native speaker should still review before final — Tumo can verify `tn`.
// Any language left unset falls back to English automatically (integrity rule).

import type { Localized } from "../../i18n";

export const CHAT_UI: Record<string, Localized> = {
  ask: {
    en: "Ask Ubuntu", tn: "Botsa Ubuntu", zu: "Buza u-Ubuntu", xh: "Buza u-Ubuntu", nso: "Botšiša Ubuntu",
    st: "Botsa Ubuntu", ts: "Vutisa Ubuntu", af: "Vra vir Ubuntu", ss: "Buta Ubuntu", nr: "Buza u-Ubuntu", ve: "Vhudzisa Ubuntu",
  },
  guide: {
    en: "Your guide to this archive", tn: "Mokaedi wa gago wa polokelo eno", zu: "Umhlahlandlela wakho kule ngobo",
    xh: "Isikhokelo sakho kolu vimba", nso: "Mohlahli wa gago wa polokelo ye", st: "Motataisi wa hao wa polokelo ena",
    ts: "Murhetani wa wena wa vuhlayiselo lebyi", af: "Jou gids tot hierdie argief", ss: "Umcondzisi wakho kulengobo",
    nr: "Umkhombandlela wakho kulesi ngobo", ve: "Mulangi waṋu wa ino aráivi",
  },
  intro: {
    en: "Hi! I can answer questions about South Africa's literature and heritage on this site — and take you to any section. Try:",
    tn: "Dumela! Nka araba dipotso ka ga dingwalo le boswa jwa Aforika Borwa mo saeteng eno — e bile ke go isa go karolo nngwe le nngwe. Leka:",
    zu: "Sawubona! Ngingaphendula imibuzo mayelana nezincwadi namagugu aseNingizimu Afrika kule sayithi — futhi ngikuse kunoma yisiphi isigaba. Zama:",
    xh: "Molo! Ndingaphendula imibuzo malunga noncwadi namafa oMzantsi Afrika kule sayithi — kwaye ndikuse nakweyiphi na icandelo. Zama:",
    nso: "Thobela! Nka araba dipotšišo ka ga dingwalo le bohwa bja Afrika Borwa mo saeteng ye — gomme ka go go iša go karolo efe goba efe. Leka:",
    st: "Dumela! Nka araba dipotso ka dingoliloeng le lefa la Afrika Borwa saeteng ena — 'me ka u isa karolong efe kapa efe. Leka:",
    ts: "Xewani! Ndzi nga hlamula swivutiso mayelana ni matsalwa ni ndzhaka ya Afrika-Dzonga eka sayiti leyi — naswona ndzi ku yisa eka xiyenge xihi kumbe xihi. Ringeta:",
    af: "Hallo! Ek kan vrae oor Suid-Afrika se letterkunde en erfenis op hierdie webwerf beantwoord — en jou na enige afdeling neem. Probeer:",
    ss: "Sawubona! Ngingaphendvula imibuto mayelana netincwadzi nemagugu aseNingizimu Afrika kulelisayithi — futsi ngikuyise kunobe ngusiphi sigaba. Zama:",
    nr: "Lotjhani! Ngingaphendula imibuzo malungana neencwadi namagugu weSewula Afrika kilesi sayidi — begodu ngikuse nanyana ngisiphi isigaba. Linga:",
    ve: "Ndaa! Ndi nga fhindula mbudziso nga ha maṅwalwa na ifa ḽa Afrika Tshipembe kha ino saiti — nahone nda ni isa kha tshipiḓa natshiṅwe. Lingedzani:",
  },
  chip1: {
    en: "Take me to the provinces", tn: "Nkise kwa diporofenseng", zu: "Ngiyise ezifundazweni", xh: "Ndise kumaphondo",
    nso: "Nkiše diprofenseng", st: "Nkise diprofinseng", ts: "Ndzi yise eswifundzheni", af: "Neem my na die provinsies",
    ss: "Ngiyise etifundzeni", nr: "Ngiyise eemfundeni", ve: "Nnḓisani kha mavundu",
  },
  chip2: {
    en: "Who was Sol Plaatje?", tn: "Sol Plaatje e ne e le mang?", zu: "Ubani uSol Plaatje?", xh: "Ngubani uSol Plaatje?",
    nso: "Sol Plaatje e be e le mang?", st: "Sol Plaatje e ne e le mang?", ts: "Sol Plaatje a a ri mani?",
    af: "Wie was Sol Plaatje?", ss: "Bekangubani uSol Plaatje?", nr: "Bekungubani uSol Plaatje?", ve: "Sol Plaatje o vha e nnyi?",
  },
  chip3: {
    en: "What are totems?", tn: "Diboko ke eng?", zu: "Yini iziboko?", xh: "Yintoni iziduko?", nso: "Diboko ke eng?",
    st: "Diboko ke eng?", ts: "Swiharhi swa tinyimba i yini?", af: "Wat is totems?", ss: "Yini tiboko?", nr: "Yini iimbongo?", ve: "Mitupo ndi mini?",
  },
  chip4: {
    en: "What languages does the app support?", tn: "App e tshegetsa dipuo dife?", zu: "Iziphi izilimi ezisekelwa yile app?",
    xh: "Zeziphi iilwimi ezixhaswa yile app?", nso: "App e thekga maleme afe?", st: "App e tšehetsa dipuo dife?",
    ts: "App yi seketela tindzimi tihi?", af: "Watter tale ondersteun die app?", ss: "Ngutiphi tilwimi letisekelwa yile app?",
    nr: "Ngiziphi iinlimi ezisekelwa yile app?", ve: "App i tikedza nyambo dzifhio?",
  },
  offline: {
    en: "Navigation and site answers work offline. Add an Anthropic key for full conversation.",
    tn: "Go tsamaya le dikarabo tsa saete di dira ntle le inthanete. Tsenya senotlolo sa Anthropic go bua ka botlalo.",
    zu: "Ukuzula nezimpendulo zesayithi kusebenza ungaxhunywanga ku-inthanethi. Faka ukhiye we-Anthropic ukuze uxoxe ngokugcwele.",
    xh: "Ukukhangela neempendulo zesayithi kusebenza ungekho kwi-intanethi. Yongeza isitshixo se-Anthropic ukuze uncokole ngokupheleleyo.",
    nso: "Go sepela le dikarabo tša saete di šoma ntle le inthanete. Tsenya senotlelo sa Anthropic go boledišana ka botlalo.",
    st: "Ho tsamaya le dikarabo tsa saete di sebetsa ntle le marang-rang. Kenya senotlolo sa Anthropic bakeng sa moqoqo o feletseng.",
    ts: "Ku famba-famba ni tinhlamulo ta sayiti swi tirha handle ka inthanete. Engetela xilotlelo xa Anthropic ku bulisana hi ku helela.",
    af: "Navigasie en werf-antwoorde werk vanlyn. Voeg 'n Anthropic-sleutel by vir volledige gesprek.",
    ss: "Kuhamba netimphendvulo tesayithi kusebenta ungachumene ne-inthanethi. Ngeta sikhiya se-Anthropic kute ucoce ngalokugcwele.",
    nr: "Ukukhamba neempendulo zesayidi kusebenza ungakaxhunyilelwa ku-inthanethi. Ngezelela isikhiye se-Anthropic bona ukhulume ngokupheleleko.",
    ve: "U tshimbila na phindulo dza saiti zwi shuma na musi ni si kha inthanethi. Engedzani khoulu ya Anthropic uri ni ambe nga vhuḓalo.",
  },
  placeholder: {
    en: "Ask, or say 'take me to…'", tn: "Botsa, kgotsa re 'nkise kwa…'", zu: "Buza, noma uthi 'ngiyise ku…'",
    xh: "Buza, okanye uthi 'ndise ku…'", nso: "Botšiša, goba o re 'nkiše go…'", st: "Botsa, kapa u re 'nkise ho…'",
    ts: "Vutisa, kumbe u ku 'ndzi yise eka…'", af: "Vra, of sê 'neem my na…'", ss: "Buta, nome utsi 'ngiyise ku…'",
    nr: "Buza, namkha uthi 'ngiyise ku…'", ve: "Vhudzisani, kana ni ri 'nnḓisani kha…'",
  },
  thinking: {
    en: "Thinking…", tn: "Ke a akanya…", zu: "Ngiyacabanga…", xh: "Ndiyacinga…", nso: "Ke a nagana…", st: "Ke a nahana…",
    ts: "Ndza ehleketa…", af: "Dink tans…", ss: "Ngiyacabanga…", nr: "Ngiyacabanga…", ve: "Ndi khou humbula…",
  },
  from: {
    en: "From:", tn: "Go tswa:", zu: "Kusuka ku:", xh: "Ivela ku:", nso: "Go tšwa go:", st: "Ho tswa:",
    ts: "Ku suka eka:", af: "Van:", ss: "Kusuka ku:", nr: "Ivela ku:", ve: "U bva kha:",
  },
  opening: {
    en: "Opening %s…", tn: "Ke bula %s…", zu: "Ivula i-%s…", xh: "Ivula i-%s…", nso: "Ke bula %s…", st: "Ke bula %s…",
    ts: "Ku pfula %s…", af: "Maak %s oop…", ss: "Ivula i-%s…", nr: "Ivula i-%s…", ve: "U vula %s…",
  },
  error: {
    en: "Sorry — something went wrong. Please try again.",
    tn: "Maswabi — go nnile le phoso. Tsweetswee leka gape.",
    zu: "Uxolo — kukhona okungahambanga kahle. Sicela uzame futhi.",
    xh: "Uxolo — kukho into engahambanga kakuhle. Nceda uzame kwakhona.",
    nso: "Tshwarelo — go bile le phošo. Hle leka gape.",
    st: "Tshwarelo — ho bile le phoso. Ka kopo leka hape.",
    ts: "Ndzi khombela — ku humelele xihoxo. Ndzi kombela u ringeta nakambe.",
    af: "Jammer — iets het verkeerd geloop. Probeer asseblief weer.",
    ss: "Ngiyacolisa — kukhona lokungahambanga kahle. Sicela uzame futsi.",
    nr: "Uxolo — kunento engakahambi kuhle. Sibawa ulinge godu.",
    ve: "Ni hangwe — hu na tsho no tshinyala. Ni humbela u lingedza hafhu.",
  },
  openGuide: {
    en: "Open the guide", tn: "Bula mokaedi", zu: "Vula umhlahlandlela", xh: "Vula isikhokelo", nso: "Bula mohlahli",
    st: "Bula motataisi", ts: "Pfula murhetani", af: "Maak die gids oop", ss: "Vula umcondzisi", nr: "Vula umkhombandlela", ve: "Vula mulangi",
  },
  close: {
    en: "Close", tn: "Tswala", zu: "Vala", xh: "Vala", nso: "Tswalela", st: "Koala", ts: "Pfala", af: "Maak toe", ss: "Vala", nr: "Vala", ve: "Vala",
  },
  send: {
    en: "Send", tn: "Romela", zu: "Thumela", xh: "Thumela", nso: "Romela", st: "Romela", ts: "Rhumela", af: "Stuur", ss: "Tfumela", nr: "Thumela", ve: "Rumela",
  },
  newChat: {
    en: "New chat", tn: "Puisano e ntšhwa", zu: "Ingxoxo entsha", xh: "Incoko entsha", nso: "Poledišano ye mpsha",
    st: "Moqoqo o mocha", ts: "Bulavurisano lebyintshwa", af: "Nuwe gesprek", ss: "Incoco lensha", nr: "Ikulumiswano etjha", ve: "Nyambedzano ntswa",
  },
};
