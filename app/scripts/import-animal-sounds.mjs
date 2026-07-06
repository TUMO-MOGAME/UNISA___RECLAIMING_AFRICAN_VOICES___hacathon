// Import the curated animal sounds (design/Animals sounds/) into the app, WEB-OPTIMIZED so they load
// fast: mono, trimmed to ~6s with a short fade (matches the story's slide pace), ~96kbps mp3. Any animal
// with no curated file keeps its existing ElevenLabs-generated sound (see generate-animal-sounds.mjs).
//
// One-time build step: the source folder is not committed, but the compressed results in
// assets/animals/sounds/ are what ship. Requires ffmpeg on PATH.
//
//   npm run import:sounds
//   AUDIO_SRC="/path/to/Animals sounds" npm run import:sounds   # override source folder

import { existsSync, mkdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, "..");
const OUT = resolve(APP, "assets/animals/sounds");
const SRC = process.env.AUDIO_SRC || resolve(APP, "../design/Animals sounds");

// id → curated source filename. Animals not listed (e.g. duiker) keep their existing sound.
// crocodile uses the closest available recording ("Alligator sounds") — same family of bellows/hisses.
const MAP = {
  lion: "Lion Roar Sound Effect.mp3",
  leopard: "Leopard.mp3",
  crocodile: "Alligator sounds.mp3",
  elephant: "Elephant.mp3",
  porcupine: "NOISE OF PORCUPINE.mp3",
  "vervet-monkey": "Vervet Monkey.mp3",
  baboon: "The Baboon Bark.mp3",
  kudu: "Garter kudu sound.mp3",
  eland: "Giant eland sound.mp3",
  zebra: "Zebra.mp3",
  fish: "Fish.mp3",
  aardvark: "Aardvark Sound.mp3",
  "wild-pig": "Warthog Sound.mp3",
  buffalo: "buffalo sound.mp3",
  "sacred-python": "snake hiss sound.mp3",
  beetle: "beetle sound.mp3",
  owl: "owl.mp3",
  rat: "Rat Sound.mp3",
  rabbit: "Rabbit.mp3",
  "scaly-finch": "Scaly.mp3",
  bees: "Honey bee sound.mp3",
};

mkdirSync(OUT, { recursive: true });
if (!existsSync(SRC)) {
  console.error(`\n✖ Source folder not found: ${SRC}\n  Set AUDIO_SRC to the curated "Animals sounds" folder.\n`);
  process.exit(1);
}

let done = 0,
  missing = 0,
  failed = 0;
for (const [id, file] of Object.entries(MAP)) {
  const src = join(SRC, file);
  if (!existsSync(src)) {
    missing++;
    console.log(`  · ${id} — no “${file}”, keeping existing sound`);
    continue;
  }
  const out = join(OUT, `${id}.mp3`);
  const r = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i", src,
      "-t", "6", // cap length — a slide dwells ~6.5s; keeps files tiny + web-fast
      "-af", "afade=t=out:st=5.6:d=0.4", // gentle fade so a trimmed clip never cuts abruptly
      "-ac", "1", // mono
      "-ar", "44100",
      "-b:a", "96k",
      out,
    ],
    { encoding: "utf8" }
  );
  if (r.status !== 0) {
    failed++;
    console.error(`  ✖ ${id} — ffmpeg failed: ${(r.stderr || "").slice(-200)}`);
    continue;
  }
  done++;
  console.log(`  ✔ ${id} ← ${file}  (${(statSync(out).size / 1024).toFixed(0)}KB)`);
}
console.log(`\nDone: ${done} imported, ${missing} kept-existing, ${failed} failed → ${OUT}`);
if (failed) process.exit(1);
