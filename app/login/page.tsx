import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getSessionUser } from "@/lib/auth/session";
import { safeNextPath } from "@/lib/auth/redirect";
import { isDevInstantSignIn } from "@/lib/auth/actions";
import { getAuthSettings } from "@/lib/auth/settings";

const ERROR_MESSAGES: Record<string, string> = {
  link_invalid: "That sign-in link is invalid or has expired. Request a new one below.",
  google_disabled: "Google sign-in isn't switched on yet. Use your email and password for now.",
  google_cancelled: "Google sign-in was cancelled. Try again, or use your email below.",
  google_failed: "Google sign-in didn't work. Try again, or use your email below.",
  signups_paused: "New accounts are paused for now. If you already have an account, sign in with it.",
};

/**
 * One sign-in for everyone. Students, instructors and admins all have a single
 * Supabase Auth account; roles come from the access lists (instructors row,
 * admins table), so there's nothing role-specific to ask here. ?next= returns
 * people to the page that sent them, /dashboard routes by role otherwise, and
 * ?mode=signup opens on the Create account tab.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string; mode?: string }>;
}) {
  const { next: rawNext, error, mode } = await searchParams;
  const next = safeNextPath(rawNext);

  if (await getSessionUser()) {
    redirect(next);
  }

  return (
    <main className="grid min-h-screen bg-white text-black lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel (desktop): close-up of the landing-page hero learner, named SCS Learn at the bottom. */}
      <section className="relative isolate hidden flex-col justify-end overflow-hidden bg-black p-10 text-white lg:flex xl:p-14">
        <Image
          src="/landing/photos/learner-headphones.jpg"
          alt=""
          fill
          priority
          sizes="55vw"
          className="-z-20 object-cover object-[52%_40%]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
        <div className="max-w-md">
          {/* Named like the landing-page hero: SCS Learn, a short red rule, then the line.
              No logo up top: it sat over her face and broke the photo. */}
          <Link href="/" className="text-5xl font-bold tracking-tight text-white hover:text-white/85">
            SCS Learn
          </Link>
          <div aria-hidden className="mt-2.5 h-1 w-14 bg-primary" />
          <p className="mt-6 font-serif text-4xl font-semibold leading-tight">Start learning computer science and AI from Carnegie Mellon for free.</p>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            Complete courseware with lecture videos and instant feedback from our autograders. Our AI tutor goes live soon.
          </p>
        </div>
      </section>

      <section className="flex flex-col">
        {/* The SCS mark sits on the form side, top right on desktop, so nothing covers
            the photo. On phones the photo panel is hidden, so the bar also names the
            site. SCS Learn stays set apart from the mark (no lockup), and the red
            square icon stays out of web headers per the brand book. */}
        <header className="flex items-center justify-between gap-4 border-b border-gray-200 px-5 py-3 lg:justify-end lg:border-b-0 lg:px-10 lg:pt-8 xl:px-14">
          <Image
            src="/scs-2026-primary-red-white.svg"
            alt="Carnegie Mellon University Kenneth C. Griffin School of Computer Science"
            width={685}
            height={192}
            priority
            className="h-10 w-auto lg:h-14"
          />
          <Link href="/" className="text-[15px] font-bold tracking-tight lg:hidden">
            SCS Learn
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-sm">
            <h1 className="mb-8 font-serif text-4xl font-semibold">Sign in to SCS Learn</h1>
            <LoginForm
              next={next}
              initialError={error ? ERROR_MESSAGES[error] : undefined}
              devInstant={await isDevInstantSignIn()}
              initialMode={mode === "signup" ? "signup" : "signin"}
              signupsPaused={(await getAuthSettings()).signupsPaused}
            />
            <p className="mt-8 text-center text-xs leading-relaxed text-gray-500">
              Instructors: sign in with your courseware email.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
