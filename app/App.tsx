import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import { useFonts, Anton_400Regular } from "@expo-google-fonts/anton";
import {
  Barlow_400Regular,
  Barlow_500Medium,
  Barlow_600SemiBold,
  Barlow_700Bold,
  Barlow_800ExtraBold,
} from "@expo-google-fonts/barlow";
import { HomeGallery } from "./src/components/HomeGallery";
import { CinematicReader } from "./src/components/CinematicReader";
import { AboutSourcesScreen } from "./src/components/AboutSourcesScreen";
import { ArchiveScreen } from "./src/components/ArchiveScreen";
import { HeritageLedgerScreen } from "./src/components/HeritageLedgerScreen";
import { LaunchScreen } from "./src/components/LaunchScreen";
import { Fade } from "./src/components/Motion";
import { moduleById } from "./src/content";
import { Lang } from "./src/content/types";
import { colors } from "./src/theme/tokens";

// Lightweight in-app navigation (no router dependency). Language is shared app-wide.

type Route =
  | { name: "home" }
  | { name: "reader"; id: string }
  | { name: "about" }
  | { name: "archive" }
  | { name: "heritage" };

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [launchDone, setLaunchDone] = useState(false);
  const home = () => setRoute({ name: "home" });

  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    Barlow_400Regular,
    Barlow_500Medium,
    Barlow_600SemiBold,
    Barlow_700Bold,
    Barlow_800ExtraBold,
  });

  const openModule = route.name === "reader" ? moduleById(route.id) : null;
  const showLaunch = !fontsLoaded || !launchDone;
  const routeKey = route.name === "reader" ? `reader:${route.id}` : route.name;

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {fontsLoaded && (
        <Fade key={routeKey} style={{ flex: 1 }}>
          {openModule ? (
            <CinematicReader
              module={openModule}
              lang={lang}
              onLangChange={setLang}
              onBack={home}
              onArchive={() => setRoute({ name: "archive" })}
            />
          ) : route.name === "about" ? (
            <AboutSourcesScreen lang={lang} onBack={home} />
          ) : route.name === "archive" ? (
            <ArchiveScreen lang={lang} onBack={home} />
          ) : route.name === "heritage" ? (
            <HeritageLedgerScreen lang={lang} onBack={home} />
          ) : (
            <HomeGallery
              lang={lang}
              onLangChange={setLang}
              onOpen={(id) => setRoute({ name: "reader", id })}
              onAbout={() => setRoute({ name: "about" })}
              onArchive={() => setRoute({ name: "archive" })}
              onHeritage={() => setRoute({ name: "heritage" })}
            />
          )}
        </Fade>
      )}
      {showLaunch && <LaunchScreen onDone={() => setLaunchDone(true)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.night },
});
