import { existsSync } from "node:fs";
import { join } from "node:path";

import { profile } from "@/content/profile";
import { defaultLocale, type Locale } from "@/i18n/settings";
import { assetPath } from "@/lib/paths";

/** Build-time only (Server Components): the locale's resume, else the EN one, else null if neither file exists. */
export function getResume(
  locale: Locale,
): { href: string; locale: Locale } | null {
  const fileLocale = [locale, defaultLocale].find((candidate) =>
    existsSync(join(process.cwd(), "public", profile.resume[candidate])),
  );
  return fileLocale
    ? { href: assetPath(profile.resume[fileLocale]), locale: fileLocale }
    : null;
}
