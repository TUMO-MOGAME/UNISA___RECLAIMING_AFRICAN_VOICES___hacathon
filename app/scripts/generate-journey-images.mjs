// Pre-generate a cinematic, GROUNDED picture for a history-trail milestone (the "dot story" opens on
// this image before its video/description). Run OFFLINE (build time) — the Gemini key is build-time
// only and image gen costs quota. Output: app/assets/journey/<id>.webp.
//
//   Set GEMINI_API_KEY in app/.env, then:
//     npm run gen:journey-images            # only milestones missing an image
//     npm run gen:journey-images -- --force # regenerate all listed
//
// Integrity (humanities-grounding rule): these are DIGNIFIED artistic INTERPRETATIONS, labelled as
// such in the UI — never presented as historical photographs, and never a fabricated portrait of a
// real named person. Prompts stay grounded in the documented facts of each milestone.

import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { geminiGenerateImage } from "../src/services/images/gemini.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, "..");
const outDir = resolve(appDir, "assets/journey");

// Load app/.env
const envPath = resolve(appDir, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY in app/.env.");
  process.exit(1);
}

const force = process.argv.includes("--force");

// Grounded prompts, milestone id -> cinematic interpretation. Add more as the media lands.
const PROMPTS = {
  y1652:
    "A wide cinematic view of Table Bay at the Cape of Good Hope in the year 1652, three Dutch East " +
    "India Company sailing ships anchored on calm water beneath Table Mountain at dawn, a small earthen " +
    "fort and supply station under construction on the foreshore, indigenous Khoekhoe herders with their " +
    "cattle on the grassland in the foreground looking out toward the ships, sober and dignified " +
    "documentary tone, muted natural morning light, historically grounded, painterly cinematic, highly " +
    "detailed, artistic interpretation, no text, no logos, no modern elements",
};

mkdirSync(outDir, { recursive: true });

const ids = Object.keys(PROMPTS);
let ok = 0;
let skipped = 0;
let failed = 0;

for (const id of ids) {
  const out = resolve(outDir, `${id}.webp`);
  if (!force && existsSync(out)) {
    console.log(`· skip ${id} (exists)`);
    skipped++;
    continue;
  }
  try {
    console.log(`→ generating ${id}…`);
    const img = await geminiGenerateImage({ prompt: PROMPTS[id], apiKey });
    const png = Buffer.from(img.base64, "base64");
    await sharp(png).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
    console.log(`  ✓ ${id} → assets/journey/${id}.webp`);
    ok++;
  } catch (e) {
    console.warn(`  ✗ ${id}: ${e.message}`);
    failed++;
  }
}

console.log(`\nDone: ${ok} generated, ${skipped} skipped, ${failed} failed.`);
