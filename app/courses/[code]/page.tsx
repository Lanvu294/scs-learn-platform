import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse, instructorByline, numberLectures } from "@/lib/courses";
import CourseNav from "@/components/courses/CourseNav";
import CourseShell from "@/components/courses/CourseShell";
import Footer from "@/components/landing/Footer";
import DesignNotes from "@/components/DesignNotes";

// The page a learner lands on from a lecture's YouTube description
// (/courses/10-701?lecture=7): continue to the next lecture, review this one,
// check understanding, and find their place in the course. Fit, notifications,
// and next steps live on /courses/[code]/about.

export async function generateMetadata({ params }: PageProps<"/courses/[code]">): Promise<Metadata> {
  const { code } = await params;
  const course = await getCourse(code);
  if (!course) return { title: "Course not found" };

  const byline = instructorByline(course.instructors.map((instructor) => instructor.name));
  const title = `${course.code}: ${course.title}`;
  const description = `${course.summary} Free lectures from ${byline}, with slides, notes, and self-checks on CS Learn.`;
  return {
    title,
    description,
    alternates: { canonical: `/courses/${course.code}` },
    openGraph: {
      type: "website",
      siteName: "CS Learn",
      title: `${title} | CS Learn`,
      description,
      url: `/courses/${course.code}`,
    },
    twitter: { card: "summary", title: `${title} | CS Learn`, description },
  };
}

export default async function CoursePage({ params, searchParams }: PageProps<"/courses/[code]">) {
  // Awaiting searchParams renders per request, so ?lecture=N is in the server HTML.
  const [{ code }] = await Promise.all([params, searchParams]);
  const course = await getCourse(code);
  if (!course) notFound();

  return (
    <div className="course-page flex min-h-full flex-1 flex-col bg-white text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>
      <CourseNav />
      <CourseShell course={course} lectures={numberLectures(course.units)} today={new Date().toISOString().slice(0, 10)} />
      <Footer siteLinks />
      <DesignNotes />
      {/* Room for the sticky "Up next" bar, so it never covers the legal links. */}
      <div aria-hidden className="h-20 lg:hidden" />
    </div>
  );
}
