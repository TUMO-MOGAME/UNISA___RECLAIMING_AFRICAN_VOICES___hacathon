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
// Integrity: these depict the EVENT/SCENE of each milestone, never a fabricated portrait of a real
// named person's face; sensitive events (Sharpeville, mourning) are kept sober and non-graphic.
const COMMON =
  " sober and dignified documentary tone, muted natural light, historically grounded, painterly " +
  "cinematic, highly detailed, artistic interpretation, no text, no logos, faces of real named " +
  "historical individuals not depicted";
const HISTORIC = COMMON + ", no modern elements";

const PROMPTS = {
  y1652:
    "A wide cinematic view of Table Bay at the Cape of Good Hope in the year 1652, three Dutch East " +
    "India Company sailing ships anchored on calm water beneath Table Mountain at dawn, a small earthen " +
    "fort and supply station under construction on the foreshore, indigenous Khoekhoe herders with their " +
    "cattle on the grassland in the foreground looking out toward the ships, sober and dignified " +
    "documentary tone, muted natural morning light, historically grounded, painterly cinematic, highly " +
    "detailed, artistic interpretation, no text, no logos, no modern elements",

  y1779:
    "The eastern Cape frontier in the late 1700s, a wide grassland of the Zuurveld at dusk, a line of " +
    "mounted colonial frontier commandos with muskets on one ridge and a group of amaXhosa warriors with " +
    "cowhide shields and long spears on the facing grassland, cattle between them, tension before " +
    "conflict over grazing land, wide landscape" + HISTORIC,

  y1806:
    "Table Bay in 1806, a British Royal Navy fleet of tall sailing warships at anchor, rows of red-coated " +
    "British soldiers wading ashore and forming up on the beach beneath Table Mountain, a colonial fort " +
    "in the distance, grey overcast morning light, the permanent British takeover of the Cape" + HISTORIC,

  y1816:
    "The rolling green hills of the Zulu kingdom in the early 1800s at sunrise, disciplined regiments of " +
    "Zulu warriors (amabutho) in formation with tall cowhide shields and iklwa spears, ceremonial ranks " +
    "seen from a respectful wide distance, a great cattle kraal below, the rise of a military kingdom" + HISTORIC,

  y1834:
    "The Great Trek, a long train of Voortrekker ox-wagons with white canvas covers crossing the vast " +
    "Drakensberg escarpment, teams of oxen straining up a mountain pass, families and outriders on " +
    "horseback, immense highveld landscape under a big sky, 1830s" + HISTORIC,

  y1838:
    "Dawn at the Ncome (Blood) River, December 1838, a defensive laager of Voortrekker ox-wagons chained " +
    "in a circle on the riverbank, mist rising off the water, the aftermath of a great battle, empty " +
    "trampled grassland, a sombre and reflective mood, wide landscape" + HISTORIC,

  y1867:
    "The Kimberley diamond diggings around 1870, the vast open Big Hole mine crowded with hundreds of " +
    "diggers on a spiderweb of ropes and stagings descending into the pit, dust and heat, ox-wagons and " +
    "canvas tents of the mining camp on the rim, the start of the mineral revolution" + HISTORIC,

  y1879:
    "The battlefield of Isandlwana, 1879, the distinctive sphinx-shaped mountain rising over the plain at " +
    "dusk, ranks of Zulu warriors with shields and spears massed across the grassland, abandoned British " +
    "camp equipment in the foreground, sombre aftermath of battle, dramatic overcast light" + HISTORIC,

  y1886:
    "The early Witwatersrand gold rush, 1886, a raw mining camp of tents and corrugated-iron shacks " +
    "spreading across the highveld, wooden mine headgear and stamp batteries, migrant labourers walking " +
    "dusty tracks, the birth of Johannesburg out of bare veld" + HISTORIC,

  y1899:
    "The South African (Anglo-Boer) War, 1899 to 1902, a mounted Boer commando in wide-brimmed hats and " +
    "bandoliers riding across the open highveld veld, a distant British blockhouse and column, drifting " +
    "smoke on the horizon, harsh dry landscape, sombre wartime mood" + HISTORIC,

  y1910:
    "The Union of South Africa, 1910, the grand sandstone Union Buildings and a formal colonial ceremony, " +
    "crowds of officials in Edwardian dress and flags on a ceremonial lawn, imposing government " +
    "architecture, a state founded that excluded the Black majority, formal and solemn" + HISTORIC,

  y1912:
    "The founding of the South African Native National Congress in Bloemfontein, January 1912, a hall of " +
    "dignified Black delegates in formal Edwardian suits and hats gathered in earnest discussion, warm " +
    "lamplight, banners of an early liberation movement, a historic assembly" + HISTORIC,

  y1913:
    "The Natives Land Act of 1913, a dispossessed Black farming family walking a dirt road across the open " +
    "highveld with their possessions loaded on an ox-wagon, driving a few cattle, leaving the land behind " +
    "under a wide cold sky, sombre and dignified, the pain of forced removal" + HISTORIC,

  y1948:
    "South Africa around 1948, a segregated city street under apartheid, weathered 'Whites Only / Slegs " +
    "Blankes' and 'Non-Whites' signs on a bench and a building entrance, ordinary people passing on either " +
    "side, sober documentary realism, muted 1950s tones, the imposition of a rigid racial system" + HISTORIC,

  y1955:
    "The Congress of the People at Kliptown, 1955, a vast peaceful crowd of thousands of people of all " +
    "races gathered on an open dusty square, hand-painted banners and raised hands, the adoption of the " +
    "Freedom Charter, hopeful and determined, warm afternoon light" + HISTORIC,

  y1956:
    "The Women's March on the Union Buildings, 9 August 1956, twenty thousand women of all races filling " +
    "the terraces and steps of the grand sandstone government buildings, many with children on their " +
    "backs, standing in dignified silent protest against the pass laws, powerful and solemn" + HISTORIC,

  y1960:
    "Sharpeville, 21 March 1960, the sombre aftermath of a tragedy, an empty township street strewn with " +
    "dropped passbooks and a lone abandoned shoe, dust settling in harsh afternoon light, a memorial and " +
    "mournful tone, no violence and no bodies shown, restrained and respectful" + HISTORIC,

  y1964:
    "The Rivonia Trial, 1964, the exterior of the Palace of Justice courthouse in Pretoria, a large silent " +
    "crowd of supporters waiting behind barriers with hand-lettered placards, police vans, tense and " +
    "solemn atmosphere, overcast light, a nation awaiting a verdict" + HISTORIC,

  y1976:
    "The Soweto Uprising, 16 June 1976, a crowd of school students in uniform marching down a wide dusty " +
    "township street with hand-painted placards, raised fists, smoke and tension in the distance, youthful " +
    "courage and defiance, harsh winter highveld light, sombre and powerful" + HISTORIC,

  y1990:
    "Cape Town South Africa, February 1990, an enormous jubilant crowd of Black and mixed-race South " +
    "Africans packed onto the Grand Parade square in front of the old City Hall, thousands of people " +
    "raising clenched fists and waving liberation banners in green, gold and black, celebrating the " +
    "release of political prisoners and the unbanning of the liberation movements, bright African summer " +
    "daylight, joy and relief across the crowd, Table Mountain faintly visible beyond the rooftops" + COMMON,

  y1994:
    "The first democratic election, 27 April 1994, an immensely long queue of South African voters of all " +
    "races snaking across the open veld to a rural polling station, patient and dignified, elders and " +
    "young people waiting together under a wide blue sky, a historic and hopeful day" + COMMON,

  y2010:
    "The 2010 FIFA World Cup in South Africa, a packed modern stadium at night glowing under floodlights, " +
    "a joyous crowd of diverse fans in a blur of colour blowing vuvuzelas and waving flags, festive " +
    "celebration, the first World Cup on African soil, vibrant and euphoric" + COMMON,

  y2013:
    "December 2013, a wall of tribute covered in flowers, candles and handwritten notes as a nation mourns " +
    "a beloved leader, crowds of people of all races standing quietly in the warm evening light, candles " +
    "glowing, deep dignified grief and gratitude, respectful memorial scene" + COMMON,

  y2024:
    "May 2024, the South African Parliament in Cape Town beneath Table Mountain, the national flag flying, " +
    "diverse members and citizens on the steps in a moment of political change and coalition-building, " +
    "bright contemporary daylight, a hopeful and uncertain new chapter" + COMMON,

  y2026:
    "South Africa today in 2026, a hopeful contemporary scene, a diverse group of ordinary South Africans " +
    "of all ages and backgrounds together in a sunlit modern township and city setting, a community " +
    "looking forward, warm optimistic light, the ongoing story of a nation" + COMMON,
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
