import type { Project } from "@/features/projects/types";

// Company source code is private — live links only. Order = display order.
export const projects = [
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
    statusKey: "status.active",
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
    statusKey: "status.active",
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
    statusKey: "status.active",
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
    statusKey: "status.active",
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
    statusKey: "status.active",
    featured: false,
    hasCaseStudy: false,
  },
  {
    slug: "sepehr-salamat",
    url: "https://inhs.isikato.ir",
    // TODO(techs): not listed in the README.
    techs: [],
    statusKey: "status.active",
    featured: false,
    hasCaseStudy: false,
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export type CaseStudySlug = Extract<
  (typeof projects)[number],
  { hasCaseStudy: true }
>["slug"];
