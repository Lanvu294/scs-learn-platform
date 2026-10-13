/**
 * Supabase's public auth settings (GET /auth/v1/settings, anon key). Two
 * switches the app follows instead of keeping its own copies:
 *
 * - `signupsPaused` - Supabase -> Authentication -> Sign In / Providers ->
 *   "Allow new users to sign up". Turning that OFF is THE one switch that
 *   pauses new accounts: Supabase then refuses new email sign-ups *and* new
 *   Google users server-side, and the login page hides "Create account".
 *   Existing accounts keep signing in. Flip it back ON to reopen.
 * - `googleEnabled` - whether the Google provider is switched on.
 *
 * Never cached: a stale value would keep a switch "stuck" after it's flipped,
 * and it's one small request per login-page view / button press.
 */
export type AuthSettings = { signupsPaused: boolean; googleEnabled: boolean };

export async function getAuthSettings(): Promise<AuthSettings> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/settings`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`auth settings ${res.status}`);
    const s = (await res.json()) as { disable_signup?: boolean; external?: Record<string, boolean> };
    return { signupsPaused: Boolean(s.disable_signup), googleEnabled: Boolean(s.external?.google) };
  } catch (error) {
    console.error("getAuthSettings:", error instanceof Error ? error.message : error);
    // Can't tell - don't block anything; Supabase still enforces its own switches.
    return { signupsPaused: false, googleEnabled: true };
  }
}
