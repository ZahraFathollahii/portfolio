export const locales = ["en", "fa"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fa: "rtl",
};

/** BCP 47 tags for Intl APIs. */
export const intlLocale: Record<Locale, string> = {
  en: "en-US",
  fa: "fa-IR",
};
