"use client";

import { useCallback, useSyncExternalStore } from "react";

// Which lectures a learner has marked done, kept in localStorage per course (no
// login). Stored as lecture ids, not numbers, so reordering lectures in the
// data doesn't move anyone's checkmarks.

const KEY_PREFIX = "cs-learn:progress:";
// Same-tab writes don't fire "storage", so writers announce themselves.
const CHANGE_EVENT = "cs-learn:progress-change";

const EMPTY: ReadonlySet<string> = new Set();

// useSyncExternalStore needs the same object back until the data changes.
const cache = new Map<string, { raw: string | null; value: ReadonlySet<string> }>();

function storageKey(courseCode: string): string {
  return `${KEY_PREFIX}${courseCode}`;
}

function readRaw(courseCode: string): string | null {
  try {
    return window.localStorage.getItem(storageKey(courseCode));
  } catch {
    // Storage blocked (private mode, disabled cookies): behave as no progress.
    return null;
  }
}

function read(courseCode: string): ReadonlySet<string> {
  const raw = readRaw(courseCode);
  const cached = cache.get(courseCode);
  if (cached && cached.raw === raw) return cached.value;

  let value: ReadonlySet<string> = EMPTY;
  if (raw) {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (Array.isArray(parsed)) value = new Set(parsed.filter((id): id is string => typeof id === "string"));
    } catch {
      // Corrupt entry: ignore it rather than break the page.
    }
  }
  cache.set(courseCode, { raw, value });
  return value;
}

function write(courseCode: string, done: ReadonlySet<string>): void {
  try {
    window.localStorage.setItem(storageKey(courseCode), JSON.stringify([...done]));
  } catch {
    // Can't persist; the toggle still won't stick, which is the honest outcome.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getServerSnapshot(): ReadonlySet<string> {
  return EMPTY;
}

export type CourseProgress = {
  done: ReadonlySet<string>;
  // False during server render and hydration, true once localStorage has been read.
  hydrated: boolean;
  setDone: (lectureId: string, isDone: boolean) => void;
};

function subscribeNothing(): () => void {
  return () => {};
}

/**
 * Server render and hydration see no progress; the saved state arrives right
 * after mount. Callers keep their layout the same either way so nothing jumps.
 */
export function useCourseProgress(courseCode: string): CourseProgress {
  const done = useSyncExternalStore(
    subscribe,
    () => read(courseCode),
    getServerSnapshot,
  );
  const hydrated = useSyncExternalStore(subscribeNothing, () => true, () => false);

  const setDone = useCallback(
    (lectureId: string, isDone: boolean) => {
      const next = new Set(read(courseCode));
      if (isDone) next.add(lectureId);
      else next.delete(lectureId);
      write(courseCode, next);
    },
    [courseCode],
  );

  return { done, hydrated, setDone };
}
