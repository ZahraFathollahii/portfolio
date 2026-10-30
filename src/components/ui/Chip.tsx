import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ChipTone = "neutral" | "accent";

type ChipProps = {
  tone?: ChipTone;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<ChipTone, string> = {
  neutral: "border-border bg-surface text-muted",
  accent: "border-transparent bg-accent-soft text-accent",
};

// dir="auto" isolates Latin labels like "JavaScript (ES6+)" so brackets don't flip in RTL.
export function Chip({ tone = "neutral", className, children }: ChipProps) {
  return (
    <span
      dir="auto"
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs leading-5 font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
