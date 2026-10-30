import type { IconType } from "react-icons";

import { cn } from "@/lib/cn";

type IconLinkProps = {
  href: string;
  /** Accessible name — the link has no visible text. */
  label: string;
  icon: IconType;
  /** Appended to the accessible name; when set the link opens in a new tab. */
  newTabHint?: string;
  className?: string;
};

export function IconLink({
  href,
  label,
  icon: Icon,
  newTabHint,
  className,
}: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={newTabHint ? `${label} (${newTabHint})` : label}
      {...(newTabHint && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-control text-muted transition-colors duration-200 hover:bg-surface hover:text-text",
        className,
      )}
    >
      <Icon aria-hidden className="size-5" />
    </a>
  );
}
