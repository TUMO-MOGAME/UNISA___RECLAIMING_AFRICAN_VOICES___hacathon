import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import {
  useAudioRecorder,
  useAudioPlayer,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from "expo-audio";
import { Lang } from "../content/types";
import { ConsentSheet, Visibility } from "./ConsentSheet";
import { colors, spacing, radius, type } from "../theme/tokens";

// The Community Archive — the heart of Community Impact (25%). Users record their own oral histories
// behind a POPIA consent gate, keep them private or public, and can delete them at any time (erasure).
// Recordings are kept in-session for this concept build; WatermelonDB persistence + Supabase/Lelapa
// sync are the online stretch (specs/tasks.md T024/T027/T028). See popia-compliance skill.

type Recording = {
  id: string;
  uri: string;
  visibility: Visibility;
  title: string;
  createdAt: string;
};

const UI = {
  back: { en: "‹ Back", tn: "‹ Morago" },
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
        setError(UI.permDenied[lang]);
        return;
      }
      await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: true });
      await recorder.prepareToRecordAsync();
      recorder.record();
      setPendingVisibility(visibility);
      setIsRecording(true);
    } catch (e) {
      setError(UI.unsupported[lang]);
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
            title: UI.placeholder[lang],
            createdAt: new Date().toLocaleString(),
          },
          ...rs,
        ]);
      }
    } catch (e) {
      setError(UI.unsupported[lang]);
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
      setError(UI.unsupported[lang]);
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
    <View style={styles.root}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable onPress={onBack} hitSlop={10}>
            <Text style={styles.backText}>{UI.back[lang]}</Text>
          </Pressable>
          <Text style={styles.title}>{UI.title[lang]}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.intro}>{UI.intro[lang]}</Text>

          {isRecording ? (
            <Pressable style={[styles.recordBtn, styles.stopBtn]} onPress={stopRecording}>
              <Text style={styles.recordText}>{UI.stop[lang]}</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.recordBtn} onPress={() => setConsentVisible(true)}>
              <Text style={styles.recordText}>{UI.record[lang]}</Text>
            </Pressable>
          )}
          {isRecording && <Text style={styles.recordingHint}>{UI.recording[lang]}</Text>}
          {error && <Text style={styles.error}>{error}</Text>}

          {recordings.length === 0 ? (
            <Text style={styles.empty}>{UI.empty[lang]}</Text>
          ) : (
            recordings.map((r) => (
              <View key={r.id} style={styles.item}>
                <View style={styles.itemTop}>
                  <Text style={styles.badge}>
                    {r.visibility === "private" ? UI.privateBadge[lang] : UI.publicBadge[lang]}
                  </Text>
                  <Text style={styles.date}>{r.createdAt}</Text>
                </View>
                <TextInput
                  style={styles.titleInput}
                  value={r.title}
                  onChangeText={(t) => rename(r.id, t)}
                  placeholder={UI.placeholder[lang]}
                  placeholderTextColor={colors.muted}
                />
                <View style={styles.itemActions}>
                  <Pressable style={styles.playBtn} onPress={() => play(r.uri)}>
                    <Text style={styles.playText}>{UI.play[lang]}</Text>
                  </Pressable>
                  <Pressable style={styles.delBtn} onPress={() => remove(r.id)}>
                    <Text style={styles.delText}>{UI.del[lang]}</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </SafeAreaView>

      <ConsentSheet
        visible={consentVisible}
        lang={lang}
        onConsent={beginRecording}
        onCancel={() => setConsentVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.night },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backText: { color: colors.gold, fontSize: type.body, fontWeight: "600" },
  title: { color: colors.sand, fontSize: type.title, fontWeight: "700" },
  content: { padding: spacing.lg, paddingTop: 0, paddingBottom: spacing.xxl },
  intro: { color: colors.sand, fontSize: type.body, lineHeight: 24, marginBottom: spacing.lg },
  recordBtn: {
    backgroundColor: colors.ember,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  stopBtn: { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.ember },
  recordText: { color: colors.sand, fontSize: type.body, fontWeight: "800", letterSpacing: 0.5 },
  recordingHint: { color: colors.ember, fontSize: type.small, textAlign: "center", marginTop: spacing.sm },
  error: { color: colors.gold, fontSize: type.small, lineHeight: 20, marginTop: spacing.md },
  empty: { color: colors.muted, fontSize: type.body, lineHeight: 24, marginTop: spacing.xl, textAlign: "center" },
  item: { backgroundColor: colors.card, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  itemTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  badge: { color: colors.gold, fontSize: type.small, fontWeight: "700" },
  date: { color: colors.muted, fontSize: type.small },
  titleInput: {
    color: colors.sand,
    fontSize: type.body,
    fontWeight: "600",
    marginTop: spacing.sm,
    paddingVertical: spacing.xs,
  },
  itemActions: { flexDirection: "row", gap: spacing.sm, marginTop: spacing.sm },
  playBtn: { backgroundColor: colors.night, borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 18 },
  playText: { color: colors.sand, fontWeight: "700", fontSize: type.small },
  delBtn: { borderRadius: radius.pill, paddingVertical: 8, paddingHorizontal: 18, borderWidth: 1, borderColor: colors.muted },
  delText: { color: colors.muted, fontWeight: "700", fontSize: type.small },
});
