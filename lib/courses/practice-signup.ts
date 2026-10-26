"use server";

import type { EmailSignupState } from "@/lib/landing/email-signup";

const MAX_EMAIL_LENGTH = 254;

/**
 * "Email me when [code] practice opens" on the course pages. STUB: validates
 * and reports success without storing anything. To go live, upsert into
 * email_signups like joinEmailList does, with source "practice:<code>" so each
 * course's list can be pulled on its own.
 */
export async function joinCoursePracticeList(_prev: EmailSignupState, formData: FormData): Promise<EmailSignupState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const source = String(formData.get("source") ?? "").slice(0, 40);

  if (email.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  // TODO: persist (see above). Logged without the address.
  console.info(`joinCoursePracticeList: stub signup for ${source}`);
  return { status: "done", email };
}
