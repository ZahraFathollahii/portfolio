import { Card, Chip, Heading, Section } from "@/components/ui";
import { learningSkills, productionSkills } from "@/content/skills";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type SkillsProps = {
  locale: Locale;
};

export async function Skills({ locale }: SkillsProps) {
  const t = await getT(locale, "home");

  return (
    <Section id="skills" title={t("skills.title")}>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <Heading level={3}>{t("skills.production")}</Heading>
          <ul className="mt-5 flex flex-wrap gap-2">
            {productionSkills.map((skill) => (
              <li key={skill}>
                <Chip>{skill}</Chip>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <Heading level={3}>{t("skills.learningTitle")}</Heading>
          <ul className="mt-5 flex flex-wrap gap-2">
            {learningSkills.map((skill) => {
              const label = "name" in skill ? skill.name : t(skill.labelKey);
              return (
                <li key={label}>
                  <Chip tone="accent">{label}</Chip>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </Section>
  );
}
