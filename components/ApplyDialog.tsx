"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ApplyForm } from "@/components/ApplyForm";
import { content } from "@/content";

export function ApplyDialog() {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest("a");
      if (!link) return;
      let hash = "";
      try {
        hash = new URL(link.href, window.location.href).hash;
      } catch {
        return;
      }
      if (hash !== "#apply") return;
      event.preventDefault();
      setOpen(true);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const field = panel?.querySelector<HTMLElement>("input");
    field?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const nodes = [
        ...panel.querySelectorAll<HTMLElement>("button, input, a, textarea"),
      ].filter((node) => !node.hasAttribute("disabled"));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-[24px] bg-card p-8 shadow-soft"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={content.apply.close}
          className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
            <path
              d="M7 7l10 10M17 7L7 17"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <h2
          id={titleId}
          className="pr-10 font-serif text-4xl leading-[1.15] tracking-wide text-ink"
        >
          {content.apply.heading}
        </h2>
        <p className="mt-4 max-w-[36ch] text-lg leading-[1.7] text-muted">
          {content.apply.promise}
        </p>
        <div className="mt-8">
          <ApplyForm />
        </div>
      </div>
    </div>
  );
}
