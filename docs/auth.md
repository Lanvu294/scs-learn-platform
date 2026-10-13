# Sign-in (Supabase Auth)

Everyday login is **email + password** - nothing is emailed, so it is fast and
never hits Supabase's email rate limits. Email is only sent for one-time
things:

| Email | When | Lands on |
|---|---|---|
| Confirm signup | creating an account | `/auth/confirm` → where they were going |
| Reset password | "Forgot password?" (also how link-only accounts get a password) | `/auth/confirm` → `/account/password` |
| Magic link | "Email me a sign-in link instead" | `/auth/confirm` → where they were going |

Signed-in users can set or change their password on `/account`.

Instructor access is granted by email (`instructors.email`), but only a
**confirmed** address can claim an instructor row - see
`lib/instructor/data/current-instructor.ts`.

`npm run dev` skips email entirely: new accounts are auto-confirmed and the
link fallback signs in instantly (Supabase's built-in mailer only reaches the
project's own team).

## Sign in with Google

"Continue with Google" (`signInWithGoogle` in `lib/auth/actions.ts`) asks Google
only for the basic `openid email profile` scopes - name, email, profile photo.
No email is sent, so it isn't affected by SMTP or email rate limits. Google
addresses arrive verified, so instructor/admin roles apply immediately, and a
Google sign-in links to an existing email/password account with the same
address.

Setup (one time):

1. **Google Cloud Console** (console.cloud.google.com) → pick or create a project.
2. **APIs & Services → OAuth consent screen**: User type **External** (or
   **Internal** to allow only `@andrew.cmu.edu` accounts, if the project lives in
   CMU's Google Workspace). App name `SCS Learn`, support email, and add only
   the scopes `openid`, `.../auth/userinfo.email`, `.../auth/userinfo.profile`.
   Add the deployed domain under Authorized domains. Publish the app (these are
   non-sensitive scopes, so no Google review is needed).
3. **APIs & Services → Credentials → Create credentials → OAuth client ID** →
   type **Web application**, name `SCS Learn - Supabase`.
   - Authorized JavaScript origins: the deployed origin and `http://localhost:3000`
   - Authorized redirect URI: **`https://<project-ref>.supabase.co/auth/v1/callback`**
     (copy the exact value from the Supabase Google provider page)
   Copy the client ID and client secret. (This is separate from the Drive-import
   OAuth client - don't reuse that one.)
4. **Supabase → Authentication → Sign In / Providers → Google**: enable, paste
   the client ID and secret, save.
5. Make sure `https://<deployed origin>/**` and `http://localhost:3000/**` are in
   Authentication → URL Configuration → Redirect URLs (Google returns to
   `/auth/callback`).

## Pausing new sign-ups (one switch)

**Supabase → Authentication → Sign In / Providers → "Allow new users to sign up"**

- **Off** = sign-ups paused. Supabase refuses every new account - email/password
  *and* first-time Google sign-ins - and the login page hides "Create account"
  and says new accounts are paused. Everyone who already has an account keeps
  signing in normally (password or Google).
- **On** = open again. No code change or redeploy needed either way; the app
  reads the switch live (`lib/auth/settings.ts`).

The landing page's "Sign up early" waitlist form is separate (it only stores an
email) and keeps working while sign-ups are paused.

## Supabase dashboard settings

**Authentication → Sign In / Providers → Email**
- Enable Email provider: **on**
- Confirm email: **on** (required - instructor access trusts confirmed emails)
- Minimum password length: 8 (matches the app)

**Authentication → URL Configuration**
- Site URL: the deployed origin, e.g. `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/**` and `http://localhost:3000/**`

**Authentication → Emails → Templates** - point every link at `/auth/confirm`
with a `token_hash`. These links are verified server-side, so they work in any
browser or device (the default `{{ .ConfirmationURL }}` links use PKCE and only
work in the browser that requested them).

Confirm signup:
```html
<h2>Confirm your SCS Learn account</h2>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard">Confirm my email</a></p>
```

Reset password:
```html
<h2>Reset your SCS Learn password</h2>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Choose a new password</a></p>
```

Magic link:
```html
<h2>Sign in to SCS Learn</h2>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard">Sign in</a></p>
```

(`{{ .SiteURL }}` must be the deployed origin - set it in URL Configuration.)

For real students (not just the Supabase team) to receive any of these, set up
custom SMTP (Authentication → Emails → SMTP Settings) and then raise
Authentication → Rate Limits → "Rate limit for sending emails".
