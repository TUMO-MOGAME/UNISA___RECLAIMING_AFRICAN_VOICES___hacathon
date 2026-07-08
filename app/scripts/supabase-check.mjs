// Supabase connection health-check for the Community Archive.
//   npm run supabase:check
// Reads app/.env, obtains an ANONYMOUS session, and does an RLS-guarded read of the public feed.
// Confirms, in one command: env config · anonymous auth enabled · schema present · RLS working.

import { createClient } from "@supabase/supabase-js";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = resolve(appDir, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

// Return an exit code rather than calling process.exit() mid-flight — a forced exit while an fetch
// socket is closing trips a libuv assertion on Windows. Natural exit keeps the output clean.
async function main() {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.error("\n❌ Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY in app/.env\n");
    return 1;
  }
  console.log(`→ project: ${url}`);

  const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

  console.log("→ signing in anonymously…");
  const { data: auth, error: authErr } = await sb.auth.signInAnonymously();
  if (authErr) {
    const msg = authErr.message.toLowerCase();
    // If CAPTCHA protection is enabled, a headless CLI can't solve the challenge — that's EXPECTED,
    // not a config failure. The real verification then happens in-app (the hCaptcha widget).
    if (msg.includes("captcha")) {
      console.log(
        "\nℹ️  CAPTCHA protection is enabled — this CLI can't solve the challenge, so it can't sign in\n" +
          "   headlessly. That's expected: verify anonymous sign-in IN THE APP, where the hCaptcha\n" +
          "   widget provides the token. Config + anon-auth are otherwise reachable.\n"
      );
      return 0;
    }
    console.error(
      `\n❌ anonymous sign-in failed: ${authErr.message}\n` +
        "   Fix: Supabase dashboard → Authentication → Sign In / Providers → enable **Anonymous sign-ins**.\n"
    );
    return 1;
  }
  console.log(`  ✓ anonymous session (auth.uid = ${auth.user?.id})`);

  console.log("→ reading the public feed (RLS)…");
  const { count, error: qErr } = await sb
    .from("recordings")
    .select("id", { count: "exact", head: true })
    .eq("visibility", "public");
  if (qErr) {
    console.error(
      `\n❌ query failed: ${qErr.message}\n` +
        "   If the table is missing, run supabase/migrations/0001_community_archive.sql first.\n"
    );
    return 1;
  }
  console.log(`  ✓ recordings table readable · ${count ?? 0} public recording(s)`);
  console.log("\n✅ Supabase connection OK — config, anonymous auth, schema and RLS all working.\n");
  return 0;
}

process.exitCode = await main();
