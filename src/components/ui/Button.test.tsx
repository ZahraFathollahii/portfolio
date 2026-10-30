import { render, screen } from "@testing-library/react";
import { FiArrowRight } from "react-icons/fi";
import { describe, expect, it } from "vitest";

import { ButtonLink } from "@/components/ui/Button";

describe("ButtonLink", () => {
  it("stays in the same tab without a new-tab hint", () => {
    render(<ButtonLink href="/en/">Home</ButtonLink>);

    const link = screen.getByRole("link", { name: "Home" });
    expect(link).toHaveAttribute("href", "/en/");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens a new tab safely and announces it when given a hint", () => {
    render(
      <ButtonLink href="https://example.com" newTabHint="opens in a new tab">
        Visit
      </ButtonLink>,
    );

    // jsdom's name computation drops the space Chrome keeps before the hint ("Visit (opens…").
    const link = screen.getByRole("link", {
      name: /^Visit ?\(opens in a new tab\)$/,
    });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("hides the icon from assistive tech and mirrors it in RTL when asked", () => {
    const { container } = render(
      <ButtonLink href="#contact" icon={FiArrowRight} mirrorIcon>
        Next
      </ButtonLink>,
    );

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveClass("rtl:-scale-x-100");
  });

  it("passes link attributes through (download, hreflang)", () => {
    render(
      <ButtonLink href="/resume.pdf" hrefLang="en" download>
        Download CV
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Download CV" });
    expect(link).toHaveAttribute("download");
    expect(link).toHaveAttribute("hreflang", "en");
  });
});
