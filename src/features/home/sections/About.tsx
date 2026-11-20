import { FiActivity, FiLayers, FiShield } from "react-icons/fi";

import { Card, Heading, Section } from "@/components/ui";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type AboutProps = {
  locale: Locale;
};

export async function About({ locale }: AboutProps) {
  const t = await getT(locale, "home");

  const pillars = [
    {
      icon: FiLayers,
      title: t("hero.founderBadge"),
      desc: t("hero.founderDesc"),
    },
    {
      icon: FiActivity,
      title: t("hero.healthcareBadge"),
      desc: t("hero.healthcareDesc"),
    },
    {
      icon: FiShield,
      title: t("hero.craftBadge"),
      desc: t("hero.craftDesc"),
    },
  ];

  return (
    <Section id="about" title={t("about.title")}>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-6 text-muted lg:col-span-7">
          <p className="text-lead leading-relaxed font-medium text-pretty text-text">
            {t("about.p1")}
          </p>
          <p className="text-base leading-relaxed text-pretty">
            {t("about.p2")}
          </p>
          <p className="text-base leading-relaxed text-pretty">
            {t("about.p3")}
          </p>
        </div>

        <div className="space-y-4 lg:col-span-5">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={i}
                className="flex items-start gap-4 border-border/80 bg-surface/50 p-5 backdrop-blur-sm transition-all hover:border-accent/40 hover:shadow-card-hover"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="size-5" />
                </div>
                <div>
                  <Heading level={4} className="text-base font-bold text-text">
                    {pillar.title}
                  </Heading>
                  <p className="mt-1 text-sm leading-relaxed text-pretty text-muted">
                    {pillar.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
