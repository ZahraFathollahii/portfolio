import Link from "next/link";
import { FiDownload } from "react-icons/fi";

import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink, Container } from "@/components/ui";
import { SHOW_LOCALE_SWITCH } from "@/config/site";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { getProfilePhoto } from "@/lib/photo";
import { getResume } from "@/lib/resume";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getT(locale, "common");
  const tActions = await getT(locale, "actions");
  const tHome = await getT(locale, "home");
  const resume = getResume(locale);
  const photo = getProfilePhoto();
  const role = tHome("hero.role");
  const availableText = tHome("hero.available");

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-1">
        <Link
          href={`/${locale}/`}
          aria-label={t("site.name")}
          className="group me-auto flex items-center gap-2.5 focus-visible:outline-none"
        >
          <span className="flex size-8 items-center justify-center rounded-xl border border-border/80 bg-surface/80 font-mono text-xs font-bold text-accent shadow-xs transition-colors group-hover:border-accent/40 group-hover:bg-accent/10">
            ZF
          </span>
          <span className="text-sm font-semibold tracking-tight text-text transition-colors group-hover:text-accent">
            {t("site.name")}
          </span>
        </Link>
        {SHOW_LOCALE_SWITCH && <LocaleSwitch />}
        <ThemeToggle />
        {resume && (
          <div className="ms-2 hidden sm:block">
            <ButtonLink
              href={resume.href}
              hrefLang={resume.locale}
              download
              size="sm"
              icon={FiDownload}
            >
              {tActions("downloadCv")}
            </ButtonLink>
          </div>
        )}
        <MobileMenu
          locale={locale}
          resume={resume}
          photo={photo}
          role={role}
          availableText={availableText}
        />
      </Container>
    </header>
  );
}
