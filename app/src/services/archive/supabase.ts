// Supabase client for the Community Archive — cloud backend behind the local-first store.
//
// POPIA: ownership is an ANONYMOUS auth session (no account, no PII). Row-Level Security in the
// database (see supabase/migrations/0001_community_archive.sql) is what makes the client-side anon
// key safe — every read/write is checked against auth.uid(). This module is guarded: if the env vars
// aren't set it returns null and callers fall back to the device-local store, never crashing.
//
// Web is the demo target (localStorage persists the session). On native, session persistence needs an
// AsyncStorage adapter — add it when wiring native (the client still works in-session without it).

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

/** Whether cloud sync is configured (both env vars present). */
export function hasSupabase(): boolean {
  return !!(url && anonKey);
}

let client: SupabaseClient | null = null;

/** Lazy singleton. Returns null when unconfigured (callers then stay device-local). */
export function getSupabase(): SupabaseClient | null {
  if (!hasSupabase()) return null;
  if (!client) {
    client = createClient(url as string, anonKey as string, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  return client;
}

/**
 * Ensure an anonymous session exists and return its user id (the RLS owner), or null if cloud is
 * unconfigured / anonymous sign-ins are disabled in the dashboard. Never throws.
 */
export async function ensureAnonSession(captchaToken?: string): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data } = await sb.auth.getSession();
    if (data.session?.user) return data.session.user.id;
    // If CAPTCHA protection is enabled on the project, signInAnonymously requires a captchaToken
    // obtained from the hCaptcha widget (see CaptchaGate) — otherwise it is omitted.
    const { data: signed, error } = await sb.auth.signInAnonymously(
      captchaToken ? { options: { captchaToken } } : undefined
    );
    if (error) {
      console.warn("[supabase] anonymous sign-in failed:", error.message);
      return null;
    }
    return signed.user?.id ?? null;
  } catch (e: any) {
    console.warn("[supabase] session error:", e?.message ?? e);
    return null;
  }
}

/**
 * End-to-end connectivity probe used by `npm run supabase:check` and any in-app diagnostic: confirm
 * the client is configured, an anonymous session can be obtained, and an RLS-guarded read succeeds.
 */
export async function checkConnection(captchaToken?: string): Promise<
  | { ok: true; uid: string; publicCount: number }
  | { ok: false; stage: "config" | "auth" | "query"; message: string }
> {
  if (!hasSupabase()) return { ok: false, stage: "config", message: "EXPO_PUBLIC_SUPABASE_URL / _ANON_KEY not set" };
  const sb = getSupabase() as SupabaseClient;
  const uid = await ensureAnonSession(captchaToken);
  if (!uid) return { ok: false, stage: "auth", message: "no anonymous session (enable Anonymous sign-ins in the dashboard)" };
  const { count, error } = await sb
    .from("recordings")
    .select("id", { count: "exact", head: true })
    .eq("visibility", "public");
  if (error) return { ok: false, stage: "query", message: error.message };
  return { ok: true, uid, publicCount: count ?? 0 };
}
