import React from "react";
import { View, Text, Pressable, StyleSheet, Linking } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { HERITAGE_ANCHORS, explorerUrl, explorerAddressUrl, shortHash } from "../content/heritage";
import { Screen, ScreenHeader, Card, Body, Title, Meta, Muted, Icon } from "../ui";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";

// The Heritage Ledger — Maloba's on-chain provenance. Each foundational work is content-fingerprinted
// (SHA-256 + IPFS CID) and anchored on a public Solana ledger: tamper-evident, permanent, verifiable
// by anyone. POPIA-safe: only public works + hashes go on-chain — never a person's recording.
// See docs/11-blockchain-heritage-plan.md. Built on the UI kit.

const UI = {
  title: {
    en: "Heritage Ledger", tn: "Rekoto ya Boswa", af: "Erfenisregister", zu: "Irejista Yamagugu", xh: "Irejista Yelifa",
    nso: "Rejista ya Bohwa", st: "Rejista ya Lefa", ss: "Irejista Yelifa", ts: "Rejista ya Ndzhaka", nr: "Irejista Yelifa", ve: "Rejista ya Ifa",
  },
  intro: {
    en: "Every foundational work here is fingerprinted (SHA-256 + IPFS content ID), anchored on a public blockchain, and minted as a heritage certificate token held in a wallet. That makes each text tamper-evident, permanently verifiable, and owned by the community — history no one can quietly alter or erase.",
    tn: "Tiro nngwe le nngwe ya motheo mo e na le letshwao (SHA-256 + IPFS), e tshwaretswe mo blockchain ya setšhaba, mme e dirilwe setifikeiti mo sekhwameng — hisitori e e sa kake ya fetolwa kgotsa ya phimolwa ke ope.",
    af: "Elke grondliggende werk hier kry 'n vingerafdruk (SHA-256 + IPFS inhoud-ID), word op 'n openbare blockchain veranker, en as 'n erfenissertifikaat-token in 'n beursie gemunt. Dit maak elke teks knoeibestand, permanent verifieerbaar, en deur die gemeenskap besit — geskiedenis wat niemand stilweg kan verander of uitvee nie.",
    zu: "Wonke umsebenzi oyisisekelo lapha unikwa isigxivizo (SHA-256 + IPFS content ID), umiswe kublockchain yomphakathi, futhi wenziwe ithokheni yesitifiketi samagugu esigcinwe kuwolethi. Lokhu kwenza umbhalo ngamunye ubonakalise ukuphazanyiswa, uqinisekiswe unomphela, futhi ube ngowomphakathi — umlando okungekho muntu ongawuguqula noma awususe ngasese.",
    xh: "Wonke umsebenzi osisiseko apha unikwa uphawu (SHA-256 + IPFS content ID), umiswe kwiblockchain yoluntu, kwaye wenziwe ithokheni yesatifikethi selifa esigcinwe kwisipaji. Oku kwenza umbhalo ngamnye ubonakalalise ukuphazamiseka, uqinisekiswe ngokusisigxina, kwaye ube ngoluntu — imbali ekungekho mntu unokuyitshintsha okanye ayicime ngasese.",
    nso: "Mošomo o mongwe le o mongwe wa motheo mo o newa leswao (SHA-256 + IPFS content ID), o tiišeditšwe go blockchain ya setšhaba, gomme o dirilwe setifikeiti sa bohwa se se bolokilwego ka sekhwameng. Se se dira gore sengwalwa se sengwe se bontšhe go šielwa, se netefatšwe ka mo go sa felego, gomme se be sa setšhaba — histori yeo motho a ka se e fetošego goba a e phumole ka sephiri.",
    st: "Mosebetsi o mong le o mong wa motheo mona o fuoa letshwao (SHA-256 + IPFS content ID), o tiisitsoe blockchaining ya setjhaba, mme o entsoe setifikeiti sa lefa se bolokiloeng ka sepatjheng. Sena se etsa hore mongolo o mong o bontshe ho fetoloa, o netefatsoe ka ho sa feleng, mme o be oa setjhaba — histori eo ho seng motho ea ka e fetolang kapa a e hlakolang ka sekhutu.",
    ss: "Wonkhe umsebenti losisekelo lapha uniketwa luphawu (SHA-256 + IPFS content ID), umiswe kublockchain yemmango, futsi wentiwe ithokheni yesitifiketi semagugu lesigcinwe kuwolethi. Loku kwenta umbhalo ngamunye ukhombise kuphazanyiswa, ucinisekiswe unaphakadze, futsi ube ngewemmango — umlandvo lokungekho muntfu longawuguciula nome awususe ngasese.",
    ts: "Ntirho wun'wana ni wun'wana wa masungulo laha wu nyikiwa xikombiso (SHA-256 + IPFS content ID), wu simekiwa eka blockchain ya mani na mani, naswona wu endliwa thokheni ya xitifikheti xa ndzhaka lexi hlayisiweke eka xikhwama. Leswi swi endla leswaku matsalwa yin'wana yi kombisa ku cinca, yi tiyisisiwa hilaha ku nga heriki, naswona yi va ya vaaki — matimu lawa ku nga riki na munhu la nga ma cincaka kumbe a ma sula hi xihundla.",
    nr: "Woke umsebenzi osisekelo lapha unikelwa uphawu (SHA-256 + IPFS content ID), umiswe kublockchain yomphakathi, begodu wenziwe ithokheni yesitifiketi samagugu esigcinwe kuwolethi. Lokhu kwenza umtlolo munye ukhombise ukuphazanyiswa, uqinisekiswe unomphela, begodu ube ngowomphakathi — umlando okungekho muntu ongawutjhugulula namkha awususe ngasese.",
    ve: "Mushumo muṅwe na muṅwe wa mutheo hafha u ṋewa tshiga (SHA-256 + IPFS content ID), wo khwaṱhisedzwa kha blockchain ya tshitshavha, nahone wo itwa thokheni ya tshithifiketsi tsha ifa tsho vhulungwaho kha tshikhwama. Zwenezwi zwi ita uri maṅwalwa maṅwe a sumbedze u shandulwa, a khwaṱhisedzwe lini na lini, nahone a vhe a tshitshavha — ḓivhazwakale ine a hu na muthu a nga i shandulaho kana a i sisaho nga tshiphiri.",
  },
  popia: {
    en: "Privacy first (POPIA): only public literary works and their hashes are placed on-chain. Community members' personal voice recordings are NEVER put on the blockchain — they stay in private, erasable storage you control.",
    tn: "Sephiri pele (POPIA): ke ditiro tsa setšhaba fela tse di tsenngwang mo blockchain. Dikgatiso tsa mantswe a batho ga di ke di tsenngwe mo blockchain.",
    af: "Privaatheid eerste (POPIA): net openbare letterkundige werke en hul hashes word op die ketting geplaas. Gemeenskapslede se persoonlike stemopnames word NOOIT op die blockchain geplaas nie — hulle bly in private, uitveebare berging wat jy beheer.",
    zu: "Ubumfihlo kuqala (POPIA): imisebenzi yezincwadi yomphakathi kuphela namahashi ayo abekwa kublockchain. Ukuqoshwa kwamazwi omuntu siqu kwamalungu omphakathi AKUFAKWA NEZE kublockchain — kuhlala kusitoreji esiyimfihlo, esisusekayo osilawulayo.",
    xh: "Ubumfihlo kuqala (POPIA): imisebenzi yoncwadi yoluntu kuphela namahashi ayo abekwa kwityathanga. Ukurekhodwa kwamazwi abucala amalungu oluntu AKUFAKWA konke kwiblockchain — kuhlala kwindawo yokugcina eyimfihlo, enokucinywa oyilawulayo.",
    nso: "Sephiri pele (POPIA): ke mešomo ya dingwalo ya setšhaba fela le di-hash tša yona tše di bewago go blockchain. Direkoto tša mantšu a motho ka noši a maloko a setšhaba GA di TSENYWE le gatee go blockchain — di dula ka polokelong ya sephiri, ye e ka phumolwago yeo o e laolago.",
    st: "Lekunutu pele (POPIA): ke mesebetsi ya dingoliloeng ya setjhaba feela le di-hash tsa yona tse behuoang blockchaining. Direkoto tsa mantswe a botho a litho tsa setjhaba HA li KENYUOE le kang blockchaining — li lula polokelong ya lekunutu, e ka hlakoloang eo o e laolang.",
    ss: "Kuyimfihlo kucala (POPIA): imisebenti yetincwadzi yemmango kuphela nemahashi ayo lebekwa kublockchain. Kubhalwa kwemavi emuntfu siqu emalunga emmango AKUFAKWA nakanye kublockchain — kuhlala kusitoreji lesiyimfihlo, lesisusekako losilawulako.",
    ts: "Vuxihundla xo sungula (POPIA): i mintirho ya matsalwa ya mani na mani ntsena ni tihashi ta yona leti vekiwaka eka blockchain. Ku rhekhodiwa ka marito ya swirho swa vaaki hi voxe A SWI VEKIWI na kan'we eka blockchain — swi tshama eka vuhlayiselo bya xihundla, lebyi nga suriwaka lebyi u byi lawulaka.",
    nr: "Ubumfihlo kuthoma (POPIA): imisebenzi yeencwadi yomphakathi kwaphela namahashi wayo abekwa kublockchain. Ukubhalwa kwamezwi womuntu siqu wamalunga womphakathi AKUFAKWA nakanye kublockchain — kuhlala kusitoreji esiyimfihlo, esisusekako osilawulako.",
    ve: "Vhudzumbe u thoma (POPIA): ndi mishumo ya maṅwalwa a tshitshavha fhedzi na dzihash dzayo dzine dza vhewa kha blockchain. U rekhodwa ha maipfi a muthu nga eṱhe a miraḓo ya tshitshavha A ZWI VHEWI na luthihi kha blockchain — zwi dzula kha vhulungelo ha tshiphiri, hune ha nga siswa hune na ho langa.",
  },
  verify: {
    en: "Verify on Solana", tn: "Netefatsa mo Solana", af: "Verifieer op Solana", zu: "Qinisekisa ku-Solana", xh: "Qinisekisa kwiSolana",
    nso: "Netefatša go Solana", st: "Netefatsa ho Solana", ss: "Cinisekisa ku-Solana", ts: "Tiyisisa eka Solana", nr: "Qinisekisa ku-Solana", ve: "Khwaṱhisedzani kha Solana",
  },
  pending: {
    en: "Anchoring pending", tn: "E emetse go tshwarwa", af: "Verankering hangende", zu: "Kulindwe ukumiswa", xh: "Kulindwe ukumiswa",
    nso: "Go tiišetša go emetše", st: "Ho tiisa ho emetse", ss: "Kulindzelwe kumiswa", ts: "Ku simeka ku ri karhi ku yimela", nr: "Kulindwe ukumiswa", ve: "U khwaṱhisedza hu kha ḓi lindela",
  },
  cidLabel: { en: "IPFS content ID", tn: "IPFS" },
  hashLabel: { en: "SHA-256 fingerprint", tn: "Letshwao SHA-256" },
  certLabel: {
    en: "Heritage certificate (token)", tn: "Setifikeiti sa boswa", af: "Erfenissertifikaat (token)", zu: "Isitifiketi samagugu (ithokheni)", xh: "Isatifikethi selifa (ithokheni)",
    nso: "Setifikeiti sa bohwa (thokheni)", st: "Setifikeiti sa lefa (thokheni)", ss: "Isitifiketi semagugu (ithokheni)", ts: "Xitifikheti xa ndzhaka (thokheni)", nr: "Isitifiketi samagugu (ithokheni)", ve: "Tshithifiketsi tsha ifa (thokheni)",
  },
  viewCert: {
    en: "View certificate", tn: "Bona setifikeiti", af: "Bekyk sertifikaat", zu: "Buka isitifiketi", xh: "Jonga isatifikethi",
    nso: "Lebelela setifikeiti", st: "Sheba setifikeiti", ss: "Buka isitifiketi", ts: "Vona xitifikheti", nr: "Buka isitifiketi", ve: "Vhonani tshithifiketsi",
  },
};

export function HeritageLedgerScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  return (
    <Screen tone="paper">
      <ScreenHeader kicker="On-chain provenance" title={t(UI.title, lang)} onBack={onBack} />

      <Body style={styles.intro}>{t(UI.intro, lang)}</Body>

      {HERITAGE_ANCHORS.map((a) => {
        const anchored = a.tx !== "pending" && a.tx.length > 0;
        return (
          <Card key={a.id} style={styles.card}>
            <Title style={styles.workTitle}>{a.title}</Title>
            <Meta style={styles.meta}>
              {a.author} · {a.year}
            </Meta>

            <Text style={styles.fieldLabel}>{t(UI.cidLabel, lang)}</Text>
            <Text style={styles.mono}>{shortHash(a.cid, 10, 8)}</Text>

            <Text style={styles.fieldLabel}>{t(UI.hashLabel, lang)}</Text>
            <Text style={styles.mono}>{shortHash(a.sha256, 10, 8)}</Text>

            {a.mint !== "pending" && a.mint.length > 0 && (
              <>
                <Text style={styles.fieldLabel}>{t(UI.certLabel, lang)}</Text>
                <Pressable style={styles.linkRow} onPress={() => Linking.openURL(explorerAddressUrl(a.mint, a.cluster))}>
                  <Text style={[styles.mono, styles.link]}>{shortHash(a.mint, 10, 8)}</Text>
                  <Icon.ArrowUpRight size={12} color={colors.orange} />
                </Pressable>
              </>
            )}

            {anchored ? (
              <Pressable style={styles.verifyBtn} onPress={() => Linking.openURL(explorerUrl(a.tx, a.cluster))}>
                <Text style={styles.verifyText}>{t(UI.verify, lang)}</Text>
                <Icon.ArrowUpRight size={13} color={colors.paper} />
              </Pressable>
            ) : (
              <View style={styles.pendingChip}>
                <Icon.Clock size={12} color="rgba(255,255,255,0.7)" />
                <Text style={styles.pendingText}>{t(UI.pending, lang)}</Text>
              </View>
            )}
          </Card>
        );
      })}

      <Card tone="navy" style={styles.popiaCard}>
        <Icon.Lock size={20} color={colors.gold} />
        <Muted onDark style={styles.popiaText}>
          {t(UI.popia, lang)}
        </Muted>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
  workTitle: { fontFamily: fonts.serifSemi, fontSize: type.title + 2 },
  card: { marginBottom: spacing.md },
  meta: { marginTop: 2 },
  fieldLabel: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fonts.bodyBold,
    fontSize: type.small - 1,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: spacing.md,
  },
  mono: { color: "rgba(255,255,255,0.85)", fontFamily: fonts.bodyMedium, fontSize: type.small + 1, marginTop: 2 },
  link: { color: colors.orange, fontFamily: fonts.bodySemi },
  linkRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  verifyBtn: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    backgroundColor: "#FFFFFF",
    borderRadius: radius.pill,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  verifyText: {
    color: colors.paper,
    fontFamily: fonts.bodyBold,
    fontSize: type.small,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  pendingChip: {
    alignSelf: "flex-start",
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: radius.pill,
    paddingVertical: 7,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  pendingText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: type.small },
  popiaCard: { flexDirection: "row", gap: spacing.md, marginTop: spacing.lg, alignItems: "flex-start" },
  popiaMark: { fontSize: 22 },
  popiaText: { flex: 1, fontStyle: "italic", lineHeight: 20 },
});
