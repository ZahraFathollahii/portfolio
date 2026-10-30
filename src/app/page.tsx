import type { Metadata } from "next";
import Link from "next/link";

import { ThemeScript } from "@/components/layout";
import { BASE_PATH } from "@/config/site";
import { getT } from "@/i18n/getT";
import { defaultLocale, locales } from "@/i18n/settings";
import { cn } from "@/lib/cn";
import { inter, vazirmatn } from "@/lib/fonts";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getT(defaultLocale, "common");
  // Language picker that redirects: crawlers should index the locale pages it links to.
  return {
    title: t("site.title"),
    description: t("site.description"),
    robots: { index: false, follow: true },
    alternates: { languages: languageAlternates() },
  };
}

// "fa*" browsers → /fa/, everyone else → /en/. Runs before paint.
const redirectScript = `location.replace(${JSON.stringify(BASE_PATH)}+"/"+((navigator.language||"").toLowerCase().indexOf("fa")===0?"fa":${JSON.stringify(defaultLocale)})+"/")`;

/** Static locale picker at `/`: JS redirect by browser language, meta-refresh fallback, visible links. */
export default async function RootPage() {
  const labels = await Promise.all(
    locales.map(async (locale) => ({
      locale,
      name: (await getT(locale, "common"))("language.name"),
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
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <noscript>
          <meta
            httpEquiv="refresh"
            content={`0;url=${BASE_PATH}/${defaultLocale}/`}
          />
        </noscript>
      </head>
      <body>
        <main className="grid min-h-dvh place-items-center">
          <ul className="flex gap-8 text-lg font-medium">
            {labels.map(({ locale, name }) => (
              <li key={locale}>
                <Link
                  href={`/${locale}/`}
                  lang={locale}
                  hrefLang={locale}
                  className="hover:text-accent"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </main>
      </body>
    </html>
  );
}
