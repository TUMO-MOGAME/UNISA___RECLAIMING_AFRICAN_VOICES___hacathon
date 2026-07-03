// Pre-generate cinematic scene imagery with Gemini and cache it as local bundled assets. Run OFFLINE
// (build time) — never at runtime (the key is build-time-only; image gen costs quota). Output:
//   · assets/generated/<moduleId>-<sceneId>.png
//   · src/content/images.generated.ts  (manifest the app reads; falls back to Pollinations if absent)
//
//   Set GEMINI_API_KEY in app/.env, then:
//     npm run gen:images            # just the 4 hero images (cheap)
//     npm run gen:images -- --all   # every scene in every module
//
// Integrity: these are AI artistic interpretations (labelled as such in the Reader). Do NOT use this
// to fabricate photoreal portraits of the real named authors.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { geminiGenerateImage, DEFAULT_IMAGE_MODEL } from "../src/services/images/gemini.ts";
import { mhudi } from "../src/content/mhudi.ts";
import { ityalaLamawele } from "../src/content/ityala-lamawele.ts";
import { indaba } from "../src/content/indaba.ts";
import { vilakazi } from "../src/content/vilakazi.ts";
import { unsungHeroes } from "../src/content/unsung-heroes.ts";
import { marriageRites } from "../src/content/marriage-rites.ts";
import { peoplingOfSa } from "../src/content/peopling-of-sa.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, "..");

// load app/.env
const envPath = resolve(appDir, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const apiKey = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_IMAGE_MODEL || DEFAULT_IMAGE_MODEL;
if (!apiKey) {
  console.error("Missing GEMINI_API_KEY (set it in app/.env). Aborting.");
  process.exit(1);
}

const ALL = process.argv.includes("--all");
const STYLE =
  "cinematic, warm golden natural light, rich earthy colour, dignified African subjects, " +
  "photorealistic documentary style, painterly depth, no text, no watermark";

const modules = [
  mhudi, ityalaLamawele, indaba, vilakazi,
  unsungHeroes, marriageRites, peoplingOfSa,
];
const outDir = resolve(appDir, "assets", "generated");
mkdirSync(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const ext = (mime) => (mime.includes("jpeg") || mime.includes("jpg") ? "jpg" : "png");

const FORCE = process.argv.includes("--force");
const manifest = {};
let ok = 0;
let failed = 0;
let skipped = 0;

// Find an already-generated file for this scene (png or jpg), so re-runs are idempotent and don't
// burn Gemini quota regenerating art that already exists. Pass --force to regenerate everything.
const existingFor = (id) =>
  ["png", "jpg"].map((e) => `${id}.${e}`).find((f) => existsSync(resolve(outDir, f)));

for (const mod of modules) {
  const scenes = ALL ? mod.scenes : mod.scenes.slice(0, 1);
  for (const scene of scenes) {
    const base = `${mod.id}-${scene.id}`;
    const have = FORCE ? null : existingFor(base);
    if (have) {
      manifest[`${mod.id}:${scene.id}`] = `../../assets/generated/${have}`;
      skipped++;
      console.log(`  • ${mod.id}/${scene.id} -> cached (${have})`);
      continue;
    }
    const prompt = `${scene.imagePrompt}. ${STYLE}`;
    try {
      const img = await geminiGenerateImage({ prompt, apiKey, model });
      const file = `${base}.${ext(img.mimeType)}`;
      writeFileSync(resolve(outDir, file), Buffer.from(img.base64, "base64"));
      manifest[`${mod.id}:${scene.id}`] = `../../assets/generated/${file}`;
      ok++;
      console.log(`  ✓ ${mod.id}/${scene.id} -> assets/generated/${file}`);
    } catch (e) {
      failed++;
      console.warn(`  ✗ ${mod.id}/${scene.id}: ${e.message}`);
    }
    await sleep(500);
  }
}

// Write the manifest module with static require()s so Metro bundles the assets.
const entries = Object.entries(manifest)
  .map(([k, p]) => `  ${JSON.stringify(k)}: require(${JSON.stringify(p)}),`)
  .join("\n");
const out = `// GENERATED FILE — do not edit by hand. Regenerate: npm run gen:images
// Maps "<moduleId>:<sceneId>" -> a bundled local image asset (Gemini). AI interpretations, labelled
// as such in the Reader — never real photos.
export const GENERATED_IMAGES: Record<string, number> = {
${entries}
};
`;
writeFileSync(resolve(appDir, "src", "content", "images.generated.ts"), out, "utf8");

console.log(
  `\nDone: ${ok} written, ${skipped} cached, ${failed} failed → src/content/images.generated.ts`
);
