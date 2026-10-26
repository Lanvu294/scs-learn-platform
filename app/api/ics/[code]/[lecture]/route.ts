import { getCourse, numberLectures, parseLectureParam, premiereCalendarFilename, premiereCalendarIcs } from "@/lib/courses";

// GET /api/ics/10-701/8 -> 10-701-lecture-8.ics, an all-day event for the
// lecture's YouTube premiere. Public: the course pages' "Add to calendar".
export async function GET(_request: Request, { params }: RouteContext<"/api/ics/[code]/[lecture]">) {
  const { code, lecture: lectureParam } = await params;
  const course = await getCourse(code);
  if (!course) return new Response("Course not found", { status: 404 });

  const lectures = numberLectures(course.units);
  const number = parseLectureParam(lectureParam, lectures.length);
  if (!number) return new Response("Lecture not found", { status: 404 });

  return new Response(premiereCalendarIcs(course, lectures[number - 1]), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${premiereCalendarFilename(course.code, number)}"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
