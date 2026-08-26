// One-off: marker-guided Gemini edit — red box around the streak artifact, ask for removal.
// Run from app/: node scripts/fix-heroes-card.mjs
import sharp from "sharp";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const appDir = process.cwd();
for (const line of readFileSync(resolve(appDir, ".env"), "utf8").split(/\r?\n/)) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
const apiKey = process.env.GEMINI_API_KEY || process.env.EXPO_PUBLIC_GEMINI_API_KEY;

const src = resolve(appDir, "assets/generated/heroes-heroines-card-v1.webp");
const meta = await sharp(src).metadata();
const W = meta.width, H = meta.height;
// Red box around the streak: ~x 36-40%, y 16-47%
const bx = Math.round(W * 0.355), by = Math.round(H * 0.15);
const bw = Math.round(W * 0.055), bh = Math.round(H * 0.34);
const svg = `<svg width="${W}" height="${H}"><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="none" stroke="red" stroke-width="6"/></svg>`;
const marked = await sharp(src).composite([{ input: Buffer.from(svg) }]).png().toBuffer();

const INSTRUCTION =
  "Inside the red rectangle there is a thin vertical light streak artifact crossing the dark teal " +
  "background and the upper-left arc of the thin golden circle. Erase the streak completely and " +
  "seamlessly restore the smooth dark teal background and the unbroken golden circle arc. Then " +
  "remove the red rectangle marker itself. Keep everything else in the image exactly identical.";

const res = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${encodeURIComponent(apiKey)}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [
        { inlineData: { mimeType: "image/png", data: marked.toString("base64") } },
        { text: INSTRUCTION },
      ] }],
      generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "4:3" } },
    }),
  }
);
if (!res.ok) { console.error(`Gemini ${res.status}: ${(await res.text()).slice(0, 400)}`); process.exit(1); }
const json = await res.json();
let b64 = null;
for (const c of json.candidates ?? [])
  for (const p of c?.content?.parts ?? []) {
    const inline = p?.inlineData ?? p?.inline_data;
    if (inline?.data && !b64) b64 = inline.data;
  }
if (!b64) { console.error("No image: " + JSON.stringify(json).slice(0, 400)); process.exit(1); }

const png = Buffer.from(b64, "base64");
await sharp(png).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 82 })
  .toFile(resolve(appDir, "assets/generated/heroes-heroines-card.webp"));
await sharp(png).resize({ width: 684 }).jpeg({ quality: 80 })
  .toFile(process.argv[2] || resolve(appDir, "heroes-fix-preview.jpg"));
console.log("saved");
