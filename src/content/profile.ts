import type { Locale } from "@/i18n/settings";

export const profile = {
  // TODO_EMAIL: Zahra will provide. Email links stay hidden while this is null.
  email: null as string | null,
  // TODO: placeholder paths until the PDFs are provided (public/resume/).
  resume: {
    en: "/resume/zahra-fathollahi-en.pdf",
    fa: "/resume/zahra-fathollahi-fa.pdf",
  } satisfies Record<Locale, `/${string}`>,
};

export const socialLinks = [
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

export type SocialId = (typeof socialLinks)[number]["id"];
