import { Fragment } from "react";
import { FiArrowDown, FiDownload, FiMapPin } from "react-icons/fi";

import { SocialLinks } from "@/components/layout";
import { ButtonLink, Chip, Container, Heading } from "@/components/ui";
import { SHOW_AVAILABILITY_BADGE } from "@/config/site";
import { profile } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { getResume } from "@/lib/resume";

type HeroProps = {
  locale: Locale;
};

// Not revealed on scroll: it's above the fold and holds the LCP element.
export async function Hero({ locale }: HeroProps) {
  const t = await getT(locale, "home");
  const tCommon = await getT(locale, "common");
  const tActions = await getT(locale, "actions");
  const resume = getResume(locale);
  // Separate dir="auto" items — one mixed-script string gets reordered by bidi on wrap.
  const headline = [t("hero.role"), ...profile.headlineTechs];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-dot-grid [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <Container className="relative pt-16 pb-20 sm:pt-28 sm:pb-32">
        {SHOW_AVAILABILITY_BADGE && (
          <Chip tone="accent" className="mb-6 gap-2">
            <span
              aria-hidden
              className="size-2 rounded-full bg-accent motion-safe:animate-pulse"
            />
            {t("hero.available")}
          </Chip>
        )}
        <Heading level={1} id="hero-title" accentDot>
          {tCommon("site.name")}
        </Heading>
        <ul className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-lead font-medium">
          {headline.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && (
                <li aria-hidden className="text-accent">
                  ·
                </li>
              )}
              <li dir="auto">{item}</li>
            </Fragment>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-lead text-muted">{t("hero.intro")}</p>
        <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
          <li className="inline-flex items-center gap-1.5">
            <FiMapPin aria-hidden className="size-4 text-accent" />
            {t("hero.location")}
          </li>
          <li>{t("hero.remote")}</li>
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <ButtonLink
            href={resume.href}
            hrefLang={resume.locale}
            download
            icon={FiDownload}
          >
            {tActions("downloadCv")}
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary" icon={FiArrowDown}>
            {tActions("getInTouch")}
          </ButtonLink>
          <SocialLinks locale={locale} className="ms-1" />
        </div>
      </Container>
    </section>
  );
}
