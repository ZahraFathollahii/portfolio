/** Home page sections shown in the rail, mobile menu and footer. Ids are the section anchors. */
export const homeSections = [
  { id: "about", labelKey: "nav.about" },
  { id: "work", labelKey: "nav.work" },
  { id: "experience", labelKey: "nav.experience" },
  { id: "research", labelKey: "nav.research" },
  { id: "contact", labelKey: "nav.contact" },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export const homeSectionIds: readonly HomeSectionId[] = homeSections.map(
  (section) => section.id,
);
