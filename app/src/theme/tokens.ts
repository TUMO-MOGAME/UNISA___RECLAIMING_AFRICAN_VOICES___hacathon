// The cinematic look — baobab dusk palette. Single source of truth for colour/spacing/type.
// (Phase 1 migrates these into NativeWind / Tailwind theme — see specs/tasks.md T006–T007.)

export const colors = {
  night: "#0E0B07",
  ink: "#1A1410",
  card: "#241B12",
  sand: "#F4E9D8",
  gold: "#E8A53D",
  ember: "#C8552B",
  muted: "#B9A88F",
  scrim: "rgba(10,7,4,0.55)",
  scrimStrong: "rgba(10,7,4,0.78)",
};

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };
export const radius = { sm: 8, md: 16, lg: 24, pill: 999 };
export const type = {
  display: 30,
  title: 22,
  body: 17,
  small: 13,
};
