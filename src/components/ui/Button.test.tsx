import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FiArrowRight } from "react-icons/fi";
import { describe, expect, it, vi } from "vitest";

import { Button, ButtonLink } from "@/components/ui/Button";

describe("Button", () => {
  it("is a non-submitting button by default and handles clicks", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Save</Button>);

    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toHaveAttribute("type", "button");
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("does not fire when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button onClick={onClick} disabled>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Save" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("hides the icon from assistive tech and mirrors it in RTL when asked", () => {
    const { container } = render(
      <Button icon={FiArrowRight} mirrorIcon>
        Next
      </Button>,
    );

    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveClass("rtl:-scale-x-100");
  });
});

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
});
