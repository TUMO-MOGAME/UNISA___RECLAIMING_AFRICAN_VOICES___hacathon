// Maloba palette — "Modern South Africa" deck identity: deep navy + strong blue section grounds,
// bright YELLOW accent, huge white Helvetica-grotesk headlines, full-colour photo blocks. Single
// source of truth for colour/spacing/type. The old semantic keys are preserved and repointed so the
// whole app inherits the new look; new code should prefer the `ds*` (design-system) tokens below.

export const colors = {
  // ── "Modern South Africa" landing-page palette (sa-blue / sa-slate) ────────────────────
  dsBlue: "#1A85A7", // sa-blue — the accent + blue section ground
  dsBlueDeep: "#156D8A", // pressed / deeper blue (hover)
  dsSlate: "#233342", // sa-slate — dark section ground
  dsNavy: "#233342", // alias → slate is the dark ground
  dsNavyDeep: "#1A2732", // deeper slate (footer/bands)
  dsCloud: "#F8FAFC", // slate-50 light sections
  dsWhite: "#FFFFFF",
  dsInk: "#1A2732",
  dsGray: "#94A3B8", // gray-300/400 muted text on dark
  // legacy accent alias kept so nothing breaks; now points to blue
  dsYellow: "#1A85A7",
  dsYellowText: "#1A85A7",

  // ── Legacy semantic keys, repointed to the sa-blue/sa-slate palette (existing screens inherit) ──
  paper: "#233342", // slate ground
  paperCard: "#2C3E50", // elevated block on slate
  paperLine: "rgba(255,255,255,0.16)",
  navy: "#233342",
  navyDeep: "#1A2732",
  orange: "#1A85A7", // primary accent → sa-BLUE now
  gold: "#1A85A7", // secondary accent → blue
  slate: "rgba(255,255,255,0.72)",

  night: "#233342",
  ink: "#1A2732",
  card: "#2C3E50",
  sand: "#FFFFFF",
  ember: "#1A85A7",
  muted: "rgba(255,255,255,0.66)",
  scrim: "rgba(26,39,50,0.55)",
  scrimStrong: "rgba(26,39,50,0.82)",

  line: "rgba(255,255,255,0.16)",
  lineStrong: "rgba(255,255,255,0.32)",
  glowEmber: "rgba(26,133,167,0.14)",
  glowGold: "rgba(26,133,167,0.12)",

  bg: "#233342",
  bgDeep: "#1A2732",
  bgTop: "#2A3D4E",
  surface: "#2C3E50",
  surface2: "#2C3E5000",
  hairline: "rgba(255,255,255,0.16)",
  hairlineSoft: "rgba(255,255,255,0.09)",
  orangeDeep: "#156D8A",
  cream: "#FFFFFF",
  creamDim: "rgba(255,255,255,0.86)",
  live: "#3FBF6A",
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const radius = { sm: 8, md: 16, lg: 24, pill: 999 };
export const type = {
  display: 30,
  title: 22,
  body: 17,
  small: 13,
};

// Type — the "Modern South Africa" deck uses ONE Helvetica-style grotesk throughout, with weight +
// size for hierarchy (huge black headlines, medium body). We match it with Inter (bundled, offline).
// Keys are stable so components never hardcode a font name — the whole app inherits this pairing.
// The old serif keys are repointed to grotesk weights (the deck has no serif).
export const fonts = {
  // Headings → Montserrat (the deck/landing-page heading font); body → Inter.
  display: "Montserrat_900Black", // huge hero headlines ("South Africa")
  displaySemi: "Montserrat_800ExtraBold", // section headings
  heading: "Montserrat_700Bold", // sub-headings
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemi: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
  // No serif — repointed to Montserrat/Inter so existing screens stay consistent.
  serifBody: "Inter_400Regular",
  serif: "Montserrat_700Bold",
  serifSemi: "Montserrat_800ExtraBold",
  serifItalic: "Inter_500Medium",
};

// Standard motion durations (ms) — keep transitions consistent and calm.
export const motion = { fast: 150, base: 240, slow: 400 };
