import React, { useState } from "react";
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { LANGUAGES, languageByCode } from "../i18n";
import { Lang } from "../content/types";
import { colors, spacing, radius, type, fonts } from "../theme/tokens";

// First-class language chooser for all 11 official SA languages (setswana-i18n skill: indigenous
// languages are peers, not a "secondary" dropdown). Lists each language by its own name (endonym).
// Languages with human-reviewed story text are marked ✓; the rest currently show English text and
// say so in the Reader — we never pass machine/absent translations off as authoritative.

export function LanguagePicker({
  lang,
  onChange,
  compact,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const meta = languageByCode(lang);

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={`Language: ${meta.english}. Tap to change.`}
      >
        <Text style={styles.triggerText}>
          {compact ? lang.toUpperCase() : meta.endonym} ▾
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet} onStartShouldSetResponder={() => true}>
            <Text style={styles.heading}>Choose a language · Tlhopha puo</Text>
            <ScrollView style={{ maxHeight: 440 }}>
              {LANGUAGES.map((l) => {
                const active = l.code === lang;
                return (
                  <Pressable
                    key={l.code}
                    style={[styles.row, active && styles.rowActive]}
                    onPress={() => {
                      onChange(l.code);
                      setOpen(false);
                    }}
                    accessibilityRole="button"
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.endonym}>{l.endonym}</Text>
                      <Text style={styles.english}>{l.english}</Text>
                    </View>
                    {l.reviewedContent && <Text style={styles.reviewed}>✓</Text>}
                    {active && <Text style={styles.check}>●</Text>}
                  </Pressable>
                );
              })}
            </ScrollView>
            <Text style={styles.footnote}>
              ✓ full translation · others show English text for now, with native audio where available.
            </Text>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: colors.card,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  triggerText: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.small },
  backdrop: {
    flex: 1,
    backgroundColor: colors.scrimStrong,
    justifyContent: "center",
    padding: spacing.lg,
  },
  sheet: {
    backgroundColor: colors.ink,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  heading: {
    color: colors.gold,
    fontFamily: fonts.bodySemi,
    fontSize: type.small,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.md,
  },
  rowActive: { backgroundColor: colors.card },
  endonym: { color: colors.sand, fontFamily: fonts.bodySemi, fontSize: type.body },
  english: { color: colors.muted, fontFamily: fonts.body, fontSize: type.small, marginTop: 1 },
  reviewed: { color: colors.gold, fontSize: type.body, fontWeight: "800" },
  check: { color: colors.ember, fontSize: type.body },
  footnote: {
    color: colors.muted,
    fontFamily: fonts.body,
    fontSize: type.small,
    lineHeight: 18,
    marginTop: spacing.md,
    fontStyle: "italic",
  },
});
