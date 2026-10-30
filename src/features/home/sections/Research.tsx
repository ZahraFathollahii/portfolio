import { Card, ChipList, Eyebrow, Heading, Section } from "@/components/ui";
import { degrees, thesis } from "@/content/education";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatNumber } from "@/lib/format";
import { isTodo } from "@/lib/todo";

type ResearchProps = {
  locale: Locale;
};

export async function Research({ locale }: ResearchProps) {
  const t = await getT(locale, "home");

  return (
    <Section id="research" title={t("research.title")}>
      <div className="grid gap-6 lg:grid-cols-5">
        <Card as="article" className="lg:col-span-3">
          <Eyebrow>{t(thesis.labelKey)}</Eyebrow>
          <Heading level={3} className="mt-3">
            {t(thesis.titleKey)}
          </Heading>
          <p className="mt-4 text-muted">{t(thesis.summaryKey)}</p>
          <ChipList items={thesis.methods} tone="accent" className="mt-5" />
        </Card>
        <ul className="grid gap-6 lg:col-span-2">
          {degrees.map((degree) => {
            const year = degree.yearKey ? t(degree.yearKey) : null;
            const details = [
              year && !isTodo(year) ? year : null,
              degree.noteKey ? t(degree.noteKey) : null,
              t("research.degrees.gpa", {
                value: formatNumber(degree.gpa.value, locale, {
                  minimumFractionDigits: 2,
                }),
                scale: formatNumber(degree.gpa.scale, locale),
              }),
            ].filter((detail) => detail !== null);

            return (
              <Card as="li" key={degree.id}>
                <Heading level={3}>{t(degree.degreeKey)}</Heading>
                <p className="mt-1 text-sm text-muted">{t(degree.schoolKey)}</p>
                <ChipList items={details} className="mt-4" />
              </Card>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
