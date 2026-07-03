// Maloba palette — "Modern South Africa" deck identity: deep navy + strong blue section grounds,
// bright YELLOW accent, huge white Helvetica-grotesk headlines, full-colour photo blocks. Single
// source of truth for colour/spacing/type. The old semantic keys are preserved and repointed so the
// whole app inherits the new look; new code should prefer the `ds*` (design-system) tokens below.

export const colors = {
  // ── "Modern South Africa" deck palette (the new brand) ────────────────────────────────
  dsNavy: "#152833", // primary dark section ground
  dsNavyDeep: "#0C1218", // near-black bands (top/bottom, footers)
  dsBlue: "#1878A8", // strong blue alternate-section ground
  dsBlueDeep: "#125E85", // pressed / deeper blue
  dsYellow: "#F2C230", // the accent — lead lines, ▶ triangles, highlights
  dsYellowText: "#F6C945", // yellow when used as text on dark
  dsInk: "#0C1218",
  dsCloud: "#F4F5F6", // light footer / inverse band
  dsWhite: "#FFFFFF",

  // ── Legacy semantic keys, repointed to the deck palette (so existing screens inherit it) ──
  paper: "#152833", // was cream → now navy ground
  paperCard: "#1B303D", // elevated block on navy
  paperLine: "rgba(255,255,255,0.16)",
  navy: "#152833",
  navyDeep: "#0C1218",
  orange: "#F2C230", // primary accent → YELLOW now
  gold: "#F6C945", // secondary accent → yellow
  slate: "rgba(255,255,255,0.62)",

  night: "#152833",
  ink: "#0C1218",
  card: "#1B303D",
  sand: "#FFFFFF", // light text on dark → pure white (deck headlines are white)
  ember: "#F2C230",
  muted: "rgba(255,255,255,0.6)",
  scrim: "rgba(12,18,24,0.55)",
  scrimStrong: "rgba(12,18,24,0.82)",

  line: "rgba(255,255,255,0.16)",
  lineStrong: "rgba(255,255,255,0.32)",
  glowEmber: "rgba(242,194,48,0.14)",
  glowGold: "rgba(242,194,48,0.12)",

  bg: "#152833",
  bgDeep: "#0C1218",
  bgTop: "#1A2F3B",
  surface: "#1B303D", // card surface on navy
  surface2: "#20394700", // (kept for compat)
  hairline: "rgba(255,255,255,0.16)",
  hairlineSoft: "rgba(255,255,255,0.09)",
  orangeDeep: "#D9A81E",
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
  display: "Inter_900Black", // huge headline weight (the "South Africa" display)
  displaySemi: "Inter_800ExtraBold", // strong titles / section headers
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemi: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
  // No serif in the deck — these are repointed to grotesk so existing screens stay consistent.
  serifBody: "Inter_400Regular",
  serif: "Inter_600SemiBold",
  serifSemi: "Inter_700Bold",
  serifItalic: "Inter_500Medium",
};

// Standard motion durations (ms) — keep transitions consistent and calm.
export const motion = { fast: 150, base: 240, slow: 400 };
