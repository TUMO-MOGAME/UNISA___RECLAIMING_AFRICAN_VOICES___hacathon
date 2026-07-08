import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import {
  useAudioRecorder,
  useAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from "expo-audio";
import { Lang } from "../content/types";
import { t } from "../i18n";
import { ConsentSheet, Visibility } from "./ConsentSheet";
import { PressScale } from "./Motion";
import { Screen, ScreenHeader, Card, Body, Meta, Muted, Icon } from "../ui";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";
import { recordingsStore } from "../services/archive/store";
import { RecordingMeta, prepend, removeById, renameById } from "../services/archive/recordings";
import { hasSupabase, checkConnection } from "../services/archive/supabase";
import { CaptchaGate } from "./CaptchaGate";

// The Community Archive — the heart of Community Impact (25%). Users record their own oral histories
// behind a POPIA consent gate, keep them private or public, and can delete them at any time (erasure).
// Recordings are stored device-locally (web = durable IndexedDB, survives refresh; native = in-session
// until the WatermelonDB stretch, T024). Supabase/Lelapa cloud sync is the online stretch (T027/T028).
// See popia-compliance skill + docs/12. Built on the UI kit.

const UI = {
  title: {
    en: "Community Archive", tn: "Polokelo ya Setšhaba", af: "Gemeenskapsargief", zu: "Ingobo Yomphakathi", xh: "Uvimba Woluntu",
    nso: "Polokelo ya Setšhaba", st: "Polokelo ya Setjhaba", ss: "Ingobo Yemmango", ts: "Vuhlayiselo bya Vaaki", nr: "Ingobo Yomphakathi", ve: "Vhulondoloti ha Tshitshavha",
  },
  intro: {
    en: "Record an elder's story, a memory, or a tradition in your own words. Your voice, your history — kept on your terms.",
    tn: "Gatisa kanegelo ya motsofe, kgakologelo, kgotsa ngwao ka mafoko a gago. Lentswe la gago, hisitori ya gago — e bolokwa ka fa o batlang ka teng.",
    af: "Neem 'n ouer se storie, 'n herinnering of 'n tradisie in jou eie woorde op. Jou stem, jou geskiedenis — bewaar op jou voorwaardes.",
    zu: "Qopha indaba yomdala, inkumbulo, noma isiko ngamazwi akho. Izwi lakho, umlando wakho — kugcinwe ngendlela oyifunayo.",
    xh: "Rekhoda ibali lomdala, inkumbulo, okanye isithethe ngamazwi akho. Ilizwi lakho, imbali yakho — kugcinwe ngokwemigaqo yakho.",
    nso: "Gatiša kanegelo ya mogolo, kgopolo, goba setšo ka mantšu a gago. Lentšu la gago, histori ya gago — go bolokwa ka fao o ratago.",
    st: "Rekota pale ya moholo, mohopolo, kapa moetlo ka mantswe a hao. Lentswe la hao, histori ya hao — e bolokoa ka tsela ya hao.",
    ss: "Bhala indzaba yalomdzala, inkhumbulo, nome lisiko ngemavi akho. Livi lakho, umlandvo wakho — kugcinwe ngendlela loyifunako.",
    ts: "Rhekhoda ntsheketo wa mukhalabye, xitsundzuxo, kumbe ndhavuko hi marito ya wena. Rito ra wena, matimu ya wena — swi hlayisiwa hi ku ya hi wena.",
    nr: "Bhala indaba yomdala, inkumbulo, namkha isiko ngamezwi wakho. Ilizwi lakho, umlando wakho — kugcinwe ngendlela oyifunako.",
    ve: "Rekhoda tshiitwa tsha muhulwane, tshihumbulo, kana sialala nga maipfi aṋu. Ipfi ḽaṋu, ḓivhazwakale yaṋu — tshi vhulungwa nga nḓila yaṋu.",
  },
  record: {
    en: "Record a story", tn: "Gatisa kanegelo", af: "Neem 'n storie op", zu: "Qopha indaba", xh: "Rekhoda ibali",
    nso: "Gatiša kanegelo", st: "Rekota pale", ss: "Bhala indzaba", ts: "Rhekhoda ntsheketo", nr: "Bhala indaba", ve: "Rekhoda tshiitwa",
  },
  stop: {
    en: "Stop recording", tn: "Emisa go gatisa", af: "Stop opname", zu: "Misa ukuqopha", xh: "Yeka ukurekhoda",
    nso: "Emiša go gatiša", st: "Emisa ho rekota", ss: "Yima kubhala", ts: "Yimisa ku rhekhoda", nr: "Misa ukubhala", ve: "Ima u rekhoda",
  },
  recording: {
    en: "Recording…", tn: "E a gatisa…", af: "Neem op…", zu: "Iyaqopha…", xh: "Iyarekhoda…",
    nso: "E a gatiša…", st: "E a rekota…", ss: "Iyabhala…", ts: "Ya rhekhoda…", nr: "Iyabhala…", ve: "I khou rekhoda…",
  },
  empty: {
    en: "No recordings yet. Tap “Record a story” to add the first voice.",
    tn: "Ga go na dikgatiso. Tobetsa “Gatisa kanegelo” go tsenya lentswe la ntlha.",
    af: "Nog geen opnames nie. Tik “Neem 'n storie op” om die eerste stem by te voeg.",
    zu: "Akukho okuqoshiwe okwamanje. Thepha “Qopha indaba” ukungeza izwi lokuqala.",
    xh: "Akukho zirekhodi okwangoku. Cofa “Rekhoda ibali” ukongeza ilizwi lokuqala.",
    nso: "Ga go na direkoto go fihla ga bjale. Kgotla “Gatiša kanegelo” go tsenya lentšu la mathomo.",
    st: "Ha ho direkoto hajoale. Tobetsa “Rekota pale” ho eketsa lentswe la pele.",
    ss: "Atikho tirekhodi okwanyalo. Cindzetela “Bhala indzaba” kwengeta livi lekucala.",
    ts: "A ku na tirhakhodo sweswi. Tinya “Rhekhoda ntsheketo” ku engetela rito ro sungula.",
    nr: "Awakho amarekhodi okwanjesi. Gandelela “Bhala indaba” ukungezelela ilizwi lokuthoma.",
    ve: "A hu na zwirekhodo zwa zwino. Kwamani “Rekhoda tshiitwa” u engedza ipfi ḽa u thoma.",
  },
  play: {
    en: "Play", tn: "Bapala", af: "Speel", zu: "Dlala", xh: "Dlala",
    nso: "Bapala", st: "Bapala", ss: "Dlala", ts: "Tlanga", nr: "Dlala", ve: "Tamba",
  },
  del: {
    en: "Delete", tn: "Phimola", af: "Vee uit", zu: "Susa", xh: "Cima",
    nso: "Phumola", st: "Hlakola", ss: "Susa", ts: "Sula", nr: "Sula", ve: "Sisa",
  },
  privateBadge: {
    en: "Private", tn: "Sephiri", af: "Privaat", zu: "Okuyimfihlo", xh: "Okuyimfihlo",
    nso: "Sephiri", st: "Lekunutu", ss: "Kuyimfihlo", ts: "Xihundla", nr: "Okuyimfihlo", ve: "Tsha tshiphiri",
  },
  publicBadge: {
    en: "Shared", tn: "E abetswe", af: "Gedeel", zu: "Kwabelwe", xh: "Kwabelwane",
    nso: "Go abetšwe", st: "E arolelanwe", ss: "Kwabiwe", ts: "Swi averiwile", nr: "Kwabelwe", ve: "Zwo kovhelwa",
  },
  placeholder: {
    en: "Untitled story", tn: "Kanegelo e e se nang setlhogo", af: "Storie sonder titel", zu: "Indaba engenasihloko", xh: "Ibali elingenasihloko",
    nso: "Kanegelo ye e se nago sehlogo", st: "Pale e senang sehlooho", ss: "Indzaba lengenasihloko", ts: "Ntsheketo lowu nga riki na nhloko", nr: "Indaba engenasihloko", ve: "Tshiitwa tshi si na tshiṱoho",
  },
  permDenied: {
    en: "Microphone permission is needed to record. You can enable it in settings.",
    tn: "Tetla ya microphone e a tlhokega go gatisa. O ka e tshwaya mo dithulaganyong.",
    af: "Mikrofoontoestemming word benodig om op te neem. Jy kan dit in instellings aktiveer.",
    zu: "Kudingeka imvume yemakrofoni ukuze uqophe. Ungayivula kuzilungiselelo.",
    xh: "Kufuneka imvume yemakrofoni ukuze urekhode. Ungayivula kwiisetingi.",
    nso: "Tumelelo ya microphone e a nyakega go gatiša. O ka e bula ka dipeakanyong.",
    st: "Tumello ya microphone e hlokahala ho rekota. O ka e bula ditlhophisong.",
    ss: "Kudzingeka imvume yemakrofoni kutsi ubhale. Ungayivula kutilungiselelo.",
    ts: "Ku laveka mpfumelelo wa microphone ku rhekhoda. U nga wu pfula eka switlhamiselo.",
    nr: "Kudingeka imvume yemakrofoni bona ubhale. Ungayivula kuhlelo.",
    ve: "Hu ṱoḓea thendelo ya microphone u rekhoda. Ni nga i vula kha mavhekanyele.",
  },
  unsupported: {
    en: "Recording isn't available on this device/browser. Try the app on a phone via Expo Go.",
    tn: "Go gatisa ga go a nna teng mo sedirisweng se. Leka app mo founong ka Expo Go.",
    af: "Opname is nie op hierdie toestel/blaaier beskikbaar nie. Probeer die app op 'n foon via Expo Go.",
    zu: "Ukuqopha akutholakali kule divayisi/isiphequluli. Zama uhlelo lokusebenza efonini nge-Expo Go.",
    xh: "Ukurekhoda akufumaneki kwesi sixhobo/sikhangeli. Zama usetyenziso efowunini nge-Expo Go.",
    nso: "Go gatiša ga go gona mo sedirišweng se/sephetleki. Leka app founong ka Expo Go.",
    st: "Ho rekota ha ho fumanehe sesebedisweng sena/sebatling. Leka app fonong ka Expo Go.",
    ss: "Kubhala akutfolakali kulendivayisi/isiphequluli. Zama luhlelo efonini nge-Expo Go.",
    ts: "Ku rhekhoda a swi kumeki eka xitirhisiwa lexi/xikambeli. Ringeta app eka riqingho hi Expo Go.",
    nr: "Ukubhala akutholakali kwesi sitjhini/isiphequluli. Linga i-app efonini nge-Expo Go.",
    ve: "U rekhoda a zwi wanali kha tshishumiswa itshi/buronza. Lingedzani app kha luṱingo nga Expo Go.",
  },
  cloudTitle: {
    en: "Cloud archive", tn: "Polokelo ya maru", af: "Wolkargief", zu: "Ingobo yasefwini", xh: "Uvimba wefu",
    nso: "Polokelo ya maru", st: "Polokelo ya maru", ss: "Ingobo yelifu", ts: "Vuhlayiselo bya mapapa", nr: "Ingobo yelifu", ve: "Vhulondoloti ha makole",
  },
  cloudTest: {
    en: "Test cloud connection", tn: "Leka kgolagano ya maru", af: "Toets wolkverbinding", zu: "Hlola uxhumano lwasefwini", xh: "Vavanya uqhagamshelwano lwefu",
    nso: "Leka kgokagano ya maru", st: "Leka khokahano ya maru", ss: "Hlola luchumano lwelifu", ts: "Ringeta vuhlanganisi bya mapapa", nr: "Hlola ukuxhumana kwelifu", ve: "Lingani vhukwamani ha makole",
  },
  cloudChecking: {
    en: "Checking…", tn: "E a lekola…", af: "Toets tans…", zu: "Iyahlola…", xh: "Iyavavanya…",
    nso: "E a lekola…", st: "Ea hlahloba…", ss: "Iyahlola…", ts: "Ya kambela…", nr: "Iyahlola…", ve: "I khou lingedza…",
  },
};

export function ArchiveScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const player = useAudioPlayer();

  const [recordings, setRecordings] = useState<RecordingMeta[]>([]);
  const [consentVisible, setConsentVisible] = useState(false);
  const [pendingVisibility, setPendingVisibility] = useState<Visibility | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Cloud connection self-test (Supabase + hCaptcha). Verifies in-app what the CLI can't (captcha).
  const [cloudOpen, setCloudOpen] = useState(false);
  const [cloudBusy, setCloudBusy] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<string | null>(null);

  async function verifyCloud(captchaToken: string) {
    setCloudBusy(true);
    setCloudOpen(false);
    setCloudStatus(null);
    try {
      const res = await checkConnection(captchaToken);
      setCloudStatus(
        res.ok ? `Connected ✓ · ${res.publicCount} shared recording(s)` : `Failed (${res.stage}): ${res.message}`
      );
    } catch (e: any) {
      setCloudStatus(`Failed: ${e?.message ?? e}`);
    } finally {
      setCloudBusy(false);
    }
  }

  // Rehydrate any recordings saved on this device (durable on web via IndexedDB).
  useEffect(() => {
    let alive = true;
    recordingsStore.load().then((saved) => {
      if (alive) setRecordings(saved);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function beginRecording(visibility: Visibility) {
    setConsentVisible(false);
    setError(null);
    try {
      const perm = await requestRecordingPermissionsAsync();
      if (!perm.granted) {
        setError(t(UI.permDenied, lang));
        return;
      }
      await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setPendingVisibility(visibility);
      setIsRecording(true);
    } catch (e) {
      setError(t(UI.unsupported, lang));
    }
  }

  async function stopRecording() {
    try {
      await recorder.stop();
      const uri = recorder.uri;
      if (uri && pendingVisibility) {
        const meta: RecordingMeta = {
          id: String(Date.now()),
          visibility: pendingVisibility,
          title: t(UI.placeholder, lang),
          createdAt: new Date().toLocaleString(),
        };
        // Persist the audio bytes first (durable on web), then reflect it in the list.
        await recordingsStore.save(meta, uri);
        setRecordings((rs) => prepend(rs, meta));
      }
    } catch (e) {
      setError(t(UI.unsupported, lang));
    } finally {
      setIsRecording(false);
      setPendingVisibility(null);
    }
  }

  async function play(id: string) {
    try {
      // Resolve a fresh playable URI from the store — the original blob URL is dead after a refresh.
      const uri = await recordingsStore.getPlaybackUri(id);
      if (!uri) return;
      player.replace(uri);
      player.play();
    } catch (e) {
      setError(t(UI.unsupported, lang));
    }
  }

  // Erasure (POPIA): permanently deletes the recording + its audio bytes. Cloud erasure follows on sync.
  function remove(id: string) {
    setRecordings((rs) => removeById(rs, id));
    recordingsStore.remove(id).catch(() => {});
  }

  function rename(id: string, title: string) {
    setRecordings((rs) => renameById(rs, id, title));
    recordingsStore.rename(id, title).catch(() => {});
  }

  return (
    <Screen tone="paper">
      <ScreenHeader kicker="Your voice, your history" title={t(UI.title, lang)} onBack={onBack} />

      <Body style={styles.intro}>{t(UI.intro, lang)}</Body>

      {isRecording ? (
        <Pressable style={[styles.recordBtn, styles.stopBtn]} onPress={stopRecording}>
          <Icon.Square size={15} color="#FFFFFF" fill="#FFFFFF" />
          <Text style={[styles.recordText, styles.stopText]}>{t(UI.stop, lang)}</Text>
        </Pressable>
      ) : (
        <PressScale style={styles.recordBtn} onPress={() => setConsentVisible(true)}>
          <Icon.Mic size={18} color={colors.paper} />
          <Text style={styles.recordText}>{t(UI.record, lang)}</Text>
        </PressScale>
      )}
      {isRecording && <Text style={styles.recordingHint}>{t(UI.recording, lang)}</Text>}
      {error && <Muted style={styles.error}>{error}</Muted>}

      {recordings.length === 0 ? (
        <Muted style={styles.empty}>{t(UI.empty, lang)}</Muted>
      ) : (
        recordings.map((r) => (
          <Card key={r.id} style={styles.item}>
            <View style={styles.itemTop}>
              <View style={styles.badgeRow}>
                {r.visibility === "private" ? <Icon.Lock size={12} color={colors.gold} /> : <Icon.Users size={12} color={colors.gold} />}
                <Meta>{r.visibility === "private" ? t(UI.privateBadge, lang) : t(UI.publicBadge, lang)}</Meta>
              </View>
              <Muted style={styles.date}>{r.createdAt}</Muted>
            </View>
            <TextInput
              style={styles.titleInput}
              value={r.title}
              onChangeText={(txt) => rename(r.id, txt)}
              placeholder={t(UI.placeholder, lang)}
              placeholderTextColor="rgba(255,255,255,0.4)"
            />
            <View style={styles.itemActions}>
              <Pressable style={styles.playBtn} onPress={() => play(r.id)}>
                <Icon.Play size={13} color="#000" fill="#000" />
                <Text style={styles.playText}>{t(UI.play, lang)}</Text>
              </Pressable>
              <Pressable style={styles.delBtn} onPress={() => remove(r.id)}>
                <Icon.Trash2 size={13} color="rgba(255,255,255,0.7)" />
                <Text style={styles.delText}>{t(UI.del, lang)}</Text>
              </Pressable>
            </View>
          </Card>
        ))
      )}

      {/* Cloud connection self-test — only when Supabase is configured. Verifies anon sign-in + RLS
          via the hCaptcha widget (the CLI health-check can't solve a captcha). */}
      {hasSupabase() ? (
        <Card style={styles.cloudCard}>
          <View style={styles.badgeRow}>
            <Icon.Users size={12} color={colors.gold} />
            <Meta>{t(UI.cloudTitle, lang)}</Meta>
          </View>
          {cloudOpen ? (
            <CaptchaGate
              onToken={verifyCloud}
              onError={(m) => {
                setCloudOpen(false);
                setCloudStatus(m ?? "captcha error");
              }}
            />
          ) : (
            <Pressable
              style={styles.cloudBtn}
              onPress={() => {
                setCloudStatus(null);
                setCloudOpen(true);
              }}
              disabled={cloudBusy}
            >
              <Text style={styles.cloudBtnText}>{cloudBusy ? t(UI.cloudChecking, lang) : t(UI.cloudTest, lang)}</Text>
            </Pressable>
          )}
          {cloudStatus ? <Muted style={styles.cloudStatus}>{cloudStatus}</Muted> : null}
        </Card>
      ) : null}

      <ConsentSheet
        visible={consentVisible}
        lang={lang}
        onConsent={beginRecording}
        onCancel={() => setConsentVisible(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
  recordBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  // Recording state: dark outline pill (distinct from the white "record" button).
  stopBtn: { backgroundColor: "rgba(255,255,255,0.06)", borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" },
  stopText: { color: "#FFFFFF" },
  recordText: {
    color: colors.paper,
    fontFamily: fonts.bodyBold,
    fontSize: type.body,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  recordingHint: { color: colors.orange, fontFamily: fonts.bodySemi, fontSize: type.small, textAlign: "center", marginTop: spacing.sm },
  error: { color: colors.orange, marginTop: spacing.md },
  empty: { marginTop: spacing.xl, textAlign: "center" },
  item: { marginTop: spacing.md, padding: spacing.md },
  itemTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  date: { fontSize: type.small },
  titleInput: {
    color: "#fff",
    fontFamily: fonts.bodySemi,
    fontSize: type.body,
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  itemActions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  playBtn: { backgroundColor: "#fff", borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 18, flexDirection: "row", alignItems: "center", gap: 6 },
  playText: { color: "#000", fontFamily: fonts.bodySemi, fontSize: type.small },
  delBtn: { borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)", flexDirection: "row", alignItems: "center", gap: 6 },
  delText: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.bodySemi, fontSize: type.small },
  cloudCard: { marginTop: spacing.xl, padding: spacing.md },
  cloudBtn: { alignSelf: "flex-start", marginTop: spacing.sm, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  cloudBtnText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.small },
  cloudStatus: { marginTop: spacing.sm, fontSize: type.small },
});
