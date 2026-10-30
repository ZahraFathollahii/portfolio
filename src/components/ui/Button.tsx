import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

// Every button-styled control on this static site is a link (CV, mailto, live sites, anchors);
// icon-only <button>s use IconButton.
export type ButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "children"
> & {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: "start" | "end";
  /** Flip the icon in RTL — for arrows and other directional icons. */
  mirrorIcon?: boolean;
  /** Visually hidden hint; when set the link opens in a new tab. */
  newTabHint?: string;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-contrast hover:bg-accent/85",
  secondary:
    "border border-border bg-surface text-text hover:border-accent hover:text-accent",
  ghost: "text-muted hover:bg-surface hover:text-text",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-base",
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "start",
  mirrorIcon = false,
  newTabHint,
  className,
  children,
  ...anchorProps
}: ButtonLinkProps) {
  const icon = Icon ? (
    <Icon
      aria-hidden
      className={cn("size-[1.1em] shrink-0", mirrorIcon && "rtl:-scale-x-100")}
    />
  ) : null;

  return (
    <a
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-colors duration-200",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...(newTabHint && { target: "_blank", rel: "noopener noreferrer" })}
      {...anchorProps}
    >
      {iconPosition === "start" && icon}
      <span>{children}</span>
      {iconPosition === "end" && icon}
      {newTabHint && <span className="sr-only"> ({newTabHint})</span>}
    </a>
  );
}
