import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardProps = {
  as?: "div" | "article" | "li";
  /** Hover affordance for cards that are (or contain) a stretched link. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Tag = "div",
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-card border border-border bg-surface p-6 shadow-card",
        interactive &&
          "transition-[border-color,translate] duration-300 focus-within:border-accent hover:border-accent motion-safe:hover:-translate-y-0.5",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
