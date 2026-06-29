import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { CinematicReader } from "./src/components/CinematicReader";
import { moduleById } from "./src/content";
import { colors, spacing, type } from "./src/theme/tokens";

// Phase 0 spine: the first literary pillar (Mhudi) rendered in the cinematic Reader.
// Phase 1 wraps this in a HomeGallery + navigation across all four pillars (specs/tasks.md).

export default function App() {
  const mhudi = moduleById("mhudi");

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.brandBar}>
        <SafeAreaView>
          <Text style={styles.brand}>
            Lentswe <Text style={styles.brandSub}>· Mantswe a Afrika</Text>
          </Text>
        </SafeAreaView>
      </View>
      {mhudi ? (
        <CinematicReader module={mhudi} />
      ) : (
        <SafeAreaView style={styles.center}>
          <Text style={styles.fallback}>No module loaded.</Text>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.night },
  brandBar: { backgroundColor: colors.night, paddingHorizontal: spacing.lg },
  brand: {
    color: colors.gold,
    fontSize: type.title,
    fontWeight: "800",
    letterSpacing: 0.5,
    paddingVertical: spacing.sm,
  },
  brandSub: { color: colors.muted, fontSize: type.small, fontWeight: "500" },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  fallback: { color: colors.sand },
});
