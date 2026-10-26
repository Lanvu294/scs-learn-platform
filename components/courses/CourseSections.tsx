import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import type { Course } from "@/lib/courses";
import EmailSignupForm from "@/components/landing/EmailSignupForm";
import { CMU_ONLINE_URL, SCS_ADMISSIONS_URL, SCS_EXEC_ED_URL } from "@/components/landing/links";
import { joinCoursePracticeList } from "@/lib/courses/practice-signup";

// The sections of /courses/[code]/about. One serif H1 per page, so section
// headings here are sans.
const HEADING = "font-sans text-xl leading-7 font-semibold";

/** "Is this for me?": prerequisites in plain language and an easier place to start. */
export function CourseFitSection({ course }: { course: Course }) {
  return (
    <section aria-labelledby="fit-heading">
      <h2 id="fit-heading" className={HEADING}>
        Is this for me?
      </h2>
      <p className="mt-2 text-sm text-iron-gray">{course.level} level. You&apos;ll get the most from it if you&apos;re:</p>
      <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed marker:text-iron-gray">
        {course.prerequisites.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {course.easierCourses.length > 0 ? (
        <div className="mt-8">
          <h3 className="font-sans text-base font-semibold">Not quite there yet?</h3>
          <p className="mt-1 text-sm text-iron-gray">Start with one of these, then come back.</p>
          <ul className="mt-4 flex flex-col gap-3">
            {course.easierCourses.map((related) => {
              const internal = related.href.startsWith("/");
              const body = (
                <>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-sm text-iron-gray">{related.code}</span>
                    <span className="mt-0.5 block font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">
                      {related.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-iron-gray">{related.reason}</span>
                  </span>
                  {internal ? (
                    <ArrowRight size={16} aria-hidden className="mt-1 shrink-0" />
                  ) : (
                    <ExternalLink size={16} aria-hidden className="mt-1 shrink-0" />
                  )}
                </>
              );
              const className = "group flex items-start gap-4 rounded-lg border border-steel-gray p-4 transition-colors hover:bg-tint";
              return (
                <li key={related.code}>
                  {internal ? (
                    <Link href={related.href} className={className}>
                      {body}
                    </Link>
                  ) : (
                    <a href={related.href} target="_blank" rel="noopener" className={className}>
                      {body}
                      <span className="sr-only"> (opens in new tab)</span>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

/** What exists today, what's coming, and a per-course list for when practice opens. */
export function PracticeStatusSection({ course }: { course: Course }) {
  return (
    <section aria-labelledby="practice-heading" className="rounded-lg border border-steel-gray p-5 sm:p-6">
      <p className="text-sm text-iron-gray">Courseware status</p>
      <h2 id="practice-heading" className={`${HEADING} mt-1`}>
        Practice for {course.code} is coming next
      </h2>
      <p className="mt-3 text-base leading-relaxed">
        Today, CS Learn has the lectures, slides, notes, and the self-checks on this page. Graded practice problems with
        instant feedback are being built from the real {course.code} assignments. We don&apos;t have a date yet, and
        we&apos;d rather tell you than guess.
      </p>
      <p className="mt-6 mb-3 text-sm font-semibold">One email when it opens. Nothing else.</p>
      <EmailSignupForm
        buttonLabel={`Email me when ${course.code} practice opens`}
        source={`practice:${course.code}`}
        action={joinCoursePracticeList}
        tone="light"
        variant="outline"
        stacked
        doneMessage={`when ${course.code} practice opens`}
      />
    </section>
  );
}

const GO_FURTHER = [
  {
    title: "Earn a CMU credential",
    description: "Graded work and an official credential through CMU Online.",
    href: CMU_ONLINE_URL,
  },
  {
    title: "Train your organization",
    description: "Bring Carnegie Mellon computer science to your team with SCS Executive Education.",
    href: SCS_EXEC_ED_URL,
  },
  {
    title: "Study on campus",
    description: "Apply to the School of Computer Science in Pittsburgh.",
    href: SCS_ADMISSIONS_URL,
  },
];

/** Deliberately quiet: small type, no imagery, no color. */
export function GoFurtherSection() {
  return (
    <section aria-labelledby="go-further-heading">
      <h2 id="go-further-heading" className="font-sans text-base font-semibold">
        Go further with Carnegie Mellon
      </h2>
      <ul className="mt-4 grid gap-6 md:grid-cols-3">
        {GO_FURTHER.map((item) => (
          <li key={item.title}>
            <a href={item.href} target="_blank" rel="noopener" className="group block">
              <span className="inline-flex items-center gap-1 text-sm font-semibold underline-offset-4 group-hover:underline">
                {item.title}
                <ExternalLink size={13} aria-hidden />
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-iron-gray">{item.description}</span>
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
