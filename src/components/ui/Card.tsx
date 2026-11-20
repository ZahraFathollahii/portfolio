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
        "group relative rounded-card border border-border bg-surface p-5 shadow-card sm:p-6",
        interactive &&
          "transition-all duration-300 focus-within:border-accent hover:border-accent hover:shadow-card-hover motion-safe:hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
