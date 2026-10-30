import type { IconType } from "react-icons";
import { FaLinkedinIn } from "react-icons/fa6";
import { FiGlobe, FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";

import { IconLink } from "@/components/ui";
import { profile, socialLinks, type SocialId } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { cn } from "@/lib/cn";

export const socialIcons: Record<SocialId, IconType> = {
  linkedin: FaLinkedinIn,
  github: SiGithub,
  website: FiGlobe,
};

type SocialLinksProps = {
  locale: Locale;
  className?: string;
};

/** Icon-only social links (+ email when set). */
export async function SocialLinks({ locale, className }: SocialLinksProps) {
  const t = await getT(locale, "common");
  const tActions = await getT(locale, "actions");

  return (
    <ul
      aria-label={t("social.label")}
      className={cn("flex items-center gap-1", className)}
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
  );
}
