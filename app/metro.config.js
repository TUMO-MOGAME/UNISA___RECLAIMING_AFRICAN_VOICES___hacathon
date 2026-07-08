// Extend Expo's default Metro config to bundle .webm assets (the journey walk-cycle animation).
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);
for (const ext of ["webm", "mp4"]) {
  if (!config.resolver.assetExts.includes(ext)) config.resolver.assetExts.push(ext);
}

module.exports = config;
