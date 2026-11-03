"use client";

import { useEffect, useState } from "react";
import { content } from "@/content";

const storageKey = "theme";

export function ThemeToggle() {
  const [night, setNight] = useState(false);
  const label = night ? content.nav.themeToDay : content.nav.themeToNight;

  useEffect(() => {
    setNight(document.documentElement.dataset.theme === "night");
  }, []);

  function toggle() {
    const next = !night;
    if (next) {
      document.documentElement.dataset.theme = "night";
    } else {
      delete document.documentElement.dataset.theme;
    }
    localStorage.setItem(storageKey, next ? "night" : "day");
    setNight(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={night}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-accent transition-colors hover:bg-accent/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {night ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M15.5 3.5a7.5 7.5 0 1 0 5 12.2A8.2 8.2 0 0 1 15.5 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
