import { existsSync } from "node:fs";
import { join } from "node:path";

import { profile } from "@/content/profile";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { assetPath } from "@/lib/paths";

/** Build-time only (Server Components): the locale's resume, or the EN one if that file doesn't exist. */
export function getResume(locale: Locale): { href: string; locale: Locale } {
  const fileLocale = existsSync(
    join(process.cwd(), "public", profile.resume[locale]),
  )
    ? locale
    : defaultLocale;
  return { href: assetPath(profile.resume[fileLocale]), locale: fileLocale };
}
