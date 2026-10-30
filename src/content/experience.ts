import type { ExperienceEntry } from "@/features/home/types";

// Dates: README has month + year only → day 01 by convention.
export const experience = [
  {
    id: "pardazeshgaran-sepehr",
    companyKey: "experience.sepehr.company",
    locationKey: "experience.locations.tehran",
    roles: [
      {
        id: "frontend",
        titleKey: "experience.sepehr.frontend.title",
        descriptionKey: "experience.sepehr.frontend.description",
        start: "2023-10-01",
        end: null,
        techs: ["React", "TypeScript", "Tailwind CSS", "Ant Design", "Figma"],
      },
      {
        id: "intern",
        titleKey: "experience.sepehr.intern.title",
        descriptionKey: "experience.sepehr.intern.description",
        start: "2023-07-01",
        end: "2023-09-01",
        techs: ["React", "Redux"],
      },
    ],
  },
  {
    id: "sigma",
    companyKey: "experience.sigma.company",
    locationKey: "experience.locations.tehran",
    roles: [
      {
        id: "instructor",
        titleKey: "experience.sigma.instructor.title",
        descriptionKey: "experience.sigma.instructor.description",
        start: "2021-07-01",
        end: "2023-06-01",
        techs: ["Arduino", "mBlock", "Scratch"],
      },
    ],
  },
  {
    id: "book-garden",
    companyKey: "experience.bookGarden.company",
    // TODO(location): not in the README.
    locationKey: null,
    roles: [
      {
        id: "intern",
        titleKey: "experience.bookGarden.intern.title",
        descriptionKey: "experience.bookGarden.intern.description",
        start: "2021-04-01",
        end: "2021-06-01",
        techs: ["Altium Designer", "SolidWorks", "Arduino"],
      },
    ],
  },
] as const satisfies readonly ExperienceEntry[];
