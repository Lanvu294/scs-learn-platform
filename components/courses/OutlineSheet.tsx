"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

const SWIPE_CLOSE_PX = 80;

/**
 * The course outline as a bottom sheet on phones and tablets. A native modal
 * <dialog>: the browser keeps focus inside it, makes the page behind it inert,
 * and closes it on Esc. Dragging the sheet down past 80px closes it too.
 */
export default function OutlineSheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const drag = useRef<{ startY: number; dy: number } | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = "hidden";
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function setOffset(px: number) {
    const dialog = dialogRef.current;
    if (dialog) dialog.style.transform = px ? `translateY(${px}px)` : "";
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Course outline"
      // Esc, the close button, and swipes all end here.
      onClose={() => {
        document.documentElement.style.overflow = "";
        setOffset(0);
        onClose();
      }}
      // A click on the backdrop lands on the dialog element itself.
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      onTouchStart={(event) => {
        // Only start a swipe when the outline is scrolled to its top.
        if ((dialogRef.current?.scrollTop ?? 0) > 0) return;
        drag.current = { startY: event.touches[0].clientY, dy: 0 };
      }}
      onTouchMove={(event) => {
        if (!drag.current) return;
        drag.current.dy = Math.max(0, event.touches[0].clientY - drag.current.startY);
        setOffset(drag.current.dy);
      }}
      onTouchEnd={() => {
        const dy = drag.current?.dy ?? 0;
        drag.current = null;
        if (dy > SWIPE_CLOSE_PX) dialogRef.current?.close();
        else setOffset(0);
      }}
      className="sheet-up fixed inset-x-0 top-auto bottom-0 m-0 max-h-[85dvh] w-full max-w-none overflow-y-auto overscroll-contain bg-white pb-8 text-black backdrop:bg-black/40 lg:hidden"
    >
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 pt-2 pb-2">
        <span aria-hidden className="absolute top-2 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-steel-gray" />
        <span className="pt-3 text-sm font-semibold">Course outline</span>
        <button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close course outline" className="mt-2 grid size-10 place-items-center">
          <X size={20} aria-hidden />
        </button>
      </div>
      <div className="pt-2">{children}</div>
    </dialog>
  );
}
