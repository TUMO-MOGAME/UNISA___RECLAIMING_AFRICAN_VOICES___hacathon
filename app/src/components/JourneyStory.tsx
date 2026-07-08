import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Platform, useWindowDimensions } from "react-native";
import { Image as ExpoImage } from "expo-image";
import { Asset } from "expo-asset";
import { LinearGradient } from "expo-linear-gradient";
import { colors, spacing, radius, fonts } from "../theme/tokens";
import { Icon } from "../ui";
import type { HistoryMilestone } from "../content/history-trail";
import type { JourneyMedia } from "../content/journey-media";

// A full-screen "dot story" — opens on a picture, then plays the milestone's film. The user can skip
// (back to the walk) at any time, and go back from the film to the picture. Rendered over the whole
// app while a story is active.

function videoUri(mod?: number): string | undefined {
  if (mod == null) return undefined;
  try {
    return Asset.fromModule(mod).uri;
  } catch {
    return undefined;
  }
}

export function JourneyStory({
  milestone,
  media,
  onClose,
  labels,
}: {
  milestone: HistoryMilestone;
  media: JourneyMedia;
  onClose: () => void;
  labels: { skip: string; back: string; watch: string; interpretation: string };
}) {
  const { width } = useWindowDimensions();
  const wide = width >= 768;
  // A dot can carry an ordered playlist of films (media.videos) or a single one (media.video).
  const clips = media.videos && media.videos.length > 0 ? media.videos : media.video != null ? [media.video] : [];
  const [clipIndex, setClipIndex] = useState(0);
  const vUri = videoUri(clips[clipIndex]);
  const canPlayVideo = Platform.OS === "web" && clips.length > 0; // inline <video> is web-only for now
  const hasImage = media.image != null;
  const [stage, setStage] = useState<"image" | "video">(hasImage ? "image" : "video");

  // When a film ends, roll on to the next one; after the last, close the story.
  const onFilmEnded = () => {
    if (clipIndex < clips.length - 1) setClipIndex(clipIndex + 1);
    else onClose();
  };
  // "Back" returns to the picture and rewinds the playlist to the first film.
  const backToImage = () => {
    setClipIndex(0);
    setStage("image");
  };

  return (
    <View style={styles.overlay}>
      {/* ── Picture stage ─────────────────────────────────────────────── */}
      {stage === "image" && hasImage ? (
        <>
          <ExpoImage source={media.image as number} style={StyleSheet.absoluteFill} contentFit="cover" />
          <LinearGradient
            colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,0.35)", "rgba(0,0,0,0.92)"]}
            locations={[0, 0.45, 1]}
            style={StyleSheet.absoluteFill}
            pointerEvents="none"
          />
          {media.imageIsAI ? <Text style={styles.aiLabel}>{labels.interpretation}</Text> : null}

          <View style={[styles.textWrap, wide && styles.textWrapWide]}>
            <Text style={styles.year}>{milestone.year}</Text>
            <Text style={[styles.title, wide && styles.titleWide]}>{milestone.title}</Text>
            <Text style={styles.note}>{milestone.note}</Text>
            <View style={styles.row}>
              {canPlayVideo ? (
                <Pressable style={styles.primary} onPress={() => { setClipIndex(0); setStage("video"); }} accessibilityRole="button" accessibilityLabel={labels.watch}>
                  <Icon.Play size={17} color={colors.night} fill={colors.night} />
                  <Text style={styles.primaryText}>{labels.watch}</Text>
                </Pressable>
              ) : null}
              <Pressable style={styles.ghost} onPress={onClose} accessibilityRole="button" accessibilityLabel={labels.skip}>
                <Text style={styles.ghostText}>{labels.skip}</Text>
              </Pressable>
            </View>
          </View>
        </>
      ) : null}

      {/* ── Film stage ────────────────────────────────────────────────── */}
      {stage === "video" && canPlayVideo ? (
        <>
          {React.createElement("video" as any, {
            key: clipIndex, // remount on clip change so the next film autoplays
            src: vUri,
            autoPlay: true,
            controls: true,
            playsInline: true,
            onEnded: onFilmEnded,
            style: {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              background: "#000",
            },
          })}
          <View style={styles.filmBar} pointerEvents="box-none">
            {hasImage ? (
              <Pressable style={styles.ghostDark} onPress={backToImage} accessibilityRole="button" accessibilityLabel={labels.back}>
                <Icon.ChevronLeft size={16} color="#fff" />
                <Text style={styles.ghostDarkText}>{labels.back}</Text>
              </Pressable>
            ) : (
              <View />
            )}
            <Pressable style={styles.ghostDark} onPress={onClose} accessibilityRole="button" accessibilityLabel={labels.skip}>
              <Text style={styles.ghostDarkText}>{labels.skip}</Text>
              <Icon.X size={16} color="#fff" />
            </Pressable>
          </View>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#000", zIndex: 100 },
  aiLabel: {
    position: "absolute",
    top: spacing.md,
    left: spacing.md,
    color: "rgba(255,255,255,0.85)",
    fontFamily: fonts.bodySemi,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: radius.sm,
    paddingVertical: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
  },
  textWrap: { position: "absolute", left: 0, right: 0, bottom: 0, padding: spacing.lg, gap: 6 },
  textWrapWide: { padding: spacing.xl, maxWidth: 760 },
  year: { color: "#E8B45A", fontFamily: fonts.display, fontSize: 30, letterSpacing: -0.5 },
  title: { color: "#FFFFFF", fontFamily: fonts.displaySemi, fontSize: 26, lineHeight: 30 },
  titleWide: { fontSize: 40, lineHeight: 44 },
  note: { color: "rgba(255,255,255,0.9)", fontFamily: fonts.body, fontSize: 15, lineHeight: 23, marginTop: 4, maxWidth: 640 },
  row: { flexDirection: "row", alignItems: "center", gap: spacing.sm, marginTop: spacing.md, flexWrap: "wrap" },
  primary: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: "#E8B45A",
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  primaryText: { color: colors.night, fontFamily: fonts.bodyBold, fontSize: 15, letterSpacing: 0.3 },
  ghost: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: radius.pill,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  ghostText: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 14 },
  filmBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.md,
  },
  ghostDark: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.55)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: radius.pill,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  ghostDarkText: { color: "#FFFFFF", fontFamily: fonts.bodySemi, fontSize: 13 },
});
