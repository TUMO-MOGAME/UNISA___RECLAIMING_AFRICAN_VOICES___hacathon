import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { HomeGallery } from "./src/components/HomeGallery";
import { CinematicReader } from "./src/components/CinematicReader";
import { moduleById } from "./src/content";
import { Lang } from "./src/content/types";
import { colors } from "./src/theme/tokens";

// Phase 1 spine: HomeGallery → tap a pillar → CinematicReader → back.
// Lightweight in-app navigation (no router dependency yet); language is shared app-wide.
// Phase 2 adds the Community Archive + an "About the Sources" screen (specs/tasks.md).

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [openId, setOpenId] = useState<string | null>(null);

  const openModule = openId ? moduleById(openId) : null;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {openModule ? (
        <CinematicReader
          module={openModule}
          lang={lang}
          onLangChange={setLang}
          onBack={() => setOpenId(null)}
        />
      ) : (
        <HomeGallery
          lang={lang}
          onToggleLang={() => setLang((l) => (l === "en" ? "tn" : "en"))}
          onOpen={(id) => setOpenId(id)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.night },
});
