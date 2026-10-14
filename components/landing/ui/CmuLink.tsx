import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * A Carnegie Red square with an arrow, fused to a bordered label. On hover the
 * red sweeps from the left edge of the label across to the right. The arrow
 * stays put. `tone` is the background it sits on.
 */
export default function CmuLink({
  href,
  children,
  tone = "light",
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  external?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex items-stretch text-sm font-semibold ${className}`}
    >
      <span className="flex w-11 shrink-0 items-center justify-center bg-primary text-white">
        <ArrowUpRight size={22} strokeWidth={1.75} />
      </span>
      <span
        className={`relative isolate flex items-center overflow-hidden border border-l-0 border-primary px-5 py-3 transition-colors duration-200 group-hover:text-white before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-primary before:transition-transform before:duration-200 group-hover:before:translate-x-0 ${
          tone === "dark" ? "text-white" : "text-black"
        }`}
      >
        {children}
      </span>
    </Link>
  );
}
