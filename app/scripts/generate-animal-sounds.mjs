// Pre-generate a short sound for each Totem animal with ElevenLabs' Sound Effects API — ONCE, at build
// time — and bundle the results. The app plays the bundled mp3s during the Totems "story"; it never
// calls the API at runtime (quota-protected, offline-safe). Idempotent: existing files are skipped
// unless you pass --force. These are AI-GENERATED sound interpretations, labelled as such in the UI.
//
//   Put ELEVENLABS_API_KEY in app/.env (build-time only — NOT EXPO_PUBLIC), then:
//     npm run gen:sounds            # generate any missing sounds
//     npm run gen:sounds -- --force # regenerate all
//
// Output: assets/animals/sounds/<id>.mp3

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, "..");
const OUT = resolve(APP, "assets/animals/sounds");
const force = process.argv.includes("--force");

// Load app/.env (simple parser, no dependency) so the key never needs to be exported globally.
const env = {};
const envPath = resolve(APP, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m) env[m[1]] = m[2];
  }
}
const KEY = process.env.ELEVENLABS_API_KEY || env.ELEVENLABS_API_KEY;
if (!KEY) {
  console.error("\n✖ Missing ELEVENLABS_API_KEY (set it in app/.env). See the header of this script.\n");
  process.exit(1);
}

// One evocative, realistic sound prompt per animal. Quiet species get an honest ambient cue
// (fish → water; python → hiss/slither) rather than an invented "voice".
const SOUNDS = [
  { id: "lion", prompt: "a lion roaring powerfully in the African savanna", seconds: 4 },
  { id: "leopard", prompt: "a leopard's low rasping saw-like growl at night", seconds: 4 },
  { id: "crocodile", prompt: "a Nile crocodile hissing and low growling by the water", seconds: 4 },
  { id: "elephant", prompt: "an African elephant trumpeting loudly", seconds: 4 },
  { id: "porcupine", prompt: "a porcupine rattling its quills and grunting", seconds: 3 },
  { id: "vervet-monkey", prompt: "vervet monkeys chattering and alarm-calling in the treetops", seconds: 4 },
  { id: "baboon", prompt: "a chacma baboon barking and grunting", seconds: 4 },
  { id: "duiker", prompt: "a small duiker antelope bleating and rustling through the bush", seconds: 3 },
  { id: "kudu", prompt: "a kudu antelope's sharp bark alarm call in the bushveld", seconds: 3 },
  { id: "eland", prompt: "an eland antelope's deep grunt with hooves on dry ground", seconds: 3 },
  { id: "zebra", prompt: "a zebra braying and whinnying on the open plains", seconds: 4 },
  { id: "fish", prompt: "gentle underwater bubbling with a fish breaking the water surface", seconds: 3 },
  { id: "aardvark", prompt: "an aardvark snuffling and digging in the earth at night", seconds: 3 },
  { id: "wild-pig", prompt: "a warthog grunting and snorting", seconds: 3 },
  { id: "buffalo", prompt: "an African buffalo bellowing and snorting in the herd", seconds: 4 },
  { id: "sacred-python", prompt: "a large python hissing and sliding over dry leaves", seconds: 3 },
  { id: "beetle", prompt: "a large beetle whirring its wings and clicking", seconds: 3 },
  { id: "owl", prompt: "an owl hooting softly in the night forest", seconds: 4 },
  { id: "rat", prompt: "a small rat squeaking and scurrying", seconds: 3 },
  { id: "rabbit", prompt: "a hare thumping the ground and rustling through grass", seconds: 3 },
  { id: "scaly-finch", prompt: "a small finch bird chirping and tweeting brightly", seconds: 4 },
  { id: "bees", prompt: "a swarm of bees buzzing busily around the hive", seconds: 4 },
];

mkdirSync(OUT, { recursive: true });

let made = 0,
  skipped = 0,
  failed = 0;
for (const { id, prompt, seconds } of SOUNDS) {
  const out = resolve(OUT, `${id}.mp3`);
  if (existsSync(out) && !force) {
    skipped++;
    console.log(`  · ${id} — exists, skipping`);
    continue;
  }
  try {
    const res = await fetch("https://api.elevenlabs.io/v1/sound-generation", {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ text: prompt, duration_seconds: seconds, prompt_influence: 0.5 }),
    });
    if (!res.ok) {
      failed++;
      console.error(`  ✖ ${id} — HTTP ${res.status}: ${(await res.text()).slice(0, 160)}`);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(out, buf);
    made++;
    console.log(`  ✔ ${id} — ${(buf.length / 1024).toFixed(0)}KB  “${prompt}”`);
  } catch (e) {
    failed++;
    console.error(`  ✖ ${id} — ${e?.message ?? e}`);
  }
}

console.log(`\nDone: ${made} generated, ${skipped} skipped, ${failed} failed → ${OUT}`);
if (failed) process.exit(1);
