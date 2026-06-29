import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { HomeGallery } from "./src/components/HomeGallery";
import { CinematicReader } from "./src/components/CinematicReader";
import { AboutSourcesScreen } from "./src/components/AboutSourcesScreen";
import { moduleById } from "./src/content";
import { Lang } from "./src/content/types";
import { colors } from "./src/theme/tokens";

// Lightweight in-app navigation (no router dependency). Language is shared app-wide.
// Phase 2 adds the "archive" route (Community Archive). See specs/tasks.md.

type Route =
  | { name: "home" }
  | { name: "reader"; id: string }
  | { name: "about" };

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [route, setRoute] = useState<Route>({ name: "home" });
  const toggleLang = () => setLang((l) => (l === "en" ? "tn" : "en"));
  const home = () => setRoute({ name: "home" });

  const openModule = route.name === "reader" ? moduleById(route.id) : null;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {openModule ? (
        <CinematicReader
          module={openModule}
          lang={lang}
          onLangChange={setLang}
          onBack={home}
        />
      ) : route.name === "about" ? (
        <AboutSourcesScreen lang={lang} onBack={home} />
      ) : (
        <HomeGallery
          lang={lang}
          onToggleLang={toggleLang}
          onOpen={(id) => setRoute({ name: "reader", id })}
          onAbout={() => setRoute({ name: "about" })}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.night },
});
