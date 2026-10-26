import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getCourse, instructorByline, isUpcoming } from "@/lib/courses";
import CourseNav from "@/components/courses/CourseNav";
import { CourseFitSection, GoFurtherSection, PracticeStatusSection } from "@/components/courses/CourseSections";
import Footer from "@/components/landing/Footer";
import DesignNotes from "@/components/DesignNotes";

// Everything off the main learning path: is this course a fit, what's coming,
// and where to go after it.

export async function generateMetadata({ params }: PageProps<"/courses/[code]/about">): Promise<Metadata> {
  const { code } = await params;
  const course = await getCourse(code);
  if (!course) return { title: "Course not found" };
  const title = `About ${course.code}: ${course.title}`;
  return {
    title,
    description: course.summary,
    alternates: { canonical: `/courses/${course.code}/about` },
    openGraph: { type: "website", siteName: "CS Learn", title: `${title} | CS Learn`, description: course.summary, url: `/courses/${course.code}/about` },
  };
}

export default async function CourseAboutPage({ params }: PageProps<"/courses/[code]/about">) {
  const { code } = await params;
  const course = await getCourse(code);
  if (!course) notFound();

  const lectureCount = course.units.reduce((sum, unit) => sum + unit.lectures.length, 0);
  const meta = [course.level, `${lectureCount} lectures`];
  if (isUpcoming(course.premiereDate)) meta.push(`Premieres ${formatDate(course.premiereDate)}`);

  return (
    <div className="course-page flex min-h-full flex-1 flex-col bg-white text-black">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>
      <CourseNav />
      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-[760px] flex-1 px-4 pt-8 pb-16 outline-none sm:px-6 lg:pt-12">
        <Link href={`/courses/${course.code}`} className="inline-flex items-center gap-1.5 text-sm font-semibold underline underline-offset-4">
          <ArrowLeft size={14} aria-hidden />
          Back to lectures
        </Link>
        <div className="mt-8">
          <p className="font-mono text-sm font-semibold text-iron-gray">{course.code}</p>
          <h1 className="mt-2 font-brand text-[2rem] leading-10 font-semibold text-balance md:text-[2.5rem] md:leading-[3rem]">{course.title}</h1>
          <p className="mt-3 text-base">{instructorByline(course.instructors.map((instructor) => instructor.name))}</p>
          <p className="mt-1 text-sm text-iron-gray">{meta.join(" · ")}</p>
          <p className="mt-4 text-base leading-relaxed">{course.summary}</p>
        </div>
        <div className="mt-16 flex flex-col gap-16" data-annotation="8" data-annotation-side="left">
          <CourseFitSection course={course} />
          <PracticeStatusSection course={course} />
          <GoFurtherSection />
        </div>
      </main>
      <Footer siteLinks />
      <DesignNotes />
    </div>
  );
}
