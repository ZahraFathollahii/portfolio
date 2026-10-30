import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerSize = "default" | "narrow";

type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const sizeClasses: Record<ContainerSize, string> = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
};

export function Container({
  size = "default",
  className,
  children,
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
