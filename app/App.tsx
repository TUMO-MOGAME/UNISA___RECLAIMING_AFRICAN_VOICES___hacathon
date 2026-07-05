import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet, BackHandler, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
import { AtlasScreen } from "./src/components/AtlasScreen";
import { ProvincesScreen, ProvinceScreen, CityScreen } from "./src/components/ProvincesScreens";
import { provinceById, cityById } from "./src/content/provinces";
import { PresidentsScreen, PresidentScreen } from "./src/components/PresidentsScreens";
import { presidentById } from "./src/content/presidents";
import { NationalDaysScreen } from "./src/components/NationalDaysScreen";
import { Fade } from "./src/components/Motion";
import { moduleById } from "./src/content";
import { DEFAULT_LANG } from "./src/i18n";
import { Lang } from "./src/content/types";

// Lightweight in-app navigation (no router dependency). Language is shared app-wide.

// Web: harden the page frame beyond Expo's default reset — zero body margins, full-width root,
// black backdrop and no horizontal overflow. Guarantees no screen can ever show a pale rim, a
// side gap, or a stray horizontal scrollbar (e.g. from Ken Burns scale) on any browser size.
if (Platform.OS === "web" && typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent =
    "html,body{margin:0;padding:0;width:100%;height:100%;background:#000;overflow-x:hidden}" +
    "#root{width:100%;min-height:100%;background:#000}";
  document.head.appendChild(style);
}

type Route =
  | { name: "home" }
  | { name: "reader"; id: string }
  | { name: "atlas" }
  | { name: "about" }
  | { name: "archive" }
  | { name: "heritage" }
  | { name: "provinces" }
  | { name: "province"; id: string }
  | { name: "city"; id: string }
  | { name: "presidents" }
  | { name: "president"; id: string }
  | { name: "days" };

export default function App() {
  // Default language is always English (the guaranteed base for every string); the picker switches it
  // app-wide, and any language without reviewed copy honestly falls back to English (see i18n/localize).
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  // Route HISTORY (not a single route): push to navigate, pop to go back — so Back always returns
  // to where the user actually came from (e.g. Reader→Atlas, City→Province, Archive→President).
  const [stack, setStack] = useState<Route[]>([{ name: "home" }]);
  const route = stack[stack.length - 1];
  // Ignore a double-tap pushing the same route twice (it would make the first Back look dead).
  const push = (r: Route) =>
    setStack((s) => {
      const top = s[s.length - 1];
      const idOf = (x: Route) => ("id" in x ? x.id : undefined);
      if (top.name === r.name && idOf(top) === idOf(r)) return s;
      return [...s, r];
    });
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  // Android hardware/gesture back pops the in-app route stack instead of exiting the app.
  // Only handled while there is somewhere to go back to, so back on Home still exits normally.
  // (BackHandler is a web no-op that logs an error, hence the platform guard.)
  useEffect(() => {
    if (Platform.OS === "web") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (stack.length > 1) {
        back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stack.length]);

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
  // Don't let a font-loading failure (e.g. offline) block rendering.
  const ready = fontsLoaded || !!fontError;

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
          <CinematicReader module={m} lang={lang} onLangChange={setLang} onBack={back} onArchive={() => push({ name: "archive" })} />
        ) : null;
      }
      case "atlas":
        return <AtlasScreen lang={lang} onBack={back} onOpen={(id) => push({ name: "reader", id })} />;
      case "about":
        return <AboutSourcesScreen lang={lang} onBack={back} />;
      case "archive":
        return <ArchiveScreen lang={lang} onBack={back} />;
      case "heritage":
        return <HeritageLedgerScreen lang={lang} onBack={back} />;
      case "provinces":
        return <ProvincesScreen onBack={back} onOpenProvince={(id) => push({ name: "province", id })} lang={lang} />;
      case "province": {
        const p = provinceById(route.id);
        return p ? <ProvinceScreen province={p} onBack={back} onOpenCity={(id) => push({ name: "city", id })} lang={lang} /> : null;
      }
      case "city": {
        const c = cityById(route.id);
        return c ? <CityScreen city={c} onBack={back} onArchive={() => push({ name: "archive" })} lang={lang} /> : null;
      }
      case "presidents":
        return <PresidentsScreen onBack={back} onOpen={(id) => push({ name: "president", id })} lang={lang} />;
      case "president": {
        const pr = presidentById(route.id);
        return pr ? <PresidentScreen president={pr} onBack={back} onArchive={() => push({ name: "archive" })} lang={lang} /> : null;
      }
      case "days":
        return <NationalDaysScreen onBack={back} lang={lang} />;
      default:
        return (
          <HomeGallery
            lang={lang}
            onLangChange={setLang}
            onOpen={(id) => push({ name: "reader", id })}
            onAbout={() => push({ name: "about" })}
            onArchive={() => push({ name: "archive" })}
            onHeritage={() => push({ name: "heritage" })}
            onProvinces={() => push({ name: "provinces" })}
            onPresidents={() => push({ name: "presidents" })}
            onAtlas={() => push({ name: "atlas" })}
            onDays={() => push({ name: "days" })}
          />
        );
    }
  }

  // Home + Reader are full-bleed (hero image / immersive reader); every other screen is a content
  // page that reads better as a centred column on wide screens instead of stretching edge-to-edge.
  // These pages use the full-width two-pane "index" layout (SideIndexScroll); the rest stay centred.
  const fullBleed =
    route.name === "home" ||
    route.name === "reader" ||
    route.name === "atlas" ||
    route.name === "provinces" ||
    route.name === "presidents" ||
    route.name === "president" || // wide layout: important-dates sidebar + content
    route.name === "days";

  return (
    <SafeAreaProvider>
      <View style={styles.app}>
        <StatusBar style="light" />
        {/* Full-bleed on web — the app fills the whole viewport like a website. Content screens are
            centred to a readable max-width; the hero/reader fill the screen. */}
        <View style={styles.frame}>
          {ready && (
            <Fade key={routeKey} style={{ flex: 1 }}>
              {fullBleed ? (
                renderRoute()
              ) : (
                <View style={styles.centerWrap}>
                  <View style={styles.centerInner}>{renderRoute()}</View>
                </View>
              )}
            </Fade>
          )}
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: "#000000" },
  frame: { flex: 1, width: "100%", backgroundColor: "#000000" },
  // Content screens: full-width slate ground, content centred to a readable column.
  centerWrap: { flex: 1, width: "100%", alignItems: "center", backgroundColor: "#000000" },
  centerInner: { flex: 1, width: "100%", maxWidth: 900, backgroundColor: "#000000" },
});
