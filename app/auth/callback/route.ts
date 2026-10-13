import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth/redirect";

/**
 * Where Google sign-in and PKCE email links land. @supabase/ssr uses the PKCE flow, so the
 * link carries a ?code= that's only redeemable alongside the code-verifier
 * cookie set when the link was requested - i.e. the link must be opened in
 * the same browser it was requested from.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"));

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(new URL(next, origin));
    }
  }

  const loginUrl = new URL("/login", origin);
  // Providers report failures as ?error=... (e.g. access_denied when the user
  // cancels Google's consent screen).
  const providerError = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description") ?? "";
  // A brand-new Google user while sign-ups are paused (Supabase: "Signups not
  // allowed for this instance") - tell them so, rather than "cancelled".
  const signupsPaused = errorCode === "signup_disabled" || /signups? not allowed/i.test(errorDescription);
  loginUrl.searchParams.set(
    "error",
    signupsPaused
      ? "signups_paused"
      : providerError === "access_denied"
        ? "google_cancelled"
        : providerError
          ? "google_failed"
          : "link_invalid"
  );
  loginUrl.searchParams.set("next", next);
  return NextResponse.redirect(loginUrl);
}
