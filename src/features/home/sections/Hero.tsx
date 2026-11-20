import { FiArrowDown, FiDownload, FiMapPin } from "react-icons/fi";

import { SocialLinks } from "@/components/layout";
import {
  ButtonLink,
  Chip,
  ChipList,
  Container,
  Heading,
} from "@/components/ui";
import { SHOW_AVAILABILITY_BADGE } from "@/config/site";
import { profile } from "@/content/profile";
import { getT } from "@/i18n/getT";
import type { Locale } from "@/i18n/settings";
import { getProfilePhoto } from "@/lib/photo";
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
  const photo = getProfilePhoto();

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden className="hero-glow" />
      <div aria-hidden className="absolute inset-0 bg-dot-grid" />
      <Container className="relative pt-8 pb-12 sm:pt-14 sm:pb-16">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center gap-2.5">
              {SHOW_AVAILABILITY_BADGE && (
                <Chip tone="accent" className="gap-2">
                  <span className="relative flex size-2 items-center justify-center">
                    <span
                      aria-hidden
                      className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:hidden"
                    />
                    <span
                      aria-hidden
                      className="relative inline-flex size-2 rounded-full bg-accent"
                    />
                  </span>
                  <span>{t("hero.available")}</span>
                </Chip>
              )}
              <Chip
                tone="neutral"
                className="gap-1.5 border-accent/40 font-medium text-text"
              >
                <span aria-hidden>🚀</span>
                <span>{t("hero.founderBadge")}</span>
              </Chip>
            </div>
            <Heading level={1} id="hero-title" accentDot>
              {tCommon("site.name")}
            </Heading>
            <p className="mt-4 text-xl font-bold tracking-tight text-text sm:text-2xl">
              {t("hero.role")}
            </p>
            <ChipList items={profile.headlineTechs} className="mt-3.5" />
            <p className="mt-6 text-lead text-pretty text-muted">
              {t("hero.intro")}
            </p>
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
              <li className="inline-flex items-center gap-1.5">
                <FiMapPin aria-hidden className="size-4 text-accent" />
                {t("hero.location")}
              </li>
              <li>{t("hero.remote")}</li>
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              {resume && (
                <ButtonLink
                  href={resume.href}
                  hrefLang={resume.locale}
                  download
                  icon={FiDownload}
                >
                  {tActions("downloadCv")}
                </ButtonLink>
              )}
              <ButtonLink
                href="#contact"
                variant="secondary"
                icon={FiArrowDown}
              >
                {tActions("getInTouch")}
              </ButtonLink>
              <SocialLinks locale={locale} className="ms-1" />
            </div>
          </div>

          <div className="order-first flex justify-center lg:order-last lg:col-span-5 lg:justify-end">
            {photo ? (
              // Above the fold: eager + high priority. Explicit size prevents layout shift.
              <div className="relative inline-block">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-b from-accent/25 via-accent/5 to-transparent blur-md"
                />
                <picture className="relative block">
                  <source
                    type="image/webp"
                    srcSet={photo.srcSet}
                    sizes="(min-width: 1024px) 18rem, 11rem"
                  />
                  <img
                    src={photo.src}
                    width={photo.size}
                    height={photo.size}
                    alt={t("hero.photoAlt")}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="size-44 rounded-3xl border border-border/80 bg-surface object-cover shadow-2xl sm:size-56 lg:size-72"
                  />
                </picture>
              </div>
            ) : (
              <div className="w-full max-w-md rounded-card border border-border bg-surface/85 p-5 shadow-card backdrop-blur-md transition-all duration-300 hover:border-accent/40 hover:shadow-card-hover sm:p-6">
                <div className="flex items-center justify-between border-b border-border/70 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-red-400/80" />
                    <span className="size-2.5 rounded-full bg-amber-400/80" />
                    <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="font-mono text-xs text-muted" dir="ltr">
                    zahra.config.ts
                  </span>
                </div>
                <div className="mt-4 space-y-3.5 text-sm">
                  <div className="rounded-control border border-border/60 bg-bg/60 p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 font-medium text-text">
                      <span className="size-2 rounded-full bg-accent" />
                      {t("hero.founderBadge")}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {t("hero.founderDesc")}
                    </p>
                  </div>
                  <div className="rounded-control border border-border/60 bg-bg/60 p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 font-medium text-text">
                      <span className="size-2 rounded-full bg-accent" />
                      {t("hero.healthcareBadge")}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {t("hero.healthcareDesc")}
                    </p>
                  </div>
                  <div className="rounded-control border border-border/60 bg-bg/60 p-3.5 transition-colors hover:border-accent/40">
                    <div className="flex items-center gap-2 font-medium text-text">
                      <span className="size-2 rounded-full bg-accent" />
                      {t("hero.craftBadge")}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {t("hero.craftDesc")}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
