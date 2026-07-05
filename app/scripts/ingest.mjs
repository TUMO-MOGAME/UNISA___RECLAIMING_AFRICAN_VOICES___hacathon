// The Ingestion Library CLI (docs/12, Feature B) — turns a rights-cleared, public-domain plain-text
// book into a DRAFT literary Module in the app's shape, grounded in and citing the real source.
//
// Build-time & offline, like gen:images — runtime stays static & free. v1 handles plain text
// (Project Gutenberg .txt, a local .txt, or a URL returning text). PDF + OCR are a follow-up.
//
// The AI "adapt → scenes" stage (Gemini) is INTENTIONALLY not run here: every scene's adult/child
// text is emitted as [NEEDS ADAPTATION] behind the human-review gate (integrity rule, AGENTS.md §4).
// This CLI produces the anchored skeleton + a review checklist; a human (with Tumo's sign-off) then
// adapts, translates, fingerprints and registers it.
//
//   node scripts/ingest.mjs --id <slug> --title "<Title>" --author "<Author>" \
//       --rights public-domain --died <year> --basis "<why it is PD>" \
//       (--in <path.txt> | --url <https://…>)
//
//   npm run ingest -- --id mhudi --title "Mhudi" --author "Sol T. Plaatje" \
//       --rights public-domain --died 1932 --basis "SA life+50; d.1932 → PD 1983" \
//       --in ./tmp/mhudi.txt

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve, isAbsolute } from "node:path";
import { stripGutenbergBoilerplate, normalizeText } from "../src/services/ingest/extract.ts";
import { segmentChapters } from "../src/services/ingest/segment.ts";
import { toDraftModule } from "../src/services/ingest/draft.ts";
import { canIngest } from "../src/services/ingest/rights.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP_ROOT = resolve(__dirname, "..");

// ---- tiny arg parser: --flag value ----
function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) {
        out[key] = true;
      } else {
        out[key] = next;
        i++;
      }
    }
  }
  return out;
}

function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));

const required = ["id", "title", "author", "rights"];
for (const k of required) {
  if (!args[k] || args[k] === true) fail(`Missing --${k}. See the header of scripts/ingest.mjs for usage.`);
}
if (!args.in && !args.url) fail("Provide a source: --in <path.txt> or --url <https://…>.");

const source = {
  id: String(args.id),
  title: String(args.title),
  author: String(args.author),
  authorDied: args.died ? Number(args.died) : undefined,
  rights: String(args.rights),
  basis: args.basis ? String(args.basis) : undefined,
};

// Rights gate — v1 is public-domain / licensed only (locked decision, docs/12).
if (!canIngest(source)) {
  fail(
    `Rights not cleared for "${source.title}" (rights=${source.rights}). v1 ingests only ` +
      `public-domain or explicitly-licensed works. Verify rights, then set --rights accordingly.`
  );
}

// ---- load the raw text ----
async function loadText() {
  if (args.in) {
    const p = isAbsolute(args.in) ? args.in : resolve(process.cwd(), args.in);
    return readFileSync(p, "utf8");
  }
  const res = await fetch(String(args.url));
  if (!res.ok) fail(`Fetch failed: ${res.status} ${res.statusText} for ${args.url}`);
  return await res.text();
}

const raw = await loadText();

// ---- pure pipeline: strip → normalise → segment → draft ----
const clean = normalizeText(stripGutenbergBoilerplate(raw));
const chapters = segmentChapters(clean);
const draft = toDraftModule(source, chapters);

// ---- write artifacts ----
const outDir = resolve(APP_ROOT, "src/content/sources", source.id);
mkdirSync(outDir, { recursive: true });

writeFileSync(resolve(outDir, "source.txt"), clean, "utf8");
writeFileSync(resolve(outDir, "draft-module.json"), JSON.stringify(draft, null, 2) + "\n", "utf8");

const review = `# Ingestion review — ${source.title}

- **Author:** ${source.author}${source.authorDied ? ` (d. ${source.authorDied})` : ""}
- **Rights:** ${source.rights}${source.basis ? ` — ${source.basis}` : ""}
- **Chapters detected:** ${chapters.length}
- **Artifacts:** \`source.txt\` (verbatim, cleaned) · \`draft-module.json\` (${draft.scenes.length} scene stubs)

## Human-review gate (nothing ships until these are done)

- [ ] **Confirm rights** — the basis above is real and correct for this edition.
- [ ] **Check segmentation** — ${chapters.length} chapter(s) is right; headings look sane in \`source.txt\`.
- [ ] **Adapt → scenes** — replace every \`[NEEDS ADAPTATION]\` (adult + child text) with a faithful
      adaptation grounded in each scene's \`sourceNote\`. Run the Gemini adapter (needs a key) OR write
      by hand. Facts unchanged; child text = tone only. (humanities-grounding skill.)
- [ ] **Image prompts** — fill each scene \`imagePrompt\`; then \`npm run gen:images\`.
- [ ] **Translate** — \`npm run gen:drafts\` for machine drafts (labelled unreviewed); Setswana needs
      Tumo's review.
- [ ] **Fingerprint & anchor** — add to the Heritage Ledger (\`chain/\`) — SHA-256 + IPFS + Solana.
- [ ] **Register** — turn \`draft-module.json\` into \`src/content/${source.id}.ts\` and add it to
      \`src/content/index.ts\`.

_Generated by scripts/ingest.mjs — the anchored skeleton only. The humanities work is the human's._
`;
writeFileSync(resolve(outDir, "review.md"), review, "utf8");

console.log(`\n✔ Ingested "${source.title}"`);
console.log(`  chapters: ${chapters.length}  ·  scene stubs: ${draft.scenes.length}`);
console.log(`  → ${resolve(outDir, "source.txt")}`);
console.log(`  → ${resolve(outDir, "draft-module.json")}`);
console.log(`  → ${resolve(outDir, "review.md")}`);
console.log(`\nNext: open review.md and work the human-review gate. No scene text was invented.\n`);
