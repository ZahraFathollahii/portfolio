/**
 * Single source of truth for hosting paths.
 * Everything that builds a URL (links to raw assets, metadata, sitemap, canonical)
 * must read from here — never hard-code the base path.
 */
export const BASE_PATH = "/portfolio";

export const SITE_ORIGIN = "https://zahrafathollahii.github.io";

/** Absolute site URL including base path, with trailing slash. */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}/`;

/** Shows the "Available for opportunities" badge in the hero. */
export const SHOW_AVAILABILITY_BADGE = false;

/**
 * Shows Ganotic (card, case-study page, sitemap entry and the "Website" social link).
 * Its content stays in place either way.
 */
export const SHOW_GANOTIC = false;
