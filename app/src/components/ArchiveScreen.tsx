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
import { RecordingMeta, prepend, removeById, renameById, updateById } from "../services/archive/recordings";
import { hasSupabase, hasSession, checkConnection } from "../services/archive/supabase";
import { fetchPublicFeed, signedUrlFor, uploadPublic, deleteCloud, type FeedItem } from "../services/archive/cloud";
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
  share: {
    en: "Share to community", tn: "Abelana le setšhaba", af: "Deel met gemeenskap", zu: "Yabelana nomphakathi", xh: "Yabelana noluntu",
    nso: "Abelana le setšhaba", st: "Arolelana le setjhaba", ss: "Yabelana nemmango", ts: "Avela vaaki", nr: "Yabelana nomphakathi", ve: "Kovhelani na tshitshavha",
  },
  sharing: {
    en: "Sharing…", tn: "Go abelana…", af: "Deel tans…", zu: "Kuyabelwana…", xh: "Kuyabelwana…",
    nso: "Go abelana…", st: "Ho arolelanwa…", ss: "Kuyabelwana…", ts: "Ku averiwa…", nr: "Kuyabelwana…", ve: "Hu khou kovhelwa…",
  },
  shared: {
    en: "Shared ✓", tn: "Go abetswe ✓", af: "Gedeel ✓", zu: "Kwabelwe ✓", xh: "Kwabelwane ✓",
    nso: "Go abetšwe ✓", st: "E arolelanwe ✓", ss: "Kwabiwe ✓", ts: "Swi averiwile ✓", nr: "Kwabelwe ✓", ve: "Zwo kovhelwa ✓",
  },
  community: {
    en: "From the community", tn: "Go tswa setšhabeng", af: "Van die gemeenskap", zu: "Kuvela emphakathini", xh: "Kuvela eluntwini",
    nso: "Go tšwa setšhabeng", st: "Ho tswa setjhabeng", ss: "Kuvela emmangweni", ts: "Ku suka evaakini", nr: "Kuvela emphakathini", ve: "Zwi bva tshitshavhani",
  },
  communityEmpty: {
    en: "No shared stories yet — be the first to share one.", tn: "Ga go na dikanegelo tse di abetsweng — nna wa ntlha go abelana.",
    af: "Nog geen gedeelde stories nie — wees die eerste om een te deel.", zu: "Azikho izindaba ezabiwe okwamanje — yiba ngowokuqala ukwabelana.",
    xh: "Akukho mabali abelwane ngawo okwangoku — yiba ngowokuqala ukwabelana.", nso: "Ga go na dikanegelo tše di abetšwego — eba wa mathomo go abelana.",
    st: "Ha ho dipale tse arolelanweng — eba wa pele ho arolelana.", ss: "Atikho tindzaba letabiwe — yiba ngewekucala kwabelana.",
    ts: "A ku na mintsheketo leyi averiweke — va wo sungula ku avela.", nr: "Azikho iindaba ezabiwe — yiba ngowokuthoma ukwabelana.", ve: "A hu na zwiitwa zwo kovhelwaho — vhani wa u thoma u kovhela.",
  },
  refresh: {
    en: "Refresh", tn: "Ntšhafatsa", af: "Verfris", zu: "Vuselela", xh: "Hlaziya",
    nso: "Mpshafatša", st: "Ntjhafatsa", ss: "Vuselela", ts: "Pfuxeta", nr: "Vuselela", ve: "Vusuludza",
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
  // Cloud (Supabase): the community feed + sharing. Reading the feed needs no captcha (public rows are
  // anon-readable via RLS); writing (share/erase) needs an anonymous session — captcha on first sign-in.
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [captchaFor, setCaptchaFor] = useState<null | { kind: "test" } | { kind: "share"; rec: RecordingMeta }>(null);
  const [cloudBusy, setCloudBusy] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<string | null>(null);

  const refreshFeed = () => {
    if (hasSupabase()) fetchPublicFeed().then(setFeed).catch(() => {});
  };

  async function verifyCloud(token?: string) {
    setCloudBusy(true);
    setCloudStatus(null);
    try {
      const res = await checkConnection(token);
      setCloudStatus(res.ok ? `Connected ✓ · ${res.publicCount} shared recording(s)` : `Failed (${res.stage}): ${res.message}`);
    } catch (e: any) {
      setCloudStatus(`Failed: ${e?.message ?? e}`);
    } finally {
      setCloudBusy(false);
    }
  }

  async function doShare(rec: RecordingMeta, token?: string) {
    setCloudBusy(true);
    setCloudStatus(null);
    try {
      const uri = await recordingsStore.getPlaybackUri(rec.id);
      if (!uri) {
        setCloudStatus("Could not read the local audio.");
        return;
      }
      const res = await uploadPublic({ recId: rec.id, uri, title: rec.title, language: lang, captchaToken: token });
      if (res.ok) {
        await recordingsStore.update(rec.id, { cloudId: res.cloudId, storagePath: res.storagePath });
        setRecordings((rs) => updateById(rs, rec.id, { cloudId: res.cloudId, storagePath: res.storagePath }));
        setCloudStatus("Shared to the community ✓");
        refreshFeed();
      } else {
        setCloudStatus(`Share failed: ${res.message}`);
      }
    } finally {
      setCloudBusy(false);
    }
  }

  // Route a write through the captcha only when there's no session yet.
  async function startShare(rec: RecordingMeta) {
    if (await hasSession()) doShare(rec);
    else setCaptchaFor({ kind: "share", rec });
  }
  async function startTest() {
    if (await hasSession()) verifyCloud();
    else setCaptchaFor({ kind: "test" });
  }
  function onCaptchaToken(token: string) {
    const job = captchaFor;
    setCaptchaFor(null);
    if (!job) return;
    if (job.kind === "test") verifyCloud(token);
    else doShare(job.rec, token);
  }

  async function playRemote(item: FeedItem) {
    const url = await signedUrlFor(item.storagePath);
    if (!url) {
      setCloudStatus("Could not load that recording.");
      return;
    }
    try {
      player.replace(url);
      player.play();
    } catch {
      setCloudStatus("Playback failed.");
    }
  }

  // Rehydrate any recordings saved on this device (durable on web via IndexedDB) + load the feed.
  useEffect(() => {
    let alive = true;
    recordingsStore.load().then((saved) => {
      if (alive) setRecordings(saved);
    });
    refreshFeed();
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Erasure (POPIA): permanently deletes the recording + its audio bytes locally, and — if it was
  // shared — from the cloud too (row + storage object), then refreshes the community feed.
  function remove(id: string) {
    const rec = recordings.find((r) => r.id === id);
    setRecordings((rs) => removeById(rs, id));
    recordingsStore.remove(id).catch(() => {});
    if (rec?.cloudId && rec.storagePath) {
      deleteCloud({ cloudId: rec.cloudId, storagePath: rec.storagePath }).then(refreshFeed).catch(() => {});
    }
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
              {/* Share only appears for PUBLIC recordings once cloud is configured. */}
              {r.visibility === "public" && hasSupabase() ? (
                r.cloudId ? (
                  <View style={styles.sharedBadge}>
                    <Icon.Check size={12} color={colors.gold} strokeWidth={2.6} />
                    <Text style={styles.sharedText}>{t(UI.shared, lang)}</Text>
                  </View>
                ) : (
                  <Pressable style={styles.shareBtn} onPress={() => startShare(r)} disabled={cloudBusy}>
                    <Icon.ArrowUpRight size={12} color={colors.night} />
                    <Text style={styles.shareText}>{cloudBusy ? t(UI.sharing, lang) : t(UI.share, lang)}</Text>
                  </Pressable>
                )
              ) : null}
            </View>
          </Card>
        ))
      )}

      {/* Community cloud archive — shared recordings from everyone. Reading needs no captcha; the
          hCaptcha challenge appears only for a write (test/share) when there's no session yet. */}
      {hasSupabase() ? (
        <Card style={styles.cloudCard}>
          <View style={styles.badgeRow}>
            <Icon.Users size={12} color={colors.gold} />
            <Meta>{t(UI.cloudTitle, lang)}</Meta>
          </View>

          {captchaFor ? (
            <CaptchaGate
              onToken={onCaptchaToken}
              onError={(m) => {
                setCaptchaFor(null);
                setCloudStatus(m ?? "captcha error");
              }}
            />
          ) : (
            <View style={styles.cloudActions}>
              <Pressable style={styles.cloudBtn} onPress={startTest} disabled={cloudBusy}>
                <Text style={styles.cloudBtnText}>{cloudBusy ? t(UI.cloudChecking, lang) : t(UI.cloudTest, lang)}</Text>
              </Pressable>
              <Pressable style={styles.cloudBtn} onPress={refreshFeed}>
                <Text style={styles.cloudBtnText}>{t(UI.refresh, lang)}</Text>
              </Pressable>
            </View>
          )}
          {cloudStatus ? <Muted style={styles.cloudStatus}>{cloudStatus}</Muted> : null}

          <Text style={styles.feedHeading}>{t(UI.community, lang)}</Text>
          {feed.length === 0 ? (
            <Muted style={styles.cloudStatus}>{t(UI.communityEmpty, lang)}</Muted>
          ) : (
            feed.map((f) => (
              <View key={f.id} style={styles.feedRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.feedTitle} numberOfLines={1}>{f.title}</Text>
                  <Muted style={styles.date}>
                    {(f.createdAt ?? "").slice(0, 10)}
                    {f.language ? ` · ${f.language}` : ""}
                  </Muted>
                </View>
                <Pressable style={styles.playBtn} onPress={() => playRemote(f)}>
                  <Icon.Play size={13} color="#000" fill="#000" />
                  <Text style={styles.playText}>{t(UI.play, lang)}</Text>
                </Pressable>
              </View>
            ))
          )}
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
  cloudActions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm, flexWrap: "wrap" },
  cloudBtn: { alignSelf: "flex-start", borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
  cloudBtnText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.small },
  cloudStatus: { marginTop: spacing.sm, fontSize: type.small },
  // Share button on a public recording card (gold pill, dark text — like the play button's cousin).
  shareBtn: { backgroundColor: colors.gold, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 14, flexDirection: "row", alignItems: "center", gap: 6 },
  shareText: { color: colors.night, fontFamily: fonts.bodySemi, fontSize: type.small },
  sharedBadge: { flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 8, paddingHorizontal: 12 },
  sharedText: { color: colors.gold, fontFamily: fonts.bodySemi, fontSize: type.small },
  // Community feed rows.
  feedHeading: { color: colors.gold, fontFamily: fonts.bodyBold, fontSize: type.small - 1, letterSpacing: 1, textTransform: "uppercase", marginTop: spacing.lg, marginBottom: spacing.xs },
  feedRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  feedTitle: { color: "#fff", fontFamily: fonts.bodySemi, fontSize: type.body },
});
