import type { CaseStudySlug } from "@/features/projects/projects.data";
import type { Screenshot } from "@/features/projects/types";

// TODO(screenshots): sanitized images (no real patient/customer data) go in
// src/assets/projects/<slug>/ and are imported here. A slug without entries renders no gallery.
export const screenshots: Partial<
  Record<CaseStudySlug, readonly Screenshot[]>
> = {};
