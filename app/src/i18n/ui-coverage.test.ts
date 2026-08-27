import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { LANGUAGES } from "./languages.ts";

// The i18n sweep as a test rather than a one-off check (V2-28).
//
// Accessibility & Inclusivity is 20% of the rubric and the indigenous languages are meant to be
// first-class, not bolted on. A manual sweep passes once and rots the next time someone adds a
// screen; this fails the build instead.
//
// SCOPE — UI CHROME ONLY. This deliberately checks `const UI = { ... }` blocks inside components.
// It does NOT check src/content, because content translations work differently on purpose: a scene
// carries English plus whatever has actually been reviewed, and i18n/localize falls back to English
// honestly rather than passing machine text off as authoritative. Forcing eleven languages onto
// content would invite exactly the fabrication the project forbids.

const CODES = LANGUAGES.map((l) => l.code);
const COMPONENTS = new URL("../components/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".tsx") && !name.endsWith(".test.tsx")) out.push(p);
  }
  return out;
}

/** Slice out the `const UI = { ... }` block by matching braces, which a regex cannot do reliably. */
function uiBlock(src: string): string | null {
  const start = src.indexOf("const UI = {");
  if (start < 0) return null;
  let depth = 0;
  for (let i = src.indexOf("{", start); i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

/** Every `key: { ... }` entry directly inside the UI block, with its own literal text. */
function entries(block: string): { key: string; body: string }[] {
  const out: { key: string; body: string }[] = [];
  const re = /(?:^|\n)\s{2}([A-Za-z][A-Za-z0-9]*):\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(block))) {
    const open = block.indexOf("{", m.index + m[0].length - 1);
    let depth = 0;
    for (let i = open; i < block.length; i++) {
      if (block[i] === "{") depth++;
      else if (block[i] === "}") {
        depth--;
        if (depth === 0) {
          out.push({ key: m[1], body: block.slice(open, i + 1) });
          break;
        }
      }
    }
  }
  return out;
}

const files = walk(COMPONENTS);

test("there are component files to check", () => {
  assert.ok(files.length > 5, `expected to find components, found ${files.length}`);
});

test("every UI string in every component carries all 11 official languages", () => {
  const failures: string[] = [];

  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const block = uiBlock(src);
    if (!block) continue;

    for (const { key, body } of entries(block)) {
      // Only language maps — skip nested config objects that happen to live in UI.
      if (!/\ben:\s*["'`]/.test(body)) continue;
      const missing = CODES.filter((c) => !new RegExp(`\\b${c}:\\s*["'\`]`).test(body));
      if (missing.length) {
        const short = file.slice(file.lastIndexOf("components"));
        failures.push(`${short} → UI.${key} missing: ${missing.join(", ")}`);
      }
    }
  }

  assert.deepEqual(
    failures,
    [],
    `\n${failures.length} UI string(s) are not fully translated:\n  ${failures.join("\n  ")}\n`
  );
});

test("no UI string is an empty placeholder in any language", () => {
  const failures: string[] = [];
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    const block = uiBlock(src);
    if (!block) continue;
    for (const { key, body } of entries(block)) {
      if (!/\ben:\s*["'`]/.test(body)) continue;
      for (const c of CODES) {
        // An empty string would silently render as nothing rather than falling back to English.
        if (new RegExp(`\\b${c}:\\s*(""|''|\`\`)`).test(body)) {
          failures.push(`${file.slice(file.lastIndexOf("components"))} → UI.${key}.${c} is empty`);
        }
      }
    }
  }
  assert.deepEqual(failures, [], `\n${failures.join("\n  ")}\n`);
});
