import React from "react";
import { Modal, View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { Icon } from "../ui";

// POPIA consent gate — MUST appear before the microphone is ever activated.
// See .claude/skills/popia-compliance + docs/05-popia-compliance.md.
// Copy is honest about what currently happens (local save) vs what happens when sharing is enabled.

export type Visibility = "private" | "public";

const UI = {
  title: {
    en: "Before you record", tn: "Pele o gatisa", af: "Voordat jy opneem", zu: "Ngaphambi kokuqopha", xh: "Phambi kokuba urekhode",
    nso: "Pele o gatiša", st: "Pele o rekota", ss: "Ngaphambi kokubhala", ts: "Loko u nga si rhekhoda", nr: "Ngaphambi kobana ubhale", ve: "Musi ni sa athu rekhoda",
  },
  body: {
    en: "Your story is personal information. Under South Africa's POPIA, your voice is protected — so we only record it with your clear consent. Your recording is saved on this device. If you choose to share it with the community, it can be transcribed (by Lelapa AI) and stored securely (Supabase) when that feature is enabled. You can delete it at any time.",
    tn: "Kanegelo ya gago ke tshedimosetso ya botho. Ka fa tlase ga POPIA ya Aforika Borwa, lentswe la gago le sirelediwe — ka jalo re le gatisa fela ka tumelelo ya gago e e phepa. Kgatiso ya gago e bolokwa mo sedirisweng se. Fa o tlhopha go e abelana le setšhaba, e ka fetolelwa (ke Lelapa AI) e bo e bolokwa ka pabalesego (Supabase) fa tiro eo e tshupilwe. O ka e phimola nako nngwe le nngwe.",
    af: "Jou storie is persoonlike inligting. Onder Suid-Afrika se POPIA word jou stem beskerm — daarom neem ons dit net met jou duidelike toestemming op. Jou opname word op hierdie toestel gestoor. As jy kies om dit met die gemeenskap te deel, kan dit getranskribeer word (deur Lelapa AI) en veilig gestoor word (Supabase) wanneer daardie funksie geaktiveer is. Jy kan dit enige tyd uitvee.",
    zu: "Indaba yakho ingokwaziso lomuntu siqu. Ngaphansi kwe-POPIA yaseNingizimu Afrika, izwi lakho livikelekile — ngakho siliqopha kuphela ngemvume yakho ecacile. Ukuqoshwa kwakho kugcinwa kule divayisi. Uma ukhetha ukukwabelana nomphakathi, kungabhalwa phansi (yi-Lelapa AI) futhi kugcinwe ngokuphephile (Supabase) uma leso sici sivuliwe. Ungakususa noma nini.",
    xh: "Ibali lakho lulwazi lomntu buqu. Phantsi kwe-POPIA yaseMzantsi Afrika, ilizwi lakho likhuselekile — ngoko silirekhoda kuphela ngemvume yakho ecacileyo. Ukurekhodwa kwakho kugcinwa kwesi sixhobo. Ukuba ukhetha ukwabelana noluntu, kunokubhalwa phantsi (yi-Lelapa AI) kwaye kugcinwe ngokukhuselekileyo (Supabase) xa loo nto ivuliwe. Ungakucima nanini na.",
    nso: "Kanegelo ya gago ke tshedimošo ya motho ka noši. Ka fase ga POPIA ya Afrika Borwa, lentšu la gago le šireleditšwe — ka gona re le gatiša fela ka tumelelo ya gago ye e kwešišegago. Kgatišo ya gago e bolokwa mo sedirišweng se. Ge o kgetha go e abelana le setšhaba, e ka ngwadwa (ke Lelapa AI) gomme ya bolokwa ka polokego (Supabase) ge tirišo yeo e bulegile. O ka e phumola nako efe goba efe.",
    st: "Pale ya hao ke tlhahisoleseding ya botho. Tlasa POPIA ya Afrika Borwa, lentswe la hao le sireletsehile — kahoo re le rekota feela ka tumello ya hao e hlakileng. Rekoto ya hao e bolokoa sesebedisweng sena. Haeba o kgetha ho e arolelana le setjhaba, e ka ngoloa (ke Lelapa AI) mme ya bolokoa ka polokeho (Supabase) ha tshebetso eo e buletsoe. O ka e hlakola nako efe kapa efe.",
    ss: "Indzaba yakho lwati lwakho lomuntfu. Ngaphansi kwe-POPIA yaseNingizimu Afrika, livi lakho livikelekile — ngako siliphahla kuphela ngemvume yakho lecacile. Kubhalwa kwakho kugcinwa kulendivayisi. Nangabe ukhetsa kukwabelana nemmango, kungabhalwa phansi (yi-Lelapa AI) futsi kugcinwe ngekuphepha (Supabase) nangabe leso sici sivuliwe. Ungakususa nome ngunini.",
    ts: "Ntsheketo wa wena i vuxokoxoko bya munhu hi yexe. Ehansi ka POPIA ya Afrika-Dzonga, rito ra wena ri sirheleriwile — hikwalaho hi ri rhekhoda ntsena hi mpfumelelo wa wena lowu vangamaka. Ku rhekhodiwa ka wena ku hlayisiwa eka xitirhisiwa lexi. Loko u hlawula ku swi avela vaaki, swi nga tsariwa (hi Lelapa AI) naswona swi hlayisiwa hi ku sirhelela (Supabase) loko xiyenge xexo xi pfuriwile. U nga swi sula nkarhi wihi na wihi.",
    nr: "Indaba yakho mniningwana womuntu. Ngaphasi kwe-POPIA yeSewula Afrika, ilizwi lakho livikelekile — ngalokho silibhala kwaphela ngemvume yakho ecacileko. Ukubhalwa kwakho kugcinwa kwesi sitjhini. Nangabe ukhetha ukukwabelana nomphakathi, kungatlolwa phasi (yi-Lelapa AI) begodu kugcinwe ngokuphepha (Supabase) nasele leso sici sivuliwe. Ungakususa nanyana nini.",
    ve: "Tshiitwa tshaṋu ndi mafhungo a muthu nga eṱhe. Fhasi ha POPIA ya Afrika Tshipembe, ipfi ḽaṋu ḽo tsireledzwa — nga zwenezwo ri ḽi rekhoda fhedzi nga thendelo yaṋu yo tavhanyaho. U rekhodwa haṋu hu vhulungwa kha tshishumiswa itshi. Arali na khetha u tshi avhelana na tshitshavha, tshi nga ṅwaliwa (nga Lelapa AI) tsha vhulungwa nga vhukhwiniwa (Supabase) musi tshenetsho tshipiḓa tsho vulwa. Ni nga tshi sisa tshifhinga tshiṅwe na tshiṅwe.",
  },
  question: {
    en: "How should this recording be kept?", tn: "Kgatiso e e tshwanetse go bolokwa jang?", af: "Hoe moet hierdie opname bewaar word?", zu: "Kufanele kugcinwe kanjani lokhu okuqoshiwe?", xh: "Kufuneka kugcinwe njani oku kurekhodiweyo?",
    nso: "Kgatišo ye e swanetše go bolokwa bjang?", st: "Rekoto ena e lokela ho bolokoa jwang?", ss: "Lokubhaliwe kufanele kugcinwe njani?", ts: "Xana leswi rhekhodiweke swi fanele ku hlayisiwa hi ndlela yihi?", nr: "Le nto ebhaliweko kufanele igcinwe njani?", ve: "Iyi rekhodo i fanela u vhulungwa hani?",
  },
  private: {
    en: "Keep private", tn: "Boloka e le sephiri", af: "Hou privaat", zu: "Gcina kuyimfihlo", xh: "Gcina kuyimfihlo",
    nso: "Boloka e le sephiri", st: "Boloka e le lekunutu", ss: "Gcina kuyimfihlo", ts: "Hlayisa ri ri xihundla", nr: "Gcina kuyimfihlo", ve: "Vhulunga sa tshiphiri",
  },
  privateHint: {
    en: "Only you can access it.", tn: "Ke wena fela o ka e bonang.", af: "Net jy kan dit sien.", zu: "Nguwe wedwa ongayifinyelela.", xh: "Nguwe wedwa onokuyifikelela.",
    nso: "Ke wena fela o ka e fihlelelago.", st: "Ke wena feela ya ka e fumanang.", ss: "Nguwe wedwa longayitfola.", ts: "Hi wena ntsena la nga swi kumaka.", nr: "Nguwe wedwa ongayifinyelela.", ve: "Ndi inwi fhedzi ni nga i swikelelaho.",
  },
  public: {
    en: "Share with community", tn: "Abelana le setšhaba", af: "Deel met gemeenskap", zu: "Yabelana nomphakathi", xh: "Yabelana noluntu",
    nso: "Abelana le setšhaba", st: "Arolelana le setjhaba", ss: "Yabelana nemmango", ts: "Avela vaaki", nr: "Yabelana nomphakathi", ve: "Kovhelani na tshitshavha",
  },
  publicHint: {
    en: "Add your voice to the archive.", tn: "Tsenya lentswe la gago mo polokelong.", af: "Voeg jou stem by die argief.", zu: "Engeza izwi lakho engobeni.", xh: "Yongeza ilizwi lakho kuvimba.",
    nso: "Tsenya lentšu la gago ka polokelong.", st: "Kenya lentswe la hao polokelong.", ss: "Ngeta livi lakho engobeni.", ts: "Engetela rito ra wena eka vuhlayiselo.", nr: "Ngezelela ilizwi lakho engobeni.", ve: "Engedzani ipfi ḽaṋu kha vhulondoloti.",
  },
  cancel: {
    en: "Not now", tn: "E seng jaanong", af: "Nie nou nie", zu: "Hhayi manje", xh: "Hayi ngoku",
    nso: "E sego bjale", st: "Eseng hona joale", ss: "Hhayi manje", ts: "Ku nga ri sweswi", nr: "Ingasi nje", ve: "Hu si zwino",
  },
};

export function ConsentSheet({
  visible,
  lang,
  onConsent,
  onCancel,
}: {
  visible: boolean;
  lang: Lang;
  onConsent: (v: Visibility) => void;
  onCancel: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onCancel}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <ScrollView>
            <Text style={styles.title}>{t(UI.title, lang)}</Text>
            <Text style={styles.body}>{t(UI.body, lang)}</Text>

            <Text style={styles.question}>{t(UI.question, lang)}</Text>

            <Pressable style={styles.choice} onPress={() => onConsent("private")}>
              <View style={styles.choiceTitleRow}>
                <Icon.Lock size={15} color={colors.gold} />
                <Text style={styles.choiceTitle}>{t(UI.private, lang)}</Text>
              </View>
              <Text style={styles.choiceHint}>{t(UI.privateHint, lang)}</Text>
            </Pressable>

            <Pressable
              style={[styles.choice, styles.choicePublic]}
              onPress={() => onConsent("public")}
            >
              <View style={styles.choiceTitleRow}>
                <Icon.Users size={15} color={colors.gold} />
                <Text style={styles.choiceTitle}>{t(UI.public, lang)}</Text>
              </View>
              <Text style={styles.choiceHint}>{t(UI.publicHint, lang)}</Text>
            </Pressable>

            <Pressable style={styles.cancel} onPress={onCancel}>
              <Text style={styles.cancelText}>{t(UI.cancel, lang)}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: colors.scrimStrong, justifyContent: "flex-end" },
  sheet: {
    backgroundColor: "#0D0D0D",
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    padding: spacing.lg,
    maxHeight: "85%",
  },
  title: { color: colors.gold, fontFamily: fonts.displaySemi, fontSize: type.title + 2 },
  body: { color: colors.sand, fontFamily: fonts.body, fontSize: type.body, lineHeight: 26, marginTop: spacing.md },
  question: { color: colors.muted, fontFamily: fonts.bodySemi, fontSize: type.small, marginTop: spacing.lg, marginBottom: spacing.sm, textTransform: "uppercase", letterSpacing: 1 },
  choice: { backgroundColor: "rgba(255,255,255,0.06)", borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm },
  choicePublic: { borderWidth: 1, borderColor: colors.gold },
  choiceTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  choiceTitle: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.body },
  choiceHint: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small, marginTop: 2 },
  cancel: { alignItems: "center", paddingVertical: spacing.lg, marginTop: spacing.sm },
  cancelText: { color: colors.muted, fontFamily: fonts.body, fontSize: type.body },
});
