import { SHOW_GANOTIC } from "@/config/site";
import type { Locale } from "@/i18n/settings";

export const profile = {
  email: "hana.lee90@yahoo.com",
  phone: "+989905724725",
  phoneFormatted: "+98 990 572 4725",
  whatsapp: "https://wa.me/989905724725",
  location: "Tehran, Iran",
  /** Shown next to the role in the hero, as separate items. */
  headlineTechs: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "Ant Design",
  ],
  /**
   * Per-locale resume. A missing file falls back to the EN one at build time (see lib/resume.ts);
   * "Download CV" stays hidden if that doesn't exist either.
   * TODO(resume): EN PDF not provided yet — public/resume/.
   */
  resume: {
    en: "/resume/zahra-fathollahi-en.pdf",
    fa: "/resume/zahra-fathollahi-fa.pdf",
  } satisfies Record<Locale, `/${string}`>,
} as const;

const allSocialLinks = [
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/zahra-fathollahi",
    labelKey: "social.linkedin",
  },
  {
    id: "github",
    href: "https://github.com/ZahraFathollahii",
    labelKey: "social.github",
  },
  {
    id: "whatsapp",
    href: "https://wa.me/989905724725",
    labelKey: "social.whatsapp",
  },
  { id: "website", href: "https://ganotic.ir", labelKey: "social.website" },
] as const;

export type SocialId = (typeof allSocialLinks)[number]["id"];

/** "website" is Ganotic's site, so it follows `SHOW_GANOTIC`. */
export const socialLinks: readonly (typeof allSocialLinks)[number][] =
  allSocialLinks.filter((link) => SHOW_GANOTIC || link.id !== "website");
