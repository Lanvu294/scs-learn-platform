import { SCHOOL_NAME, UNIVERSITY_NAME } from "@/lib/brand";

/**
 * The school, set as text. Two brand rules apply: the SCS Learn mark may not
 * sit directly beside the SCS unitmark (so this always lives apart from the
 * SCS Learn icon), and the unitmark artwork in the logo kit still carries the
 * pre-2026 "School of Computer Science" name - so it isn't used until an
 * official Kenneth C. Griffin unitmark is available. Never redraw the unitmark.
 */
export default function SchoolLockup({
  tone = "light",
  align = "right",
  className = "",
}: {
  /** "light" = white text for dark backgrounds. */
  tone?: "light" | "dark";
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <p
      className={`leading-tight ${align === "right" ? "text-right" : "text-left"} ${
        tone === "light" ? "text-white" : "text-black"
      } ${className}`}
    >
      <span className="block font-brand text-[0.95em] font-semibold">{UNIVERSITY_NAME}</span>
      <span className={`block text-[0.85em] ${tone === "light" ? "text-white/75" : "text-gray-600"}`}>{SCHOOL_NAME}</span>
    </p>
  );
}
