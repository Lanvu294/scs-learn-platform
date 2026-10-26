"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

// Absolute paths so the bar works the same on every page.
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Lectures", href: "/#lectures" },
  { label: "Courses", href: "/courses" },
  { label: "Team", href: "/team" },
];

// /give redirects to the giving form (next.config.ts).
const DONATE_HREF = "/give";

/**
 * CS Learn's header. On the homepage (`overlay`) it has no bar of its own: it
 * floats over the hero photo, OpenCourseWare-style, with a soft fade at the
 * top so the white links read on any part of the image. On inner pages,
 * which have no photo, it's a plain white bar.
 */
export default function NavBar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/60 to-transparent text-white"
          : "sticky top-0 z-50 border-b border-steel-gray bg-white text-black"
      }
    >
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 md:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image src="/brand/cs-learn-icon-red.png" alt="" width={40} height={40} priority className="h-10 w-10" />
          <span className="text-xl font-bold tracking-tight">CS Learn</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="text-[15px] font-semibold">
              <span className="link-swipe">{label}</span>
            </Link>
          ))}
          <a
            href={DONATE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-primary px-5 py-2.5 text-sm font-semibold text-white btn-fill-primary-dark"
          >
            Donate
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </nav>

        <button
          type="button"
          className="grid size-11 place-items-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className={`px-4 pt-1 pb-5 sm:px-6 md:hidden ${overlay ? "bg-black/90" : "border-t border-steel-gray bg-white"}`}
        >
          {LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`block border-b py-3.5 text-base font-semibold ${overlay ? "border-white/15" : "border-steel-gray"}`}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a
            href={DONATE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-1.5 bg-primary px-5 py-2.5 text-sm font-semibold text-white"
          >
            Donate
            <ArrowUpRight size={16} aria-hidden />
          </a>
        </nav>
      ) : null}
    </header>
  );
}
