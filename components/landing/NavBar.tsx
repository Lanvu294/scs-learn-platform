"use client";

import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import NavLogo from "./NavLogo";

const LINKS = [
  { label: "About", href: "https://www.cs.cmu.edu/about/index" },
  { label: "Education", href: "https://www.cs.cmu.edu/education/index" },
  { label: "Research", href: "https://www.cs.cmu.edu/research/index" },
  { label: "News & Events", href: "https://www.cs.cmu.edu/news/index" },
  { label: "Industry & Entrepreneurship", href: "https://www.cs.cmu.edu/partnerships/index" },
  { label: "Giving", href: "https://www.cs.cmu.edu/giving/index" },
];

// Outlined utility actions, matching the Partner / Give buttons on cs.cmu.edu.
const UTILITY_BUTTON =
  "inline-flex items-center gap-1.5 border border-white px-5 py-3 text-sm leading-[16.6px] text-white transition-colors hover:bg-white hover:text-black";

function NavChevron() {
  return <ChevronDown size={14} strokeWidth={2.5} aria-hidden className="shrink-0" />;
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path d="M4 12 L12 4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.5 4 H12 V9.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black text-white shadow-[0_0_12px_rgba(0,0,0,0.25)]">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 md:px-12">
        <nav aria-label="Parent sites">
          <ol className="flex items-center text-base">
            <li>
              <a href="https://www.cmu.edu" className="link-swipe">
                CMU.EDU
              </a>
            </li>
            <li className="flex items-center before:mx-2 before:content-['>']">
              <a href="https://www.cs.cmu.edu" className="link-swipe">
                SCS
              </a>
            </li>
          </ol>
        </nav>
        <div className="hidden items-center gap-6 md:flex">
          <a href="https://www.cs.cmu.edu/partnerships/index" className={UTILITY_BUTTON}>
            Partner
          </a>
          <a
            href="https://givenow.cmu.edu/campaigns/42968/donations/new?a=8338659"
            className={UTILITY_BUTTON}
            target="_blank"
            rel="noopener noreferrer"
          >
            Give
            <ExternalIcon />
          </a>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12">
        <div className="h-px bg-primary" />
      </div>

      <div className="relative flex h-12 items-center">
        <NavLogo menuOpen={open} />
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-4 pr-8 xl:flex">
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold">
              <span className="link-swipe">{label}</span>
              <NavChevron />
            </a>
          ))}
        </nav>
        <div className="ml-auto flex h-12 items-stretch xl:ml-0">
          <button
            type="button"
            className="grid w-12 place-items-center xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <span className="w-4 md:w-12" aria-hidden />
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-white/15 px-6 py-3 xl:hidden">
          {LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-1.5 py-3 text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              {label}
              <NavChevron />
            </a>
          ))}
          <a href="https://www.cs.cmu.edu/partnerships/index" className="block py-3 text-sm font-semibold md:hidden">
            Partner
          </a>
          <a
            href="https://givenow.cmu.edu/campaigns/42968/donations/new?a=8338659"
            className="flex items-center gap-1.5 py-3 text-sm font-semibold md:hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            Give
            <ExternalIcon />
          </a>
        </nav>
      ) : null}
    </header>
  );
}
