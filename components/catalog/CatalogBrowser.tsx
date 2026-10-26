"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  AREAS,
  COURSES,
  LEVELS,
  getArea,
  type AreaId,
  type CatalogCourse,
  type Level,
} from "@/lib/catalog/courses";

export type CatalogFilters = {
  q: string;
  areas: AreaId[];
  levels: Level[];
  languages: string[];
};

type Sort = "code" | "title";

const LANGUAGES = [...new Set(COURSES.map((course) => course.language))].sort();

function matches(course: CatalogCourse, { q, areas, levels, languages }: CatalogFilters) {
  if (areas.length && !areas.includes(course.area)) return false;
  if (levels.length && !levels.includes(course.level)) return false;
  if (languages.length && !languages.includes(course.language)) return false;
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    course.code,
    course.code.replace("-", ""),
    course.title,
    course.summary,
    course.language,
    getArea(course.area).name,
    ...course.instructors,
    ...course.topics,
  ]
    .join(" ")
    .toLowerCase();
  return query.split(/\s+/).every((word) => haystack.includes(word));
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/** Mirrors the filters into the URL, so a filtered catalog can be shared or bookmarked. */
function syncUrl({ q, areas, levels, languages }: CatalogFilters) {
  const params = new URLSearchParams();
  if (q.trim()) params.set("q", q.trim());
  areas.forEach((area) => params.append("area", area));
  levels.forEach((level) => params.append("level", level));
  languages.forEach((language) => params.append("language", language));
  const search = params.toString();
  window.history.replaceState(null, "", search ? `/courses?${search}` : "/courses");
}

function FilterGroup<T extends string>({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: { value: T; label: string; count: number }[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset className="border-t border-steel-gray pt-5">
      <legend className="float-left mb-3 w-full text-sm font-bold uppercase tracking-[0.08em]">{legend}</legend>
      <ul className="clear-left flex flex-col gap-1">
        {options.map(({ value, label, count }) => (
          <li key={value}>
            <label className="flex cursor-pointer items-center gap-3 py-1 text-[15px] hover:text-primary">
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => onToggle(value)}
                className="size-4 shrink-0 accent-primary"
              />
              <span className="flex-1">{label}</span>
              <span className="text-sm tabular-nums text-iron-gray">{count}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

function CourseRow({ course }: { course: CatalogCourse }) {
  return (
    <Link
      href={`/courses/${course.code}`}
      className="group grid grid-cols-1 gap-5 border-b border-steel-gray py-7 sm:grid-cols-[13rem_1fr] sm:gap-7"
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-black">
        <Image
          src={course.image}
          alt=""
          fill
          sizes="(min-width: 640px) 13rem, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span aria-hidden className="absolute inset-x-0 bottom-0 h-1 bg-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold">
          <span className="text-primary">{course.code}</span>
          <span className="text-iron-gray"> · {getArea(course.area).name}</span>
        </p>
        <h2 className="mt-1 font-brand text-2xl font-semibold leading-tight text-balance group-hover:text-primary">
          {course.title}
        </h2>
        <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-iron-gray">{course.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
          {[...course.instructors, course.level, course.language].map((tag) => (
            <li key={tag} className="bg-gray-light px-2.5 py-1">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

export default function CatalogBrowser({ initial }: { initial: CatalogFilters }) {
  const [filters, setFilters] = useState<CatalogFilters>(initial);
  const [sort, setSort] = useState<Sort>("code");

  useEffect(() => syncUrl(filters), [filters]);

  const results = useMemo(
    () =>
      COURSES.filter((course) => matches(course, filters)).sort((a, b) =>
        sort === "code" ? a.code.localeCompare(b.code) : a.title.localeCompare(b.title),
      ),
    [filters, sort],
  );

  // Facet counts ignore their own facet, so ticking "Robotics" still shows how
  // many courses ticking "Machine Learning" as well would add.
  const countBy = <K extends keyof Omit<CatalogFilters, "q">>(key: K, get: (c: CatalogCourse) => string) => {
    const pool = COURSES.filter((course) => matches(course, { ...filters, [key]: [] }));
    return (value: string) => pool.filter((course) => get(course) === value).length;
  };
  const areaCount = countBy("areas", (c) => c.area);
  const levelCount = countBy("levels", (c) => c.level);
  const languageCount = countBy("languages", (c) => c.language);

  const active = [
    ...filters.areas.map((id) => ({ label: getArea(id).name, clear: () => setFilters({ ...filters, areas: toggle(filters.areas, id) }) })),
    ...filters.levels.map((level) => ({ label: level, clear: () => setFilters({ ...filters, levels: toggle(filters.levels, level) }) })),
    ...filters.languages.map((language) => ({ label: language, clear: () => setFilters({ ...filters, languages: toggle(filters.languages, language) }) })),
  ];
  const clearAll = () => setFilters({ q: "", areas: [], levels: [], languages: [] });

  const sidebar = (
    <div className="flex flex-col gap-6">
      <FilterGroup
        legend="Area"
        options={AREAS.map((area) => ({ value: area.id, label: area.name, count: areaCount(area.id) }))}
        selected={filters.areas}
        onToggle={(id) => setFilters({ ...filters, areas: toggle(filters.areas, id) })}
      />
      <FilterGroup
        legend="Level"
        options={LEVELS.map((level) => ({ value: level, label: level, count: levelCount(level) }))}
        selected={filters.levels}
        onToggle={(level) => setFilters({ ...filters, levels: toggle(filters.levels, level) })}
      />
      <FilterGroup
        legend="Language"
        options={LANGUAGES.map((language) => ({ value: language, label: language, count: languageCount(language) }))}
        selected={filters.languages}
        onToggle={(language) => setFilters({ ...filters, languages: toggle(filters.languages, language) })}
      />
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
      <aside aria-label="Filters">
        <div className="relative">
          <label htmlFor="catalog-search" className="sr-only">
            Search courses
          </label>
          <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-iron-gray" />
          <input
            id="catalog-search"
            type="search"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder="Search the catalog"
            className="w-full border border-black/25 bg-white py-3 pr-3 pl-10 text-[15px] focus:border-primary focus:outline-none"
          />
        </div>

        <details className="group mt-6 lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            <SlidersHorizontal size={16} aria-hidden />
            Filters{active.length ? ` (${active.length})` : ""}
            <span className="ml-auto text-iron-gray group-open:hidden">Show</span>
            <span className="ml-auto hidden text-iron-gray group-open:inline">Hide</span>
          </summary>
          <div className="mt-6">{sidebar}</div>
        </details>
        <div className="mt-8 hidden lg:block">{sidebar}</div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b-2 border-black pb-4">
          <p aria-live="polite" className="text-[15px]">
            <span className="font-bold">{results.length}</span> {results.length === 1 ? "course" : "courses"}
            {filters.q.trim() && (
              <>
                {" "}
                matching <span className="font-semibold">&ldquo;{filters.q.trim()}&rdquo;</span>
              </>
            )}
          </p>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="text-iron-gray">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="border border-black/25 bg-white px-2 py-1.5 text-sm font-semibold focus:border-primary focus:outline-none"
            >
              <option value="code">Course number</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>

        {active.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {active.map(({ label, clear }) => (
              <button
                key={label}
                type="button"
                onClick={clear}
                aria-label={`Remove ${label} filter`}
                className="flex items-center gap-1.5 bg-black px-3 py-1.5 text-xs font-semibold text-white btn-fill-primary"
              >
                {label}
                <X size={13} aria-hidden />
              </button>
            ))}
            <button type="button" onClick={clearAll} className="px-2 text-xs font-semibold underline underline-offset-4 hover:text-primary">
              Clear all
            </button>
          </div>
        )}

        {results.length > 0 ? (
          <ul>
            {results.map((course) => (
              <li key={course.code}>
                <CourseRow course={course} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-16 text-center">
            <p className="font-brand text-2xl font-semibold">No courses match those filters.</p>
            <button type="button" onClick={clearAll} className="mt-4 text-sm font-semibold text-primary underline underline-offset-4">
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
