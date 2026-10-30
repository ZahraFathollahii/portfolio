import { SectionRail } from "@/components/layout";
import { Container, Heading, Section } from "@/components/ui";
import { homeSections } from "@/config/navigation";
import { getT } from "@/i18n/getT";
import { assertLocale } from "@/i18n/settings";

// Phase 2 skeleton: real sections arrive in Phase 4. Empty bodies give the rail something to track.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);
  const t = await getT(locale, "common");

  return (
    <>
      <SectionRail />
      <Container className="py-24">
        <Heading level={1} accentDot>
          {t("site.name")}
        </Heading>
      </Container>
      {homeSections.map((section) => (
        <Section key={section.id} id={section.id} title={t(section.labelKey)}>
          <div className="min-h-[50vh] rounded-card border border-dashed border-border" />
        </Section>
      ))}
    </>
  );
}
