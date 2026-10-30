import type { ParseKeys } from "i18next";

type HomeKey = ParseKeys<"home">;

/** Full ISO date. The README only has month + year, so the day is always 01 by convention. */
export type IsoDate = `${number}-${number}-${number}`;

export type Role = {
  id: string;
  titleKey: HomeKey;
  descriptionKey: HomeKey;
  start: IsoDate;
  /** null = present. */
  end: IsoDate | null;
  techs: readonly string[];
};

/** One company, one or more roles (newest first) — grouped like LinkedIn. */
export type ExperienceEntry = {
  id: string;
  companyKey: HomeKey;
  /** null = unknown; renders nothing. */
  locationKey: HomeKey | null;
  roles: readonly Role[];
};

/** A product name is shown as-is; a descriptive phrase is translated. */
export type Skill = { name: string } | { labelKey: HomeKey };

export type Degree = {
  id: string;
  degreeKey: HomeKey;
  schoolKey: HomeKey;
  /** Translated, because the FA (Jalali) year can't be derived from a year-only source. */
  yearKey: HomeKey | null;
  noteKey: HomeKey | null;
  gpa: { value: number; scale: number };
};
