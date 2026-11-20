import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type SectionProps = {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
};

/** Every section reveals on scroll, so the effect is applied here once. */
export function Section({ id, title, className, children }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={cn("scroll-mt-16 py-10 sm:py-14", className)}
    >
      <Container>
        <Reveal>
          <Heading level={2} id={titleId}>
            {title}
          </Heading>
          <div className="mt-6 sm:mt-8">{children}</div>
        </Reveal>
      </Container>
    </section>
  );
}
