import type { Skill } from "@/features/home/types";

export const productionSkills = [
  "React",
  "TypeScript",
  "JavaScript (ES6+)",
  "Redux Toolkit",
  "TanStack Query",
  "Tailwind CSS",
  "Ant Design",
  "Vite",
  "i18next (RTL/LTR)",
  "REST APIs",
  "PWA",
  "React Router",
  "Framer Motion",
  "Recharts",
  "HTML5/CSS3",
  "Git/GitLab",
  "Figma",
] as const;

export const learningSkills = [
  { name: "Next.js" },
  { labelKey: "skills.learning.advancedReact" },
  { labelKey: "skills.learning.testing" },
  { labelKey: "skills.learning.architecture" },
] as const satisfies readonly Skill[];
