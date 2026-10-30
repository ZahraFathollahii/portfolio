import { SectionRail } from "@/components/layout";
import { About } from "@/features/home/sections/About";
import { Contact } from "@/features/home/sections/Contact";
import { Experience } from "@/features/home/sections/Experience";
import { Hero } from "@/features/home/sections/Hero";
import { Research } from "@/features/home/sections/Research";
import { SelectedWork } from "@/features/home/sections/SelectedWork";
import { Skills } from "@/features/home/sections/Skills";
import { assertLocale } from "@/i18n/settings";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = assertLocale((await params).locale);

  return (
    <>
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
