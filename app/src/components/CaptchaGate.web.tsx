import React, { useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { colors, fonts, spacing } from "../theme/tokens";

// hCaptcha challenge (web). Renders the widget and hands back a one-time token via onToken; Supabase
// needs that token on signInAnonymously() when CAPTCHA protection is enabled on the project. Sitekey is
// public (EXPO_PUBLIC_HCAPTCHA_SITEKEY); the secret lives only in the Supabase dashboard. Native uses the
// stub in CaptchaGate.tsx (cloud sign-in is web-only for now).

const SITEKEY = process.env.EXPO_PUBLIC_HCAPTCHA_SITEKEY;

export type CaptchaGateProps = {
  onToken: (token: string) => void;
  onError?: (message?: string) => void;
};

export function CaptchaGate({ onToken, onError }: CaptchaGateProps) {
  const ref = useRef<HCaptcha>(null);
  if (!SITEKEY) {
    return <Text style={styles.note}>hCaptcha sitekey not set (EXPO_PUBLIC_HCAPTCHA_SITEKEY).</Text>;
  }
  return (
    <View style={styles.wrap}>
      <HCaptcha
        ref={ref}
        sitekey={SITEKEY}
        onVerify={(token: string) => onToken(token)}
        onError={() => onError?.("captcha error")}
        onExpire={() => onError?.("captcha expired")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: "flex-start", marginTop: spacing.sm },
  note: { color: colors.muted, fontFamily: fonts.body, fontSize: 12, fontStyle: "italic", marginTop: spacing.sm },
});
