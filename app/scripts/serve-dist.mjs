// Serve the built web app from dist/ — for looking at a production build locally, and the only way
// to exercise the service worker, which does not exist in the Expo dev server.
//
// Deliberately dependency-free. `npx serve` pulls a package over the network every time and gives you
// nothing back when it fails; this is forty lines that always start.
//
//   npm run serve:web        → http://localhost:3000
//
// Service workers only run in a SECURE CONTEXT. localhost counts, a LAN IP does not — opening
// http://192.168.x.x:3000 on a phone will silently skip registration and look like a broken PWA. To
// test on a real device use Chrome's port forwarding (chrome://inspect), or a tunnel that gives you
// HTTPS. See specs/tasks.md, PWA-05.

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, resolve } from "node:path";

// resolve() so DIST uses the platform separator — on Windows the URL pathname comes back with
// forward slashes while join() produces backslashes, and the containment check below would reject
// every single file.
const DIST = resolve(new URL("../dist/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const PORT = Number(process.env.PORT ?? 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function send(res, path, status = 200) {
  const body = await readFile(path);
  res.writeHead(status, {
    "Content-Type": TYPES[extname(path).toLowerCase()] ?? "application/octet-stream",
    "Content-Length": body.length,
    // No caching from the server: the service worker is the thing under test, and a stale HTTP cache
    // would make its behaviour impossible to read.
    "Cache-Control": "no-store",
    // sw.js must be allowed to control the whole origin.
    ...(path.endsWith("sw.js") ? { "Service-Worker-Allowed": "/" } : {}),
  });
  res.end(body);
}

createServer(async (req, res) => {
  try {
    const url = decodeURIComponent((req.url ?? "/").split("?")[0]);
    // Contain the path inside dist — a served file must never escape the build output.
    const rel = normalize(url).replace(/^([/\\])+/, "");
    let path = join(DIST, rel);
    if (rel === "" || (await stat(path).catch(() => null))?.isDirectory()) path = join(DIST, "index.html");
    if (!path.startsWith(DIST)) return res.writeHead(403).end("Forbidden");

    if (await stat(path).catch(() => null)) return await send(res, path);
    // Unknown path → the app shell. The router lives in memory, so every route is index.html anyway.
    return await send(res, join(DIST, "index.html"), 200);
  } catch (err) {
    res.writeHead(500).end(String(err));
  }
}).listen(PORT, () => {
  console.log(`\n  Ubuntu Heritage — production build`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  Service worker + install prompt only work on localhost or HTTPS.`);
  console.log(`  Ctrl+C to stop.\n`);
});
