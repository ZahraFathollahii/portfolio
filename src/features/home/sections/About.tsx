import { Section } from "@/components/ui";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type AboutProps = {
  locale: Locale;
};

export async function About({ locale }: AboutProps) {
  const t = await getT(locale, "home");

  return (
    <Section id="about" title={t("about.title")}>
      <div className="max-w-3xl space-y-5 text-muted">
        <p className="text-lead text-text">{t("about.p1")}</p>
        <p>{t("about.p2")}</p>
        <p>{t("about.p3")}</p>
      </div>
    </Section>
  );
}
