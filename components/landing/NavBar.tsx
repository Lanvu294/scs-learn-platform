import Image from "next/image";
import Link from "next/link";
import SchoolLockup from "./ui/SchoolLockup";

const LINKS = [
  { label: "Courses", href: "#courses" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

// Modeled on cmu.edu's header: one black bar with a solid Carnegie Red block
// (here the official SCS Learn icon) on the far left and white links on the
// right. The school is named at the far right of the same bar, set apart from
// the SCS Learn mark by the nav and a divider - brand rules don't allow the
// two marks directly side by side.
export default function NavBar() {
  return (
    <header className="bg-black text-white">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-stretch justify-between gap-4 pr-4 sm:pr-6 md:px-12 lg:px-16">
        <Link href="/" aria-label="SCS Learn home" className="flex shrink-0 items-center">
          <Image src="/brand/scs-learn-icon-red.png" alt="" width={64} height={64} priority className="h-16 w-16" />
        </Link>

        <div className="flex items-center gap-5 sm:gap-7">
          <nav className="hidden md:flex items-center gap-7">
            {LINKS.map(({ label, href }) => (
              <a key={label} href={href} className="link-swipe text-[15px] font-bold">
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="border border-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
            >
              Sign in
            </Link>
            <Link
              href="/login?mode=signup"
              className="border border-primary bg-primary px-4 py-2 text-sm font-semibold transition-colors hover:border-primary-dark hover:bg-primary-dark"
            >
              Sign up
            </Link>
          </div>
          <div className="hidden h-9 w-px bg-white/25 xl:block" aria-hidden />
          <SchoolLockup className="hidden text-[13px] xl:block" />
        </div>
      </div>
    </header>
  );
}
