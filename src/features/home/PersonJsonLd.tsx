import { profile, socialLinks } from "@/content/profile";
import { getT } from "@/i18n/getT";
import { type Locale, locales } from "@/i18n/settings";
import { getProfilePhoto } from "@/lib/photo";
import { localeUrl } from "@/lib/seo";

type PersonJsonLdProps = {
  locale: Locale;
};

/** schema.org Person for the home page. Only facts already shown on the page. */
export async function PersonJsonLd({ locale }: PersonJsonLdProps) {
  const tCommon = await getT(locale, "common");
  const tHome = await getT(locale, "home");
  const otherNames = await Promise.all(
    locales
      .filter((other) => other !== locale)
      .map(async (other) => (await getT(other, "common"))("site.name")),
  );
  const photo = getProfilePhoto();

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tCommon("site.name"),
    alternateName: otherNames,
    jobTitle: tHome("hero.role"),
    url: localeUrl(locale),
    sameAs: socialLinks
      .filter((link) => link.id === "linkedin" || link.id === "github")
      .map((link) => link.href),
    knowsAbout: profile.headlineTechs,
    ...(profile.email && { email: `mailto:${profile.email}` }),
    ...(photo && { image: new URL(photo.src, localeUrl(locale)).href }),
  };

  return (
    <script
      type="application/ld+json"
      // "<" escaped so a value can never close the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(person).replace(/</g, "\\u003c"),
      }}
    />
  );
}
