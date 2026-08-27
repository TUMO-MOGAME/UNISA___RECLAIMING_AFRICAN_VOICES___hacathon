// One-off: generate the Heroes & Heroines home-card image (map of SA + hero portraits).
// Run from the app/ directory so sharp resolves: node <this file>
import sharp from "sharp";
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const appDir = process.cwd();
const envPath = resolve(appDir, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}
const apiKey = process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY;
if (!apiKey) { console.error("Missing GEMINI_API_KEY in app/.env"); process.exit(1); }

const PROMPT =
  "A dignified heritage artwork for a section called Heroes and Heroines of South Africa. " +
  "In the center, a beautifully illustrated map of South Africa seen from above, its nine provinces " +
  "clearly outlined with thin golden border lines, the land rendered as a warm painterly landscape " +
  "of green escarpment, golden highveld grassland, red Kalahari sand and blue coastline, glowing " +
  "softly against a deep teal-charcoal background. Arranged around the map, four painted portrait " +
  "medallions framed in Ndebele geometric beadwork borders, showing dignified artistic portraits of " +
  "South African struggle heroes and heroines: Robert Sobukwe and Steve Biko on one side, and " +
  "Lilian Ngoyi and Winnie Madikizela-Mandela on the other side, each rendered as a sober, " +
  "respectful painted portrait, warm muted tones, honest and heroic but not idealized. " +
  "Painterly cinematic style, muted golds and earth tones, highly detailed, artistic interpretation, " +
  "clean balanced composition with no stray lines or frame artifacts, geographically faithful shape " +
  "of South Africa with Lesotho shown as an enclave, no text, no words, no labels, no logos.";

const model = "gemini-2.5-flash-image";
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }] }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "4:3" } },
    }),
  }
);
if (!res.ok) { console.error(`Gemini ${res.status}: ${(await res.text()).slice(0, 400)}`); process.exit(1); }
const json = await res.json();
let b64 = null;
for (const c of json.candidates ?? []) {
  for (const p of c?.content?.parts ?? []) {
    const inline = p?.inlineData ?? p?.inline_data;
    if (inline?.data) { b64 = inline.data; break; }
  }
  if (b64) break;
}
if (!b64) { console.error("No image in response: " + JSON.stringify(json).slice(0, 400)); process.exit(1); }

const png = Buffer.from(b64, "base64");
const out = resolve(appDir, "assets/generated/heroes-heroines-card.webp");
await sharp(png).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out);
const preview = process.argv[2];
if (preview) await sharp(png).resize({ width: 684 }).jpeg({ quality: 80 }).toFile(preview);
console.log("saved " + out);
