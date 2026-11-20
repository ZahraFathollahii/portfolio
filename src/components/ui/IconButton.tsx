import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/cn";

/** Shared look for icon-only controls (IconButton, IconLink). */
export const iconControlClasses =
  "inline-flex size-10 shrink-0 items-center justify-center rounded-control text-muted transition-colors duration-200 hover:bg-surface hover:text-text";

type IconButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "aria-label"
> & {
  /** Accessible name — the button has no visible text. */
  label: string;
  icon: IconType;
};

export function IconButton({
  label,
  icon: Icon,
  className,
  type = "button",
  ...buttonProps
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      className={cn(iconControlClasses, className)}
      {...buttonProps}
    >
      <Icon aria-hidden className="size-5" />
    </button>
  );
}
