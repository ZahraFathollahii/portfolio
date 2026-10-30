import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  title: string;
  /** Small label above the title. */
  eyebrow?: string;
  className?: string;
  children: ReactNode;
};

export function Section({
  id,
  title,
  eyebrow,
  className,
  children,
}: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-20 py-20 sm:py-28", className)}
    >
      <Container>
        {eyebrow && (
          <p className="mb-3 text-sm font-medium text-accent">{eyebrow}</p>
        )}
        <Heading level={2} id={titleId}>
          {title}
        </Heading>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}
