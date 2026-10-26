"use client";

/**
 * The serif lesson title at the top of a lesson pane. Read-only for students;
 * in the instructor editor (when `onChange` is passed) it's an inline input,
 * so imported lessons can be renamed the same way hand-written ones can.
 */
export default function LessonTitle({
  title,
  onChange,
}: {
  title: string;
  onChange?: (title: string) => void;
}) {
  if (!onChange) return <h1 className="topic-lesson-title">{title}</h1>;

  return (
    <h1 className="topic-lesson-title">
      <input
        value={title}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Lesson title"
        aria-label="Lesson title"
        title="Click to rename this lesson"
        className="w-full min-w-0 truncate bg-transparent border-b-2 border-transparent hover:border-gray-200 focus:border-primary outline-none"
      />
    </h1>
  );
}
