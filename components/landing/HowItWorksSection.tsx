import type { ReactNode } from "react";
import { Check, CirclePlay, Mail, type LucideIcon } from "lucide-react";
import CmuLink from "./ui/CmuLink";
import { eyebrow as eyebrowStyle, heading2, sectionPadding } from "./ui/typography";

function FilledCheck({ className = "" }: { className?: string }) {
  return (
    <span className={`flex shrink-0 items-center justify-center bg-primary text-white ${className}`}>
      <Check size={12} strokeWidth={3.5} />
    </span>
  );
}

type Feature = { icon: LucideIcon; title: string; text: string };

type Step = {
  eyebrow: string;
  title: string;
  description: string;
  points?: string[];
  features?: Feature[];
  cta: string;
  href: string;
  panel: string;
  visual: ReactNode;
};

const COURSE_RESOURCES: (Feature & { count: string })[] = [
  { icon: CirclePlay, title: "Watch the full lectures", text: "Every lecture in the courseware, recorded so you can watch it again.", count: "Lectures" },
];

const STEPS: Step[] = [
  {
    eyebrow: "Sign up",
    title: "Sign up to be first in",
    description: "Add your email and we'll let you know when you can sign in.",
    points: ["Join the waitlist with your email", "We'll tell you when sign-in opens"],
    cta: "Join the waitlist",
    href: "#waitlist",
    panel: "bg-primary",
    visual: (
      <>
        <div className="flex items-center gap-2.5 bg-gray-light px-3 py-2 text-sm text-iron-gray">
          <Mail size={16} />
          you@email.com
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
          <FilledCheck className="h-[18px] w-[18px]" />
          On the waitlist
        </div>
      </>
    ),
  },
  {
    eyebrow: "What's included",
    title: "Lectures you can watch today",
    description: "Full classroom lectures are free to start.",
    features: COURSE_RESOURCES,
    cta: "Watch on YouTube",
    href: "#courses",
    panel: "bg-black",
    visual: (
      <>
        <div className="border-b border-gray-light pb-3">
          <p className="text-[10px] font-bold uppercase tracking-wide text-primary">06-204</p>
          <p className="text-sm font-semibold leading-tight">Courseware</p>
        </div>
        <ul className="mt-3 flex flex-col gap-2.5">
          {COURSE_RESOURCES.map(({ icon: Icon, count }) => (
            <li key={count} className="flex items-center gap-2.5 text-[15px] font-medium">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-primary text-white">
                <Icon size={14} strokeWidth={2.5} />
              </span>
              {count}
              <Check size={16} strokeWidth={3} className="ml-auto text-primary" />
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    eyebrow: "AI tutor",
    title: "An AI tutor goes live in November",
    description: "It will help you work through the lectures.",
    points: ["Going live in November", "Will help when you're stuck"],
    cta: "Join the waitlist",
    href: "#waitlist",
    panel: "bg-gray-light",
    visual: (
      <div className="flex flex-col gap-2 text-left text-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Going live in November</p>
        <span className="self-end bg-gray-light px-3.5 py-2">Why is my loop stuck?</span>
        <span className="self-start bg-primary px-3.5 py-2 text-white">Check your stop condition on line 4.</span>
      </div>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className={`scroll-mt-32 bg-white text-black ${sectionPadding}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <p className="text-sm font-bold uppercase text-primary">How it works</p>
        <h2 className={`${heading2} mt-3 max-w-3xl`}>
          From the waitlist to lectures you can watch now.
        </h2>

        <div className="mt-12 flex flex-col gap-14 lg:mt-16 lg:gap-20">
          {STEPS.map(({ eyebrow, title, description, points, features, cta, href, panel, visual }, i) => (
            <div key={eyebrow} className="grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-5">
                <p className={eyebrowStyle}>{eyebrow}</p>
                <p className="mt-3 text-balance font-brand text-[1.75rem] font-semibold leading-[1.2] md:text-[2rem]">
                  {title}
                </p>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-iron-gray">{description}</p>
                {features ? (
                  <ul className="mt-6 flex flex-col gap-4">
                    {features.map(({ icon: Icon, title: featureTitle, text }) => (
                      <li key={featureTitle} className="flex gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-white">
                          <Icon size={18} strokeWidth={2} />
                        </span>
                        <div>
                          <p className="text-base font-semibold leading-snug">{featureTitle}</p>
                          <p className="mt-1 text-sm leading-relaxed text-iron-gray">{text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="mt-6 flex flex-col gap-3">
                    {points?.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base font-medium leading-snug">
                        <FilledCheck className="mt-px h-5 w-5" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
                <CmuLink href={href} className="mt-8">
                  {cta}
                </CmuLink>
              </div>

              <div
                aria-hidden
                className={`group/panel relative flex items-center justify-center px-6 py-10 sm:px-10 md:col-span-7 md:min-h-[25rem] ${panel} ${
                  i % 2 === 1 ? "md:order-first" : ""
                }`}
              >
                <div className="w-full max-w-sm border border-gray-200 bg-white p-7 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] transition-[transform,box-shadow] duration-300 ease-out group-hover/panel:-translate-y-1.5 group-hover/panel:shadow-[0_32px_56px_-24px_rgba(0,0,0,0.45)] motion-reduce:transition-none motion-reduce:group-hover/panel:translate-y-0">
                  {visual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
