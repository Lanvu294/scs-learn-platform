// Course content for the public course pages (/courses/[code]). Everything here
// is plain, JSON-serializable data: no functions, no Dates, no JSX. Swapping the
// mock files in lib/courses/data for a CMS or a JSON fetch only means changing
// lib/courses/index.ts, which is the one place pages read courses from.

export type Instructor = {
  name: string;
  // Background-removed portrait in public/landing/faculty, shared with the landing page.
  photo: string;
};

export type Level = "Undergraduate" | "Advanced undergraduate" | "Graduate";

export type Chapter = {
  title: string;
  // Offset into the video, in seconds. The first chapter starts at 0.
  start: number;
  // The chapter's takeaway in one sentence, shown under its title in Rewatch.
  keyIdea?: string;
};

export type Reading = {
  // The chapter or page name, shown on one line.
  title: string;
  // Who and where, shown muted underneath: "Goodfellow, Bengio & Courville · Deep Learning, Ch. 6".
  source: string;
  // Omitted for print-only references (a textbook chapter).
  url?: string;
};

export type SelfCheckQuestion = {
  // Unique within the lecture, e.g. "q1".
  id: string;
  prompt: string;
  // Exactly four choices.
  choices: string[];
  // Index into choices.
  answer: number;
  // One or two sentences, shown after the learner answers either way.
  explanation: string;
  // Index into the lecture's chapters: where to rewatch if the learner misses it.
  chapterIndex: number;
};

export type Lecture = {
  // Stable key for saved progress. Never reuse or rename one once published,
  // or learners lose their checkmarks. Lecture numbers come from position.
  id: string;
  title: string;
  // One sentence on what the lecture covers.
  summary: string;
  durationSeconds: number;
  // ISO date (YYYY-MM-DD) the video premieres on YouTube.
  premiereDate: string;
  // The 11-character id from youtube.com/watch?v=...
  youtubeVideoId: string;
  chapters: Chapter[];
  slidesUrl: string;
  // File sizes, shown next to the links so learners on slow connections can decide.
  slidesBytes: number;
  notesBytes: number;
  notesUrl: string;
  readings: Reading[];
  selfCheck: SelfCheckQuestion[];
};

export type Unit = {
  id: string;
  title: string;
  lectures: Lecture[];
};

export type RelatedCourse = {
  code: string;
  title: string;
  // A CS Learn course page ("/courses/10-701") or the course's own site.
  href: string;
  // Why it's a good first step, in one short sentence.
  reason: string;
};

export type Course = {
  // CMU course number, also the URL segment: "10-701".
  code: string;
  title: string;
  // One or two sentences for the page description and link previews.
  summary: string;
  instructors: Instructor[];
  level: Level;
  // Plain language, one item per thing a learner should already be comfortable with.
  prerequisites: string[];
  // Easier courses to take first, if the prerequisites look like a stretch.
  easierCourses: RelatedCourse[];
  // ISO date (YYYY-MM-DD) of the first lecture's premiere.
  premiereDate: string;
  // The id after list= in a youtube.com/playlist?list=... link. The playlist
  // holds the lectures in course order, so lecture N is playlist index N.
  youtubePlaylistId: string;
  units: Unit[];
};
