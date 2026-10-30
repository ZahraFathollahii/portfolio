import { FiMapPin } from "react-icons/fi";

import { Chip, Heading, Section } from "@/components/ui";
import { experience } from "@/content/experience";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatDateRange } from "@/lib/format";

type ExperienceProps = {
  locale: Locale;
};

/** Timeline grouped by company (like LinkedIn): one entry per company, its roles newest first. */
export async function Experience({ locale }: ExperienceProps) {
  const t = await getT(locale, "home");

  return (
    <Section id="experience" title={t("experience.title")}>
      <ol className="max-w-3xl border-s border-border">
        {experience.map((entry) => (
          <li key={entry.id} className="relative ps-8 pb-12 last:pb-0">
            <span
              aria-hidden
              className="absolute -start-[5px] top-2.5 size-2.5 rounded-full bg-accent ring-4 ring-bg"
            />
            <Heading level={3}>{t(entry.companyKey)}</Heading>
            {entry.locationKey && (
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
                <FiMapPin aria-hidden className="size-3.5" />
                {t(entry.locationKey)}
              </p>
            )}
            <ol className="mt-5 space-y-7">
              {entry.roles.map((role) => (
                <li key={role.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <Heading level={4}>{t(role.titleKey)}</Heading>
                    <p className="text-sm text-muted tabular-nums">
                      {formatDateRange(
                        role.start,
                        role.end,
                        locale,
                        t("experience.present"),
                      )}
                    </p>
                  </div>
                  <p className="mt-2 text-muted">{t(role.descriptionKey)}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {role.techs.map((tech) => (
                      <li key={tech}>
                        <Chip>{tech}</Chip>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </Section>
  );
}
