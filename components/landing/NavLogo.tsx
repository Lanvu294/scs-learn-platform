import Image from "next/image";
import Link from "next/link";

/**
 * The Griffin SCS wordmark cs.cmu.edu uses: the horizontal lockup hangs out of
 * the nav bar on wide screens, and the compact mark sits inside the bar below
 * that breakpoint.
 */
export default function NavLogo() {
  return (
    <Link
      href="/"
      aria-label="SCS Learn home"
      className="z-10 ml-4 flex h-12 w-[min(277px,calc(100vw-8.75rem))] shrink-0 items-center sm:ml-6 md:ml-12 xl:absolute xl:top-0 xl:left-12 xl:ml-0 xl:h-auto xl:w-auto"
    >
      <Image
        src="/scs-2026-primary-red-white.svg"
        alt=""
        width={685}
        height={192}
        priority
        className="hidden h-[91px] w-auto shadow-[6px_6px_20px_rgba(0,0,0,0.2)] xl:block"
      />
      <Image
        src="/scs-2026-skinny-cmu.svg"
        alt=""
        width={643}
        height={111}
        priority
        className="h-12 w-full object-contain object-left xl:hidden"
      />
    </Link>
  );
}
