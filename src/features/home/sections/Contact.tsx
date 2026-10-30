import { FiMail } from "react-icons/fi";

import { socialIcons } from "@/components/layout";
import { ButtonLink, Section } from "@/components/ui";
import { profile, socialLinks } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type ContactProps = {
  locale: Locale;
};

export async function Contact({ locale }: ContactProps) {
  const t = await getT(locale, "home");
  const tCommon = await getT(locale, "common");
  const tActions = await getT(locale, "actions");

  return (
    <Section id="contact" title={t("contact.title")}>
      <p className="max-w-2xl text-lead text-muted">{t("contact.body")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        {profile.email && (
          <ButtonLink href={`mailto:${profile.email}`} icon={FiMail}>
            {tActions("sendEmail")}
          </ButtonLink>
        )}
        {socialLinks.map((link) => (
          <ButtonLink
            key={link.id}
            href={link.href}
            variant="secondary"
            icon={socialIcons[link.id]}
            newTabHint={tActions("newTab")}
          >
            {tCommon(link.labelKey)}
          </ButtonLink>
        ))}
      </div>
    </Section>
  );
}
