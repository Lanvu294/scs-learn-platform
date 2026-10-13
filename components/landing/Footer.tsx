import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import YouTubeIcon from "./ui/YouTubeIcon";
import { SCS_LEARN_YOUTUBE_URL } from "./links";
import { wideContainer } from "./ui/layout";

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "Courses", href: "#courses" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Lectures on YouTube", href: SCS_LEARN_YOUTUBE_URL },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "My courses", href: "/student" },
    ],
  },
  {
    title: "Instructors",
    links: [
      { label: "Instructor sign in", href: "/login?next=/instructor" },
      { label: "Instructor dashboard", href: "/instructor" },
    ],
  },
  {
    title: "Carnegie Mellon",
    links: [
      { label: "School of Computer Science", href: "https://www.cs.cmu.edu" },
      { label: "Carnegie Mellon University", href: "https://www.cmu.edu" },
    ],
  },
];

const BOTTOM_LINKS = [{ label: "Legal Info", href: "https://www.cmu.edu/legal/" }];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

// Modeled on cs.cmu.edu's footer: the vertical mark hanging from the top edge,
// link columns under red rules, and a white legal bar.
export default function Footer() {
  return (
    <footer className="bg-gray-light text-black">
      <div className={`${wideContainer} grid grid-cols-1 gap-12 pb-12 lg:grid-cols-[13.5rem_1fr] lg:gap-16`}>
        <div className="flex flex-col items-start">
          <Image
            src="/scs-2026-vertical-red.svg"
            alt="Carnegie Mellon University Kenneth C. Griffin School of Computer Science"
            width={229}
            height={409}
            className="h-auto w-54"
          />
          <p className="mt-10 text-2xl font-bold tracking-tight">SCS Learn</p>
          <address className="mt-3 text-[15px] leading-snug not-italic">
            5000 Forbes Avenue
            <br />
            Pittsburgh, PA 15213
          </address>
          <a
            href={SCS_LEARN_YOUTUBE_URL}
            {...external}
            aria-label="SCS Learn on YouTube"
            className="mt-6 text-black hover:text-primary"
          >
            <YouTubeIcon className="h-6 w-6" />
          </a>
          <a
            href="https://www.cmu.edu"
            {...external}
            className="mt-8 border border-black px-4 py-2.5 text-sm btn-fill-black hover:text-white"
          >
            CMU.EDU
          </a>
        </div>

        <div className="flex flex-col lg:pt-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="border-b-2 border-primary pb-3 font-sans text-lg font-bold">{col.title}</h3>
                <ul>
                  {col.links.map((link) => (
                    <li key={link.label} className="border-b border-steel-gray">
                      <Link
                        href={link.href}
                        {...(link.href.startsWith("http") ? external : {})}
                        className="block py-3 text-[15px] hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <a
            href="#"
            className="mt-10 flex self-end border border-primary bg-white text-sm hover:text-primary"
          >
            <span className="flex h-11 w-11 items-center justify-center bg-primary text-white">
              <ArrowUp size={22} strokeWidth={1.5} />
            </span>
            <span className="flex items-center px-4">Back to top</span>
          </a>
        </div>
      </div>

      <div className="bg-white">
        <div className={`${wideContainer} flex flex-wrap items-center gap-x-6 gap-y-2 py-5 text-sm`}>
          <span className="font-bold">© Carnegie Mellon University {new Date().getFullYear()}</span>
          {BOTTOM_LINKS.map((link) => (
            <a key={link.label} href={link.href} {...external} className="underline underline-offset-4 hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
