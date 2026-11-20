import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";

type SkipLinkProps = {
  locale: Locale;
};

export async function SkipLink({ locale }: SkipLinkProps) {
  const t = await getT(locale, "common");

  return (
    <a
      href="#main"
      className="sr-only rounded-control bg-accent px-4 py-2 font-medium text-accent-contrast focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-60"
    >
      {t("skipLink")}
    </a>
  );
}
