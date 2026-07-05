// Pre-cache the reader's Pollinations scene images as bundled webp assets. Run OFFLINE (build
// time). This does NOT create new imagery: Pollinations is deterministic for prompt+seed+size, so
// each fetch is byte-for-byte the SAME picture the app already renders at runtime — we just bundle
// it so stories open instantly instead of black-screening while flux generates live.
//
// Complements gen:images (Gemini): anything already in images.generated.ts is kept as-is; only
// missing scenes are fetched here. Output:
//   · assets/generated/<moduleId>-<sceneId>.webp
//   · src/content/images.generated.ts  (manifest, rewritten with the union)
//
//   npm run cache:images

import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { mhudi } from "../src/content/mhudi.ts";
import { ityalaLamawele } from "../src/content/ityala-lamawele.ts";
import { indaba } from "../src/content/indaba.ts";
import { vilakazi } from "../src/content/vilakazi.ts";
import { unsungHeroes } from "../src/content/unsung-heroes.ts";
import { marriageRites } from "../src/content/marriage-rites.ts";
import { peoplingOfSa } from "../src/content/peopling-of-sa.ts";
import { peoplesCultures } from "../src/content/peoples-cultures.ts";
import { traditions } from "../src/content/traditions.ts";
import { food } from "../src/content/food.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, "..");
const outDir = resolve(appDir, "assets/generated");
const manifestPath = resolve(appDir, "src/content/images.generated.ts");

const modules = [mhudi, ityalaLamawele, indaba, vilakazi, unsungHeroes, marriageRites, peoplingOfSa, peoplesCultures, traditions, food];

// Identical URL construction to src/services/pollinations.ts (same prompt, seed, default 1024²).
function sceneImageUrl(prompt, seed) {
  const p = encodeURIComponent(prompt);
  const s = seed != null ? `&seed=${seed}` : "";
  return `https://image.pollinations.ai/prompt/${p}?model=flux&width=1024&height=1024${s}&nologo=true`;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let written = 0, cached = 0, failed = 0;
const entries = [];

for (const mod of modules) {
  for (const scene of mod.scenes) {
    const key = `${mod.id}:${scene.id}`;
    const file = `${mod.id}-${scene.id}.webp`;
    const outPath = resolve(outDir, file);
    if (existsSync(outPath)) {
      entries.push([key, file]);
      cached++;
      console.log(`  • ${key} -> cached (${file})`);
      continue;
    }
    const url = sceneImageUrl(scene.imagePrompt, scene.seed);
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(120000) });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        if (buf.length < 10000) throw new Error(`suspiciously small (${buf.length}B)`);
        await sharp(buf).webp({ quality: 80 }).toFile(outPath);
        entries.push([key, file]);
        written++;
        ok = true;
        console.log(`  ✓ ${key} (${buf.length} -> webp)`);
      } catch (e) {
        if (attempt === 3) {
          failed++;
          console.log(`  ✗ ${key}: ${e.message}`);
        } else {
          await sleep(4000 * attempt);
        }
      }
    }
    await sleep(1500); // be polite to the free tier
  }
}

const lines = entries.map(([key, file]) => `  "${key}": require("../../assets/generated/${file}"),`);
writeFileSync(
  manifestPath,
  `// GENERATED FILE — do not edit by hand. Regenerate: npm run gen:images / npm run cache:images
// Maps "<moduleId>:<sceneId>" -> a bundled local image asset (Gemini or cached Pollinations).
// AI interpretations, labelled as such in the Reader — never real photos.
export const GENERATED_IMAGES: Record<string, number> = {
${lines.join("\n")}
};
`
);
console.log(`\nDone: ${written} fetched, ${cached} already cached, ${failed} failed -> images.generated.ts (${entries.length} entries)`);
