import type { Degree } from "@/features/home/types";

export const degrees = [
  {
    id: "msc",
    degreeKey: "research.degrees.msc.degree",
    schoolKey: "research.degrees.msc.school",
    yearKey: "research.degrees.msc.year",
    noteKey: null,
    gpa: { value: 18.7, scale: 20 },
  },
  {
    id: "bsc",
    degreeKey: "research.degrees.bsc.degree",
    schoolKey: "research.degrees.bsc.school",
    yearKey: null,
    noteKey: "research.degrees.bsc.note",
    gpa: { value: 17.91, scale: 20 },
  },
] as const satisfies readonly Degree[];

export const thesis = {
  labelKey: "research.thesis.label",
  titleKey: "research.thesis.title",
  summaryKey: "research.thesis.summary",
  methods: [
    "Multi-agent systems",
    "Edge computing",
    "4+1 View Model",
    "ATAM",
    "CSP",
  ],
} as const;
