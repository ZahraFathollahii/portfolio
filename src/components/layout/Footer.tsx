import { Container } from "@/components/ui";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { formatYear } from "@/lib/format";

type FooterProps = {
  locale: Locale;
};

export async function Footer({ locale }: FooterProps) {
  const t = await getT(locale, "common");

  return (
    <footer className="border-t border-border/60 py-8">
      <Container className="flex flex-col items-center justify-between gap-4 text-xs text-muted sm:flex-row">
        <p>{t("footer.copyright", { year: formatYear(new Date(), locale) })}</p>
        <p className="font-mono text-muted/70" dir="auto">
          Built with Next.js & Tailwind CSS
        </p>
      </Container>
    </footer>
  );
}
