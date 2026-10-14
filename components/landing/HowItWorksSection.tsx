import type { ReactNode } from "react";
import { Award, Bot, Check, Mail, type LucideIcon } from "lucide-react";
import CmuLink from "./ui/CmuLink";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import YouTubeIcon from "./ui/YouTubeIcon";
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
  // A step with nothing to act on yet (the tutor) has no button.
  cta?: { label: string; href: string; external?: boolean };
  panel: string;
  visual: ReactNode;
};

const LATER: Feature[] = [
  { icon: Bot, title: "AI tutoring", text: "Planned for courseware, alongside it or after. Timing to be announced." },
  { icon: Award, title: "Badges", text: "Show what you've learned on your resume or LinkedIn." },
];

// The agreed progression: lectures now, courseware next, more support after.
// No dates except the YouTube premiere.
const STEPS: Step[] = [
  {
    eyebrow: "Now",
    title: "Start with lectures",
    description: "Free classroom lectures from Carnegie Mellon faculty, premiering on YouTube in November.",
    points: ["Full lectures, free to watch", "Subscribe so you see them when they premiere"],
    cta: { label: "Subscribe on YouTube", href: SCS_LEARN_YOUTUBE_SUBSCRIBE_URL, external: true },
    panel: "bg-black",
    visual: (
      <>
        <div className="flex items-center gap-2.5 border-b border-gray-light pb-3">
          <YouTubeIcon className="h-6 w-6 text-[#FF0033]" />
          <div>
            <p className="text-sm font-semibold leading-tight">SCS Learn</p>
            <p className="text-xs text-iron-gray">@SCSLearn</p>
          </div>
        </div>
        <p className="mt-3 text-[10px] font-bold uppercase tracking-wide text-primary">17-437</p>
        <p className="text-sm font-semibold leading-tight">Web Application Development</p>
        <p className="mt-2 text-xs text-iron-gray">Premieres in November</p>
      </>
    ),
  },
  {
    eyebrow: "Next",
    title: "Get ready for courseware",
    description: "Structured, self-paced courseware will follow. We'll announce offerings and availability by email.",
    points: ["New courseware as we announce it", "When and how you can start"],
    cta: { label: "Get courseware updates", href: "#updates" },
    panel: "bg-primary",
    visual: (
      <>
        <div className="flex items-center gap-2.5 bg-gray-light px-3 py-2 text-sm text-iron-gray">
          <Mail size={16} />
          you@email.com
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm font-semibold">
          <FilledCheck className="h-[18px] w-[18px]" />
          Subscribed to courseware updates
        </div>
      </>
    ),
  },
  {
    eyebrow: "Later",
    title: "Look ahead to more support",
    description: "Once courseware is here, we plan to add help while you work and a way to show what you've learned.",
    features: LATER,
    panel: "bg-gray-light",
    visual: (
      <div className="flex flex-col gap-2 text-left text-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Planned</p>
        <span className="self-end bg-gray-light px-3.5 py-2">Why is my loop stuck?</span>
        <span className="self-start bg-primary px-3.5 py-2 text-white">Check your stop condition on line 4.</span>
      </div>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section id="whats-coming" className={`scroll-mt-32 bg-white text-black ${sectionPadding}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <p className="text-sm font-bold uppercase text-primary">What&apos;s coming</p>
        <h2 className={`${heading2} mt-3 max-w-3xl`}>Lectures first. Courseware next.</h2>

        <div className="mt-12 flex flex-col gap-14 lg:mt-16 lg:gap-20">
          {STEPS.map(({ eyebrow, title, description, points, features, cta, panel, visual }, i) => (
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
                {cta ? (
                  <CmuLink href={cta.href} external={cta.external} className="mt-8">
                    {cta.label}
                  </CmuLink>
                ) : null}
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
