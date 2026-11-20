import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getClientResources } from "@/i18n/resources";
import { THEME_STORAGE_KEY } from "@/lib/theme";

function renderToggle() {
  render(
    <I18nProvider locale="en" resources={getClientResources("en")}>
      <ThemeToggle />
    </I18nProvider>,
  );
  return screen.getByRole("button", { name: "Dark theme" });
}

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    // Set by the inline theme script before React runs.
    document.documentElement.dataset.theme = "dark";
  });

  it("reflects the current theme as a pressed state", () => {
    expect(renderToggle()).toHaveAttribute("aria-pressed", "true");
  });

  it("switches theme, persists the choice and updates its state", async () => {
    const button = renderToggle();

    await userEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(button).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
