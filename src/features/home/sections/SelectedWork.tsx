import { Heading, Section } from "@/components/ui";
import { ProjectCard } from "@/features/projects/ProjectCard";
import { projects } from "@/features/projects/projects.data";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type SelectedWorkProps = {
  locale: Locale;
};

export async function SelectedWork({ locale }: SelectedWorkProps) {
  const t = await getT(locale, "home");
  const featured = projects.filter((project) => project.featured);
  const more = projects.filter((project) => !project.featured);

  return (
    <Section id="work" title={t("work.title")}>
      <ul className="grid gap-6 md:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} locale={locale} />
        ))}
      </ul>
      {more.length > 0 && (
        <>
          <Heading level={3} className="mt-16">
            {t("work.moreTitle")}
          </Heading>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {more.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
              />
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
