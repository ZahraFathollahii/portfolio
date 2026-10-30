import Image from "next/image";
import type { ReactNode } from "react";

import { Container, Heading } from "@/components/ui";
import { CaseStudyBlock } from "@/features/projects/CaseStudyBlock";
import type { caseStudyProjects } from "@/features/projects/projects.data";
import { screenshots } from "@/features/projects/screenshots.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatNumber } from "@/lib/format";
import { isTodo } from "@/lib/todo";

type CaseStudyContentProps = {
  project: (typeof caseStudyProjects)[number];
  locale: Locale;
};

type Block = { id: string; title: string; content: ReactNode };

/** Unwritten (TODO) parts are dropped before numbering, so no empty heading or gap in the count. */
export async function CaseStudyContent({
  project,
  locale,
}: CaseStudyContentProps) {
  const t = await getT(locale, "projects");
  const { slug } = project;

  const prose = (id: string, title: string, text: string): Block | null =>
    isTodo(text)
      ? null
      : { id, title, content: <p className="text-lead text-muted">{text}</p> };

  const decisions = t(`${slug}.caseStudy.decisions`, {
    returnObjects: true,
  }).filter((decision) => !isTodo(decision.title));
  const gallery = screenshots[slug] ?? [];

  const blocks = [
    prose("context", t("caseStudy.context"), t(`${slug}.caseStudy.context`)),
    prose("scope", t("caseStudy.scope"), t(`${slug}.caseStudy.scope`)),
    decisions.length > 0 && {
      id: "decisions",
      title: t("caseStudy.decisions"),
      content: (
        <ol className="space-y-8">
          {decisions.map((decision) => (
            <li key={decision.title}>
              <Heading level={3}>{decision.title}</Heading>
              {!isTodo(decision.body) && (
                <p className="mt-2 text-muted">{decision.body}</p>
              )}
            </li>
          ))}
        </ol>
      ),
    },
    prose(
      "challenges",
      t("caseStudy.challenges"),
      t(`${slug}.caseStudy.challenges`),
    ),
    prose("result", t("caseStudy.result"), t(`${slug}.caseStudy.result`)),
    gallery.length > 0 && {
      id: "gallery",
      title: t("caseStudy.gallery"),
      content: (
        <ul className="grid gap-6">
          {gallery.map((screenshot) => (
            <li key={screenshot.image.src}>
              <Image
                src={screenshot.image}
                alt={t(screenshot.altKey)}
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="h-auto w-full rounded-card border border-border"
              />
            </li>
          ))}
        </ul>
      ),
    },
  ].filter((block): block is Block => Boolean(block));

  return (
    <Container>
      {blocks.map((block, index) => (
        <CaseStudyBlock
          key={block.id}
          id={block.id}
          number={formatNumber(index + 1, locale, { minimumIntegerDigits: 2 })}
          title={block.title}
        >
          {block.content}
        </CaseStudyBlock>
      ))}
    </Container>
  );
}
