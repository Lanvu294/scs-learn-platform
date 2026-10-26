import type { Metadata } from "next";
import PageShell from "@/components/landing/PageShell";
import PageHeader from "@/components/landing/PageHeader";
import CatalogBrowser from "@/components/catalog/CatalogBrowser";
import { wideContainer } from "@/components/landing/ui/layout";
import { isAreaId, isLevel } from "@/lib/catalog/courses";

export const metadata: Metadata = {
  title: "Course catalog | CS Learn",
  description: "Browse free computer science courses from Carnegie Mellon University by area, level, and language.",
};

function asList(value: string | string[] | undefined): string[] {
  return value === undefined ? [] : Array.isArray(value) ? value : [value];
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  return (
    <PageShell>
      <PageHeader
        title="Courses"
        intro="Real Carnegie Mellon computer science courses, open to everyone. Lectures premiere on YouTube in November, with free courseware coming next."
      />

      <div className={`${wideContainer} py-10 md:py-14`}>
        <CatalogBrowser
          initial={{
            q: asList(params.q)[0] ?? "",
            areas: asList(params.area).filter(isAreaId),
            levels: asList(params.level).filter(isLevel),
            languages: asList(params.language),
          }}
        />
      </div>

    </PageShell>
  );
}
