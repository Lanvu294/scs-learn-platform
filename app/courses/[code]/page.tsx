import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CirclePlay, Code2, FileText, ListChecks, Presentation, type LucideIcon } from "lucide-react";
import PageShell from "@/components/landing/PageShell";
import PageHeader from "@/components/landing/PageHeader";
import CmuLink from "@/components/landing/ui/CmuLink";
import YouTubeIcon from "@/components/landing/ui/YouTubeIcon";
import YouTubePreview from "@/components/landing/YouTubePreview";
import { wideContainer } from "@/components/landing/ui/layout";
import { COURSES, getArea, getCourse, type CatalogCourse } from "@/lib/catalog/courses";

// Only catalog courses get a page; anything else is a 404 rather than an
// on-demand render.
export const dynamicParams = false;

export function generateStaticParams() {
  return COURSES.map((course) => ({ code: course.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const course = getCourse((await params).code);
  if (!course) return {};
  return {
    title: `${course.code}: ${course.title} | CS Learn`,
    description: course.summary,
  };
}

const MATERIALS: Record<CatalogCourse["materials"][number], { icon: LucideIcon; text: string }> = {
  "Lecture videos": { icon: CirclePlay, text: "Every lecture, recorded in the classroom." },
  "Lecture notes": { icon: FileText, text: "The notes CMU students read alongside lecture." },
  Slides: { icon: Presentation, text: "The slide decks from each lecture." },
  Assignments: { icon: Code2, text: "Programming assignments, autograded when you submit." },
  Quizzes: { icon: ListChecks, text: "Check yourself with instant feedback." },
};

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "syllabus", label: "Syllabus" },
  { id: "lectures", label: "Lecture videos" },
  { id: "materials", label: "Course materials" },
];

const sectionHeading = "font-brand text-3xl font-semibold leading-tight";

export default async function CoursePage({ params }: { params: Promise<{ code: string }> }) {
  const course = getCourse((await params).code);
  if (!course) notFound();

  const area = getArea(course.area);
  const info = [
    { label: "Course number", value: course.code },
    { label: "Area", value: area.name },
    { label: course.instructors.length > 1 ? "Instructors" : "Instructor", value: course.instructors.join(", ") || "Carnegie Mellon faculty" },
    { label: "Level", value: course.level },
    { label: "Language", value: course.language },
  ];

  return (
    <PageShell>
      <PageHeader
        title={course.title}
        crumbs={[
          { label: "Courses", href: "/courses" },
          { label: area.name, href: `/courses?area=${area.id}` },
        ]}
        intro={
          <>
            <p className="text-sm font-bold text-primary">{course.code}</p>
            <p className="mt-1">{course.summary}</p>
          </>
        }
      />

      <div className={`${wideContainer} grid grid-cols-1 gap-12 py-12 md:py-16 lg:grid-cols-[1fr_20rem] lg:gap-16`}>
        <div className="order-2 flex min-w-0 flex-col gap-14 lg:order-1">
          <section id="overview" className="scroll-mt-24">
            <h2 className={sectionHeading}>Overview</h2>
            <p className="mt-5 max-w-3xl text-pretty text-lg leading-relaxed text-gray-800">{course.description}</p>
          </section>

          <section id="syllabus" className="scroll-mt-24">
            <h2 className={sectionHeading}>Syllabus</h2>
            <ol className="mt-6 border-t border-steel-gray">
              {course.topics.map((topic, i) => (
                <li key={topic} className="flex items-baseline gap-6 border-b border-steel-gray py-4">
                  <span className="w-16 shrink-0 text-sm font-bold tabular-nums text-primary">
                    Unit {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[17px] font-medium">{topic}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="lectures" className="scroll-mt-24">
            <h2 className={sectionHeading}>Lecture videos</h2>
            <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-iron-gray">
              Lectures for {course.code} will be free on YouTube, with no account needed. Lectures premiere in November.
            </p>
            <div className="mt-6 max-w-4xl">
              <YouTubePreview videoId={course.featuredVideoId} title={`${course.code}: ${course.title}`} />
            </div>
            <a
              href={course.playlistUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 border border-black px-5 py-2.5 text-sm font-semibold btn-fill-black hover:text-white"
            >
              <YouTubeIcon className="h-4 w-4" />
              CS Learn on YouTube
            </a>
          </section>

          <section id="materials" className="scroll-mt-24">
            <h2 className={sectionHeading}>Course materials</h2>
            <ul className="mt-6 border-t border-steel-gray">
              {course.materials.map((name) => {
                const { icon: Icon, text } = MATERIALS[name];
                return (
                  <li key={name} className="flex items-center gap-4 border-b border-steel-gray py-4">
                    <Icon size={20} strokeWidth={1.75} aria-hidden className="shrink-0 text-primary" />
                    <span className="w-36 shrink-0 font-semibold">{name}</span>
                    <span className="text-[15px] text-iron-gray">{text}</span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-sm text-iron-gray">Lectures will be free to watch. Courseware opens after the lectures, free with an account.</p>
          </section>

        </div>

        <aside className="order-1 lg:order-2">
          <div className="flex flex-col gap-8 lg:sticky lg:top-24">
            <div className="border border-steel-gray border-t-4 border-t-primary p-6">
              <h2 className="font-sans text-sm font-bold uppercase tracking-[0.08em]">Course info</h2>
              <dl className="mt-4 flex flex-col gap-3 text-[15px]">
                {info.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-iron-gray">{label}</dt>
                    <dd className="mt-0.5 font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              <CmuLink href={`/student/${course.code}`} className="mt-6">
                Start learning
              </CmuLink>
              <p className="mt-3 text-xs leading-relaxed text-iron-gray">
                Free. Courseware opens after the lectures premiere.
              </p>
            </div>

            <nav aria-label="On this page" className="hidden lg:block">
              <p className="text-sm font-bold uppercase tracking-[0.08em]">On this page</p>
              <ul className="mt-3 border-l-2 border-steel-gray">
                {SECTIONS.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="-ml-0.5 block border-l-2 border-transparent py-1.5 pl-4 text-[15px] text-iron-gray hover:border-primary hover:text-black"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>

    </PageShell>
  );
}
