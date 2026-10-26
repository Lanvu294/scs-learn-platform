"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Eye, EyeOff, X } from "lucide-react";
import { NOTES } from "@/lib/design-notes";

/*
 * Design-review annotation mode, ported from the p4l IDE prototype (p4l-ide/src/annotations)
 * so both prototypes share one look: ink pins, ink note cards with an arrow, Inter type,
 * p4l's blue focus outline.
 * Targets opt in with data-annotation="N" and optionally data-annotation-side:
 *   right (default) — pin 8px to the right of the element, vertically centered
 *   left            — pin 8px to the left
 *   inside          — pin inside the element's top-right corner (for big empty areas like the rail)
 * Each pin is portaled *into* its target (made position: relative in globals.css), so it moves
 * with the page natively while scrolling. A pin's note opens as a small card right beside it:
 * hover or focus shows it, click keeps it open. Nothing covers the page's side panels.
 * CS Learn additions: ?notes=0|1 (with sessionStorage) remembers the choice, and on phones the
 * gutter pins in the main column move inside their section (see globals.css).
 */

const CARD_GAP = 8;
const EDGE = 8;
const STORAGE_KEY = "cs-learn:design-notes";

/** Rendered targets only: the rail exists twice (desktop, and the closed mobile sheet). */
function isRendered(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  return !!(r.width || r.height) && !el.closest("dialog:not([open])");
}

/** Live map of note number → target element, re-collected when the DOM or the layout changes. */
function useTargets(enabled: boolean) {
  const [targets, setTargets] = useState<Map<number, HTMLElement>>(() => new Map());
  useEffect(() => {
    if (!enabled) return;
    const collect = () => {
      const next = new Map<number, HTMLElement>();
      document.querySelectorAll<HTMLElement>("[data-annotation]").forEach((el) => {
        const n = Number(el.dataset.annotation);
        if (!next.has(n) && isRendered(el)) next.set(n, el);
      });
      setTargets((prev) => (prev.size === next.size && [...next].every(([n, el]) => prev.get(n) === el) ? prev : next));
    };
    collect();
    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", collect);
    return () => {
      mo.disconnect();
      window.removeEventListener("resize", collect);
    };
  }, [enabled]);
  return enabled ? targets : new Map<number, HTMLElement>();
}

function notesFromUrl(): boolean {
  const param = new URLSearchParams(window.location.search).get("notes");
  if (param === "0" || param === "1") return param === "1";
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) !== "0";
  } catch {
    return true;
  }
}

function saveNotes(on: boolean) {
  const url = new URL(window.location.href);
  url.searchParams.set("notes", on ? "1" : "0");
  window.history.replaceState(window.history.state, "", url);
  try {
    window.sessionStorage.setItem(STORAGE_KEY, on ? "1" : "0");
  } catch {
    // The URL still carries it.
  }
}

function subscribeNothing(): () => void {
  return () => {};
}

export default function DesignNotes() {
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false);
  // Renders nothing until mounted, so reading the URL here can't cause a hydration mismatch.
  const [on, setOn] = useState(() => (typeof window === "undefined" ? true : notesFromUrl()));
  const targets = useTargets(on);
  const [hovered, setHovered] = useState<number | null>(null); // hover or keyboard focus
  const [pinned, setPinned] = useState<number | null>(null); // opened by click; stays until closed
  const shown = on ? (pinned ?? hovered) : null;
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimer = useRef<number>(0);
  // Set while we hand focus back to a pin after closing, so that focus doesn't reopen the card.
  const refocusing = useRef(false);

  const pinFor = useCallback((n: number) => targets.get(n)?.querySelector<HTMLElement>(":scope > .annotation-host > .annotation-pin") ?? null, [targets]);

  const toggle = () => {
    const next = !on;
    setOn(next);
    saveNotes(next);
    // Turning notes off closes everything.
    if (!next) {
      setHovered(null);
      setPinned(null);
    }
  };

  // Hover grace period: moving the pointer from the pin onto its card shouldn't close it.
  const hoverIn = (n: number) => {
    window.clearTimeout(leaveTimer.current);
    setHovered(n);
  };
  const hoverOut = () => {
    window.clearTimeout(leaveTimer.current);
    leaveTimer.current = window.setTimeout(() => setHovered(null), 150);
  };

  const close = useCallback(
    (refocus: boolean) => {
      const n = shown;
      setPinned(null);
      setHovered(null);
      if (refocus && n) {
        refocusing.current = true;
        pinFor(n)?.focus();
        refocusing.current = false;
      }
    },
    [shown, pinFor],
  );

  // Place the card next to its pin: below if there's room, else above; kept inside the screen.
  // Written straight to the element on scroll so it tracks the pin with no React re-render.
  const placeCard = useCallback(() => {
    const card = cardRef.current;
    const pin = shown ? pinFor(shown) : null;
    if (!card || !pin) return;
    const p = pin.getBoundingClientRect();
    const w = card.offsetWidth;
    const h = card.offsetHeight;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(EDGE, p.left - 12), vw - w - EDGE);
    const below = p.bottom + CARD_GAP + h <= vh - EDGE;
    const top = below ? p.bottom + CARD_GAP : Math.max(EDGE, p.top - CARD_GAP - h);
    card.style.left = `${left}px`;
    card.style.top = `${top}px`;
    card.dataset.placement = below ? "below" : "above";
    // Arrow points at the pin's center.
    card.style.setProperty("--arrow-x", `${p.left + p.width / 2 - left}px`);
  }, [shown, pinFor]);

  useLayoutEffect(() => {
    if (!shown) return;
    placeCard();
    window.addEventListener("scroll", placeCard, true);
    window.addEventListener("resize", placeCard);
    return () => {
      window.removeEventListener("scroll", placeCard, true);
      window.removeEventListener("resize", placeCard);
    };
  }, [shown, placeCard]);

  // Clicking a pin open moves focus into its card, so keyboard users can reach its controls.
  useEffect(() => {
    if (pinned) cardRef.current?.focus({ preventScroll: true });
  }, [pinned]);

  // Outline the section whose note is showing (CSS on the element itself, so it scrolls with it).
  useEffect(() => {
    if (!shown) return;
    const el = targets.get(shown);
    if (!el) return;
    el.setAttribute("data-annotation-active", "");
    return () => el.removeAttribute("data-annotation-active");
  }, [shown, targets]);

  // A clicked-open card: Esc closes it (focus back to its pin); clicking elsewhere closes it.
  useEffect(() => {
    if (!pinned) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !e.defaultPrevented && !document.querySelector("dialog[open]")) close(true);
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!cardRef.current?.contains(t) && !pinFor(pinned)?.contains(t)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [pinned, close, pinFor]);

  useEffect(() => () => window.clearTimeout(leaveTimer.current), []);

  // Pin handlers, defined once and called with the pin's number.
  const clickPin = (n: number) => {
    if (pinned === n) close(false);
    else setPinned(n);
  };
  const focusPin = (n: number) => {
    if (!refocusing.current) hoverIn(n);
  };
  const blurPin = (related: Node | null) => {
    if (!cardRef.current?.contains(related)) hoverOut();
  };
  const escapePin = (n: number) => {
    if (shown === n) close(false);
  };

  if (!mounted) return null;
  const note = shown ? NOTES.find((x) => x.n === shown) : null;

  return (
    <>
      {on &&
        [...targets].map(([n, el]) => {
          const nt = NOTES.find((x) => x.n === n);
          if (!nt) return null;
          return (
            <Pin
              key={n}
              target={el}
              n={n}
              title={nt.title}
              isShown={shown === n}
              onClick={clickPin}
              onEnter={hoverIn}
              onLeave={hoverOut}
              onFocusPin={focusPin}
              onBlurPin={blurPin}
              onEscape={escapePin}
            />
          );
        })}

      {createPortal(
        <>
          {on && note && (
            <div
              ref={cardRef}
              id="note-card"
              role="dialog"
              aria-modal="false"
              aria-labelledby="note-card-title"
              onMouseEnter={() => window.clearTimeout(leaveTimer.current)}
              onMouseLeave={() => !pinned && hoverOut()}
              onBlur={(e) => {
                if (!pinned && !cardRef.current?.contains(e.relatedTarget as Node) && e.relatedTarget !== pinFor(note.n)) hoverOut();
              }}
              tabIndex={-1}
              style={{ left: -9999, top: -9999 }}
              className="note-card p4l-type fixed z-[58] w-[280px] rounded-lg border border-white/20 bg-[#0a0a0a] p-3 text-white"
            >
              <div className="flex items-start gap-2">
                <span aria-hidden className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white text-[11px] font-bold text-[#0a0a0a]">
                  {note.n}
                </span>
                <p id="note-card-title" className="flex-1 text-sm leading-5 font-semibold">
                  {note.title}
                </p>
                {pinned && (
                  <button
                    type="button"
                    onClick={() => close(true)}
                    aria-label="Close note"
                    className="-m-1 grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <X size={14} aria-hidden />
                  </button>
                )}
              </div>
              <p className="mt-1 pl-7 text-sm leading-5 text-white/80">{note.body}</p>
            </div>
          )}

          <button
            type="button"
            onClick={toggle}
            aria-pressed={on}
            // Bottom-right corner (lifted only while the phone's Up next bar shows; see globals.css).
            // p4l's pill is white because its page is dark; on this white page the same idea is ink.
            className="notes-toggle p4l-type fixed right-4 bottom-4 z-[59] inline-flex items-center gap-2 rounded-full bg-[#0a0a0a] py-2 pr-2 pl-3 text-sm leading-5 font-bold whitespace-nowrap text-white hover:bg-[#262626]"
          >
            {on ? <EyeOff size={16} strokeWidth={2.5} aria-hidden /> : <Eye size={16} strokeWidth={2.5} aria-hidden />}
            {on ? "Hide notes" : "Show notes"}
            <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1 text-[13px] leading-none font-bold text-[#0a0a0a]" aria-label={`${NOTES.length} notes`}>
              {NOTES.length}
            </span>
          </button>
        </>,
        document.body,
      )}
    </>
  );
}

/**
 * A numbered pin, portaled into its target so it scrolls with it. It renders into its own host
 * span appended to the target, since React can't portal straight into an element it renders.
 */
function Pin({
  target,
  n,
  title,
  isShown,
  onClick,
  onEnter,
  onLeave,
  onFocusPin,
  onBlurPin,
  onEscape,
}: {
  target: HTMLElement;
  n: number;
  title: string;
  isShown: boolean;
  onClick: (n: number) => void;
  onEnter: (n: number) => void;
  onLeave: () => void;
  onFocusPin: (n: number) => void;
  onBlurPin: (related: Node | null) => void;
  onEscape: (n: number) => void;
}) {
  const [host] = useState(() => {
    const span = document.createElement("span");
    span.setAttribute("class", "annotation-host");
    return span;
  });
  useLayoutEffect(() => {
    target.appendChild(host);
    return () => host.remove();
  }, [target, host]);

  return createPortal(
    <button
      type="button"
      onClick={() => onClick(n)}
      onMouseEnter={() => onEnter(n)}
      onMouseLeave={onLeave}
      onFocus={() => onFocusPin(n)}
      onBlur={(e) => onBlurPin(e.relatedTarget as Node | null)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && isShown) {
          e.preventDefault();
          onEscape(n);
        }
      }}
      aria-label={`Design note ${n}: ${title}`}
      aria-expanded={isShown}
      aria-controls={isShown ? "note-card" : undefined}
      className={`annotation-pin p4l-type grid h-6 w-6 place-items-center rounded-full border-2 bg-[#0a0a0a] text-[13px] leading-none font-bold text-white hover:bg-[#333] ${
        isShown ? "border-[rgb(121_184_255)]" : "border-white/90"
      }`}
    >
      {n}
    </button>,
    host,
  );
}
