import type { Metadata } from "next";
import Link from "next/link";

import { ThemeScript } from "@/components/layout";
import { Heading } from "@/components/ui";
import { getT } from "@/i18n/getT";
import { defaultLocale, localeDir, locales } from "@/i18n/settings";
import { cn } from "@/lib/cn";
import { inter, vazirmatn } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "404",
  robots: { index: false },
};

/** The only 404 in a static export (→ out/404.html, served by GitHub Pages). Bilingual: the locale is unknown. */
export default async function NotFound() {
  const blocks = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      t: await getT(locale, "errors"),
      tActions: await getT(locale, "actions"),
    })),
  );

  return (
    <html
      lang={defaultLocale}
      className={cn(inter.variable, vazirmatn.variable)}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <main className="mx-auto grid min-h-dvh max-w-3xl content-center gap-12 px-4 py-16 sm:px-6">
          <p aria-hidden className="text-display font-extrabold text-accent">
            404
          </p>
          {blocks.map(({ locale, t, tActions }) => (
            <section
              key={locale}
              lang={locale}
              dir={localeDir[locale]}
              className="space-y-3"
            >
              <Heading level={2}>{t("notFound.title")}</Heading>
              <p className="text-muted">{t("notFound.body")}</p>
              <Link
                href={`/${locale}/`}
                className="inline-block font-medium text-accent hover:underline"
              >
                {tActions("backHome")}
              </Link>
            </section>
          ))}
        </main>
      </body>
    </html>
  );
}
