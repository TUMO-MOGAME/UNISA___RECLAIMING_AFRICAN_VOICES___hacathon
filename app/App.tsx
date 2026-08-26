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
import { TotemsScreen } from "./src/components/TotemsScreen";
import { HeroesScreen, HeroScreen } from "./src/components/HeroesScreens";
import { heroById } from "./src/content/heroes";
import { Fade } from "./src/components/Motion";
import { ChatbotWidget } from "./src/components/ChatbotWidget";
import { moduleById } from "./src/content";
import { DEFAULT_LANG } from "./src/i18n";
import { Lang } from "./src/content/types";
import { AppShell, type ShellMode } from "./src/components/shell/AppShell";
import { ComingSoon } from "./src/components/shell/ComingSoon";
import { CountriesScreen } from "./src/components/CountriesScreen";
import { WatchScreen } from "./src/components/WatchScreen";
import type { NavId } from "./src/components/shell/nav";
import { DEFAULT_COUNTRY } from "./src/content/anthems";
import { useProgress } from "./src/services/progress/useProgress";

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
  | { name: "days" }
  | { name: "totems" }
  | { name: "heroes" }
  | { name: "hero"; id: string }
  // ── Architecture v2 rooms (docs/13-architecture-v2-plan.md §4) ──
  | { name: "countries" }
  | { name: "watch" }
  | { name: "watchItem"; id: string }
  | { name: "journey" }
  | { name: "stage"; id: string }
  | { name: "kids" }
  | { name: "kidsStage"; id: string }
  | { name: "schools" }
  | { name: "passport" };

// Route-name groupings for the shell. Deliberately `Set<string>` (see the note in App below).
const OWN_SCROLL = new Set(["home", "atlas", "provinces", "presidents", "president", "days", "totems", "heroes", "hero"]);
const ATLAS_ROOMS = new Set(["atlas", "provinces", "province", "city", "presidents", "president", "days", "totems", "heroes", "hero", "reader"]);
const ARCHIVE_ROOMS = new Set(["archive", "heritage", "about"]);
const ROOT_ROOMS = new Set(["home", "journey", "watch", "kids", "schools", "passport", "countries"]);

export default function App() {
  // Default language is always English (the guaranteed base for every string); the picker switches it
  // app-wide, and any language without reviewed copy honestly falls back to English (see i18n/localize).
  const [lang, setLang] = useState<Lang>(DEFAULT_LANG);
  // Selected country — moved out of the hero into the shell header (v2 D3), so it is shared app-wide
  // and the forthcoming /countries page can drive it too.
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  // Device-local progress (D5) — no account, no PII, never leaves the device.
  const progress = useProgress();
  // Route HISTORY (not a single route): push to navigate, pop to go back — so Back always returns
  // to where the user actually came from (e.g. Reader→Atlas, City→Province, Archive→President).
  const [stack, setStack] = useState<Route[]>([{ name: "home" }]);
  const route = stack[stack.length - 1];
  // A full-screen "dot story" (picture/film) is playing — hide the floating chatbot so it doesn't
  // sit over the film.
  const [storyActive, setStoryActive] = useState(false);
  // Ignore a double-tap pushing the same route twice (it would make the first Back look dead).
  const push = (r: Route) =>
    setStack((s) => {
      const top = s[s.length - 1];
      const idOf = (x: Route) => ("id" in x ? x.id : undefined);
      if (top.name === r.name && idOf(top) === idOf(r)) return s;
      return [...s, r];
    });
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  // The chatbot orchestrator: map a page id (from ChatbotWidget) to a real route. Literary + atlas
  // topics are module ids and open in the Reader; the rest are named sections.
  const navigateTo = (pageId: string) => {
    switch (pageId) {
      case "home":
        setStack([{ name: "home" }]);
        break;
      case "atlas":
      case "provinces":
      case "presidents":
      case "days":
      case "totems":
      case "heroes":
      case "archive":
      case "heritage":
      case "about":
      case "countries":
      case "watch":
      case "journey":
      case "kids":
      case "schools":
      case "passport":
        push({ name: pageId } as Route);
        break;
      default:
        if (moduleById(pageId)) push({ name: "reader", id: pageId });
        else setStack([{ name: "home" }]);
    }
  };

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
    route.name === "reader" || route.name === "province" || route.name === "city" || route.name === "president" || route.name === "hero"
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
        return (
          <AtlasScreen
            lang={lang}
            onBack={back}
            onOpen={(id) => push({ name: "reader", id })}
            onProvinces={() => push({ name: "provinces" })}
            onPresidents={() => push({ name: "presidents" })}
            onHeroes={() => push({ name: "heroes" })}
            onTotems={() => push({ name: "totems" })}
            onDays={() => push({ name: "days" })}
          />
        );
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
      case "totems":
        return <TotemsScreen onBack={back} lang={lang} />;
      case "heroes":
        return <HeroesScreen onBack={back} onOpen={(id) => push({ name: "hero", id })} lang={lang} />;
      case "hero": {
        const h = heroById(route.id);
        return h ? <HeroScreen hero={h} onBack={back} lang={lang} /> : null;
      }
      // The v2 rooms. Each is an honest placeholder naming what lands there and when, until its
      // real screen arrives in Weeks 2–3 — a live nav item must never be a dead link.
      case "watch":
        return (
          <WatchScreen
            lang={lang}
            progress={progress.progress}
            onOpen={(id) => push({ name: "reader", id })}
          />
        );
      case "journey":
      case "kids":
      case "schools":
      case "passport":
        return <ComingSoon room={route.name} lang={lang} onHome={() => setStack([{ name: "home" }])} />;
      case "countries":
        return (
          <CountriesScreen
            lang={lang}
            country={country}
            onChange={setCountry}
            onEnter={() => push({ name: "journey" })}
          />
        );
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
            onTotems={() => push({ name: "totems" })}
            onHeroes={() => push({ name: "heroes" })}
            onStoryActiveChange={setStoryActive}
          />
        );
    }
  }

  // ── Shell configuration (v2 §5) ────────────────────────────────────────
  // NOTE: these lists are plain `string[]`, and the route name is widened to `string` before any
  // lookup. Matching them against the Route union instead makes tsc walk the whole union per call
  // and blows its stack (the same recursion this file already guards elsewhere). Keep it as strings.
  //
  // "own"       — the route scrolls itself (its own ScrollView or SideIndexScroll two-pane layout).
  // "immersive" — no chrome: the Reader, a film, a dot-story fill the viewport.
  // "page"      — the shell scrolls it and appends the footer. Everything else.
  const name: string = route.name;
  const shellMode: ShellMode =
    name === "reader" ? "immersive" : OWN_SCROLL.has(name) ? "own" : "page";

  // Which nav item to mark. The Atlas rooms all belong to Atlas; the Trust screens to Archive.
  const activeNav: NavId | null = ATLAS_ROOMS.has(name)
    ? "atlas"
    : ARCHIVE_ROOMS.has(name)
      ? "archive"
      : ROOT_ROOMS.has(name)
        ? (name as NavId)
        : null;

  // Home's hero is full-bleed, so the header sits transparently on top of it rather than above it.
  const overHero = name === "home";

  const goto = (id: NavId) => {
    if (id === "home") setStack([{ name: "home" }]);
    else push({ name: id } as Route);
  };

  return (
    <SafeAreaProvider>
      <View style={styles.app}>
        <StatusBar style="light" />
        <View style={styles.frame}>
          {ready && (
            <AppShell
              mode={storyActive ? "immersive" : shellMode}
              lang={lang}
              onLangChange={setLang}
              country={country}
              onCountryChange={setCountry}
              active={activeNav}
              onNavigate={goto}
              overHero={overHero}
              cards={progress.progress.cards.length}
              onAbout={() => push({ name: "about" })}
              onHeritage={() => push({ name: "heritage" })}
            >
              <Fade key={routeKey} style={{ flex: 1 }}>
                {renderRoute()}
              </Fade>
            </AppShell>
          )}
        </View>
        {/* The conversational guide floats above every screen (answers only from site content; can
            navigate). Rendered outside the shell so it persists across navigation. */}
        {ready && !storyActive && <ChatbotWidget lang={lang} onNavigate={navigateTo} />}
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
