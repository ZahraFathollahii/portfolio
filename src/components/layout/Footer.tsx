import Link from "next/link";
import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiGlobe, FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

import { Container, IconLink } from "@/components/ui";
import { homeSections } from "@/config/navigation";
import { profile, socialLinks, type SocialId } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatYear } from "@/lib/format";

type FooterProps = {
  locale: Locale;
};

const socialIcons: Record<SocialId, IconType> = {
  linkedin: FaLinkedinIn,
  github: SiGithub,
  website: FiGlobe,
};

export async function Footer({ locale }: FooterProps) {
  const t = await getT(locale, "common");
  const tActions = await getT(locale, "actions");

  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <nav aria-label={t("footer.quickLinks")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {homeSections.map((section) => (
              <li key={section.id}>
                <Link
                  href={`/${locale}/#${section.id}`}
                  className="text-muted transition-colors hover:text-text"
                >
                  {t(section.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul
          aria-label={t("social.label")}
          className="-ms-2.5 flex items-center gap-1 md:ms-0"
        >
          {socialLinks.map((link) => (
            <li key={link.id}>
              <IconLink
                href={link.href}
                label={t(link.labelKey)}
                icon={socialIcons[link.id]}
                newTabHint={tActions("newTab")}
              />
            </li>
          ))}
          {profile.email && (
            <li>
              <IconLink
                href={`mailto:${profile.email}`}
                label={t("social.email")}
                icon={FiMail}
              />
            </li>
          )}
        </ul>
        <p className="text-sm text-muted">
          {t("footer.copyright", { year: formatYear(new Date(), locale) })}
        </p>
      </Container>
    </footer>
  );
}
