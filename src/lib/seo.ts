import type { Metadata } from "next";

import { SITE_URL } from "@/config/site";
import { getT } from "@/i18n/getT";
import { defaultLocale, type Locale, locales } from "@/i18n/settings";

const openGraphLocale: Record<Locale, string> = { en: "en_US", fa: "fa_IR" };

/** Absolute URL of a localized page. `path` has no leading slash and keeps the trailing one ("projects/mssp/"). */
export function localeUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}/${locale}/${path}`;
}

/** hreflang map for a path, with x-default = the default locale. */
export function languageAlternates(path = ""): Record<string, string> {
  return {
    ...Object.fromEntries(
      locales.map((locale) => [locale, localeUrl(locale, path)]),
    ),
    "x-default": localeUrl(defaultLocale, path),
  };
}

type PageMetadataOptions = {
  locale: Locale;
  path?: string;
  /** Page title without the site name; omit for the home page. */
  title?: string;
  description: string;
};

/** Title, description, canonical, hreflang, Open Graph and Twitter card for one localized page. */
export async function pageMetadata({
  locale,
  path = "",
  title,
  description,
}: PageMetadataOptions): Promise<Metadata> {
  const t = await getT(locale, "common");
  const fullTitle = title ? `${title} · ${t("site.name")}` : t("site.title");
  const url = localeUrl(locale, path);
  const image = {
    url: `${SITE_URL}/og/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: t("site.title"),
  };

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: t("site.name"),
      title: fullTitle,
      description,
      locale: openGraphLocale[locale],
      alternateLocale: locales
        .filter((other) => other !== locale)
        .map((other) => openGraphLocale[other]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
