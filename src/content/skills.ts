import type { Skill } from "@/features/home/types";
import { FiLayers } from "react-icons/fi";
import {
  SiAntdesign,
  SiFigma,
  SiFramer,
  SiGit,
  SiHtml5,
  SiI18Next,
  SiJavascript,
  SiNextdotjs,
  SiPwa,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { TbApi, TbChartBar } from "react-icons/tb";

export const productionSkills = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "TypeScript", icon: SiTypescript },
  { name: "JavaScript (ES6+)", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Redux Toolkit", icon: SiRedux },
  { name: "TanStack Query", icon: SiReactquery },
  { name: "Ant Design", icon: SiAntdesign },
  { name: "Vite", icon: SiVite },
  { name: "i18next (RTL/LTR)", icon: SiI18Next },
  { name: "REST APIs", icon: TbApi },
  { name: "PWA", icon: SiPwa },
  { name: "React Router", icon: SiReactrouter },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Recharts", icon: TbChartBar },
  { name: "HTML5/CSS3", icon: SiHtml5 },
  { name: "Git/GitLab", icon: SiGit },
  { name: "Figma", icon: SiFigma },
] as const satisfies readonly Skill[];

export const learningSkills = [
  { labelKey: "skills.learning.advancedReact", icon: SiReact },
  { labelKey: "skills.learning.testing", icon: SiTestinglibrary },
  { labelKey: "skills.learning.architecture", icon: FiLayers },
] as const satisfies readonly Skill[];
