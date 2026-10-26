"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { SCS_LEARN_YOUTUBE_SUBSCRIBE_URL } from "./links";
import { YouTubeColorIcon } from "./ui/YouTubeIcon";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "CS Learn",
    links: [
      { label: "About", href: "/about" },
      { label: "Lectures", href: "/#lectures" },
      { label: "Courses", href: "/courses" },
      { label: "Team", href: "/team" },
    ],
  },
  {
    title: "Stay in touch",
    links: [
      { label: "Get email updates", href: "/#updates" },
      { label: "Subscribe on YouTube", href: SCS_LEARN_YOUTUBE_SUBSCRIBE_URL },
      { label: "Sign in", href: "/login" },
    ],
  },
  {
    title: "Carnegie Mellon",
    links: [
      { label: "School of Computer Science", href: "https://www.cs.cmu.edu" },
      { label: "Carnegie Mellon University", href: "https://www.cmu.edu" },
      { label: "ScottyLabs", href: "https://scottylabs.org" },
    ],
  },
];

const BOTTOM_LINKS = [{ label: "Legal Info", href: "https://www.cmu.edu/legal/" }];

function scrollToTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

// CS Learn's own footer, in the cs.cmu.edu footer's visual language: link
// columns under red rules, the sweep-in "Back to top" button, and the white
// legal bar.
export default function Footer() {
  return (
    <footer className="bg-white text-black">
      <div className="bg-gray-light">
        <div className="flex w-full flex-col gap-12 px-4 pt-14 pb-12 sm:px-6 md:px-12 lg:flex-row lg:gap-16">
          <div className="flex max-w-xs flex-col items-start gap-5">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/brand/cs-learn-icon-red.png" alt="" width={48} height={48} className="h-12 w-12" />
              <span className="text-2xl font-bold tracking-tight">CS Learn</span>
            </Link>
            <p className="text-sm leading-relaxed text-iron-gray">
              Free computer science lectures and courseware from Carnegie Mellon University. Built by students, with
              the support of ScottyLabs.
            </p>
            <a
              href={SCS_LEARN_YOUTUBE_SUBSCRIBE_URL}
              {...external}
              className="inline-flex items-center gap-2.5 bg-black py-2.5 pr-5 pl-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#272727]"
            >
              <YouTubeColorIcon className="h-6 w-6 shrink-0" />
              Subscribe on YouTube
            </a>
          </div>

          <div className="flex flex-1 flex-col">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
              {COLUMNS.map((column) => (
                <div key={column.title}>
                  <p className="border-b-[3px] border-primary pb-3.5 text-base font-bold">{column.title}</p>
                  <ul>
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          {...(link.href.startsWith("http") ? external : {})}
                          className="block border-b border-[#6d6e71]/40 py-3.5 text-sm hover:border-black"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group relative mt-10 inline-flex min-h-[45px] w-full items-center self-end overflow-hidden border border-primary py-3 pr-5 pl-[calc(43px+1.25rem)] text-sm font-semibold sm:w-fit"
            >
              <span className="absolute inset-y-0 left-0 w-[43px] bg-primary transition-[width] duration-300 group-hover:w-full motion-reduce:transition-none" />
              <span className="absolute inset-y-0 left-0 flex w-[43px] items-center justify-center text-white">
                <ArrowUp size={18} strokeWidth={2} aria-hidden />
              </span>
              <span className="relative group-hover:text-white">Back to top</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-x-8 gap-y-2 px-4 py-6 text-sm font-semibold sm:px-6 md:px-12">
        <p>© Carnegie Mellon University {new Date().getFullYear()}</p>
        {BOTTOM_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...external}
            className="underline decoration-1 underline-offset-4 hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
