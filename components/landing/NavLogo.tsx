import Image from "next/image";
import Link from "next/link";

/**
 * SCS's compact mark (the one cs.cmu.edu's nav uses), sized to sit between
 * the row's red top rule and its bottom edge.
 */
export default function NavLogo() {
  return (
    <Link href="/" aria-label="SCS Learn home" className="block shrink-0 self-start">
      <Image
        src="/scs-2026-skinny-cmu.svg"
        alt="Carnegie Mellon University Kenneth C. Griffin School of Computer Science"
        width={643}
        height={111}
        priority
        className="h-[calc(2.5rem-1px)] w-auto max-w-none sm:h-[calc(3.5rem-1px)] xl:h-[calc(4rem-1px)]"
      />
    </Link>
  );
}
