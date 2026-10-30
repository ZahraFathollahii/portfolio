import Link from "next/link";

import { SocialLinks } from "@/components/layout/SocialLinks";
import { Container } from "@/components/ui";
import { homeSections } from "@/config/navigation";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatYear } from "@/lib/format";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getT(locale, "common");

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
        <SocialLinks locale={locale} className="-ms-2.5 md:ms-0" />
        <p className="text-sm text-muted">
          {t("footer.copyright", { year: formatYear(new Date(), locale) })}
        </p>
      </Container>
    </footer>
  );
}
