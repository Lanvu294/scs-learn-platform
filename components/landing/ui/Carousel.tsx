"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselSlide = {
  key: string;
  node: ReactNode;
};

const NAV_BUTTON =
  "flex size-11 items-center justify-center border border-black/20 text-black transition-colors hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-30";

// Hold on each slide, then ease onto the next one. The hold is the gap
// between the start of one slide and the next.
const DEFAULT_AUTOPLAY_MS = 2400;
const SLIDE_MS = 700;

// An endless, autoplaying row of slides with previous/next buttons beside the
// heading. Slides arrive already rendered, so server components can build them.
export default function Carousel({
  slides,
  heading,
  label,
  itemName,
  trackClassName,
  slideClassName,
  autoplayMs = DEFAULT_AUTOPLAY_MS,
}: {
  slides: CarouselSlide[];
  heading: ReactNode;
  label: string;
  itemName: string;
  trackClassName: string;
  slideClassName: string;
  autoplayMs?: number;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const offsetRef = useRef(0);
  const distanceRef = useRef(0);
  const jumpRef = useRef(0);
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
  }, [slides.length]);

  const queueJump = useCallback((stepped: number) => {
    const token = ++jumpRef.current;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (jumpRef.current !== token) return;
        setAnimate(true);
        offsetRef.current = stepped;
        setOffset(stepped);
      });
    });
  }, []);

  const advance = useCallback((direction: 1 | -1) => {
    const count = slides.length;
    if (count < 2 || distanceRef.current <= 0) return;
    jumpRef.current += 1;
    const current = offsetRef.current;

    // The list is rendered twice. Once the first copy has slid fully out of
    // view, jump back to the matching card in the first copy (no animation),
    // then ease one slide forward. The two copies line up, so the jump is invisible.
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
  }, [slides.length, queueJump]);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;

    const id = window.setInterval(() => {
      if (document.hidden) return;
      advance(1);
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [advance, autoplayMs]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-12 lg:px-16">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        {heading}
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => advance(-1)} disabled={slides.length < 2} aria-label={`Previous ${itemName}`} className={NAV_BUTTON}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" onClick={() => advance(1)} disabled={slides.length < 2} aria-label={`Next ${itemName}`} className={NAV_BUTTON}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
      <ul
        ref={trackRef}
        aria-label={label}
        className={`flex gap-4 motion-reduce:transition-none ${trackClassName}`}
        style={{
          transform: distance ? `translate3d(${-offset * distance}px, 0, 0)` : undefined,
          transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)` : "none",
        }}
      >
        {[...slides, ...slides].map((slide, index) => (
          <li
            key={`${slide.key}-${index}`}
            aria-hidden={index >= slides.length || undefined}
            className={`group relative shrink-0 ${slideClassName}`}
          >
            {slide.node}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
