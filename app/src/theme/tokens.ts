// Maloba palette — "Modern South Africa" deck identity: deep navy + strong blue section grounds,
// bright YELLOW accent, huge white Helvetica-grotesk headlines, full-colour photo blocks. Single
// source of truth for colour/spacing/type. The old semantic keys are preserved and repointed so the
// whole app inherits the new look; new code should prefer the `ds*` (design-system) tokens below.

export const colors = {
  // ── Pure-black ground. sa-blue stays ONLY as a foreground accent (rules, links, icons) — never
  //    as a background fill. Every "ground" token is #000; elevated surfaces are a hair-lifted
  //    near-black so cards stay distinguishable on black. ────────────────────
  dsBlue: "#1A85A7", // sa-blue — accent only (text, rules, icons), not a background
  dsBlueDeep: "#156D8A", // pressed / deeper blue (hover)
  dsSlate: "#000000", // ground → pure black
  dsNavy: "#000000", // ground → pure black
  dsNavyDeep: "#000000", // deepest ground (footer/bands) → pure black
  dsCloud: "#F8FAFC", // light accent (rarely used as a full ground now)
  dsWhite: "#FFFFFF",
  dsInk: "#000000",
  dsGray: "#94A3B8", // gray-300/400 muted text on black
  // legacy accent alias kept so nothing breaks; points to blue accent
  dsYellow: "#1A85A7",
  dsYellowText: "#1A85A7",

  // ── Legacy semantic keys, repointed to the pure-black ground (existing screens inherit) ──
  paper: "#000000", // ground → pure black
  paperCard: "#141414", // elevated block on black
  paperLine: "rgba(255,255,255,0.16)",
  navy: "#000000",
  navyDeep: "#000000",
  orange: "#1A85A7", // primary accent → sa-BLUE (foreground only)
  gold: "#1A85A7", // secondary accent → blue (foreground only)
  slate: "rgba(255,255,255,0.72)",

  night: "#000000",
  ink: "#000000",
  card: "#141414",
  sand: "#FFFFFF",
  ember: "#1A85A7",
  muted: "rgba(255,255,255,0.66)",
  scrim: "rgba(0,0,0,0.55)",
  scrimStrong: "rgba(0,0,0,0.82)",

  line: "rgba(255,255,255,0.16)",
  lineStrong: "rgba(255,255,255,0.32)",
  glowEmber: "transparent", // no coloured glow wash
  glowGold: "transparent", // no coloured glow wash

  bg: "#000000",
  bgDeep: "#000000",
  bgTop: "#000000",
  surface: "#141414",
  surface2: "#00000000",
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
