import Image from "next/image";
import Link from "next/link";

// The course pages' product nav: the CMU mark and the CS Learn name, and a way
// back to the catalog. The SCS section links live in the footer here, so the
// lecture material starts high on a phone screen.
export default function CourseNav() {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex h-14 w-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Image
            src="/scs-2026-skinny-cmu.svg"
            alt="Carnegie Mellon University"
            width={643}
            height={111}
            priority
            className="hidden h-8 w-auto sm:block"
          />
          <span aria-hidden className="hidden h-6 w-px bg-white/40 sm:block" />
          <span className="text-lg font-bold tracking-tight whitespace-nowrap">CS Learn</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center">
            <li>
              <Link href="/#courses" className="inline-block py-2 text-sm font-semibold">
                <span className="link-swipe">Courses</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
