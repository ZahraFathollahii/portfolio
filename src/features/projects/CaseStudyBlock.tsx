import type { ReactNode } from "react";

import { Heading, Reveal } from "@/components/ui";

type CaseStudyBlockProps = {
  id: string;
  /** Pre-formatted position among the rendered blocks ("01" / "۰۱"). */
  number: string;
  title: string;
  children: ReactNode;
};

/** One case-study part: number + heading in a side column on desktop, content beside it. */
export function CaseStudyBlock({
  id,
  number,
  title,
  children,
}: CaseStudyBlockProps) {
  const titleId = `${id}-title`;

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="scroll-mt-20 border-t border-border py-12 sm:py-16"
    >
      <Reveal className="grid gap-4 lg:grid-cols-[16rem_1fr] lg:gap-12">
        <div>
          <p
            aria-hidden
            className="text-sm font-semibold text-accent tabular-nums"
          >
            {number}
          </p>
          <Heading level={2} size="h3" id={titleId} className="mt-1">
            {title}
          </Heading>
        </div>
        <div className="max-w-3xl">{children}</div>
      </Reveal>
    </section>
  );
}
