import type { CSSProperties, ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const style: CSSProperties | undefined = delay
    ? { animationDelay: `${delay}s` }
    : undefined;

  return (
    <div className={className ? `rise-in ${className}` : "rise-in"} style={style}>
      {children}
    </div>
  );
}
