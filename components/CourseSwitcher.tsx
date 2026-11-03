"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { content } from "@/content";
import { courseBlocks } from "@/content/course";

const blockStart =
  /^(?:НАЗВАНИЕ МАРАФОНА|\d+\s+блок\.|Блок\s+\d+)/i;

function isBlockStart(text: string) {
  return blockStart.test(text);
}

function buttonLabel(text: string) {
  if (text === "НАЗВАНИЕ МАРАФОНА") return content.coursePage.startLabel;
  const first = text.match(/^(\d+)\s+блок\./i);
  if (first) return `${content.coursePage.blockLabel} ${first[1]}`;
  const second = text.match(/^Блок\s+(\d+)/i);
  if (second) return `${content.coursePage.blockLabel} ${second[1]}`;
  return text;
}

const starts = courseBlocks
  .map((block, index) => ({ block, index }))
  .filter(({ block }) => isBlockStart(block.text.trim()));

const sections = starts.map((start, index) => ({
  label: buttonLabel(start.block.text),
  title: start.block.text,
  blocks: courseBlocks.slice(
    start.index,
    starts[index + 1]?.index ?? courseBlocks.length,
  ),
}));

export function CourseSwitcher() {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const section = sections[current];

  function open(index: number) {
    setCurrent(index);
    panelRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div ref={panelRef} className="scroll-mt-28">
      <div
        role="tablist"
        aria-label={content.coursePage.blocksLabel}
        className="nav-scroll sticky top-20 z-30 -mx-1 flex gap-2 overflow-x-auto bg-paper/90 px-1 py-3 backdrop-blur-md"
      >
        {sections.map((item, index) => {
          const selected = index === current;
          return (
            <button
              key={item.title}
              type="button"
              role="tab"
              aria-selected={selected}
              title={item.title}
              onClick={() => open(index)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                selected
                  ? "bg-accent text-cream"
                  : "bg-card text-muted hover:text-ink"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" className="mt-6">
        {section.blocks.map((block, index) => {
          if (block.kind === "h2" || (index === 0 && isBlockStart(block.text))) {
            return (
              <h2
                key={index}
                className="mt-14 font-serif text-3xl leading-tight tracking-wide text-ink first:mt-0 md:text-4xl"
              >
                {block.text}
              </h2>
            );
          }
          if (block.kind === "h3") {
            return (
              <h3
                key={index}
                className="mt-8 font-serif text-2xl leading-snug text-ink"
              >
                {block.text}
              </h3>
            );
          }
          return (
            <p key={index} className="mt-4 text-base leading-[1.7] text-ink">
              {block.text}
            </p>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => open(current - 1)}
          disabled={current === 0}
          className="rounded-full border border-sage/40 px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {content.coursePage.prev}
        </button>
        <button
          type="button"
          onClick={() => open(current + 1)}
          disabled={current === sections.length - 1}
          className="rounded-full bg-accent px-5 py-2.5 text-sm text-cream transition-colors disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {content.coursePage.next}
        </button>
      </div>
    </div>
  );
}
