import type { ComponentType } from "react";

import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

export type ChipItem = {
  name: string;
  icon?: ComponentType<{
    className?: string;
    "aria-hidden"?: boolean | "true" | "false";
  }>;
};

type ChipListProps = {
  items: readonly (string | ChipItem)[];
  tone?: "neutral" | "accent";
  /** Accessible name for the list when the surrounding heading doesn't give one. */
  label?: string;
  className?: string;
};

/** Wrapping list of chips (tech stacks, methods, skills). Renders nothing when empty. */
export function ChipList({ items, tone, label, className }: ChipListProps) {
  if (items.length === 0) return null;

  return (
    <ul aria-label={label} className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => {
        const name = typeof item === "string" ? item : item.name;
        const Icon = typeof item === "string" ? undefined : item.icon;

        return (
          <li key={name}>
            <Chip tone={tone} icon={Icon}>
              {name}
            </Chip>
          </li>
        );
      })}
    </ul>
  );
}
