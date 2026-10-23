import type { ReactNode } from "react";
import Image from "next/image";
import { Award, Check, Play } from "lucide-react";
import CmuLink from "./ui/CmuLink";
import EmailSignupForm from "./EmailSignupForm";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import YouTubeIcon from "./ui/YouTubeIcon";
import { heading2, sectionPadding } from "./ui/typography";

type Stage = {
  title: string;
  when: string;
  description: string;
  visual: ReactNode;
  // Under illustrations of things that don't exist yet.
  conceptPreview?: boolean;
  action?: ReactNode;
};

// Illustrations share one frame: same size, same neutral background. They show
// the learning experience, not a real interface, and name no courses.
function Frame({ children }: { children: ReactNode }) {
  return <div className="relative flex min-h-[19rem] w-full items-center justify-center bg-gray-light p-5 sm:p-6">{children}</div>;
}

function LectureVisual() {
  return (
    <Frame>
      <div className="w-full max-w-sm overflow-hidden bg-black shadow-[0_24px_48px_-24px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-video">
          <Image src="/landing/photos/classroom-teaching.jpg" alt="" fill sizes="(min-width: 768px) 25vw, 90vw" quality={75} className="object-cover" />
          {/* Right side, over the projected slide, clear of the instructor. */}
          <span className="absolute inset-0 flex items-center justify-end pr-[14%]">
            <span className="flex size-12 items-center justify-center rounded-full bg-black/55">
              <Play className="ml-0.5 size-5 fill-white text-white" />
            </span>
          </span>
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 text-[11px] text-white/80">
          <div className="h-1 flex-1 bg-white/25">
            <div className="h-full w-1/3 bg-primary" />
          </div>
          <span className="tabular-nums">24:10 / 1:18:02</span>
          <YouTubeIcon className="h-4 w-4 text-white" />
        </div>
      </div>
    </Frame>
  );
}

function CoursewareVisual() {
  return (
    <Frame>
      <div className="w-full max-w-sm bg-white p-4 text-left shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold text-iron-gray">Lesson 7</p>
          <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-semibold">
            <span className="flex size-5 items-center justify-center rounded-full bg-primary text-white">
              <Award size={11} strokeWidth={2.25} />
            </span>
            Badge earned
          </span>
        </div>
        <p className="mt-1 text-sm font-bold leading-snug">Shortest paths with Dijkstra&apos;s algorithm</p>
        <div aria-hidden className="mt-3 flex flex-col gap-1.5">
          <div className="h-1.5 w-full bg-gray-light" />
          <div className="h-1.5 w-3/4 bg-gray-light" />
        </div>
        <div className="mt-3 border border-gray-200 p-3">
          <p className="text-[11px] font-semibold text-iron-gray">Practice</p>
          <p className="mt-1.5 bg-gray-light px-2 py-1.5 font-mono text-[11px]">dist, node = heappop(frontier)</p>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold">
            <span className="flex size-4 items-center justify-center bg-primary text-white">
              <Check size={11} strokeWidth={3.5} />
            </span>
            All 12 tests passed
          </p>
        </div>
      </div>
    </Frame>
  );
}

// A friendly tutor exchange about the same lesson.
function TutorVisual() {
  return (
    <Frame>
      <div className="flex w-full max-w-sm flex-col gap-2.5 bg-white p-5 text-left text-xs leading-relaxed shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)]">
        <span className="max-w-[85%] self-end bg-gray-light px-3 py-2">Why does my shortest path skip a node?</span>
        <span className="max-w-[90%] self-start bg-black px-3 py-2 text-white">
          Great question! Let&apos;s trace it together. When you pop a node off the heap, is its distance final yet?
        </span>
      </div>
    </Frame>
  );
}

// One path, left to right (top to bottom on phones): lectures now, courseware
// and badges next, tutoring soon. Only the YouTube premiere has a date.
const STAGES: Stage[] = [
  {
    title: "Lectures on YouTube",
    when: "Premieres in November",
    description: "Full classroom lectures from Carnegie Mellon faculty, free to watch.",
    visual: <LectureVisual />,
    action: (
      <CmuLink href={SCS_LEARN_YOUTUBE_SUBSCRIBE_URL} external>
        Subscribe on YouTube
      </CmuLink>
    ),
  },
  {
    title: "Self-paced courseware",
    when: "Next",
    description: "Lessons built from real CMU courses. Get instant feedback and earn a badge.",
    visual: <CoursewareVisual />,
    conceptPreview: true,
    action: <EmailSignupForm buttonLabel="Keep me posted" source="whats-coming" tone="light" stacked />,
  },
  {
    title: "AI tutoring",
    when: "Coming to courseware",
    description: "AI tutoring is coming to the courseware experience to help you work through questions and get unstuck. Launch timing will be announced.",
    conceptPreview: true,
    visual: <TutorVisual />,
  },
];

export default function HowItWorksSection() {
  return (
    <section id="whats-coming" className={`scroll-mt-32 bg-white text-black ${sectionPadding}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
        <h2 className={`${heading2} max-w-3xl`}>What&apos;s coming to CS Learn</h2>

        {/* Three columns from 1100px; below that each step is a row (picture beside text), stacking on phones. */}
        <ol className="mt-12 grid grid-cols-1 gap-14 lg:mt-16 min-[1100px]:grid-cols-3 min-[1100px]:gap-8">
          {STAGES.map(({ title, when, description, visual, conceptPreview, action }, i) => (
            <li key={title} className="flex flex-col">
              {/* Step marker; on wide screens a rule runs on to the next step. */}
              <div className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold text-iron-gray">{when}</span>
                {i < STAGES.length - 1 ? <span aria-hidden className="ml-2 hidden h-px flex-1 bg-gray-300 min-[1100px]:block" /> : null}
              </div>

              <div className="mt-5 grid gap-6 md:max-[1099px]:grid-cols-2 md:max-[1099px]:items-center md:max-[1099px]:gap-10 min-[1100px]:gap-0">
                <div>
                  {visual}
                  {/* Same height on every step so the titles stay level. */}
                  <p
                    aria-hidden={!conceptPreview || undefined}
                    className={`mt-2 text-xs text-iron-gray ${conceptPreview ? "" : "invisible"}`}
                  >
                    Concept preview
                  </p>
                </div>

                <div>
                  <h3 className="font-brand text-[1.5rem] font-semibold leading-[1.2] md:text-[1.625rem] min-[1100px]:mt-6">{title}</h3>
                  <p className="mt-3 text-pretty text-base leading-relaxed text-iron-gray">{description}</p>
                  {action ? <div className="mt-6">{action}</div> : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
