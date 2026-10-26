import type { Course, Lecture, Unit } from "./types";
import { course as course17437 } from "./data/17-437";
import { course as course10701 } from "./data/10-701";
import { course as course17214 } from "./data/17-214";
import { course as course10725 } from "./data/10-725";

export type * from "./types";

// The one place course content is read from. Today it's the mock files in
// ./data; to move to a CMS or JSON, replace this list (or make the getters
// fetch) and keep the getters' signatures - pages only call them.
const COURSES: Course[] = [course17437, course10701, course17214, course10725];

export async function getCourse(code: string): Promise<Course | null> {
  return COURSES.find((course) => course.code === code) ?? null;
}

export async function getAllCourses(): Promise<Course[]> {
  return COURSES;
}

/** Synchronous access for build-time data on the landing page. */
export function listCourses(): Course[] {
  return COURSES;
}

export type NumberedLecture = Lecture & {
  // 1-based position in the course, which is also its playlist index.
  number: number;
  unitId: string;
};

export function numberLectures(units: Unit[]): NumberedLecture[] {
  const lectures: NumberedLecture[] = [];
  for (const unit of units) {
    for (const lecture of unit.lectures) {
      lectures.push({ ...lecture, number: lectures.length + 1, unitId: unit.id });
    }
  }
  return lectures;
}

/** Lecture N from a ?lecture=N value, or null when it's missing or out of range. */
export function parseLectureParam(value: string | string[] | undefined, lectureCount: number): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw || !/^\d+$/.test(raw)) return null;
  const n = Number(raw);
  return n >= 1 && n <= lectureCount ? n : null;
}

// YouTube links ----------------------------------------------------------------

/** The lecture's watch page inside the course playlist, so autoplay continues in order. */
export function lectureWatchUrl(playlistId: string, lecture: NumberedLecture, startSeconds?: number): string {
  const params = new URLSearchParams({ v: lecture.youtubeVideoId, list: playlistId, index: String(lecture.number) });
  if (startSeconds) params.set("t", `${startSeconds}s`);
  return `https://www.youtube.com/watch?${params.toString()}`;
}

export function playlistUrl(playlistId: string): string {
  return `https://www.youtube.com/playlist?list=${playlistId}`;
}

// Formatting -------------------------------------------------------------------

/** 754 -> "12:34", 4830 -> "1:20:30". */
export function formatTimestamp(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const ss = String(seconds).padStart(2, "0");
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${ss}` : `${minutes}:${ss}`;
}

/** 4830 -> "1 hr 20 min". */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.round(totalSeconds / 60);
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours} hr ${minutes % 60} min` : `${minutes} min`;
}

// Dates are calendar days with no time zone; format them in UTC so the server
// and every learner see the same day.
const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const SHORT_DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });

/** "2026-11-05" -> "November 5, 2026". */
export function formatDate(isoDate: string): string {
  return DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
}

const MONTH_DAY_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: "UTC" });

/** "2026-11-05" -> "November 5". */
export function formatMonthDay(isoDate: string): string {
  return MONTH_DAY_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
}

/** "2026-11-05" -> "Nov 5". */
export function formatShortDate(isoDate: string): string {
  return SHORT_DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
}

/** True until the day the video premieres (in UTC). */
export function isUpcoming(isoDate: string, now: Date = new Date()): boolean {
  return isoDate > now.toISOString().slice(0, 10);
}

export function instructorByline(names: string[]): string {
  if (names.length < 3) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** The earliest premiere across the catalog, for the landing page's "Premieres ..." copy. */
export function firstPremiereDate(): string {
  return COURSES.map((course) => course.premiereDate).sort()[0];
}

/** 2_400_000 -> "2.4 MB", 380_000 -> "380 KB". */
export function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
  return `${Math.round(bytes / 1000)} KB`;
}

/** The landing page's tag for a course card: "Premieres Nov 3" or, once it's started, "Premiering now". */
export function premiereLabel(course: Pick<Course, "premiereDate">, now: Date = new Date()): string {
  return isUpcoming(course.premiereDate, now) ? `Premieres ${formatShortDate(course.premiereDate)}` : "Premiering now";
}

/** True once any course in the catalog has premiered its first lecture. */
export function catalogHasStarted(now: Date = new Date()): boolean {
  return COURSES.some((course) => !isUpcoming(course.premiereDate, now));
}

// Calendar -----------------------------------------------------------------------

function icsEscape(text: string): string {
  return text.replace(/\\/g, "\\\\").replace(/;/g, "\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

/** The download URL for a lecture's premiere as a calendar file (app/api/ics). */
export function premiereCalendarUrl(courseCode: string, lectureNumber: number): string {
  return `/api/ics/${courseCode}/${lectureNumber}`;
}

/** "10-701-lecture-8.ics" */
export function premiereCalendarFilename(courseCode: string, lectureNumber: number): string {
  return `${courseCode}-lecture-${lectureNumber}.ics`;
}

/**
 * A one-event .ics file for a lecture's premiere. All-day, because YouTube
 * premiere times aren't in the data yet. Built from the data alone (no clock),
 * so the same lecture always produces the same file.
 */
export function premiereCalendarIcs(course: Course, lecture: NumberedLecture): string {
  const day = lecture.premiereDate.replace(/-/g, "");
  const next = new Date(`${lecture.premiereDate}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  const end = next.toISOString().slice(0, 10).replace(/-/g, "");
  const watch = lectureWatchUrl(course.youtubePlaylistId, lecture);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CS Learn//Course premieres//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${course.code}-${lecture.id}@cs-learn`,
    `DTSTAMP:${day}T000000Z`,
    `DTSTART;VALUE=DATE:${day}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${icsEscape(`${course.code} Lecture ${lecture.number} premieres: ${lecture.title}`)}`,
    `DESCRIPTION:${icsEscape(`Free on YouTube from CS Learn.\n${watch}`)}`,
    `URL:${watch}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}
