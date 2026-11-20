import { describe, expect, it } from "vitest";

import { formatDateRange, formatMonthYear, formatNumber } from "@/lib/format";

// Expected values confirmed by Zahra (Phase 3 checkpoint brief).
const ranges = [
  {
    item: "Intern",
    start: "2023-07-01",
    end: "2023-09-01",
    en: "Jul 2023 – Sep 2023",
    fa: "تیر ۱۴۰۲ – شهریور ۱۴۰۲",
  },
  {
    item: "Front-End Developer",
    start: "2023-10-01",
    end: null,
    en: "Oct 2023 – Present",
    fa: "مهر ۱۴۰۲ – اکنون",
  },
  {
    item: "SIGMA",
    start: "2021-07-01",
    end: "2023-06-01",
    en: "Jul 2021 – Jun 2023",
    fa: "تیر ۱۴۰۰ – خرداد ۱۴۰۲",
  },
  {
    item: "Book Garden",
    start: "2021-04-01",
    end: "2021-06-01",
    en: "Apr 2021 – Jun 2021",
    fa: "فروردین ۱۴۰۰ – خرداد ۱۴۰۰",
  },
] as const;

describe("formatDateRange", () => {
  it.each(ranges)("$item", ({ start, end, en, fa }) => {
    expect(formatDateRange(start, end, "en", "Present")).toBe(en);
    expect(formatDateRange(start, end, "fa", "اکنون")).toBe(fa);
  });
});

describe("formatMonthYear", () => {
  it("puts the Jalali month before the year in FA", () => {
    expect(formatMonthYear("2023-07-25", "fa")).toBe("مرداد ۱۴۰۲");
  });

  it("does not shift the day across time zones", () => {
    expect(formatMonthYear("2023-07-01", "en")).toBe("Jul 2023");
  });
});

describe("formatNumber", () => {
  it("uses Persian digits and decimal separator in FA", () => {
    expect(formatNumber(18.7, "fa", { minimumFractionDigits: 2 })).toBe(
      "۱۸٫۷۰",
    );
    expect(formatNumber(18.7, "en", { minimumFractionDigits: 2 })).toBe(
      "18.70",
    );
  });
});
