import Link from "next/link";
import NavLogo from "./NavLogo";
import { wideContainer as CONTAINER } from "./ui/layout";

const LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const ROW = "flex items-center justify-between gap-6";

// A single black row under a Carnegie Red rule: the SCS mark, white links,
// and one sign-in button (the login page itself offers the instructor path).
// Brand assets are from the SCS Learn logo kit (public/).
export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-black text-white">
      <div className={CONTAINER}>
        <div className={`${ROW} relative h-14 border-t border-primary xl:h-16`}>
          {/* At the top of the page the mark is taller than the row, so part of it hangs over the hero below. */}
          <NavLogo />
          {/* The site name, set apart from the school mark by clear space and a rule
              (never locked up with it). The offset clears the mark at its widest. */}
          <Link
            href="/"
            className="ml-[21rem] hidden items-center self-stretch border-l border-white/30 pl-6 text-2xl font-bold tracking-tight whitespace-nowrap lg:flex xl:ml-[24rem] xl:text-[1.7rem]"
          >
            SCS Learn
          </Link>
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
            <Link
              href="/login"
              className="border border-white px-5 py-2 text-sm font-semibold whitespace-nowrap btn-fill-white hover:text-black"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
