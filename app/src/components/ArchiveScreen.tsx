import React, { useState } from "react";
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
import { Screen, ScreenHeader, Card, Body, Meta, Muted } from "../ui";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";

// The Community Archive — the heart of Community Impact (25%). Users record their own oral histories
// behind a POPIA consent gate, keep them private or public, and can delete them at any time (erasure).
// Recordings are kept in-session for this concept build; WatermelonDB persistence + Supabase/Lelapa
// sync are the online stretch (T024/T027/T028). See popia-compliance skill. Built on the UI kit.

type Recording = {
  id: string;
  uri: string;
  visibility: Visibility;
  title: string;
  createdAt: string;
};

const UI = {
  title: { en: "Community Archive", tn: "Polokelo ya Setšhaba" },
  intro: {
    en: "Record an elder's story, a memory, or a tradition in your own words. Your voice, your history — kept on your terms.",
    tn: "Gatisa kanegelo ya motsofe, kgakologelo, kgotsa ngwao ka mafoko a gago. Lentswe la gago, hisitori ya gago — e bolokwa ka fa o batlang ka teng.",
  },
  record: { en: "● Record a story", tn: "● Gatisa kanegelo" },
  stop: { en: "■ Stop recording", tn: "■ Emisa go gatisa" },
  recording: { en: "Recording…", tn: "E a gatisa…" },
  empty: { en: "No recordings yet. Tap “Record a story” to add the first voice.", tn: "Ga go na dikgatiso. Tobetsa “Gatisa kanegelo” go tsenya lentswe la ntlha." },
  play: { en: "► Play", tn: "► Bapala" },
  del: { en: "Delete", tn: "Phimola" },
  privateBadge: { en: "🔒 Private", tn: "🔒 Sephiri" },
  publicBadge: { en: "🌍 Shared", tn: "🌍 E abetswe" },
  placeholder: { en: "Untitled story", tn: "Kanegelo e e se nang setlhogo" },
  permDenied: { en: "Microphone permission is needed to record. You can enable it in settings.", tn: "Tetla ya microphone e a tlhokega go gatisa. O ka e tshwaya mo dithulaganyong." },
  unsupported: { en: "Recording isn't available on this device/browser. Try the app on a phone via Expo Go.", tn: "Go gatisa ga go a nna teng mo sedirisweng se. Leka app mo founong ka Expo Go." },
};

export function ArchiveScreen({ lang, onBack }: { lang: Lang; onBack: () => void }) {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const player = useAudioPlayer();

  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [consentVisible, setConsentVisible] = useState(false);
  const [pendingVisibility, setPendingVisibility] = useState<Visibility | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setRecordings((rs) => [
          {
            id: String(Date.now()),
            uri,
            visibility: pendingVisibility,
            title: t(UI.placeholder, lang),
            createdAt: new Date().toLocaleString(),
          },
          ...rs,
        ]);
      }
    } catch (e) {
      setError(t(UI.unsupported, lang));
    } finally {
      setIsRecording(false);
      setPendingVisibility(null);
    }
  }

  function play(uri: string) {
    try {
      player.replace(uri);
      player.play();
    } catch (e) {
      setError(t(UI.unsupported, lang));
    }
  }

  // Erasure (POPIA): removes the recording from the archive. Cloud erasure is wired when sync lands.
  function remove(id: string) {
    setRecordings((rs) => rs.filter((r) => r.id !== id));
  }

  function rename(id: string, title: string) {
    setRecordings((rs) => rs.map((r) => (r.id === id ? { ...r, title } : r)));
  }

  return (
    <Screen tone="paper">
      <ScreenHeader kicker="Your voice, your history" title={t(UI.title, lang)} onBack={onBack} />

      <Body style={styles.intro}>{t(UI.intro, lang)}</Body>

      {isRecording ? (
        <Pressable style={[styles.recordBtn, styles.stopBtn]} onPress={stopRecording}>
          <Text style={styles.recordText}>{t(UI.stop, lang)}</Text>
        </Pressable>
      ) : (
        <PressScale style={styles.recordBtn} onPress={() => setConsentVisible(true)}>
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
              <Meta>{r.visibility === "private" ? t(UI.privateBadge, lang) : t(UI.publicBadge, lang)}</Meta>
              <Muted style={styles.date}>{r.createdAt}</Muted>
            </View>
            <TextInput
              style={styles.titleInput}
              value={r.title}
              onChangeText={(txt) => rename(r.id, txt)}
              placeholder={t(UI.placeholder, lang)}
              placeholderTextColor={colors.slate}
            />
            <View style={styles.itemActions}>
              <Pressable style={styles.playBtn} onPress={() => play(r.uri)}>
                <Text style={styles.playText}>{t(UI.play, lang)}</Text>
              </Pressable>
              <Pressable style={styles.delBtn} onPress={() => remove(r.id)}>
                <Text style={styles.delText}>{t(UI.del, lang)}</Text>
              </Pressable>
            </View>
          </Card>
        ))
      )}

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
    backgroundColor: colors.orange,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  stopBtn: { backgroundColor: colors.paperCard, borderWidth: 2, borderColor: colors.orange },
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
  date: { fontSize: type.small },
  titleInput: {
    color: colors.navy,
    fontFamily: fonts.bodySemi,
    fontSize: type.body,
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  itemActions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  playBtn: { backgroundColor: colors.navy, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 18 },
  playText: { color: colors.paper, fontFamily: fonts.bodySemi, fontSize: type.small },
  delBtn: { borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 18, borderWidth: 1, borderColor: colors.slate },
  delText: { color: colors.slate, fontFamily: fonts.bodySemi, fontSize: type.small },
});
