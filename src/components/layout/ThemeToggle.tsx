"use client";

import { useSyncExternalStore } from "react";
import type { IconBaseProps } from "react-icons";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTranslation } from "react-i18next";

import { IconButton } from "@/components/ui";
import { cn } from "@/lib/cn";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

// The theme is unknown during prerender; the icon is CSS-driven so it never flashes.
function getServerTheme(): Theme | null {
  return null;
}

function ThemeIcon({ className, ...props }: IconBaseProps) {
  return (
    <>
      <FiMoon
        {...props}
        className={cn(className, "in-data-[theme=light]:hidden")}
      />
      <FiSun
        {...props}
        className={cn(className, "hidden in-data-[theme=light]:block")}
      />
    </>
  );
}

export function ThemeToggle() {
  const { t } = useTranslation("actions");
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);

  function toggle() {
    const next: Theme = getTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode): the choice lasts for this page view only.
    }
  }

  return (
    <IconButton
      label={t("theme.dark")}
      icon={ThemeIcon}
      aria-pressed={theme === null ? undefined : theme === "dark"}
      onClick={toggle}
    />
  );
}
