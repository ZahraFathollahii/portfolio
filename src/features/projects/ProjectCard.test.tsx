import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProjectCard } from "@/features/projects/ProjectCard";
import { projects } from "@/features/projects/projects.data";
import type { Locale } from "@/i18n/settings";

// ProjectCard is an async Server Component: await it, then render its output.
async function renderCard(slug: string, locale: Locale = "en") {
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) throw new Error(`Unknown project ${slug}`);
  render(<ul>{await ProjectCard({ project, locale })}</ul>);
  return screen.getByRole("article");
}

describe("ProjectCard", () => {
  it("links the title to the case study and shows role and stack", async () => {
    const card = await renderCard("mssp");

    expect(within(card).getByRole("link", { name: "MSSP" })).toHaveAttribute(
      "href",
      "/en/projects/mssp/",
    );
    expect(within(card).getByText("Cybersecurity")).toBeInTheDocument();
    expect(
      within(card).getByText("Sole front-end developer · UI design"),
    ).toBeInTheDocument();
    expect(
      within(card).getByRole("list", { name: "Tech stack" }),
    ).toHaveTextContent("Recharts");
  });

  it("opens the live site in a new tab, described by the project title", async () => {
    const card = await renderCard("mssp");

    // jsdom drops the space Chrome keeps before the sr-only hint (see Button.test.tsx).
    const live = within(card).getByRole("link", {
      name: /^Visit live site ?\(opens in a new tab\)$/,
    });
    expect(live).toHaveAttribute("href", "https://mssp.inhso.ir");
    expect(live).toHaveAttribute("target", "_blank");
    expect(live).toHaveAccessibleDescription("MSSP");
  });

  it("renders nothing for an unwritten (TODO) role", async () => {
    const card = await renderCard("payesh");

    expect(within(card).queryByText("My role")).not.toBeInTheDocument();
    expect(card).not.toHaveTextContent("TODO");
  });

  it("has no case-study link for projects without one", async () => {
    const card = await renderCard("sepehr-pharmacy");

    expect(
      within(card).queryByRole("link", { name: "Sepehr Online Pharmacy" }),
    ).not.toBeInTheDocument();
    expect(within(card).queryByText("Read the case study")).toBeNull();
    expect(within(card).getAllByRole("link")).toHaveLength(1);
  });

  it("renders the Persian copy and locale path in FA", async () => {
    const card = await renderCard("picopet", "fa");

    expect(within(card).getByRole("link", { name: "پیکوپت" })).toHaveAttribute(
      "href",
      "/fa/projects/picopet/",
    );
  });
});
