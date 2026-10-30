import { notFound } from "next/navigation";

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

export const namespaces = [
  "common",
  "actions",
  "home",
  "projects",
  "errors",
] as const;

export type Namespace = (typeof namespaces)[number];

/** Namespaces shipped to the client provider — only what client components use. */
export const clientNamespaces = [
  "common",
  "actions",
] as const satisfies readonly Namespace[];

export type ClientNamespace = (typeof clientNamespaces)[number];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Narrows a route param to a Locale, or renders the 404 page. */
export function assertLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}
