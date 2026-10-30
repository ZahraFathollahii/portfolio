"use client";

import type { ReactNode } from "react";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

type RevealProps = {
  className?: string;
  children: ReactNode;
};

/**
 * Fades content up when it scrolls into view. Only content that starts below the fold is
 * ever hidden (see useInView), and reduced-motion users never see the effect.
 */
export function Reveal({ className, children }: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:transition-[opacity,translate] motion-safe:duration-700 motion-safe:ease-out",
        inView === false && "motion-safe:translate-y-6 motion-safe:opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
