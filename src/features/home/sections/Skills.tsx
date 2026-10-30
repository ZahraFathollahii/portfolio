import { Card, ChipList, Heading, Section } from "@/components/ui";
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
          <ChipList items={productionSkills} className="mt-5" />
        </Card>
        <Card>
          <Heading level={3}>{t("skills.learningTitle")}</Heading>
          <ChipList
            items={learningSkills.map((skill) =>
              "name" in skill ? skill.name : t(skill.labelKey),
            )}
            tone="accent"
            className="mt-5"
          />
        </Card>
      </div>
    </Section>
  );
}
