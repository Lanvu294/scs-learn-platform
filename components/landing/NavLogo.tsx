"use client";

import { useLayoutEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";

// How far the page travels while the hanging wordmark eases into the skinny mark.
const SCROLL_RANGE = 220;

/**
 * The Griffin SCS wordmark hangs out of the bar on wide screens. As the page
 * scrolls, it eases into the skinny mark that already sits in the bar on
 * smaller screens. The blend follows the scroll instead of flipping at a line.
 */
export default function NavLogo() {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    const link = linkRef.current;
    if (!link) return;
    const wideQuery = window.matchMedia("(min-width: 80rem)");
    const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const apply = () => {
      frame = 0;
      const wide = wideQuery.matches;
      const raw = Math.min(1, Math.max(0, window.scrollY / SCROLL_RANGE));
      const progress = reduceQuery.matches ? (raw > 0 ? 1 : 0) : raw * raw * (3 - 2 * raw);
      // Matching fades so the two marks trade places without a gap in the middle.
      const wordmark = wide ? 1 - progress : 0;
      const skinny = wide ? progress : 1;
      link.style.setProperty("--logo-wordmark", wordmark.toFixed(4));
      link.style.setProperty("--logo-skinny", skinny.toFixed(4));
      link.style.setProperty("--logo-scale", (1 - progress * 0.05).toFixed(4));
      link.style.setProperty("--logo-lift", (progress * 10).toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    wideQuery.addEventListener("change", apply);
    reduceQuery.addEventListener("change", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      wideQuery.removeEventListener("change", apply);
      reduceQuery.removeEventListener("change", apply);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Link
      ref={linkRef}
      href="/"
      aria-label="SCS Learn home"
      style={
        {
          "--logo-wordmark": 1,
          "--logo-skinny": 0,
          "--logo-scale": 1,
          "--logo-lift": 0,
        } as CSSProperties
      }
      className="relative z-10 ml-4 flex h-12 w-[min(277px,calc(100vw-8.75rem))] shrink-0 items-center sm:ml-6 md:ml-12 xl:absolute xl:top-0 xl:left-12 xl:ml-0 xl:w-[17.5rem]"
    >
      <Image
        src="/scs-2026-primary-red-white.svg"
        alt=""
        width={685}
        height={192}
        priority
        style={{
          opacity: "var(--logo-wordmark)",
          transform: "translate3d(0, calc(var(--logo-lift) * -1px), 0) scale(var(--logo-scale))",
        }}
        className="pointer-events-none absolute top-0 left-0 hidden h-[91px] w-auto max-w-none origin-top-left shadow-[6px_6px_20px_rgba(0,0,0,0.2)] will-change-[opacity,transform] xl:block"
      />
      <Image
        src="/scs-2026-skinny-cmu.svg"
        alt=""
        width={643}
        height={111}
        priority
        className="h-12 w-full object-contain object-left will-change-[opacity] xl:opacity-[var(--logo-skinny)]"
      />
    </Link>
  );
}
