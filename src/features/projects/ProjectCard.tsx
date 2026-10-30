import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

import { ButtonLink, Card, Chip, Heading } from "@/components/ui";
import type { projects } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { isTodo } from "@/lib/todo";

type ProjectCardProps = {
  project: (typeof projects)[number];
  locale: Locale;
};

/**
 * With a case study, the title is a stretched link over the whole card;
 * the live-site link sits above it (z-10) so both stay clickable.
 */
export async function ProjectCard({ project, locale }: ProjectCardProps) {
  const t = await getT(locale, "projects");
  const tActions = await getT(locale, "actions");
  const { slug } = project;
  const role = t(`${slug}.role`);
  const titleId = `project-${slug}-title`;

  return (
    <Card as="li" interactive={project.hasCaseStudy} className="flex flex-col">
      <article aria-labelledby={titleId} className="flex grow flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-xs font-semibold tracking-label text-accent uppercase">
            {t(`${slug}.category`)}
          </p>
          {project.statusKey && (
            <Chip tone="accent">{t(project.statusKey)}</Chip>
          )}
        </div>
        <Heading level={3} id={titleId} className="mt-3">
          {project.hasCaseStudy ? (
            <Link
              href={`/${locale}/projects/${slug}/`}
              className="after:absolute after:inset-0 after:rounded-card focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-accent"
            >
              {t(`${slug}.title`)}
            </Link>
          ) : (
            t(`${slug}.title`)
          )}
        </Heading>
        <p className="mt-1 text-sm text-muted">{t(`${slug}.subtitle`)}</p>
        <p className="mt-4">{t(`${slug}.summary`)}</p>
        {!isTodo(role) && (
          <dl className="mt-4 flex flex-wrap gap-x-2 text-sm">
            <dt className="text-muted">{t("labels.role")}</dt>
            <dd>{role}</dd>
          </dl>
        )}
        {project.techs.length > 0 && (
          <ul
            aria-label={t("labels.stack")}
            className="mt-5 flex flex-wrap gap-2"
          >
            {project.techs.map((tech) => (
              <li key={tech}>
                <Chip>{tech}</Chip>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          {project.hasCaseStudy && (
            <span
              aria-hidden
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              {tActions("viewCaseStudy")}
              <FiArrowRight className="size-4 rtl:-scale-x-100" />
            </span>
          )}
          {/* -mx cancels the ghost padding on whichever edge it touches, wrapped or not. */}
          <ButtonLink
            href={project.url}
            aria-describedby={titleId}
            variant="ghost"
            size="sm"
            icon={FiArrowUpRight}
            iconPosition="end"
            mirrorIcon
            newTabHint={tActions("newTab")}
            className="relative z-10 -mx-3.5"
          >
            {tActions("visitLiveSite")}
          </ButtonLink>
        </div>
      </article>
    </Card>
  );
}
