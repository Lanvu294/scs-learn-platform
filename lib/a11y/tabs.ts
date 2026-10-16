import type { KeyboardEvent } from "react";

const TAB_KEYS = ["ArrowLeft", "ArrowRight", "Home", "End"];

/**
 * Arrow-key navigation for a role="tablist" (WAI-ARIA tabs pattern): Left/Right
 * move between tabs, Home/End jump to the ends, and the focused tab is
 * activated. Pair with tabIndex={selected ? 0 : -1} on each tab.
 */
export function handleTabListKeyDown(event: KeyboardEvent<HTMLElement>): void {
  if (!TAB_KEYS.includes(event.key)) return;
  const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'));
  const index = tabs.indexOf(document.activeElement as HTMLElement);
  if (index < 0 || tabs.length === 0) return;
  event.preventDefault();
  let next = index;
  if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
  if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = tabs.length - 1;
  tabs[next].focus();
  tabs[next].click();
}
