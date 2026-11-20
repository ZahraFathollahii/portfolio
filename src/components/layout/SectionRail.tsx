"use client";

import { useTranslation } from "react-i18next";

import { homeSectionIds, homeSections } from "@/config/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

/** Desktop section navigation pinned to the inline-start edge. */
export function SectionRail() {
  const { t } = useTranslation("common");
  const activeId = useActiveSection(homeSectionIds);

  return (
    <nav
      aria-label={t("nav.sectionsLabel")}
      className="fixed start-5 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col items-center gap-7">
        {homeSections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
              className="block rotate-180 py-1 text-xs font-medium text-muted transition-colors duration-200 [writing-mode:vertical-rl] hover:text-text aria-[current]:text-accent"
            >
              {t(section.labelKey)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
