// Extend Expo's default Metro config to bundle .webm assets (the journey walk-cycle animation).
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
for (const ext of ["webm", "mp4"]) {
  if (!config.resolver.assetExts.includes(ext)) config.resolver.assetExts.push(ext);
}

// ── Keep the web build output out of Metro's file map ────────────────────────────────────────────
//
// THIS IS NOT AN OPTIMISATION. `npm run build:web` writes ~269 MB across 565 files into `dist/`,
// inside the project root, and Metro crawls and watches everything under that root. There is no
// watchman on this machine, so Metro falls back to Node's own file watching — and on Windows, with
// that much media in the tree, `@expo/metro-file-map` times out with:
//
//     Failed to construct transformer: Error: Failed to start watch mode.
//
// A dev server that fails to start watch mode still SERVES. It just never notices a file changing
// again, so every edit you make is invisible until you restart it. That is not a loud failure — it
// looks exactly like your code not working, and it cost a day and a half of "why isn't my fix
// showing up" before the log was read properly.
//
// `dist/` is generated, gitignored, and never imported by the app, so nothing here needs to see it.
// The pattern is anchored to THIS project's dist — a bare /dist/ would also block every
// `node_modules/<pkg>/dist/...` the bundle genuinely depends on.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const projectDist = path.resolve(__dirname, "dist");
const blocked = [new RegExp(`^${escapeRe(projectDist)}([\\\\/]|$)`)];

const existing = config.resolver.blockList;
config.resolver.blockList = Array.isArray(existing)
  ? [...existing, ...blocked]
  : existing
    ? [existing, ...blocked]
    : blocked;

module.exports = config;
