import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type HeadingLevel = 1 | 2 | 3;
type HeadingSize = "display" | "h2" | "h3";

type HeadingProps = {
  level: HeadingLevel;
  /** Visual size; defaults to the level's size. */
  size?: HeadingSize;
  id?: string;
  /** Ends the heading with an accent-colored dot. */
  accentDot?: boolean;
  className?: string;
  children: ReactNode;
};

const defaultSize: Record<HeadingLevel, HeadingSize> = {
  1: "display",
  2: "h2",
  3: "h3",
};

const sizeClasses: Record<HeadingSize, string> = {
  display: "text-display font-extrabold",
  h2: "text-h2 font-bold",
  h3: "text-h3 font-semibold",
};

export function Heading({
  level,
  size = defaultSize[level],
  id,
  accentDot = false,
  className,
  children,
}: HeadingProps) {
  const Tag = `h${level}` as const;

  return (
    <Tag
      id={id}
      className={cn(
        "text-balance wrap-break-word text-text",
        sizeClasses[size],
        className,
      )}
    >
      {children}
      {accentDot && (
        <span aria-hidden className="text-accent">
          .
        </span>
      )}
    </Tag>
  );
}
