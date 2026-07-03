import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import {
  Montserrat_400Regular,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
} from "@expo-google-fonts/montserrat";
import { HomeGallery } from "./src/components/HomeGallery";
import { CinematicReader } from "./src/components/CinematicReader";
import { AboutSourcesScreen } from "./src/components/AboutSourcesScreen";
import { ArchiveScreen } from "./src/components/ArchiveScreen";
import { HeritageLedgerScreen } from "./src/components/HeritageLedgerScreen";
import { LaunchScreen } from "./src/components/LaunchScreen";
import { ProvincesScreen, ProvinceScreen, CityScreen } from "./src/components/ProvincesScreens";
import { provinceById, cityById } from "./src/content/provinces";
import { PresidentsScreen, PresidentScreen } from "./src/components/PresidentsScreens";
import { presidentById } from "./src/content/presidents";
import { Fade } from "./src/components/Motion";
import { moduleById } from "./src/content";
import { Lang } from "./src/content/types";

// Lightweight in-app navigation (no router dependency). Language is shared app-wide.

type Route =
  | { name: "home" }
  | { name: "reader"; id: string }
  | { name: "about" }
  | { name: "archive" }
  | { name: "heritage" }
  | { name: "provinces" }
  | { name: "province"; id: string }
  | { name: "city"; id: string }
  | { name: "presidents" }
  | { name: "president"; id: string };

export default function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [launchDone, setLaunchDone] = useState(false);
  const home = () => setRoute({ name: "home" });

  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
    Montserrat_400Regular,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });
  // Don't let a font-loading failure (e.g. offline) trap the user on the launch screen.
  const ready = fontsLoaded || !!fontError;

  const showLaunch = !ready || !launchDone;
  const routeKey =
    route.name === "reader" || route.name === "province" || route.name === "city" || route.name === "president"
      ? `${route.name}:${route.id}`
      : route.name;

  // Flat switch (not a nested ternary) — keeps each screen at the same shallow depth, which also
  // keeps the type-checker from recursing too deeply over the route union.
  function renderRoute() {
    switch (route.name) {
      case "reader": {
        const m = moduleById(route.id);
        return m ? (
          <CinematicReader module={m} lang={lang} onLangChange={setLang} onBack={home} onArchive={() => setRoute({ name: "archive" })} />
        ) : null;
      }
      case "about":
        return <AboutSourcesScreen lang={lang} onBack={home} />;
      case "archive":
        return <ArchiveScreen lang={lang} onBack={home} />;
      case "heritage":
        return <HeritageLedgerScreen lang={lang} onBack={home} />;
      case "provinces":
        return <ProvincesScreen onBack={home} onOpenProvince={(id) => setRoute({ name: "province", id })} />;
      case "province": {
        const p = provinceById(route.id);
        return p ? <ProvinceScreen province={p} onBack={() => setRoute({ name: "provinces" })} onOpenCity={(id) => setRoute({ name: "city", id })} /> : null;
      }
      case "city": {
        const c = cityById(route.id);
        return c ? <CityScreen city={c} onBack={home} onArchive={() => setRoute({ name: "archive" })} /> : null;
      }
      case "presidents":
        return <PresidentsScreen onBack={home} onOpen={(id) => setRoute({ name: "president", id })} />;
      case "president": {
        const pr = presidentById(route.id);
        return pr ? <PresidentScreen president={pr} onBack={() => setRoute({ name: "presidents" })} onArchive={() => setRoute({ name: "archive" })} /> : null;
      }
      default:
        return (
          <HomeGallery
            lang={lang}
            onLangChange={setLang}
            onOpen={(id) => setRoute({ name: "reader", id })}
            onAbout={() => setRoute({ name: "about" })}
            onArchive={() => setRoute({ name: "archive" })}
            onHeritage={() => setRoute({ name: "heritage" })}
            onProvinces={() => setRoute({ name: "provinces" })}
            onPresidents={() => setRoute({ name: "presidents" })}
          />
        );
    }
  }

  return (
    <View style={styles.app}>
      <StatusBar style="light" />
      {/* Phone-width column so the app reads as a mobile app on wide web windows (and images fit
          the way they do on a real phone — no over-zoomed full-window crops). */}
      <View style={styles.frame}>
        {ready && (
          <Fade key={routeKey} style={{ flex: 1 }}>
            {renderRoute()}
          </Fade>
        )}
        {showLaunch && <LaunchScreen onDone={() => setLaunchDone(true)} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: "#0C1218", alignItems: "center" },
  frame: { flex: 1, width: "100%", maxWidth: 480, overflow: "hidden", backgroundColor: "#152833" },
});
