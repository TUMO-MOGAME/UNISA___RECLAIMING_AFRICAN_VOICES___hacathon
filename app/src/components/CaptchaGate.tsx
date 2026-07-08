import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors, fonts, spacing } from "../theme/tokens";

// Native stub — cloud sign-in (and thus the hCaptcha challenge) is web-only for now. The real widget
// lives in CaptchaGate.web.tsx; Metro picks that on web. Keeping the same props so callers are identical.

export type CaptchaGateProps = {
  onToken: (token: string) => void;
  onError?: (message?: string) => void;
};

export function CaptchaGate(_props: CaptchaGateProps) {
  return <Text style={styles.note}>Cloud verification is available on the web build.</Text>;
}

const styles = StyleSheet.create({
  note: { color: colors.muted, fontFamily: fonts.body, fontSize: 12, fontStyle: "italic", marginTop: spacing.sm },
});
