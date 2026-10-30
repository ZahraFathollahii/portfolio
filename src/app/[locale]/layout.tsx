import type { Metadata } from "next";

import { SiteShell, ThemeScript } from "@/components/layout";
import { SITE_URL } from "@/config/site";
import { getT } from "@/i18n/getT";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getClientResources } from "@/i18n/resources";
import { assertLocale, localeDir, locales } from "@/i18n/settings";
import { cn } from "@/lib/cn";
import { inter, vazirmatn } from "@/lib/fonts";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getT(locale, "common");

  return {
    // Pages set full titles, canonical and hreflang via lib/seo.ts; these are fallbacks.
    metadataBase: new URL(SITE_URL),
    title: t("site.title"),
    description: t("site.description"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);

  return (
    // suppressHydrationWarning: ThemeScript sets data-theme before React hydrates.
    <html
      lang={locale}
      dir={localeDir[locale]}
      className={cn(inter.variable, vazirmatn.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <I18nProvider
          key={locale}
          locale={locale}
          resources={getClientResources(locale)}
        >
          <SiteShell locale={locale}>{children}</SiteShell>
        </I18nProvider>
      </body>
    </html>
  );
}
