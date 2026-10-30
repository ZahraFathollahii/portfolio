import { SHOW_GANOTIC } from "@/config/site";
import type { Locale } from "@/i18n/settings";

export const profile = {
  // TODO_EMAIL: Zahra will provide. Email links stay hidden while this is null.
  email: null as string | null,
  /** Shown next to the role in the hero, as separate items. */
  headlineTechs: ["React", "TypeScript", "Tailwind CSS"],
  /**
   * Per-locale resume. A missing file falls back to the EN one at build time (see lib/resume.ts).
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
  { id: "website", href: "https://ganotic.ir", labelKey: "social.website" },
] as const;

export type SocialId = (typeof allSocialLinks)[number]["id"];

/** "website" is Ganotic's site, so it follows `SHOW_GANOTIC`. */
export const socialLinks: readonly (typeof allSocialLinks)[number][] =
  allSocialLinks.filter((link) => SHOW_GANOTIC || link.id !== "website");
