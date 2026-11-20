import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChipTone = "neutral" | "accent";

type ChipProps = {
  tone?: ChipTone;
  icon?: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<ChipTone, string> = {
  neutral:
    "border-border bg-surface text-muted transition-colors duration-200 hover:border-accent/40 hover:text-text",
  accent: "border-transparent bg-accent-soft text-accent",
};

// dir="auto" isolates Latin labels like "JavaScript (ES6+)" so brackets don't flip in RTL.
export function Chip({
  tone = "neutral",
  icon: Icon,
  className,
  children,
}: ChipProps) {
  return (
    <span
      dir="auto"
      className={cn(
        "group inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs leading-5 font-medium transition-colors duration-200",
        toneClasses[tone],
        className,
      )}
    >
      {Icon && (
        <Icon
          className="size-3.5 shrink-0 opacity-75 transition-all duration-200 group-hover:text-accent group-hover:opacity-100"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
