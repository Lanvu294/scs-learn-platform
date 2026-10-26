"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock } from "lucide-react";
import { formatShortDate, isUpcoming, type Course, type NumberedLecture } from "@/lib/courses";
import { DoneMark, ProgressBar } from "./status";

type CourseOutlineProps = {
  course: Course;
  lectures: NumberedLecture[];
  currentNumber: number;
  done: ReadonlySet<string>;
  hydrated: boolean;
  // The lecture marked done in this visit, so only its check draws in.
  justDone: string | null;
  today: Date;
  // Keeps ids unique when the outline renders in both the rail and the sheet.
  idPrefix: string;
  onSelect: (lectureNumber: number) => void;
  onToggleDone: (lectureId: string, isDone: boolean) => void;
};

// The course outline: the page's only navigation. Units collapse; the unit
// holding the current lecture opens on its own. Clicking a row loads that
// lecture; the circle beside it is a separate toggle for "done".
export default function CourseOutline({
  course,
  lectures,
  currentNumber,
  done,
  hydrated,
  justDone,
  today,
  idPrefix,
  onSelect,
  onToggleDone,
}: CourseOutlineProps) {
  const currentUnitId = lectures[currentNumber - 1].unitId;
  const [open, setOpen] = useState<ReadonlySet<string>>(() => new Set([currentUnitId]));
  // Moving to a lecture in a closed unit opens that unit (adjusting state during
  // render, React's pattern for following a prop).
  const [openedFor, setOpenedFor] = useState(currentUnitId);
  if (openedFor !== currentUnitId) {
    setOpenedFor(currentUnitId);
    if (!open.has(currentUnitId)) setOpen(new Set([...open, currentUnitId]));
  }

  const doneCount = lectures.filter((lecture) => done.has(lecture.id)).length;

  function toggleUnit(unitId: string) {
    const next = new Set(open);
    if (next.has(unitId)) next.delete(unitId);
    else next.add(unitId);
    setOpen(next);
  }

  // One text edge (EDGE) for the course title, unit labels, unit names and
  // lecture titles. Status icons and lecture numbers hang to its left.
  const EDGE = "pl-[60px]";

  return (
    <nav aria-label="Course outline" className="flex flex-col">
      <div className={`${EDGE} pr-4`}>
        <p className="font-mono text-xs font-semibold text-iron-gray">{course.code}</p>
        <p className="mt-1 text-base leading-6 font-semibold">{course.title}</p>
        {/* Reserved from the first paint; filled once saved progress loads. */}
        <div className={`mt-4 ${hydrated ? "" : "invisible"}`}>
          <ProgressBar value={doneCount} max={lectures.length} />
          <p className="mt-2 text-sm leading-5 text-iron-gray tabular-nums">
            {doneCount} of {lectures.length} lectures done
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {course.units.map((unit, unitIndex) => {
          const isOpen = open.has(unit.id);
          const panelId = `${idPrefix}-unit-${unit.id}`;
          const unitLectures = lectures.filter((lecture) => lecture.unitId === unit.id);
          return (
            <div key={unit.id}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleUnit(unit.id)}
                className={`flex w-full items-start gap-2 py-2 pr-4 text-left ${EDGE}`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-xs leading-4 font-medium tracking-wide text-iron-gray uppercase">Unit {unitIndex + 1}</span>
                  <span className="mt-0.5 block text-sm leading-5 font-semibold">{unit.title}</span>
                </span>
                <ChevronDown
                  size={16}
                  aria-hidden
                  className={`mt-3 shrink-0 text-iron-gray transition-transform duration-200 ease-out motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              <ol id={panelId} hidden={!isOpen}>
                {unitLectures.map((lecture) => {
                  const isCurrent = lecture.number === currentNumber;
                  const isDone = done.has(lecture.id);
                  const upcoming = isUpcoming(lecture.premiereDate, today);
                  return (
                    <li
                      key={lecture.id}
                      className={`relative ${
                        isCurrent ? "bg-gray-light before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-primary" : ""
                      }`}
                    >
                      {upcoming && !isDone ? (
                        <span className="absolute top-0 left-3 flex h-[38px] w-7 items-center justify-center text-gray-medium">
                          <Clock size={16} aria-hidden />
                        </span>
                      ) : (
                        <button
                          type="button"
                          aria-pressed={isDone}
                          aria-label={`Mark Lecture ${lecture.number} done`}
                          onClick={() => onToggleDone(lecture.id, !isDone)}
                          className="absolute top-0 left-3 z-10 flex h-[38px] w-7 items-center justify-center"
                        >
                          <DoneMark done={isDone} animate={justDone === lecture.id} size={18} />
                        </button>
                      )}
                      <a
                        href={`?lecture=${lecture.number}`}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={(event) => {
                          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                          event.preventDefault();
                          onSelect(lecture.number);
                        }}
                        className={`relative flex items-start gap-2 py-2 pr-4 text-[15px] leading-[22px] ${EDGE} ${upcoming ? "text-iron-gray" : ""} ${
                          isCurrent ? "font-semibold" : "hover:underline hover:underline-offset-4"
                        }`}
                      >
                        <span aria-hidden className="absolute top-2 left-10 w-4 text-right text-xs leading-[22px] font-normal text-iron-gray tabular-nums">
                          {lecture.number}
                        </span>
                        <span className="sr-only">Lecture {lecture.number}: </span>
                        <span className="min-w-0 flex-1">{lecture.title}</span>
                        {upcoming ? (
                          <span className="shrink-0 text-xs leading-[22px] text-iron-gray">
                            <span className="sr-only">Premieres </span>
                            {formatShortDate(lecture.premiereDate)}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>

      <div className={`mt-6 pr-4 ${EDGE}`}>
        <Link href={`/courses/${course.code}/about`} className="text-sm font-semibold underline underline-offset-4" data-annotation="8">
          About this course
        </Link>
      </div>
    </nav>
  );
}
