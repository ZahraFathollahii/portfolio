import type { MetadataRoute } from "next";

import { caseStudyProjects } from "@/features/projects/projects.data";
import { locales } from "@/i18n/settings";
import { languageAlternates, localeUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** Every localized page, each with its hreflang alternates. Hidden projects aren't in caseStudyProjects. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...caseStudyProjects.map((project) => `projects/${project.slug}/`),
  ];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localeUrl(locale, path),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
