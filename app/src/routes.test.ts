import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Route wiring as a test (part of the V2-12 week gate).
//
// The v2 shell promises that every item in the nav lands on a real page. That promise is easy to
// break silently: add a member to the `Route` union, wire it into the header, and forget the `case`
// in `renderRoute` — the app compiles, the nav item highlights, and the room renders nothing.
//
// This does NOT replace walking the app in a browser (nothing here can see a layout). It pins the
// wiring so a regression fails the build instead of waiting to be noticed on the day of a demo.

const local = (rel: string) => new URL(rel, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const src = readFileSync(local("../App.tsx"), "utf8");
// nav.ts is read rather than imported: it imports `../../content/types` without a file extension,
// which Node's type-stripping loader will not resolve. Reading it keeps this test dependency-free.
const navSrc = readFileSync(local("./components/shell/nav.ts"), "utf8");

/** Slice a `{ ... }` body by matching braces from the first `{` after `from`. */
function body(text: string, from: number): string {
  const open = text.indexOf("{", from);
  let depth = 0;
  for (let i = open; i < text.length; i++) {
    if (text[i] === "{") depth++;
    else if (text[i] === "}") {
      depth--;
      if (depth === 0) return text.slice(open, i + 1);
    }
  }
  return "";
}

/** Every `name: "x"` in the `type Route =` union. */
function routeNames(): string[] {
  const start = src.indexOf("type Route =");
  const end = src.indexOf("\n\n", start);
  const union = src.slice(start, end);
  return [...union.matchAll(/name:\s*"([a-zA-Z]+)"/g)].map((m) => m[1]);
}

/** Every `case "x":` inside `renderRoute` only — not the chatbot's separate navigate switch. */
function renderedRoutes(): string[] {
  const at = src.indexOf("function renderRoute()");
  assert.ok(at > 0, "renderRoute not found in App.tsx");
  const fn = body(src, at);
  return [...fn.matchAll(/case\s+"([a-zA-Z]+)":/g)].map((m) => m[1]);
}

/** The `id:` of every entry in `NAV` — the array runs from its declaration to the one after it. */
function navIds(): string[] {
  const at = navSrc.indexOf("export const NAV");
  const end = navSrc.indexOf("export const TABS", at);
  assert.ok(at > 0 && end > at, "NAV not found in nav.ts");
  return [...navSrc.slice(at, end).matchAll(/id:\s*"([a-zA-Z]+)"/g)].map((m) => m[1]);
}

/** The room ids in `TABS` — the phone tab bar. */
function tabIds(): string[] {
  const line = /export const TABS[^=]*=\s*\[([^\]]*)\]/.exec(navSrc);
  assert.ok(line, "TABS not found in nav.ts");
  return [...line[1].matchAll(/"([a-zA-Z]+)"/g)].map((m) => m[1]);
}

const ROUTES = routeNames();
const NAV_IDS = navIds();
/** Home is the switch's `default`, so it deliberately has no `case`. */
const DEFAULT_ROUTE = "home";

test("the Route union parsed", () => {
  assert.ok(ROUTES.length >= 20, `expected the full route union, parsed ${ROUTES.length}`);
  assert.ok(ROUTES.includes("watchItem"), "watchItem should be a route");
  assert.ok(NAV_IDS.length >= 6, `expected the D1 nav, parsed ${NAV_IDS.length}`);
});

test("every route in the union is rendered by renderRoute", () => {
  const rendered = new Set(renderedRoutes());
  const missing = ROUTES.filter((r) => r !== DEFAULT_ROUTE && !rendered.has(r));
  assert.deepEqual(missing, [], `\nroutes with no case in renderRoute: ${missing.join(", ")}\n`);
});

test("renderRoute has no case for a route that does not exist", () => {
  const known = new Set(ROUTES);
  const stray = renderedRoutes().filter((c) => !known.has(c));
  assert.deepEqual(stray, [], `\ncases in renderRoute with no matching route: ${stray.join(", ")}\n`);
});

test("every nav item and every mobile tab is a real route — no dead links", () => {
  const known = new Set(ROUTES);
  const ids = [...NAV_IDS, ...tabIds(), "home"];
  const dead = ids.filter((id) => !known.has(id));
  assert.deepEqual(dead, [], `\nnav targets with no route: ${dead.join(", ")}\n`);
});

test("the chatbot's navigate_to orchestrator can reach every room in the nav", () => {
  // `navigateTo` maps a page id from the chatbot onto a route. Its named cases must cover the nav,
  // or "take me to Schools" quietly bounces the user back to Home via the fallback.
  const at = src.indexOf("const navigateTo =");
  assert.ok(at > 0, "navigateTo not found in App.tsx");
  const fn = body(src, at);
  const cases = new Set([...fn.matchAll(/case\s+"([a-zA-Z]+)":/g)].map((m) => m[1]));
  const missing = NAV_IDS.filter((id) => !cases.has(id));
  assert.deepEqual(missing, [], `\nnav rooms the chatbot cannot open: ${missing.join(", ")}\n`);
});
