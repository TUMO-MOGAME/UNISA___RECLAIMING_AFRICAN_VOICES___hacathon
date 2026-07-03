// Pre-generate machine-draft translations of the scene text into every SA language we don't yet have
// human-reviewed copy for, using Botlhale AI's /translate API. Run this ONCE (and after content
// changes) when a Botlhale token + org_id are available — NOT at runtime (rate limits; the plan says
// pre-generate + cache). Output: src/content/drafts.data.ts, which the app already reads and labels
// as "unreviewed machine translation" in the Reader.
//
//   Set EXPO_PUBLIC_BOTLHALE_API_KEY and EXPO_PUBLIC_BOTLHALE_ORG_ID (in app/.env), then:
//     npm run gen:drafts
//
// [NEEDS: confirm org_id + source/target field semantics with the Botlhale contact.]

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { LANGUAGES } from "../src/i18n/languages.ts";
import { botlhaleTranslate } from "../src/services/translate/botlhale.ts";
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
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
  }
}

const apiKey = process.env.EXPO_PUBLIC_BOTLHALE_API_KEY;
const orgId = process.env.EXPO_PUBLIC_BOTLHALE_ORG_ID;
const baseUrl = process.env.EXPO_PUBLIC_BOTLHALE_BASE_URL || undefined;

if (!apiKey || !orgId) {
  console.error(
    "Missing creds. Set EXPO_PUBLIC_BOTLHALE_API_KEY and EXPO_PUBLIC_BOTLHALE_ORG_ID in app/.env first."
  );
  process.exit(1);
}

const SOURCE = "en-ZA";
const FIELDS = ["title", "text", "childText"];
const modules = [mhudi, ityalaLamawele, indaba, vilakazi];
// Every official language that isn't English and isn't human-reviewed yet (the 9 we're drafting).
const targets = LANGUAGES.filter((l) => l.code !== "en" && !l.reviewedContent);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const out = {};
let ok = 0;
let failed = 0;

console.log(
  `Drafting ${modules.length} modules × ${FIELDS.length} fields → ${targets.length} languages ` +
    `(${targets.map((t) => t.code).join(", ")})\n`
);

for (const mod of modules) {
  for (const scene of mod.scenes) {
    for (const field of FIELDS) {
      const en = scene[field]?.en;
      if (!en) continue;
      for (const lang of targets) {
        try {
          const translation = await botlhaleTranslate({
            text: en,
            sourceCode: SOURCE,
            targetCode: lang.botlhale,
            orgId,
            apiKey,
            baseUrl,
          });
          ((out[mod.id] ??= {})[scene.id] ??= {})[field] ??= {};
          out[mod.id][scene.id][field][lang.code] = translation;
          ok++;
          console.log(`  ✓ ${mod.id}/${scene.id}/${field} → ${lang.code}`);
        } catch (e) {
          failed++;
          console.warn(`  ✗ ${mod.id}/${scene.id}/${field} → ${lang.code}: ${e.message}`);
        }
        await sleep(150); // be gentle on the rate limit
      }
    }
  }
}

const header = `// GENERATED FILE — do not edit by hand.
// Machine-draft translations produced by Botlhale AI, keyed as:
//   DRAFT_DATA[moduleId][sceneId][field][langCode] = "translated text"
// UNREVIEWED drafts — labelled as such in the UI. Regenerate with: npm run gen:drafts
`;
const bodyTs = `export const DRAFT_DATA: Record<
  string,
  Record<string, Record<string, Record<string, string>>>
> = ${JSON.stringify(out, null, 2)};
`;
writeFileSync(resolve(__dirname, "../src/content/drafts.data.ts"), header + bodyTs, "utf8");

console.log(`\nDone: ${ok} drafts written, ${failed} failed → src/content/drafts.data.ts`);
