import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonStyleProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  iconPosition?: "start" | "end";
  /** Flip the icon in RTL — for arrows and other directional icons. */
  mirrorIcon?: boolean;
  className?: string;
  children: ReactNode;
};

export type ButtonProps = ButtonStyleProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonStyleProps>;

export type ButtonLinkProps = ButtonStyleProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof ButtonStyleProps | "target" | "rel"
  > & {
    href: string;
    /** Visually hidden hint; when set the link opens in a new tab. */
    newTabHint?: string;
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

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

function ButtonContent({
  icon: Icon,
  iconPosition = "start",
  mirrorIcon = false,
  children,
}: Pick<
  ButtonStyleProps,
  "icon" | "iconPosition" | "mirrorIcon" | "children"
>) {
  const iconElement = Icon ? (
    <Icon
      aria-hidden
      className={cn("size-[1.1em] shrink-0", mirrorIcon && "rtl:-scale-x-100")}
    />
  ) : null;

  return (
    <>
      {iconPosition === "start" && iconElement}
      <span>{children}</span>
      {iconPosition === "end" && iconElement}
    </>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition,
  mirrorIcon,
  className,
  children,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...buttonProps}
    >
      <ButtonContent
        icon={icon}
        iconPosition={iconPosition}
        mirrorIcon={mirrorIcon}
      >
        {children}
      </ButtonContent>
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconPosition,
  mirrorIcon,
  className,
  children,
  newTabHint,
  ...anchorProps
}: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(newTabHint && { target: "_blank", rel: "noopener noreferrer" })}
      {...anchorProps}
    >
      <ButtonContent
        icon={icon}
        iconPosition={iconPosition}
        mirrorIcon={mirrorIcon}
      >
        {children}
      </ButtonContent>
      {newTabHint && <span className="sr-only"> ({newTabHint})</span>}
    </a>
  );
}
