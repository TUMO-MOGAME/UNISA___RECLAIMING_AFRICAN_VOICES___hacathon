// Maloba palette — modelled on the AADHIH "Reclaiming African Voices" brief: deep navy + burnt
// orange + gold on warm cream. Single source of truth for colour/spacing/type. Two worlds:
//  · "paper" (cream) for browse/chrome surfaces — the brief's dominant look.
//  · "night/navy" (dark) for immersive image surfaces (the Reader) where light text sits over photos.

export const colors = {
  // Brief identity — cream paper world
  paper: "#F4EEE1", // warm cream background
  paperCard: "#FFFFFF", // elevated cards on cream
  paperLine: "rgba(21,41,63,0.12)", // hairline rules on cream
  navy: "#16293F", // primary text + dark banners
  navyDeep: "#0E1C2E", // deepest navy
  orange: "#D96A1C", // primary accent (the "RECLAIMING" burnt orange)
  gold: "#EBA43C", // secondary accent / logo sun
  slate: "#5D6B79", // secondary text on cream

  // Immersive dark world (Reader over images) + shared accents
  night: "#0E1C2E", // dark surface (aligned to navyDeep)
  ink: "#16293F",
  card: "#1E344C",
  sand: "#F4EEE1", // light text on dark
  ember: "#D96A1C",
  muted: "#9FB0C0", // muted light text on dark
  scrim: "rgba(10,18,30,0.55)",
  scrimStrong: "rgba(10,18,30,0.8)",

  // Hairlines + atmospheric glows
  line: "rgba(244,238,225,0.16)",
  lineStrong: "rgba(244,238,225,0.32)",
  glowEmber: "rgba(217,106,28,0.22)",
  glowGold: "rgba(235,164,60,0.14)",
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const radius = { sm: 8, md: 16, lg: 24, pill: 999 };
export const type = {
  display: 30,
  title: 22,
  body: 17,
  small: 13,
};

// Type pairing modelled on the brief — Anton (heavy condensed, all-caps DISPLAY) for headlines +
// brand, Barlow (clean, slightly technical) for body & UI. Bundled via @expo-google-fonts (offline).
// Keys are stable so components never hardcode a font name — swap the pairing here, whole app updates.
export const fonts = {
  display: "Anton_400Regular", // big uppercase headlines + brand
  displaySemi: "Barlow_800ExtraBold", // strong titles (Anton is caps-only, this is for mixed case)
  body: "Barlow_400Regular",
  bodyMedium: "Barlow_500Medium",
  bodySemi: "Barlow_600SemiBold",
  bodyBold: "Barlow_700Bold",
};

// Standard motion durations (ms) — keep transitions consistent and calm.
export const motion = { fast: 150, base: 240, slow: 400 };
