/** Design-review notes. Each number matches a `data-annotation="N"` element on some page. */
export type Note = { n: number; title: string; body: string };

export const NOTES: Note[] = [
  { n: 1, title: "Rail", body: "A persistent, non-collapsible side nav to navigate by lecture and see what you've learned and where you are, keeping progress visible." },
  { n: 2, title: "Flow", body: "This page is for study: check, rewatch, study, finish. Clear hierarchy: title first, then description, with timing chunked into one smaller line below both." },
  { n: 3, title: "Check yourself", body: "Retrieval practice right after the lecture. Misses link to their chapter." },
  { n: 4, title: "Chapters + key ideas", body: "A one-line takeaway per chapter: the summary doubles as navigation." },
  { n: 5, title: "Finish", body: "Mark done, then hand off to Up next." },
  { n: 6, title: "Unreleased lectures", body: "No dead Watch button. Add to calendar instead." },
  { n: 7, title: "System", body: "One text edge. Boxes only for interactive parts. Red only for the primary action, current lecture, and focus." },
  { n: 8, title: "About page", body: "Links to more details about the course, always there as a link in the nav." },
  { n: 9, title: "Landing page", body: "One product name, cards link to course pages, carousel clones hidden from screen readers, real dates." },
];
