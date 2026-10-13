import Link from "next/link";
import NavLogo from "./NavLogo";
import { wideContainer as CONTAINER } from "./ui/layout";

const LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const ROW = "flex items-center justify-between gap-3 sm:gap-6";

// A black row under a Carnegie Red rule (SCS mark, white links, one sign-in
// button; the login page itself offers the instructor path), then a site-title
// band. The site name lives in its own band, never beside the SCS mark: CMU's
// brand rules forbid locking text up with a unitmark.
export default function NavBar() {
  return (
    <>
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
              <Link
                href="/login"
                className="border border-white px-3 py-1 text-sm sm:px-5 sm:py-2 font-semibold whitespace-nowrap btn-fill-white hover:text-black"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="border-b border-gray-200 bg-white text-black">
        <div className={`${CONTAINER} py-4 xl:py-5`}>
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight xl:text-3xl"
          >
            SCS Learn
          </Link>
        </div>
      </div>
    </>
  );
}
