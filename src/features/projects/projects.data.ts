import { SHOW_GANOTIC } from "@/config/site";
import type { Project } from "@/features/projects/types";

// Company source code is private — live links only. Order = display order.
const allProjects = [
  {
    slug: "mssp",
    url: "https://mssp.inhso.ir",
    techs: [
      "React",
      "React Router",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "PWA",
    ],
    statusKey: null,
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "payesh",
    url: "https://payesh.inhso.ir",
    techs: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
    ],
    statusKey: null,
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "picopet",
    url: "https://picopet.ir",
    techs: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
      "Framer Motion",
    ],
    statusKey: null,
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "salam-operator",
    url: "https://inhso.ir",
    techs: [
      "React",
      "TypeScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
    ],
    statusKey: null,
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "ganotic",
    url: "https://ganotic.ir",
    techs: ["Next.js", "React", "Tailwind CSS", "PWA"],
    statusKey: "status.ganoticLaunch",
    featured: true,
    hasCaseStudy: true,
  },
  {
    slug: "sepehr-pharmacy",
    url: "https://pharmacy.isikato.ir/drgharaee",
    techs: [
      "React",
      "JavaScript",
      "Redux Toolkit",
      "TanStack Query",
      "Tailwind CSS",
      "Ant Design",
    ],
    statusKey: null,
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "sepehr-salamat",
    url: "https://inhs.isikato.ir",
    // TODO(techs): not listed in the README.
    techs: [],
    statusKey: null,
    featured: false,
    hasCaseStudy: false,
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof allProjects)[number]["slug"];

type ProjectEntry = (typeof allProjects)[number];
type CaseStudyProject = Extract<ProjectEntry, { hasCaseStudy: true }>;

export type CaseStudySlug = CaseStudyProject["slug"];

/** Projects that are rendered and statically generated (Ganotic is behind `SHOW_GANOTIC`). */
export const projects: readonly ProjectEntry[] = allProjects.filter(
  (project) => SHOW_GANOTIC || project.slug !== "ganotic",
);

/** Visible projects with a case-study page, in display order (drives static params and prev/next). */
export const caseStudyProjects: readonly CaseStudyProject[] = projects.filter(
  (project): project is CaseStudyProject => project.hasCaseStudy,
);
