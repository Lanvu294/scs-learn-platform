import Link from "next/link";
import NavLogo from "./NavLogo";
import { wideContainer as CONTAINER } from "./ui/layout";

const LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const ROW = "flex items-center justify-between gap-3 sm:gap-6";

// A black row under a Carnegie Red rule: SCS mark and white links. Sign-in
// lives in the hero's "Sign up early" block, not here. The site name is
// set in the hero, never beside the SCS mark: CMU's brand rules forbid locking
// text up with a unitmark.
export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className={CONTAINER}>
        <div className={`${ROW} h-10 border-t border-primary sm:h-14 xl:h-16`}>
          <NavLogo />
          <div className="ml-auto flex items-center gap-6 self-stretch lg:gap-8">
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="link-swipe whitespace-nowrap text-[15px] font-bold"
                >
                  {label}
                </a>
              ))}
              <Link
                href="/instructor"
                className="link-swipe whitespace-nowrap text-[15px] font-bold"
              >
                For instructors
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
