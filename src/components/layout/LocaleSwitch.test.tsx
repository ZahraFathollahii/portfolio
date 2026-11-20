import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  LocaleSwitch,
  switchLocalePath,
} from "@/components/layout/LocaleSwitch";
import { I18nProvider } from "@/i18n/I18nProvider";
import { getClientResources } from "@/i18n/resources";
import type { Locale } from "@/i18n/settings";

const navigation = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => navigation.pathname }));

function renderAt(locale: Locale, pathname: string) {
  navigation.pathname = pathname;
  return render(
    <I18nProvider locale={locale} resources={getClientResources(locale)}>
      <LocaleSwitch />
    </I18nProvider>,
  );
}

describe("switchLocalePath", () => {
  it("swaps only the locale segment", () => {
    expect(switchLocalePath("/en/projects/mssp/", "fa")).toBe(
      "/fa/projects/mssp/",
    );
    expect(switchLocalePath("/fa/", "en")).toBe("/en/");
  });
});

describe("LocaleSwitch", () => {
  beforeEach(() => {
    navigation.pathname = "/";
  });

  it("links EN pages to the same FA page", () => {
    renderAt("en", "/en/projects/payesh/");

    // Name starts with the visible word (WCAG 2.5.3). jsdom drops the space before "(".
    const link = screen.getByRole("link", {
      name: /^فارسی ?\(Read this page in Persian\)$/,
    });
    expect(link).toHaveAttribute("href", "/fa/projects/payesh/");
    expect(link).toHaveAttribute("hreflang", "fa");
  });

  it("links FA pages to the same EN page", () => {
    renderAt("fa", "/fa/");

    const link = screen.getByRole("link", { name: /^English/ });
    expect(link).toHaveAttribute("href", "/en/");
    expect(link).toHaveAttribute("hreflang", "en");
  });

  it("marks only the visible label with the target language", () => {
    renderAt("en", "/en/");

    expect(screen.getByText("فارسی")).toHaveAttribute("lang", "fa");
    expect(screen.getByRole("link")).not.toHaveAttribute("lang");
  });
});
