import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiLock } from "react-icons/fi";

import {
  ButtonLink,
  ChipList,
  Container,
  Eyebrow,
  Heading,
} from "@/components/ui";
import type { caseStudyProjects } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { isTodo } from "@/lib/todo";

type CaseStudyHeaderProps = {
  project: (typeof caseStudyProjects)[number];
  locale: Locale;
};

export async function CaseStudyHeader({
  project,
  locale,
}: CaseStudyHeaderProps) {
  const t = await getT(locale, "projects");
  const tActions = await getT(locale, "actions");
  const { slug } = project;
  const role = t(`${slug}.role`);

  return (
    <header className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-dot-grid" />
      <Container className="relative pt-10 pb-16 sm:pt-14 sm:pb-20">
        <Link
          href={`/${locale}/#work`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-text"
        >
          <FiArrowLeft aria-hidden className="size-4 rtl:-scale-x-100" />
          {tActions("allProjects")}
        </Link>
        <Eyebrow className="mt-10">{t(`${slug}.category`)}</Eyebrow>
        <Heading level={1} accentDot className="mt-4">
          {t(`${slug}.title`)}
        </Heading>
        <p className="mt-4 max-w-2xl text-lead text-muted">
          {t(`${slug}.subtitle`)}
        </p>
        <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
          {!isTodo(role) && (
            <div>
              <dt className="text-sm text-muted">{t("labels.role")}</dt>
              <dd className="mt-1 font-medium">{role}</dd>
            </div>
          )}
          {project.statusKey && (
            <div>
              <dt className="text-sm text-muted">{t("labels.status")}</dt>
              <dd className="mt-1 font-medium">{t(project.statusKey)}</dd>
            </div>
          )}
          <div>
            <dt className="text-sm text-muted">{t("labels.stack")}</dt>
            <dd className="mt-2">
              <ChipList items={project.techs} />
            </dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3">
          <ButtonLink
            href={project.url}
            icon={FiArrowUpRight}
            iconPosition="end"
            mirrorIcon
            newTabHint={tActions("newTab")}
          >
            {tActions("visitLiveSite")}
          </ButtonLink>
          <p className="inline-flex items-center gap-1.5 text-sm text-muted">
            <FiLock aria-hidden className="size-4" />
            {t("labels.privateSource")}
          </p>
        </div>
      </Container>
    </header>
  );
}
