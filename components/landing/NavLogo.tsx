"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const swap = "origin-top-left transition-[opacity,scale] duration-300 ease-out motion-reduce:transition-none";

/**
 * The hanging primary mark while the page is at the very top; once scrolled,
 * it shrinks away and the skinny mark (which fits inside the nav row) grows
 * into its place.
 */
export default function NavLogo() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <Link href="/" aria-label="SCS Learn home" className="absolute top-0 left-0 block">
      <Image
        src="/scs-2026-primary-red-white.svg"
        alt=""
        width={685}
        height={192}
        priority
        className={`${swap} h-20 w-auto max-w-none xl:h-24 ${
          compact ? "absolute top-0 left-0 scale-50 opacity-0" : "relative"
        }`}
      />
      <Image
        src="/scs-2026-skinny-cmu.svg"
        alt=""
        width={643}
        height={111}
        loading="eager"
        // The row's height less its 1px red top border, so the mark sits between the rule and the row's bottom edge.
        className={`${swap} h-[calc(2.5rem-1px)] w-auto max-w-none xl:h-[calc(3rem-1px)] ${
          compact ? "relative" : "absolute top-0 left-0 scale-200 opacity-0"
        }`}
      />
    </Link>
  );
}
