import { Chip } from "@/components/ui/Chip";
import { cn } from "@/lib/cn";

type ChipListProps = {
  items: readonly string[];
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
      {items.map((item) => (
        <li key={item}>
          <Chip tone={tone}>{item}</Chip>
        </li>
      ))}
    </ul>
  );
}
