export type ProjectStatusKey = "status.active" | "status.ganoticLaunch";

/**
 * Non-translatable project data. All copy lives in `projects.json` under the slug:
 * `<slug>.title|subtitle|category|summary|role`, plus `<slug>.caseStudy.*` when `hasCaseStudy`.
 */
export type Project = {
  slug: string;
  url: string;
  techs: readonly string[];
  statusKey: ProjectStatusKey;
  /** Shown as a full card in "Selected work"; otherwise in the compact "More work" list. */
  featured: boolean;
  hasCaseStudy: boolean;
};
