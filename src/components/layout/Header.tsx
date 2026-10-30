import Link from "next/link";
import { FiDownload } from "react-icons/fi";

import { LocaleSwitch } from "@/components/layout/LocaleSwitch";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ButtonLink, Container } from "@/components/ui";
import { profile } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { assetPath } from "@/lib/paths";

type HeaderProps = {
  locale: Locale;
};

export async function Header({ locale }: HeaderProps) {
  const t = await getT(locale, "common");
  const tActions = await getT(locale, "actions");
  const resumeHref = assetPath(profile.resume[locale]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur-md">
      <Container className="flex h-16 items-center gap-1">
        <Link
          href={`/${locale}/`}
          className="me-auto rounded-control text-base font-bold"
        >
          {t("site.name")}
          <span aria-hidden className="text-accent">
            .
          </span>
        </Link>
        <LocaleSwitch />
        <ThemeToggle />
        <div className="ms-2 hidden sm:block">
          <ButtonLink href={resumeHref} download size="sm" icon={FiDownload}>
            {tActions("downloadCv")}
          </ButtonLink>
        </div>
        <MobileMenu locale={locale} resumeHref={resumeHref} />
      </Container>
    </header>
  );
}
