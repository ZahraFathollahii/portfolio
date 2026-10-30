"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { locales, type Locale } from "@/i18n/settings";
import { cn } from "@/lib/cn";

type LocaleSwitchProps = {
  className?: string;
};

/** Same page in the other locale: swaps the first path segment, keeps the rest. */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  segments[1] = target;
  return segments.join("/");
}

export function LocaleSwitch({ className }: LocaleSwitchProps) {
  const { t, i18n } = useTranslation("common");
  const pathname = usePathname();
  const target =
    locales.find((locale) => locale !== i18n.language) ?? locales[0];

  return (
    <Link
      href={switchLocalePath(pathname, target)}
      hrefLang={target}
      className={cn(
        "inline-flex h-10 items-center rounded-control px-3 text-sm font-medium text-muted transition-colors duration-200 hover:bg-surface hover:text-text",
        className,
      )}
    >
      {/* Accessible name starts with the visible word (WCAG 2.5.3); only that word is in the target language. */}
      <span lang={target}>{t("locale.switchTo")}</span>
      <span className="sr-only"> ({t("locale.switchLabel")})</span>
    </Link>
  );
}
