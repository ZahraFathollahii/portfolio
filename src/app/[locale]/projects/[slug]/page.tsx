import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyContent } from "@/features/projects/CaseStudyContent";
import { CaseStudyHeader } from "@/features/projects/CaseStudyHeader";
import { ProjectPager } from "@/features/projects/ProjectPager";
import { caseStudyProjects } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import { assertLocale } from "@/i18n/settings";
import { pageMetadata } from "@/lib/seo";

// Only visible projects with a case study are generated (Ganotic follows SHOW_GANOTIC).
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyProjects.map((project) => ({ slug: project.slug }));
}

async function getCaseStudy(
  params: PageProps<"/[locale]/projects/[slug]">["params"],
) {
  const { locale: rawLocale, slug } = await params;
  const locale = assertLocale(rawLocale);
  const project = caseStudyProjects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return { locale, project };
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, project } = await getCaseStudy(params);
  const t = await getT(locale, "projects");

  return pageMetadata({
    locale,
    path: `projects/${project.slug}/`,
    title: t(`${project.slug}.title`),
    description: t(`${project.slug}.summary`),
  });
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, project } = await getCaseStudy(params);

  return (
    <article>
      <CaseStudyHeader project={project} locale={locale} />
      <CaseStudyContent project={project} locale={locale} />
      <ProjectPager slug={project.slug} locale={locale} />
    </article>
  );
}
