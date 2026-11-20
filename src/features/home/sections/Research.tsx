import { FiGlobe, FiUser } from "react-icons/fi";

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
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Row 1, Col 1: M.Sc. Thesis */}
        <Card as="article" className="flex flex-col justify-between">
          <div>
            <Eyebrow>{t(thesis.labelKey)}</Eyebrow>
            <Heading level={3} className="mt-3">
              {t(thesis.titleKey)}
            </Heading>
            <p className="mt-4 text-sm leading-relaxed text-pretty text-muted">
              {t(thesis.summaryKey)}
            </p>
          </div>
          <ChipList items={thesis.methods} tone="accent" className="mt-6" />
        </Card>

        {/* Row 1, Col 2: Academic Degrees */}
        <ul className="flex flex-col gap-4">
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
              <Card as="li" key={degree.id} className="flex-1">
                <Heading level={3} className="text-lg">
                  {t(degree.degreeKey)}
                </Heading>
                <p className="mt-1 text-sm text-muted">{t(degree.schoolKey)}</p>
                <ChipList items={details} className="mt-3" />
              </Card>
            );
          })}
        </ul>

        {/* Row 2, Col 1: Languages Card */}
        <Card className="flex flex-col justify-between border-border/80 bg-surface/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiGlobe className="size-4" />
            </div>
            <Heading level={3} className="text-base font-bold">
              {t("research.languages.title")}
            </Heading>
          </div>
          <div className="mt-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 pb-2.5 text-sm">
              <span className="font-semibold text-text">
                {t("research.languages.en")}
              </span>
              <span className="rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-xs font-medium text-accent">
                {t("research.languages.enLevel")}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-sm">
              <span className="font-semibold text-text">
                {t("research.languages.fa")}
              </span>
              <span className="text-xs text-muted">
                {t("research.languages.faLevel")}
              </span>
            </div>
          </div>
        </Card>

        {/* Row 2, Col 2: Personal Details Card */}
        <Card className="flex flex-col justify-between border-border/80 bg-surface/60 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <FiUser className="size-4" />
            </div>
            <Heading level={3} className="text-base font-bold">
              {t("research.personal.title")}
            </Heading>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 py-2">
              <span className="text-muted">
                {t("research.personal.locationLabel")}
              </span>
              <span className="font-semibold text-text">
                {t("research.personal.locationValue")}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/50 py-2">
              <span className="text-muted">
                {t("research.personal.availabilityLabel")}
              </span>
              <span className="font-semibold text-accent">
                {t("research.personal.availabilityValue")}
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <span className="text-muted">
                {t("research.personal.workModeLabel")}
              </span>
              <span className="font-semibold text-text">
                {t("research.personal.workModeValue")}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
}
