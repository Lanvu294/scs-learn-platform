// Small status graphics shared by the outline and the lecture header.

/** Empty circle, or a filled circle whose check draws in when `animate` is set. */
export function DoneMark({ done, animate = false, size = 18 }: { done: boolean; animate?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden className="shrink-0">
      {done ? (
        <>
          <circle cx="10" cy="10" r="9.25" className="fill-black" />
          <path
            d="M6 10.4 8.7 13 14 7.4"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            className={animate ? "check-draw" : undefined}
          />
        </>
      ) : (
        <circle cx="10" cy="10" r="8.75" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-medium" />
      )}
    </svg>
  );
}

/** Course progress as a thin 4px bar that eases to its new value. */
export function ProgressBar({ value, max }: { value: number; max: number }) {
  return (
    <div
      role="progressbar"
      aria-label="Lectures done"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className="h-1 w-full overflow-hidden rounded-full bg-steel-gray"
    >
      <div
        className="h-full rounded-full bg-black transition-[width] duration-250 ease-out motion-reduce:transition-none"
        style={{ width: `${max ? (value / max) * 100 : 0}%` }}
      />
    </div>
  );
}
