"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { content } from "@/content";
import { sitePath } from "@/lib/site-path";

export function Hotbar() {
  const pathname = usePathname();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = content.nav.items
      .filter((item) => item.href.startsWith("#"))
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActive(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-2 pt-3 sm:px-3 md:px-6">
      <nav
        aria-label={content.nav.label}
        className="mx-auto grid w-full max-w-6xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 rounded-full border border-sage/30 bg-paper/85 px-1.5 py-1.5 shadow-soft backdrop-blur-md sm:gap-2 sm:px-2"
      >
        <a
          href={sitePath("/#start")}
          className="whitespace-nowrap rounded-full px-1.5 py-1.5 font-serif text-lg leading-none text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3"
        >
          {content.nav.brand}
        </a>
        <div className="nav-scroll flex min-w-0 flex-nowrap items-center gap-1 overflow-x-auto">
          {content.nav.items.map((item) => {
            const href = item.href.startsWith("#")
              ? sitePath(`/${item.href}`)
              : sitePath(item.href);
            const here = pathname.replace(/\/$/, "") || "/";
            const current = item.href.startsWith("#")
              ? here === "/" && active === item.href
              : here === item.href;
            return (
              <a
                key={item.href}
                href={href}
                aria-current={current ? "true" : undefined}
                className={`shrink-0 whitespace-nowrap rounded-full px-1 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 ${
                  current
                    ? "bg-accent/15 text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <div className="flex items-center">
          <a
            href={sitePath(`/${content.nav.profile.href}`)}
            className="shrink-0 whitespace-nowrap rounded-full px-1.5 py-1.5 text-sm text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3"
          >
            {content.nav.profile.label}
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
