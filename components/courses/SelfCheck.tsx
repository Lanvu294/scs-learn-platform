"use client";

import { useEffect, useId, useRef, type Dispatch, type KeyboardEvent } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { formatTimestamp, lectureWatchUrl, type Course, type NumberedLecture, type SelfCheckQuestion } from "@/lib/courses";
import { NewTabNote } from "./NewTabNote";

// The quiz as a state machine. idle: the compact Start card. answering: a
// question, maybe with a choice selected (keyboard path) but not submitted.
// feedback: the answer is in and explained. There's no results screen: each
// miss links to its chapter as it happens, and the last question ends with
// the score and Retake.
export type QuizState =
  | { phase: "idle" }
  | { phase: "answering"; step: number; answers: number[]; selected: number | null }
  | { phase: "feedback"; step: number; answers: number[] };

export type QuizAction =
  | { type: "start" }
  | { type: "select"; choice: number }
  | { type: "submit"; choice: number }
  | { type: "next"; total: number }
  | { type: "retake" };

export const QUIZ_IDLE: QuizState = { phase: "idle" };

export function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "start":
    case "retake":
      return { phase: "answering", step: 0, answers: [], selected: null };
    case "select":
      return state.phase === "answering" ? { ...state, selected: action.choice } : state;
    case "submit":
      if (state.phase !== "answering") return state;
      return { phase: "feedback", step: state.step, answers: [...state.answers, action.choice] };
    case "next":
      if (state.phase !== "feedback" || state.step + 1 >= action.total) return state;
      return { phase: "answering", step: state.step + 1, answers: state.answers, selected: null };
  }
}

/** Chapter indexes behind the questions missed so far. */
export function missedChapters(state: QuizState, questions: SelfCheckQuestion[]): Set<number> {
  if (state.phase === "idle") return new Set();
  return new Set(questions.filter((question, i) => i < state.answers.length && state.answers[i] !== question.answer).map((question) => question.chapterIndex));
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];
// Hangs into the gutter from 640px so its text lines up with the headings
// (the extra 1px offsets the border).
export const CARD = "rounded-lg border border-steel-gray px-4 py-5 sm:-mx-[25px] sm:px-6 sm:py-6";
const PRIMARY_BUTTON = "inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-white btn-fill-primary-dark";
const SECONDARY_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-lg border border-black px-5 text-sm font-semibold transition-colors duration-150 hover:bg-tint motion-reduce:transition-none";

/** Check yourself: a compact card that expands into one question at a time. Nothing is saved. */
export default function SelfCheck({
  course,
  lecture,
  state,
  dispatch,
}: {
  course: Course;
  lecture: NumberedLecture;
  state: QuizState;
  dispatch: Dispatch<QuizAction>;
}) {
  const questions = lecture.selfCheck;
  const panelRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const radiosRef = useRef<(HTMLInputElement | null)[]>([]);
  const minutes = Math.max(1, Math.round((questions.length * 40) / 60));
  const started = state.phase !== "idle";

  // Focus follows the quiz: a new question takes focus on the panel; an
  // answer moves it to Next (or Retake after the last one).
  const focusKey = state.phase === "feedback" ? `next-${state.step}` : state.phase === "answering" ? `q-${state.step}` : null;
  useEffect(() => {
    if (!focusKey) return;
    if (focusKey.startsWith("next")) nextRef.current?.focus();
    else panelRef.current?.focus({ preventScroll: true });
  }, [focusKey]);

  // 1-4 pick an option; Enter checks the picked option, or goes on after feedback.
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    if (state.phase === "answering" && /^[1-9]$/.test(event.key)) {
      const choice = Number(event.key) - 1;
      if (choice < questions[state.step].choices.length) {
        event.preventDefault();
        dispatch({ type: "select", choice });
        radiosRef.current[choice]?.focus();
      }
      return;
    }
    const tag = (event.target as HTMLElement).tagName;
    if (event.key !== "Enter" || tag === "BUTTON" || tag === "A") return;
    if (state.phase === "answering" && state.selected !== null) {
      event.preventDefault();
      dispatch({ type: "submit", choice: state.selected });
    } else if (state.phase === "feedback") {
      event.preventDefault();
      dispatch({ type: "next", total: questions.length });
    }
  }

  return (
    <section id="check-yourself" aria-labelledby="check-yourself-heading" className={`scroll-mt-20 ${CARD}`} onKeyDown={onKeyDown}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="check-yourself-heading" className="font-sans text-2xl leading-8 font-semibold" data-annotation="3">
            Check yourself
          </h2>
          <p className="mt-1 text-sm leading-5 text-iron-gray">
            {questions.length} questions · about {minutes} min
          </p>
        </div>
        {!started ? (
          <button type="button" onClick={() => dispatch({ type: "start" })} className={PRIMARY_BUTTON}>
            Start
          </button>
        ) : null}
      </div>

      {/* Expands in place: grid rows ease from 0fr to 1fr (instant with reduced motion). */}
      <div
        className={`grid transition-[grid-template-rows] duration-250 ease-out motion-reduce:transition-none ${
          started ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div ref={panelRef} tabIndex={-1} className="pt-6 outline-none" hidden={!started}>
            {state.phase !== "idle" ? (
              <QuestionStep
                key={state.step}
                course={course}
                lecture={lecture}
                index={state.step}
                question={questions[state.step]}
                selected={state.phase === "answering" ? state.selected : null}
                answered={state.phase === "feedback" ? state.answers[state.step] : null}
                answers={state.answers}
                radiosRef={radiosRef}
                nextRef={nextRef}
                dispatch={dispatch}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuestionStep({
  course,
  lecture,
  index,
  question,
  selected,
  answered,
  answers,
  radiosRef,
  nextRef,
  dispatch,
}: {
  course: Course;
  lecture: NumberedLecture;
  index: number;
  question: SelfCheckQuestion;
  selected: number | null;
  answered: number | null;
  answers: number[];
  radiosRef: React.RefObject<(HTMLInputElement | null)[]>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  dispatch: Dispatch<QuizAction>;
}) {
  const name = useId();
  const total = lecture.selfCheck.length;
  const isAnswered = answered !== null;
  const correct = answered === question.answer;
  const isLast = index + 1 >= total;
  const chapter = lecture.chapters[question.chapterIndex] ?? lecture.chapters[0];
  const score = answers.filter((answer, i) => answer === lecture.selfCheck[i].answer).length;

  return (
    <fieldset>
      <legend className="contents">
        <span className="block text-sm leading-5 text-iron-gray tabular-nums">
          {index + 1} of {total}
        </span>
        <span className="mt-1 block text-base leading-6 font-semibold">{question.prompt}</span>
      </legend>

      <ul className="mt-3 flex flex-col">
        {question.choices.map((choice, i) => {
          const isPicked = isAnswered ? answered === i : selected === i;
          const isAnswer = i === question.answer;
          const showRight = isAnswered && isAnswer;
          const showWrong = isAnswered && answered === i && !isAnswer;
          return (
            <li key={i}>
              <label
                // A pointer click answers straight away; the keyboard selects
                // (arrows or 1-4) and Enter checks.
                onClick={(event) => {
                  if (!isAnswered && event.detail > 0) dispatch({ type: "submit", choice: i });
                }}
                className={`flex min-h-11 items-start gap-3 py-2 text-base leading-6 transition-colors duration-150 motion-reduce:transition-none ${
                  isAnswered ? "cursor-default" : "group cursor-pointer"
                } ${isAnswered && !showRight && !showWrong ? "text-iron-gray" : ""} ${showWrong ? "text-iron-gray line-through" : ""} ${
                  showRight || (!isAnswered && isPicked) ? "font-semibold" : ""
                } has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary`}
              >
                <input
                  ref={(el) => {
                    radiosRef.current[i] = el;
                  }}
                  type="radio"
                  name={name}
                  value={i}
                  checked={isPicked}
                  disabled={isAnswered}
                  onChange={() => dispatch({ type: "select", choice: i })}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors duration-150 motion-reduce:transition-none ${
                    showRight
                      ? "border-success bg-success text-white"
                      : showWrong
                        ? "border-error bg-error text-white"
                        : isPicked
                          ? "border-black"
                          : "border-gray-medium group-hover:border-black"
                  }`}
                >
                  {showRight ? <Check size={12} strokeWidth={3} className="quiz-pop" /> : null}
                  {showWrong ? <X size={12} strokeWidth={3} className="quiz-pop" /> : null}
                  {!isAnswered && isPicked ? <span className="size-2.5 rounded-full bg-black" /> : null}
                </span>
                <span>
                  <span className="sr-only">{i + 1}. </span>
                  {choice}
                </span>
              </label>
            </li>
          );
        })}
      </ul>

      {/* In the page from the start so the change is announced. */}
      <div aria-live="polite" className="text-sm leading-5">
        {isAnswered ? (
          <div className="slide-in mt-3">
            <p>
              <strong className={correct ? "text-success" : "text-error"}>{correct ? "Correct." : `Not quite. The answer is ${LETTERS[question.answer]}.`}</strong>{" "}
              {question.explanation}
            </p>
            {!correct ? (
              <a
                href={lectureWatchUrl(course.youtubePlaylistId, lecture, chapter.start)}
                target="_blank"
                rel="noopener"
                className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
              >
                Revisit {chapter.title} · <span className="font-mono text-xs font-normal tabular-nums">{formatTimestamp(chapter.start)}</span>
                <ArrowUpRight size={13} aria-hidden />
                <NewTabNote />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>

      {isAnswered ? (
        isLast ? (
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-5">
            <span className="font-semibold tabular-nums">
              {score} of {total} correct
            </span>
            <span aria-hidden className="text-iron-gray">·</span>
            <button
              ref={nextRef}
              type="button"
              onClick={() => dispatch({ type: "retake" })}
              className="font-semibold underline underline-offset-4"
            >
              Retake
            </button>
          </p>
        ) : (
          <button ref={nextRef} type="button" onClick={() => dispatch({ type: "next", total })} className={`${SECONDARY_BUTTON} mt-4`}>
            Next
          </button>
        )
      ) : selected !== null ? (
        <button type="button" onClick={() => dispatch({ type: "submit", choice: selected })} className={`${SECONDARY_BUTTON} mt-4`}>
          Check answer
        </button>
      ) : null}
    </fieldset>
  );
}
