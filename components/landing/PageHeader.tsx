import type { ReactNode } from "react";
import Link from "next/link";
import { wideContainer } from "./ui/layout";

/**
 * The title band at the top of every inner page (catalog, about, team):
 * breadcrumb, serif title over a short red rule, and one line of intro.
 */
export default function PageHeader({
  title,
  intro,
  crumbs = [],
}: {
  title: string;
  intro?: ReactNode;
  /** Links between Home and this page. */
  crumbs?: { label: string; href: string }[];
}) {
  return (
    <section className="border-b border-steel-gray bg-gray-light text-black">
      <div className={`${wideContainer} py-10 md:py-14`}>
        <nav aria-label="Breadcrumb" className="text-sm text-iron-gray">
          {[{ label: "Home", href: "/" }, ...crumbs].map(({ label, href }) => (
            <span key={href}>
              <Link href={href} className="hover:text-primary">
                {label}
              </Link>{" "}
              /{" "}
            </span>
          ))}
          <span className="text-black">{title}</span>
        </nav>
        <h1 className="mt-4 font-brand text-4xl font-semibold leading-[1.1] text-balance md:text-5xl">{title}</h1>
        <div aria-hidden className="mt-4 h-1 w-14 bg-primary" />
        {intro && <div className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-iron-gray">{intro}</div>}
      </div>
    </section>
  );
}
