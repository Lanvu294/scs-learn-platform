import Link from "next/link";
import { Search } from "lucide-react";
import NavLogo from "./NavLogo";
import { wideContainer as CONTAINER } from "./ui/layout";

const LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const SIGN_IN = [
  { label: "Student sign in", href: "/login" },
  { label: "Instructor sign in", href: "/login?next=/instructor" },
];

const ROW = "flex items-center justify-between gap-6";

// Modeled on cmu.edu's header: a black utility row with a breadcrumb and
// square outlined buttons, then a Carnegie Red rule above the main row with
// the SCS Learn band logo and white links. Brand assets are from the SCS
// Learn logo kit (public/).
export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className={`${CONTAINER} ${ROW} py-3`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-base font-semibold uppercase">
            <li>
              <a href="https://www.cmu.edu" className="link-swipe">
                CMU.EDU
              </a>
            </li>
            <li aria-hidden className="text-white/50">
              &gt;
            </li>
            <li>
              <Link href="/" aria-current="page" className="link-swipe">
                SCS Learn
              </Link>
            </li>
          </ol>
        </nav>
        <div className="flex items-center gap-6">
          {SIGN_IN.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="border border-white px-5 py-2.5 text-sm font-semibold whitespace-nowrap btn-fill-white hover:text-black"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className={CONTAINER}>
        <div className={`${ROW} relative h-10 border-t border-primary xl:h-12`}>
          {/* At the top of the page the mark is twice the row's height, so half of it hangs over the hero below. */}
          <NavLogo />
          <div className="ml-auto flex items-center gap-6 self-stretch lg:gap-8">
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="link-swipe whitespace-nowrap text-[15px] font-bold">
                  {label}
                </a>
              ))}
              <Link href="/instructor" className="link-swipe whitespace-nowrap text-[15px] font-bold">
                For instructors
              </Link>
            </nav>
            <button
              type="button"
              aria-label="Search"
              className="flex aspect-square items-center justify-center self-stretch bg-primary text-white btn-fill-primary-dark"
            >
              <Search className="h-5 w-5" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
