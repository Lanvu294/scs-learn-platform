"use client";

import { useEffect, useReducer, useRef, useState, type ReactNode, type RefObject } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookOpen, Check, ChevronDown, Download, ExternalLink, FileText, Play, Presentation } from "lucide-react";
import {
  formatBytes,
  formatDuration,
  formatShortDate,
  formatTimestamp,
  isUpcoming,
  lectureWatchUrl,
  parseLectureParam,
  premiereCalendarFilename,
  premiereCalendarUrl,
  type Course,
  type NumberedLecture,
} from "@/lib/courses";
import { useCourseProgress } from "@/lib/courses/progress";
import YouTubeIcon from "@/components/landing/ui/YouTubeIcon";
import CourseOutline from "./CourseOutline";
import OutlineSheet from "./OutlineSheet";
import SelfCheck, { QUIZ_IDLE, missedChapters, quizReducer } from "./SelfCheck";
import { NewTabNote } from "./NewTabNote";
import { DoneMark, ProgressBar } from "./status";

// Type and spacing scale for the lecture page. Every text block in the main
// column starts on one left edge; row tints and icons hang into the gutter
// from 640px (below that, nothing hangs, so nothing touches the screen edge).
const H2 = "font-sans text-2xl leading-8 font-semibold";
const SECTION = "scroll-mt-20";
const GROUP_LABEL = "text-xs leading-4 font-medium tracking-wide text-iron-gray uppercase";
const ROW_HANG = "sm:-mx-3 sm:px-3";
const ROW_TINT = "rounded-lg transition-colors duration-150 hover:bg-tint motion-reduce:transition-none";
// Icon in the gutter (absolute at -28px) from 640px; inline before the text below that.
const HANG_ICON_ITEM = "relative pl-7 sm:pl-0";
const HANG_ICON = "absolute left-0 sm:-left-7";
const PRIMARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-white btn-fill-primary-dark";
const SECONDARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-black bg-white px-5 text-sm font-semibold text-black transition-colors duration-150 hover:bg-tint motion-reduce:transition-none";

type CourseShellProps = {
  course: Course;
  lectures: NumberedLecture[];
  // Today's date from the server (YYYY-MM-DD), so both renders agree on what's premiered.
  today: string;
};

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The lecture page: course outline on the left (a bottom sheet on phones), one
 * lecture in the main column, in post-lecture study order: Check yourself,
 * Rewatch, Study, Finish. The lecture comes from ?lecture=N, which outline
 * clicks update with history.pushState (Next keeps useSearchParams in sync),
 * so moving between lectures never reloads. Done state lives in one store
 * (useCourseProgress), so the outline and the Finish card always agree.
 */
export default function CourseShell({ course, lectures, today }: CourseShellProps) {
  const { done, hydrated, setDone } = useCourseProgress(course.code);
  const [justDone, setJustDone] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  // Lectures whose premiere was added to a calendar in this visit ("✓ Added").
  const [added, setAdded] = useState<ReadonlySet<string>>(new Set());
  const headingRef = useRef<HTMLHeadingElement>(null);
  const finishRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const todayDate = new Date(`${today}T12:00:00Z`);
  const total = lectures.length;

  const param = parseLectureParam(searchParams.get("lecture") ?? undefined, total);
  let currentNumber = param ?? 1;
  if (!param && hydrated) {
    currentNumber = lectures.find((lecture) => !done.has(lecture.id))?.number ?? 1;
  }
  const lecture = lectures[currentNumber - 1];
  const next = lectures[currentNumber] as NumberedLecture | undefined;

  function toggleDone(lectureId: string, isDone: boolean) {
    setDone(lectureId, isDone);
    setJustDone(isDone ? lectureId : null);
  }

  function selectLecture(lectureNumber: number) {
    setSheetOpen(false);
    if (lectureNumber !== currentNumber) {
      // Keep any other query params (the review notes toggle, for one).
      const query = new URLSearchParams(window.location.search);
      query.set("lecture", String(lectureNumber));
      window.history.pushState(null, "", `?${query.toString()}`);
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
    // Land keyboard and screen reader users on the new lecture's title.
    requestAnimationFrame(() => headingRef.current?.focus({ preventScroll: true }));
  }

  const outlineProps = {
    course,
    lectures,
    currentNumber,
    done,
    hydrated,
    justDone,
    today: todayDate,
    onSelect: selectLecture,
    onToggleDone: toggleDone,
  };
  const markAdded = (lectureId: string) => setAdded((prev) => new Set(prev).add(lectureId));

  return (
    <>
      {/* Phones and tablets: the outline lives behind this bar. */}
      <div className="sticky top-0 z-30 border-b border-steel-gray bg-white lg:hidden">
        <div className="flex h-12 items-center justify-between gap-3 px-4 sm:px-10">
          <span className="min-w-0 truncate font-mono text-xs font-semibold text-iron-gray">{course.code}</span>
          <span className="shrink-0" data-annotation="1" data-annotation-side="left">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen(true)}
              className="inline-flex items-center gap-1.5 py-2 text-sm font-semibold"
            >
              Lecture {currentNumber} of {total}
              <ChevronDown size={16} aria-hidden />
            </button>
          </span>
        </div>
      </div>
      <OutlineSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <CourseOutline {...outlineProps} idPrefix="sheet" />
      </OutlineSheet>

      <div className="mx-auto w-full max-w-[1200px] flex-1 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
        <div className="hidden border-r border-steel-gray lg:block">
          {/* Sticky layer and scroll area are separate so design-note popovers can overflow the rail. */}
          <div className="sticky top-0 z-20">
            <div className="max-h-dvh overflow-y-auto overscroll-contain py-10" data-annotation="1" data-annotation-side="inside">
              <CourseOutline {...outlineProps} idPrefix="rail" />
            </div>
          </div>
        </div>

        <main id="main-content" tabIndex={-1} className="min-w-0 px-4 pt-8 pb-16 outline-none sm:px-10 lg:px-0 lg:pt-12 lg:pr-8">
          <LectureBody
            key={lecture.id}
            course={course}
            lecture={lecture}
            next={next}
            total={total}
            lectures={lectures}
            done={done}
            today={todayDate}
            justDone={justDone}
            added={added}
            headingRef={headingRef}
            finishRef={finishRef}
            onToggleDone={toggleDone}
            onAdded={markAdded}
          />
        </main>
      </div>

      {next ? (
        <StickyUpNext
          course={course}
          next={next}
          today={todayDate}
          finishRef={finishRef}
          suspended={sheetOpen}
          added={added.has(next.id)}
          onAdded={() => markAdded(next.id)}
        />
      ) : null}
    </>
  );
}

// One lecture's main column. Keyed by lecture, so the quiz starts fresh on each.
function LectureBody({
  course,
  lecture,
  next,
  total,
  lectures,
  done,
  today,
  justDone,
  added,
  headingRef,
  finishRef,
  onToggleDone,
  onAdded,
}: {
  course: Course;
  lecture: NumberedLecture;
  next: NumberedLecture | undefined;
  total: number;
  lectures: NumberedLecture[];
  done: ReadonlySet<string>;
  today: Date;
  justDone: string | null;
  added: ReadonlySet<string>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  finishRef: RefObject<HTMLElement | null>;
  onToggleDone: (lectureId: string, isDone: boolean) => void;
  onAdded: (lectureId: string) => void;
}) {
  // The quiz lives here so Rewatch can mark the chapters behind missed questions.
  const [quiz, dispatch] = useReducer(quizReducer, QUIZ_IDLE);
  const missed = missedChapters(quiz, lecture.selfCheck);

  return (
    <div className="flex max-w-[760px] flex-col gap-[72px]">
      <LectureHeader course={course} lecture={lecture} total={total} headingRef={headingRef} today={today} />
      <SelfCheck course={course} lecture={lecture} state={quiz} dispatch={dispatch} />
      <Rewatch lecture={lecture} playlistId={course.youtubePlaylistId} missed={missed} />
      <Study lecture={lecture} />
      <Finish
        course={course}
        lecture={lecture}
        next={next}
        lectures={lectures}
        done={done}
        today={today}
        animate={justDone === lecture.id}
        added={next ? added.has(next.id) : false}
        finishRef={finishRef}
        onToggleDone={(isDone) => onToggleDone(lecture.id, isDone)}
        onAdded={() => next && onAdded(next.id)}
      />
    </div>
  );
}

function LectureHeader({
  course,
  lecture,
  total,
  headingRef,
  today,
}: {
  course: Course;
  lecture: NumberedLecture;
  total: number;
  headingRef: RefObject<HTMLHeadingElement | null>;
  today: Date;
}) {
  const upcoming = isUpcoming(lecture.premiereDate, today);
  return (
    <header data-annotation="2" data-annotation-side="left">
      <p className="text-sm leading-5 text-iron-gray">
        {course.code} · Lecture {lecture.number} of {total}
      </p>
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-2 font-brand text-[2rem] leading-10 font-semibold text-balance outline-none md:text-[2.5rem] md:leading-[3rem]"
      >
        {lecture.title}
      </h1>
      <p className="mt-3 max-w-[65ch] text-lg leading-7 text-iron-gray">{lecture.summary}</p>
      <p className="mt-3 text-sm leading-5 text-iron-gray">
        {formatDuration(lecture.durationSeconds)} · {upcoming ? "Premieres" : "Premiered"} {formatShortDate(lecture.premiereDate)}
      </p>
    </header>
  );
}

function Rewatch({ lecture, playlistId, missed }: { lecture: NumberedLecture; playlistId: string; missed: ReadonlySet<number> }) {
  // The row under the pointer or keyboard focus shows its play icon.
  const [active, setActive] = useState<number | null>(null);
  const handlers = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(i),
    onBlur: () => setActive(null),
  });

  return (
    <section id="rewatch" aria-labelledby="rewatch-heading" className={SECTION}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <h2 id="rewatch-heading" className={H2}>
          Rewatch
        </h2>
        <a href={lectureWatchUrl(playlistId, lecture)} target="_blank" rel="noopener" className={`${SECONDARY_BUTTON} min-h-10 px-4`}>
          Watch full lecture
          <ExternalLink size={14} aria-hidden />
          <span aria-hidden className="text-iron-gray">·</span>
          <span className="font-mono text-xs text-iron-gray tabular-nums">{formatTimestamp(lecture.durationSeconds)}</span>
          <NewTabNote />
        </a>
      </div>


      <ol className="mt-5 flex flex-col gap-1" data-annotation="4" data-annotation-side="left">
        {lecture.chapters.map((chapter, i) => (
          <li key={chapter.start}>
            <a
              href={lectureWatchUrl(playlistId, lecture, chapter.start)}
              target="_blank"
              rel="noopener"
              {...handlers(i)}
              className={`group relative grid grid-cols-[8ch_1fr_auto] items-baseline gap-x-3 py-2.5 ${ROW_HANG} ${ROW_TINT} ${active === i ? "bg-tint" : ""}`}
            >
              <span className="font-mono text-sm whitespace-nowrap text-iron-gray tabular-nums">{formatTimestamp(chapter.start)}</span>
              <span className="min-w-0">
                <span className="block text-base leading-6">{chapter.title}</span>
                {chapter.keyIdea ? <span className="mt-0.5 block text-sm leading-5 text-iron-gray">{chapter.keyIdea}</span> : null}
              </span>
              <span className="flex items-center gap-2 self-center">
                {missed.has(i) ? (
                  <span className="rounded-full border border-black px-2 py-0.5 text-xs leading-4 font-medium">Revisit</span>
                ) : null}
                <Play
                  size={12}
                  aria-hidden
                  className={`fill-current transition-opacity duration-150 motion-reduce:transition-none ${active === i ? "opacity-100" : "opacity-0"}`}
                />
              </span>
              <NewTabNote />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Study({ lecture }: { lecture: NumberedLecture }) {
  return (
    <section id="study" aria-labelledby="study-heading" className={SECTION}>
      <h2 id="study-heading" className={H2} data-annotation="7" data-annotation-side="left">
        Study
      </h2>

      <h3 className={`mt-5 font-sans ${GROUP_LABEL}`}>Files</h3>
      <ul className="mt-2 flex flex-col gap-1">
        <FileRow href={lecture.slidesUrl} icon={<Presentation size={18} aria-hidden />} label={`Lecture ${lecture.number} slides`} bytes={lecture.slidesBytes} />
        <FileRow href={lecture.notesUrl} icon={<FileText size={18} aria-hidden />} label={`Lecture ${lecture.number} notes`} bytes={lecture.notesBytes} />
      </ul>

      {lecture.readings.length ? (
        <>
          <h3 className={`mt-8 font-sans ${GROUP_LABEL}`}>Readings</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {lecture.readings.map((reading) => (
              <li key={reading.title} className={HANG_ICON_ITEM}>
                <BookOpen size={18} aria-hidden className={`${HANG_ICON} top-[3px] text-iron-gray`} />
                {reading.url ? (
                  <a
                    href={reading.url}
                    target="_blank"
                    rel="noopener"
                    title={reading.title}
                    className="flex max-w-full min-w-0 items-center gap-1.5 text-base leading-6 hover:underline hover:underline-offset-4 sm:inline-flex"
                  >
                    <span className="truncate">{reading.title}</span>
                    <ExternalLink size={14} aria-hidden className="shrink-0" />
                    <NewTabNote />
                  </a>
                ) : (
                  <p title={reading.title} className="truncate text-base leading-6">
                    {reading.title}
                  </p>
                )}
                <p className="text-sm leading-5 text-iron-gray">{reading.source}</p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

function FileRow({ href, icon, label, bytes }: { href: string; icon: ReactNode; label: string; bytes: number }) {
  return (
    <li>
      <a href={href} className={`group flex items-center gap-3 py-2 ${ROW_HANG} ${ROW_TINT}`}>
        <span className={`${HANG_ICON_ITEM} min-w-0 flex-1`}>
          <span className={`${HANG_ICON} top-[3px] text-iron-gray sm:-left-7`}>{icon}</span>
          <span className="block text-base leading-6 underline-offset-4 group-hover:underline">{label}</span>
          <span className="block text-sm leading-5 text-iron-gray">PDF · {formatBytes(bytes)}</span>
        </span>
        <Download
          size={16}
          aria-hidden
          className="shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        />
      </a>
    </li>
  );
}

function Finish({
  course,
  lecture,
  next,
  lectures,
  done,
  today,
  animate,
  added,
  finishRef,
  onToggleDone,
  onAdded,
}: {
  course: Course;
  lecture: NumberedLecture;
  next: NumberedLecture | undefined;
  lectures: NumberedLecture[];
  done: ReadonlySet<string>;
  today: Date;
  animate: boolean;
  added: boolean;
  finishRef: RefObject<HTMLElement | null>;
  onToggleDone: (isDone: boolean) => void;
  onAdded: () => void;
}) {
  const upcoming = isUpcoming(lecture.premiereDate, today);
  const isDone = done.has(lecture.id);
  const doneCount = lectures.filter((item) => done.has(item.id)).length;
  const unitIndex = course.units.findIndex((unit) => unit.id === lecture.unitId);
  const unitLectures = lectures.filter((item) => item.unitId === lecture.unitId);
  const unitComplete = isDone && unitLectures.every((item) => done.has(item.id));
  const actionRef = useRef<HTMLAnchorElement>(null);
  // Bumped on each "mark done" to replay Row B's highlight.
  const [flash, setFlash] = useState(0);
  const [moveFocus, setMoveFocus] = useState(0);
  useEffect(() => {
    if (moveFocus) actionRef.current?.focus();
  }, [moveFocus]);

  return (
    <section ref={finishRef} id="finish" aria-labelledby="finish-heading" className={SECTION}>
      <h2 id="finish-heading" className={H2} data-annotation="5" data-annotation-side="left">
        Finish
      </h2>
      <div className="mt-5 rounded-lg border border-steel-gray px-4 sm:-mx-[25px] sm:px-6">
        {/* Row A: completion. */}
        <div className="py-4">
          {upcoming ? (
            <p className="py-2 text-base leading-6 text-iron-gray">You can mark Lecture {lecture.number} done once it premieres.</p>
          ) : (
            <button
              type="button"
              aria-pressed={isDone}
              aria-label={`Mark Lecture ${lecture.number} as done`}
              onClick={() => {
                onToggleDone(!isDone);
                if (!isDone) {
                  setFlash((n) => n + 1);
                  setMoveFocus((n) => n + 1);
                }
              }}
              className={`group flex min-h-11 w-full flex-wrap items-center justify-between gap-x-6 gap-y-2 py-1 text-left ${ROW_HANG} ${ROW_TINT}`}
            >
              <span className="flex items-center gap-3 text-base leading-6 font-semibold">
                <DoneMark done={isDone} animate={animate} size={22} />
                {isDone ? (
                  <>
                    Lecture {lecture.number} done
                    <span className="text-sm font-semibold text-iron-gray underline underline-offset-4">Undo</span>
                  </>
                ) : (
                  <>Mark Lecture {lecture.number} as done</>
                )}
              </span>
              <span className="flex items-center gap-3 text-sm leading-5 text-iron-gray tabular-nums">
                {doneCount} of {lectures.length}
                <span className="w-[120px]">
                  <ProgressBar value={doneCount} max={lectures.length} />
                </span>
              </span>
            </button>
          )}
          <p aria-live="polite" className="text-sm leading-5 font-semibold empty:hidden sm:pl-[34px]">
            {unitComplete ? `Unit ${unitIndex + 1} complete.` : ""}
          </p>
        </div>

        {/* Row B: up next. */}
        <div
          key={flash}
          className={`-mx-4 flex flex-col gap-4 border-t border-steel-gray px-4 py-5 sm:-mx-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 ${
            flash ? "flash-tint" : ""
          }`}
        >
          {next ? (
            <>
              <div className="min-w-0">
                <p className="text-sm leading-5 text-iron-gray">
                  <span data-annotation="6">Up next · Lecture {next.number}</span>
                </p>
                <p className="mt-1 text-base leading-6 font-semibold">{next.title}</p>
                <p className="mt-1 text-sm leading-5 text-iron-gray">
                  {formatDuration(next.durationSeconds)} · {isUpcoming(next.premiereDate, today) ? "Premieres" : "Premiered"}{" "}
                  {formatShortDate(next.premiereDate)}
                </p>
              </div>
              <UpNextAction course={course} next={next} today={today} added={added} onAdded={onAdded} actionRef={actionRef} />
            </>
          ) : (
            <div>
              <p className="text-sm leading-5 text-iron-gray">Up next</p>
              <p className="mt-1 text-base leading-6 font-semibold">That&apos;s the last lecture of {course.code}.</p>
              <Link href={`/courses/${course.code}/about`} className="mt-2 inline-block text-sm font-semibold underline underline-offset-4">
                About this course
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Never a red Watch button for a lecture that isn't out yet.
function UpNextAction({
  course,
  next,
  today,
  added,
  onAdded,
  actionRef,
  compact = false,
}: {
  course: Course;
  next: NumberedLecture;
  today: Date;
  added: boolean;
  onAdded: () => void;
  actionRef?: RefObject<HTMLAnchorElement | null>;
  compact?: boolean;
}) {
  const size = compact ? "min-h-10 px-4" : "";
  if (isUpcoming(next.premiereDate, today)) {
    return (
      <a
        ref={actionRef}
        href={premiereCalendarUrl(course.code, next.number)}
        download={premiereCalendarFilename(course.code, next.number)}
        onClick={onAdded}
        className={`${SECONDARY_BUTTON} ${size} shrink-0`}
      >
        {added ? (
          <>
            <Check size={16} strokeWidth={2.5} aria-hidden />
            Added
          </>
        ) : (
          "Add to calendar"
        )}
      </a>
    );
  }
  return (
    <a
      ref={actionRef}
      href={lectureWatchUrl(course.youtubePlaylistId, next)}
      target="_blank"
      rel="noopener"
      className={`${PRIMARY_BUTTON} ${size} shrink-0`}
    >
      <YouTubeIcon className="h-4 w-4 shrink-0" />
      Watch Lecture {next.number}
      <NewTabNote />
    </a>
  );
}

// Phones and tablets: the Up next action waits at the bottom of the screen,
// stepping aside while the Finish card (which has the same action), the
// footer (whose "Back to top" is red too), or the outline sheet is showing.
function StickyUpNext({
  course,
  next,
  today,
  finishRef,
  suspended,
  added,
  onAdded,
}: {
  course: Course;
  next: NumberedLecture;
  today: Date;
  finishRef: RefObject<HTMLElement | null>;
  suspended: boolean;
  added: boolean;
  onAdded: () => void;
}) {
  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    const finish = finishRef.current;
    if (!finish) return;
    const footer = document.querySelector("footer");
    const inView = new Map<Element, boolean>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) inView.set(entry.target, entry.isIntersecting);
      setBlocked([...inView.values()].some(Boolean));
    });
    observer.observe(finish);
    if (footer) observer.observe(footer);
    return () => observer.disconnect();
    // The Finish section remounts per lecture, so watch again when the lecture changes.
  }, [finishRef, next.id]);

  const show = !blocked && !suspended;
  const upcoming = isUpcoming(next.premiereDate, today);
  return (
    <div
      aria-hidden={!show || undefined}
      inert={!show || undefined}
      className={`sticky-up-next fixed inset-x-0 bottom-0 z-40 border-t border-steel-gray bg-white px-4 py-3 transition-transform duration-200 ease-out motion-reduce:transition-none lg:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-sm leading-5">
          <span className="block text-iron-gray">
            Up next · Lecture {next.number}
            {upcoming ? ` · ${formatShortDate(next.premiereDate)}` : ""}
          </span>
          <span className="block truncate font-semibold">{next.title}</span>
        </p>
        <UpNextAction course={course} next={next} today={today} added={added} onAdded={onAdded} compact />
      </div>
    </div>
  );
}
