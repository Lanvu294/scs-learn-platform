"use client";

import { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, Mail } from "lucide-react";
import {
  signInWithGoogle,
  requestPasswordReset,
  signInWithPassword,
  signUpWithPassword,
  type AuthFormState,
} from "@/lib/auth/actions";

type Mode = "signin" | "signup" | "forgot";

/** Supabase's per-address cooldown between auth emails. */
const RESEND_COOLDOWN_SECONDS = 60;

type Stamped = AuthFormState & { at: number };

const inputClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm transition-shadow focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10";
const primaryButton =
  "w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white btn-fill-primary-dark disabled:opacity-60";
const linkButton = "font-semibold text-primary hover:underline";

/** useActionState whose results carry their arrival time, so cooldowns can tick without reading the clock in render. */
function useStampedAction(action: (prev: AuthFormState, formData: FormData) => Promise<AuthFormState>) {
  return useActionState<Stamped, FormData>(
    async (prev, formData) => ({ ...(await action(prev, formData)), at: Date.now() }),
    { status: "idle", at: 0 }
  );
}

function useNow() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function secondsLeft(state: Stamped, now: number): number {
  const total =
    state.status === "sent" ? RESEND_COOLDOWN_SECONDS : state.status === "error" ? (state.retryAfterSeconds ?? 0) : 0;
  const elapsed = Math.max(0, ((now || state.at) - state.at) / 1000);
  return Math.max(0, Math.ceil(total - elapsed));
}

function PasswordInput({ name, autoComplete, label }: { name: string; autoComplete: string; label: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type={visible ? "text" : "password"}
          required
          autoComplete={autoComplete}
          className={`${inputClass} pr-11`}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 mt-[3px] -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:text-gray-700"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </span>
    </label>
  );
}

function ErrorText({ state, fallback }: { state: Stamped; fallback?: string }) {
  const message = state.status === "error" ? state.message : fallback;
  return message ? <p className="text-sm text-red-600">{message}</p> : null;
}

const SENT_COPY = {
  link: { title: "Check your inbox", body: "We sent a sign-in link to" },
  confirm: { title: "Confirm your email", body: "Almost done - we sent a confirmation link to" },
  reset: { title: "Check your inbox", body: "If there's an account for this address, we sent a password reset link to" },
} as const;

/** Google's standard multicolor "G" (their sign-in branding guidelines call for it on Google buttons). */
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className="h-[18px] w-[18px]">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

export default function LoginForm({
  next,
  initialError,
  devInstant = false,
  initialMode = "signin",
  signupsPaused = false,
}: {
  next: string;
  initialError?: string;
  devInstant?: boolean;
  /** /login?mode=signup opens on Create account. */
  initialMode?: "signin" | "signup";
  /** Supabase's "Allow new users to sign up" is off: no Create account tab. */
  signupsPaused?: boolean;
}) {
  const [mode, setMode] = useState<Mode>(signupsPaused ? "signin" : initialMode);
  const [email, setEmail] = useState("");
  const [signInState, signInAction, signingIn] = useStampedAction(signInWithPassword);
  const [signUpState, signUpAction, signingUp] = useStampedAction(signUpWithPassword);
  const [resetState, resetAction, resetting] = useStampedAction(requestPasswordReset);
  const now = useNow();
  // initialError (e.g. an expired link) shows until the user tries something.
  const [showInitialError, setShowInitialError] = useState(true);

  const sentState =
    mode === "signup" ? signUpState : mode === "forgot" ? resetState : null;
  if (sentState?.status === "sent") {
    const copy = SENT_COPY[sentState.kind];
    const resendAction = sentState.kind === "reset" ? resetAction : null;
    const remaining = secondsLeft(sentState, now);
    return (
      <div className="space-y-5">
        <div className="space-y-2 text-center">
          <Mail className="mx-auto text-primary" size={28} />
          <p className="font-bold">{copy.title}</p>
          <p className="text-sm text-gray-600">
            {copy.body} <span className="font-bold">{sentState.email}</span>. The link works in any browser. It can take
            a minute to arrive, so check spam too.
          </p>
        </div>
        {resendAction && (
          <form action={resendAction}>
            <input type="hidden" name="email" value={sentState.email} />
            <input type="hidden" name="name" value={sentState.name} />
            <input type="hidden" name="next" value={sentState.next} />
            <button
              type="submit"
              disabled={resetting || remaining > 0}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 btn-fill-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resetting ? "Sending…" : remaining > 0 ? `Resend in ${remaining}s` : "Resend email"}
            </button>
          </form>
        )}
        <button type="button" onClick={() => setMode("signin")} className={`w-full text-center text-sm ${linkButton}`}>
          Back to sign in
        </button>
      </div>
    );
  }

  const switchMode = (m: Mode) => {
    setShowInitialError(false);
    setMode(m);
  };
  const initial = showInitialError ? initialError : undefined;
  const emailField = (
    <label className="block">
      <span className="text-sm font-semibold text-gray-800">Email</span>
      <input
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
      />
    </label>
  );

  return (
    <div className="space-y-6">
      {signupsPaused && mode === "signin" && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900">
          New accounts are paused for now. Already have one? Sign in below.
        </p>
      )}
      {!signupsPaused && (mode === "signin" || mode === "signup") && (
        <div role="tablist" className="grid grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => switchMode(m)}
              className={`rounded-md py-2 text-sm font-semibold transition ${
                mode === m ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-black"
              }`}
            >
              {m === "signin" ? "Sign in" : "Create account"}
            </button>
          ))}
        </div>
      )}

      {mode === "signin" && (
        <form action={signInAction} onSubmit={() => setShowInitialError(false)} className="space-y-5">
          <input type="hidden" name="next" value={next} />
          {emailField}
          <PasswordInput name="password" autoComplete="current-password" label="Password" />
          <div className="-mt-2 text-right">
            <button type="button" onClick={() => switchMode("forgot")} className={`text-sm ${linkButton}`}>
              Forgot password?
            </button>
          </div>
          <ErrorText state={signInState} fallback={initial} />
          <button type="submit" disabled={signingIn} className={primaryButton}>
            {signingIn ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}

      {mode === "signup" && (
        <form action={signUpAction} className="space-y-5">
          <input type="hidden" name="next" value={next} />
          <label className="block">
            <span className="text-sm font-semibold text-gray-800">Full name</span>
            <input name="name" type="text" required autoComplete="name" placeholder="Ada Lovelace" className={inputClass} />
          </label>
          {emailField}
          <PasswordInput name="password" autoComplete="new-password" label="Password" />
          <p className="-mt-3 text-xs text-gray-500">At least 8 characters.</p>
          <ErrorText state={signUpState} />
          <button type="submit" disabled={signingUp} className={primaryButton}>
            {signingUp ? "Creating account…" : "Create account"}
          </button>
          {devInstant && <p className="text-xs text-gray-500">Dev mode: new accounts are confirmed instantly, no email sent.</p>}
        </form>
      )}

      {mode === "forgot" && (
        <form action={resetAction} className="space-y-5">
          <div>
            <p className="font-semibold">Reset your password</p>
            <p className="mt-1 text-sm text-gray-600">
              We&apos;ll email you a link to choose a new one. This also works if you&apos;ve never set a password.
            </p>
          </div>
          {emailField}
          <ErrorText state={resetState} />
          <button type="submit" disabled={resetting || secondsLeft(resetState, now) > 0} className={primaryButton}>
            {resetting ? "Sending…" : "Email me a reset link"}
          </button>
          <button type="button" onClick={() => switchMode("signin")} className={`w-full text-center text-sm ${linkButton}`}>
            Back to sign in
          </button>
        </form>
      )}

      {(mode === "signin" || mode === "signup") && (
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="h-px flex-1 bg-gray-200" />
            or
            <span className="h-px flex-1 bg-gray-200" />
          </div>
          <form action={signInWithGoogle} onSubmit={() => setShowInitialError(false)}>
            <input type="hidden" name="next" value={next} />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 btn-fill-gray-50"
            >
              <GoogleG />
              Continue with Google
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
