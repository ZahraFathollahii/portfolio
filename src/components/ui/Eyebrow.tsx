import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

/** Small accent label above a title (project category, thesis label). Uppercase is a no-op in FA. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-xs font-semibold tracking-label text-accent uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
