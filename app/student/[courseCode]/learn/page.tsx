import type { Metadata } from "next";
import { notFound } from "next/navigation";
import StudentCourseClient from "@/components/student/StudentCourseClient";
import { getStudentCourse } from "@/lib/student/data/course";
import AppHeader from "@/components/app/AppHeader";

export default async function StudentCoursePage({
  params,
  searchParams,
}: {
  params: Promise<{ courseCode: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { courseCode } = await params;
  const { lesson } = await searchParams;
  const course = await getStudentCourse(courseCode);

  if (!course) {
    notFound();
  }

  return (
    <StudentCourseClient
      course={course}
      initialLessonId={lesson}
      header={<AppHeader mode="learning" />}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseCode: string }>;
}): Promise<Metadata> {
  const { courseCode } = await params;
  return { title: `Learn ${courseCode}` };
}
