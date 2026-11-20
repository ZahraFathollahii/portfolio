import type { Metadata } from "next";

import { SectionRail } from "@/components/layout";
import { About } from "@/features/home/sections/About";
import { Contact } from "@/features/home/sections/Contact";
import { Experience } from "@/features/home/sections/Experience";
import { PersonJsonLd } from "@/features/home/PersonJsonLd";
import { Hero } from "@/features/home/sections/Hero";
import { Research } from "@/features/home/sections/Research";
import { SelectedWork } from "@/features/home/sections/SelectedWork";
import { Skills } from "@/features/home/sections/Skills";
import { getT } from "@/i18n/getT";
import { assertLocale } from "@/i18n/settings";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = assertLocale((await params).locale);
  const t = await getT(locale, "common");
  return pageMetadata({ locale, description: t("site.description") });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);

  return (
    <>
      <PersonJsonLd locale={locale} />
      <SectionRail />
      <Hero locale={locale} />
      <About locale={locale} />
      <Skills locale={locale} />
      <SelectedWork locale={locale} />
      <Experience locale={locale} />
      <Research locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
