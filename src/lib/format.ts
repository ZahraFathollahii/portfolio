import { intlLocale, type Locale } from "@/i18n/settings";

/** Locale-aware number formatting — Persian digits (۱۸٫۷۰) in FA. */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(intlLocale[locale], options).format(value);
}

// FA dates use the Jalali (Persian) calendar. UTC keeps ISO dates from shifting a day.
const dateLocale: Record<Locale, string> = {
  en: "en-US",
  fa: "fa-IR-u-ca-persian",
};

/** "Jul 2023" / "تیر ۱۴۰۲" from a full ISO date (YYYY-MM-DD). */
export function formatMonthYear(isoDate: string, locale: Locale): string {
  const parts = new Intl.DateTimeFormat(dateLocale[locale], {
    year: "numeric",
    month: locale === "fa" ? "long" : "short",
    timeZone: "UTC",
  }).formatToParts(new Date(isoDate));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";

  // ICU's Persian pattern is "year month"; written Persian reads "month year".
  return `${part("month")} ${part("year")}`;
}

/** Calendar year of a date — Jalali in FA. */
export function formatYear(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(dateLocale[locale], {
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}
