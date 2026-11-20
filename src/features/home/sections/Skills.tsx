import { Card, ChipList, Heading, Section } from "@/components/ui";
import { learningSkills, productionSkills } from "@/content/skills";
import type { Skill } from "@/features/home/types";
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
            items={learningSkills.map((skill: Skill) => ({
              name: "name" in skill ? skill.name : String(t(skill.labelKey)),
              icon: skill.icon,
            }))}
            tone="accent"
            className="mt-5"
          />
        </Card>
      </div>
    </Section>
  );
}
