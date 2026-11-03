"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sitePath } from "@/lib/site-path";

const baseClass =
  "inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-base font-medium text-cream shadow-soft transition-[box-shadow] duration-200 hover:shadow-[0_24px_48px_-18px_rgba(44,36,27,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-80";

type SharedProps = {
  children: ReactNode;
  className?: string;
};

type LinkButtonProps = SharedProps & {
  href: string;
};

type SubmitButtonProps = SharedProps & {
  type: "submit";
  disabled?: boolean;
};

export function Button(props: LinkButtonProps | SubmitButtonProps) {
  const shouldReduce = useReducedMotion();
  const hover = shouldReduce ? undefined : { scale: 1.02 };
  const className = `${baseClass} ${props.className ?? ""}`;

  if ("href" in props) {
    return (
      <motion.a
        href={sitePath(props.href)}
        className={className}
        whileHover={hover}
        transition={{ duration: 0.2 }}
      >
        {props.children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="submit"
      disabled={props.disabled}
      className={className}
      whileHover={props.disabled ? undefined : hover}
      transition={{ duration: 0.2 }}
    >
      {props.children}
    </motion.button>
  );
}
