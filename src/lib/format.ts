import { intlLocale, type Locale } from "@/i18n/settings";

/** Locale-aware number formatting — Persian digits (۱۸٫۷۰) in FA. */
export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(intlLocale[locale], options).format(value);
}
