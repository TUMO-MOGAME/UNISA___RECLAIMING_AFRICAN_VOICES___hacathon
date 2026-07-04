// Convert bundled raster assets to WebP for fast loading. Resizes oversized photos, writes .webp
// next to each source, then deletes the original. App icons/splash (app.json) are left as PNG —
// Expo requires those formats. Run: npm run webp
import sharp from "sharp";
import { readdirSync, existsSync, statSync, unlinkSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(__dirname, "..");

// dir → max width (photos can be smaller than AI art; both cap generously for retina phones/tablets)
const targets = [
  { dir: "assets/places", maxW: 1600, q: 78 },
  { dir: "assets/generated", maxW: 1280, q: 80 },
  { dir: "assets/brand", maxW: 1600, q: 80 },
];

let before = 0, after = 0, n = 0;
for (const { dir, maxW, q } of targets) {
  const abs = resolve(appDir, dir);
  if (!existsSync(abs)) continue;
  for (const f of readdirSync(abs)) {
    const ext = extname(f).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") continue;
    const src = join(abs, f);
    const out = src.replace(/\.(jpe?g|png)$/i, ".webp");
    const inSize = statSync(src).size;
    await sharp(src)
      .rotate()
      .resize({ width: maxW, withoutEnlargement: true })
      .webp({ quality: q })
      .toFile(out);
    const outSize = statSync(out).size;
    unlinkSync(src); // drop the original so we don't bundle both
    before += inSize; after += outSize; n++;
    console.log(`  ${f}  ${(inSize / 1024).toFixed(0)}KB -> ${(outSize / 1024).toFixed(0)}KB`);
  }
}
console.log(
  `\nDone: ${n} images → WebP. ${(before / 1e6).toFixed(1)}MB -> ${(after / 1e6).toFixed(1)}MB ` +
    `(${before ? Math.round((1 - after / before) * 100) : 0}% smaller).`
);
