/**
 * Single source of truth for hosting paths.
 * Everything that builds a URL (links to raw assets, metadata, sitemap, canonical)
 * must read from here — never hard-code the base path.
 */
/** Path prefix of the site on its host. Empty: served from the domain root. */
export const BASE_PATH = "";

/** Canonical origin (apex; www redirects to it). No trailing slash — append "/path". */
export const SITE_URL = "https://zahrafathollahi.ir";

/** Shows the "Available for opportunities" badge in the hero. */
export const SHOW_AVAILABILITY_BADGE = false;

/**
 * Shows Ganotic (card, case-study page, sitemap entry and the "Website" social link).
 * Its content stays in place either way.
 */
export const SHOW_GANOTIC = false;
