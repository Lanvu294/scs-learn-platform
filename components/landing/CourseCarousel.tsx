"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselCourse = {
  code: string;
  title: string;
  meta: string;
  image: string;
};

const NAV_BUTTON =
  "flex size-11 items-center justify-center border border-black/20 text-black transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30";

export default function CourseCarousel({ courses, heading }: { courses: CarouselCourse[]; heading: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 1);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateButtons();
    track.addEventListener("scroll", updateButtons, { passive: true });
    const observer = new ResizeObserver(updateButtons);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", updateButtons);
      observer.disconnect();
    };
  }, [updateButtons]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {heading}
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => scrollByCard(-1)} disabled={!canPrev} aria-label="Previous courses" className={NAV_BUTTON}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => scrollByCard(1)} disabled={!canNext} aria-label="Next courses" className={NAV_BUTTON}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        aria-label="Course catalog"
        className="flex h-[26rem] snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] sm:h-[28rem] [&::-webkit-scrollbar]:hidden"
      >
        {courses.map((course) => (
          <li
            key={course.code}
            className="group relative h-full shrink-0 basis-[85%] snap-start sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
          >
            <div className="absolute inset-0 overflow-hidden bg-black">
              <Image
                src={course.image}
                alt=""
                fill
                // Not the card's width: the card is tall and the photos are
                // landscape, so object-cover scales each one to the card's
                // HEIGHT (26-28rem) and crops the sides - the rendered image
                // is ~800px wide. Sizing to the card width made the browser
                // fetch a copy half that size and stretch it.
                sizes="800px"
                quality={90}
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 max-w-[85%] bg-white bg-[linear-gradient(var(--color-primary),var(--color-primary))] bg-[length:100%_6px] bg-bottom bg-no-repeat px-5 pt-3 pb-4 text-black transition-[background-size,color] duration-300 ease-out group-hover:bg-[length:100%_100%] group-hover:text-white motion-reduce:transition-none">
              <p className="text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-white/85 motion-reduce:transition-none">
                {course.code}
              </p>
              <h3 className="font-sans text-lg font-bold leading-snug text-balance lg:text-xl">{course.title}</h3>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
