import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

import { Container } from "@/components/ui";
import {
  caseStudyProjects,
  type CaseStudySlug,
} from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { cn } from "@/lib/cn";

type ProjectPagerProps = {
  slug: CaseStudySlug;
  locale: Locale;
};

/** Previous/next case study in display order; no wrap-around. */
export async function ProjectPager({ slug, locale }: ProjectPagerProps) {
  const t = await getT(locale, "projects");
  const tActions = await getT(locale, "actions");
  const index = caseStudyProjects.findIndex((project) => project.slug === slug);
  const links = [
    {
      project: caseStudyProjects[index - 1],
      label: tActions("previousProject"),
      Icon: FiArrowLeft,
      end: false,
    },
    {
      project: caseStudyProjects[index + 1],
      label: tActions("nextProject"),
      Icon: FiArrowRight,
      end: true,
    },
  ];

  return (
    <Container>
      <nav
        aria-label={t("labels.projectNavigation")}
        className="border-t border-border py-12 sm:py-16"
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {links.map(
            ({ project, label, Icon, end }) =>
              project && (
                <li key={label} className={cn(end && "sm:col-start-2")}>
                  <Link
                    href={`/${locale}/projects/${project.slug}/`}
                    rel={end ? "next" : "prev"}
                    className={cn(
                      "group flex flex-col gap-1 rounded-card border border-border bg-surface p-6 transition-colors hover:border-accent",
                      end && "sm:items-end sm:text-end",
                    )}
                  >
                    <span className="inline-flex items-center gap-1.5 text-sm text-muted">
                      {!end && (
                        <Icon aria-hidden className="size-4 rtl:-scale-x-100" />
                      )}
                      {label}
                      {end && (
                        <Icon aria-hidden className="size-4 rtl:-scale-x-100" />
                      )}
                    </span>
                    <span className="text-h3 font-semibold group-hover:text-accent">
                      {t(`${project.slug}.title`)}
                    </span>
                  </Link>
                </li>
              ),
          )}
        </ul>
      </nav>
    </Container>
  );
}
