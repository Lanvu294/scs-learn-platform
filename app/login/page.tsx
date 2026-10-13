import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getSessionUser } from "@/lib/auth/session";
import { safeNextPath } from "@/lib/auth/redirect";
import { isDevInstantSignIn } from "@/lib/auth/actions";

const ERROR_MESSAGES: Record<string, string> = {
  link_invalid: "That sign-in link is invalid or has expired. Request a new one below.",
  google_disabled: "Google sign-in isn't switched on yet. Use your email and password for now.",
  google_cancelled: "Google sign-in was cancelled. Try again, or use your email below.",
  google_failed: "Google sign-in didn't work. Try again, or use your email below.",
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
      {/* Brand panel (desktop): close-up of the landing-page hero learner + the 2026 SCS mark. */}
      <section className="relative isolate hidden flex-col justify-between overflow-hidden bg-black p-10 text-white lg:flex xl:p-14">
        <Image
          src="/landing/photos/learner-headphones.jpg"
          alt=""
          fill
          priority
          sizes="55vw"
          className="-z-20 object-cover object-[52%_40%]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/25 to-black/50" />
        <Link href="/" aria-label="SCS Learn home" className="block self-start">
          <Image
            src="/scs-2026-primary-red-white.svg"
            alt="Carnegie Mellon University Kenneth C. Griffin School of Computer Science"
            width={685}
            height={192}
            priority
            className="h-20 w-auto"
          />
        </Link>
        <div className="max-w-md">
          <p className="font-serif text-4xl font-semibold leading-tight">Carnegie Mellon courseware, free to start.</p>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            Lectures, notes, autograded coursework and quizzes from the Kenneth C. Griffin School of Computer Science.
          </p>
        </div>
      </section>

      <section className="flex flex-col">
        {/* Slim brand bar (mobile/tablet only - the photo panel covers it on desktop). */}
        <header className="flex items-center gap-3 border-b border-gray-200 px-5 py-3 lg:hidden">
          <Link href="/" aria-label="SCS Learn home" className="flex items-center gap-2.5">
            <Image src="/brand/scs-learn-icon-red.png" alt="" width={36} height={36} className="h-9 w-9 rounded-md" priority />
            <span className="text-[15px] font-bold tracking-tight">SCS Learn</span>
          </Link>
        </header>

        <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-sm">
            <h1 className="font-serif text-4xl font-semibold">Sign in to SCS Learn</h1>
            <p className="mt-2 mb-8 text-sm leading-relaxed text-gray-600">
              One account for everyone - students, instructors and admins. We&apos;ll take you to the right place
              after you sign in.
            </p>
            <LoginForm
              next={next}
              initialError={error ? ERROR_MESSAGES[error] : undefined}
              devInstant={await isDevInstantSignIn()}
              initialMode={mode === "signup" ? "signup" : "signin"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
