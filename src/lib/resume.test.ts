import { existsSync } from "node:fs";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { profile } from "@/content/profile";
import { assetPath } from "@/lib/paths";
import { getResume } from "@/lib/resume";

vi.mock("node:fs", () => ({ existsSync: vi.fn() }));

function mockExistingResumes(...paths: string[]) {
  vi.mocked(existsSync).mockImplementation((path) =>
    paths.some((resume) => String(path).endsWith(resume)),
  );
}

describe("getResume", () => {
  beforeEach(() => {
    vi.mocked(existsSync).mockReset();
  });

  it("returns the locale's own resume when it exists", () => {
    mockExistingResumes(profile.resume.en, profile.resume.fa);

    expect(getResume("fa")).toEqual({
      href: assetPath(profile.resume.fa),
      locale: "fa",
    });
  });

  it("falls back to the EN resume when the locale's own is missing", () => {
    mockExistingResumes(profile.resume.en);

    expect(getResume("fa")).toEqual({
      href: assetPath(profile.resume.en),
      locale: "en",
    });
  });

  it("returns null when neither file exists", () => {
    mockExistingResumes();

    expect(getResume("fa")).toBeNull();
    expect(getResume("en")).toBeNull();
  });

  it("does not fall back from EN to another locale", () => {
    mockExistingResumes(profile.resume.fa);

    expect(getResume("en")).toBeNull();
  });
});
