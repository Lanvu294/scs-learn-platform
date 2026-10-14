"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
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

// Hold on each course, then ease onto the next one. The hold is the gap
// between the start of one slide and the next.
const AUTOPLAY_MS = 2400;
const SLIDE_MS = 700;

export default function CourseCarousel({ courses, heading }: { courses: CarouselCourse[]; heading: ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const distanceRef = useRef(0);
  const jumpRef = useRef(0);
  const advanceRef = useRef<(direction: 1 | -1) => void>(() => {});
  const [distance, setDistance] = useState(0);
  const [offset, setOffset] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const next = card.offsetWidth + gap;
      distanceRef.current = next;
      setDistance((prev) => (Math.abs(prev - next) < 0.5 ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [courses.length]);

  const queueJump = (stepped: number) => {
    const token = ++jumpRef.current;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (jumpRef.current !== token) return;
        setAnimate(true);
        offsetRef.current = stepped;
        setOffset(stepped);
      });
    });
  };

  advanceRef.current = (direction: 1 | -1) => {
    const count = courses.length;
    if (count < 2 || distanceRef.current <= 0) return;
    jumpRef.current += 1;
    const current = offsetRef.current;

    // The list is rendered twice. Once the first copy has slid fully out of
    // view, jump back to the matching card in the first copy (no animation),
    // then ease one course forward. The two copies line up, so the jump is invisible.
    if (current >= count) {
      const base = current % count;
      setAnimate(false);
      offsetRef.current = base;
      setOffset(base);
      queueJump(base + direction);
      return;
    }

    if (direction < 0 && current === 0) {
      setAnimate(false);
      offsetRef.current = count;
      setOffset(count);
      queueJump(count - 1);
      return;
    }

    setAnimate(true);
    const next = current + direction;
    offsetRef.current = next;
    setOffset(next);
  };

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      advanceRef.current(1);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {heading}
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => advanceRef.current(-1)} disabled={courses.length < 2} aria-label="Previous courseware" className={NAV_BUTTON}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => advanceRef.current(1)} disabled={courses.length < 2} aria-label="Next courseware" className={NAV_BUTTON}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
      <ul
        ref={trackRef}
        aria-label="Courseware catalog"
        className="flex h-[26rem] gap-4 sm:h-[28rem] motion-reduce:transition-none"
        style={{
          transform: distance ? `translate3d(${-offset * distance}px, 0, 0)` : undefined,
          transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
        }}
      >
        {[...courses, ...courses].map((course, index) => (
          <li
            key={`${course.code}-${index}`}
            aria-hidden={index >= courses.length || undefined}
            className="group relative h-full shrink-0 basis-[85%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
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
    </div>
  );
}
