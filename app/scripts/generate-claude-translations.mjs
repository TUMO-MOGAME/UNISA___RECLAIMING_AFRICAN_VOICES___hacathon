// Pre-generate machine-draft translations of the literary scene text into every South African
// language we don't yet have human-reviewed copy for — using **Claude** (Anthropic). Run this ONCE
// (and after content changes); NOT at runtime. Output: src/content/drafts.data.ts, which the app
// already reads and labels as "machine translation — unreviewed" in the Reader (integrity rule).
//
//   Set ANTHROPIC_API_KEY in app/.env (build-time only — NOT EXPO_PUBLIC), then:
//     npm run gen:claude-drafts
//
// Notes
// - Model defaults to claude-opus-4-8. Override with TRANSLATE_MODEL (e.g. claude-haiku-4-5 to cut
//   cost ~5x) if you're rate/cost constrained.
// - Resumable + idempotent: existing drafts.data.ts entries are preserved and skipped, so a re-run
//   only fills gaps. Delete drafts.data.ts (or set FORCE=1) to regenerate everything.
// - These are UNREVIEWED machine drafts. A native speaker should still review before they're treated
//   as authoritative — the UI already flags them as such.

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { LANGUAGES } from "../src/i18n/languages.ts";
import { mhudi } from "../src/content/mhudi.ts";
import { ityalaLamawele } from "../src/content/ityala-lamawele.ts";
import { indaba } from "../src/content/indaba.ts";
import { vilakazi } from "../src/content/vilakazi.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load app/.env into process.env (simple parser, no dependency).
const envPath = resolve(__dirname, "../.env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const apiKey = process.env.ANTHROPIC_API_KEY;
if (!apiKey) {
  console.error(
    "Missing ANTHROPIC_API_KEY. Add it to app/.env (build-time only — NOT EXPO_PUBLIC), then re-run."
  );
  process.exit(1);
}

const MODEL = process.env.TRANSLATE_MODEL || "claude-opus-4-8";
const FORCE = process.env.FORCE === "1";
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);

const client = new Anthropic({ apiKey });

const FIELDS = ["title", "text", "childText"];
const modules = [mhudi, ityalaLamawele, indaba, vilakazi];
// Every official language that isn't English and isn't human-reviewed yet (the 9 we're drafting).
const targets = LANGUAGES.filter((l) => l.code !== "en" && !l.reviewedContent);

const outPath = resolve(__dirname, "../src/content/drafts.data.ts");

// Load any existing drafts so re-runs are cheap and resumable (unless FORCE).
async function loadExisting() {
  if (FORCE || !existsSync(outPath)) return {};
  try {
    const mod = await import(pathToFileURL(outPath).href + `?t=${Date.now()}`);
    return mod.DRAFT_DATA ?? {};
  } catch {
    return {};
  }
}

// One structured call translates a whole scene (title + adult text + child text) into one language,
// with the reviewed Setswana shown as a register/tone reference. Structured output guarantees clean JSON.
const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: { type: "string" },
    text: { type: "string" },
    childText: { type: "string" },
  },
  required: ["title", "text", "childText"],
};

async function translateScene(scene, lang) {
  const system =
    `You are an expert literary translator translating South African indigenous-literature scene text ` +
    `into ${lang.english} (${lang.endonym}). Translate FAITHFULLY and naturally — this is foundational ` +
    `literature, so preserve meaning, tone and register exactly; do not summarise, add, or omit. ` +
    `Keep proper nouns and culturally specific indigenous terms (people, places, clans, e.g. "Barolong", ` +
    `"Re-Nosi", "Mfecane") in their original form. The "childText" is a simplified children's reading ` +
    `level — keep it simple and warm, facts unchanged. Return ONLY the translation in ${lang.endonym}.`;

  const ref = scene.title.tn
    ? `\n\nFor register/tone reference only, here is the human-reviewed Setswana translation of the title/text/childText (do NOT copy it — it is a different language):\n` +
      `title (tn): ${scene.title.tn ?? ""}\ntext (tn): ${scene.text.tn ?? ""}\nchildText (tn): ${scene.childText.tn ?? ""}`
    : "";

  const user =
    `Translate these three fields from English into ${lang.endonym}:\n\n` +
    `title (en): ${scene.title.en}\n\n` +
    `text (en): ${scene.text.en}\n\n` +
    `childText (en): ${scene.childText.en}` +
    ref;

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 2000,
    system,
    output_config: { format: { type: "json_schema", schema: SCHEMA }, effort: "low" },
    messages: [{ role: "user", content: user }],
  });

  const block = res.content.find((b) => b.type === "text");
  if (!block) throw new Error("no text block in response");
  return JSON.parse(block.text);
}

// Small concurrency pool so a full run finishes in minutes without tripping rate limits.
async function pool(items, n, worker) {
  const queue = [...items];
  let ok = 0;
  let failed = 0;
  const runners = Array.from({ length: n }, async () => {
    while (queue.length) {
      const item = queue.shift();
      try {
        await worker(item);
        ok++;
      } catch (e) {
        failed++;
        console.warn(`  ✗ ${item.mod.id}/${item.scene.id} → ${item.lang.code}: ${e.message}`);
      }
    }
  });
  await Promise.all(runners);
  return { ok, failed };
}

const out = await loadExisting();

// Build the work list, skipping (module, scene, language) triples already fully present.
const jobs = [];
for (const mod of modules) {
  for (const scene of mod.scenes) {
    for (const lang of targets) {
      const have = FIELDS.every((f) => out?.[mod.id]?.[scene.id]?.[f]?.[lang.code]);
      if (!have) jobs.push({ mod, scene, lang });
    }
  }
}

console.log(
  `Model: ${MODEL} · concurrency ${CONCURRENCY}\n` +
    `Drafting ${jobs.length} scene×language jobs into ${targets.length} languages ` +
    `(${targets.map((t) => t.code).join(", ")})\n`
);

const write = () => {
  const header = `// GENERATED FILE — do not edit by hand.
// Machine-draft translations produced by Claude (Anthropic), keyed as:
//   DRAFT_DATA[moduleId][sceneId][field][langCode] = "translated text"
// These are UNREVIEWED drafts and are labelled as such in the UI (integrity rule).
// Regenerate with: npm run gen:claude-drafts
`;
  const body = `export const DRAFT_DATA: Record<
  string,
  Record<string, Record<string, Record<string, string>>>
> = ${JSON.stringify(out, null, 2)};
`;
  writeFileSync(outPath, header + body, "utf8");
};

let done = 0;
const { ok, failed } = await pool(jobs, CONCURRENCY, async ({ mod, scene, lang }) => {
  const t = await translateScene(scene, lang);
  ((out[mod.id] ??= {})[scene.id] ??= {});
  for (const f of FIELDS) {
    (out[mod.id][scene.id][f] ??= {})[lang.code] = t[f];
  }
  done++;
  console.log(`  ✓ ${mod.id}/${scene.id} → ${lang.code} (${done}/${jobs.length})`);
  if (done % 8 === 0) write(); // checkpoint so a crash doesn't lose progress
});

write();
console.log(`\nDone: ${ok} scenes drafted, ${failed} failed → src/content/drafts.data.ts`);
