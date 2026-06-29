import React, { useState } from "react";
import { Image, View, ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "../theme/tokens";

// Full-bleed cinematic background image with a loading state and a graceful failure fallback.
// Never a hung spinner or crash (accessibility rule, docs/07). Phase 1 upgrades to expo-image
// for disk caching (T008).

export function SceneImage({ uri }: { uri: string }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  return (
    <View style={[StyleSheet.absoluteFill, styles.fallback]}>
      {!failed && (
        <Image
          source={{ uri }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setFailed(true);
            setLoading(false);
          }}
        />
      )}
      {loading && !failed && (
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          <ActivityIndicator color={colors.gold} size="large" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fallback: { backgroundColor: colors.ink },
  center: { alignItems: "center", justifyContent: "center" },
});
