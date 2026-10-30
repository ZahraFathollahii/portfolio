import type { MetadataRoute } from "next";

import { SITE_URL } from "@/config/site";

export const dynamic = "force-static";

// Note: on a GitHub Pages project site this lands at /portfolio/robots.txt, which crawlers
// don't read (robots.txt only counts at the domain root). The sitemap is still discoverable
// from here and from Search Console.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}sitemap.xml`,
  };
}
