/*
 * TEMPORARY design-system preview — delete in Phase 7.
 * Exempt from the i18n rule: sample copy below is demo data, not site content.
 */
import { Fragment, type CSSProperties } from "react";
import { FiArrowUpRight, FiDownload, FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";

import {
  Button,
  ButtonLink,
  Card,
  Chip,
  Heading,
  IconLink,
} from "@/components/ui";
import { formatNumber } from "@/lib/format";
import { localeDir, locales, type Locale } from "@/i18n/settings";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Theme = "dark" | "light";

const sample: Record<
  Locale,
  {
    name: string;
    lead: string[];
    h2: string;
    h3: string;
    body: string;
    primary: string;
    secondary: string;
    ghost: string;
    card: string;
    gpa: string;
    newTab: string;
  }
> = {
  en: {
    name: "Zahra Fathollahi",
    lead: ["Front-End Developer", "React", "TypeScript", "Tailwind CSS"],
    h2: "Selected work",
    h3: "Managed Security Services Platform",
    body: "I build responsive, intuitive, production-ready UIs with a focus on scalable component architecture.",
    primary: "Download CV",
    secondary: "Get in touch",
    ghost: "Live site",
    card: "Security platform",
    gpa: "GPA",
    newTab: "opens in a new tab",
  },
  fa: {
    name: "زهرا فتح‌اللهی",
    lead: ["توسعه‌دهنده‌ی فرانت‌اند", "React", "TypeScript", "Tailwind CSS"],
    h2: "نمونه‌کارهای منتخب",
    h3: "پلتفرم خدمات امنیتی مدیریت‌شده",
    body: "رابط‌های کاربری واکنش‌گرا، روان و آماده‌ی استفاده در محصول می‌سازم و روی معماری کامپوننت مقیاس‌پذیر تمرکز دارم.",
    primary: "دریافت رزومه",
    secondary: "در تماس باشیم",
    ghost: "نسخه‌ی آنلاین",
    card: "پلتفرم امنیتی",
    gpa: "معدل",
    newTab: "در زبانه‌ی جدید باز می‌شود",
  },
};

const techs = [
  "React",
  "TypeScript",
  "JavaScript (ES6+)",
  "Tailwind CSS",
  "i18next (RTL/LTR)",
];

const tokens = [
  "bg",
  "surface",
  "border",
  "text",
  "muted",
  "accent",
  "accent-contrast",
] as const;

const accentCandidates: {
  name: string;
  dark: [string, string];
  light: [string, string];
}[] = [
  {
    name: "Saffron",
    dark: ["#f2b33d", "#16181c"],
    light: ["#8f5300", "#ffffff"],
  },
  {
    name: "Persimmon",
    dark: ["#ff7e5f", "#16181c"],
    light: ["#b83a12", "#ffffff"],
  },
  {
    name: "Firouzeh",
    dark: ["#45c8c8", "#16181c"],
    light: ["#0b6e73", "#ffffff"],
  },
];

function Panel({ locale, theme }: { locale: Locale; theme: Theme }) {
  const s = sample[locale];

  return (
    <div
      lang={locale}
      dir={localeDir[locale]}
      data-theme={theme}
      data-panel={`${locale}-${theme}`}
      className="space-y-8 rounded-card border border-border bg-bg bg-dot-grid p-6 text-text sm:p-8"
    >
      <p className="font-mono text-xs text-muted">
        {locale} · {theme} · {localeDir[locale]}
      </p>

      <div className="space-y-3">
        <Heading level={1} accentDot>
          {s.name}
        </Heading>
        {/* Mixed-script list: separate isolated items, never one concatenated string (bidi reorders separators on wrap). */}
        <p className="flex flex-wrap gap-x-2 text-lead text-muted">
          {s.lead.map((item, i) => (
            <Fragment key={item}>
              {i > 0 && <span aria-hidden>·</span>}
              <span dir="auto">{item}</span>
            </Fragment>
          ))}
        </p>
      </div>

      <div className="space-y-2">
        <Heading level={2}>{s.h2}</Heading>
        <Heading level={3}>{s.h3}</Heading>
        <p>{s.body}</p>
        <p className="text-sm text-muted">
          {s.gpa}: {formatNumber(18.7, locale, { minimumFractionDigits: 2 })} /{" "}
          {formatNumber(20, locale)}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="#" icon={FiDownload}>
          {s.primary}
        </ButtonLink>
        <Button variant="secondary" icon={FiMail}>
          {s.secondary}
        </Button>
        <ButtonLink
          href="#"
          variant="ghost"
          icon={FiArrowUpRight}
          iconPosition="end"
          mirrorIcon
          newTabHint={s.newTab}
        >
          {s.ghost}
        </ButtonLink>
        <Button size="sm">{s.primary}</Button>
        <Button size="sm" variant="secondary" disabled>
          {s.secondary}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-1">
        <IconLink
          href="#"
          label="GitHub"
          icon={SiGithub}
          newTabHint={s.newTab}
        />
        <IconLink
          href="#"
          label="LinkedIn"
          icon={FaLinkedinIn}
          newTabHint={s.newTab}
        />
        <IconLink href="#" label="Email" icon={FiMail} />
      </div>

      <Card as="article" interactive>
        <p className="mb-1 text-xs font-medium tracking-label text-accent uppercase">
          {s.card}
        </p>
        <Heading level={3}>{s.h3}</Heading>
        <p className="mt-2 text-sm text-muted">{s.body}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {techs.map((tech, i) => (
            <li key={tech}>
              <Chip tone={i === 0 ? "accent" : "neutral"}>{tech}</Chip>
            </li>
          ))}
        </ul>
      </Card>

      <ul className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        {tokens.map((token) => (
          <li key={token} className="space-y-1">
            <div
              className="h-10 rounded-control border border-border"
              style={{ background: `var(--${token})` }}
            />
            <p className="font-mono text-[10px] text-muted" dir="ltr">
              {token}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AccentCandidates() {
  return (
    <div className="grid gap-4 md:grid-cols-3" lang="en" dir="ltr">
      {accentCandidates.map((candidate) => (
        <div
          key={candidate.name}
          className="min-w-0 overflow-hidden rounded-card border border-border"
        >
          {(["dark", "light"] as const).map((theme) => (
            <div
              key={theme}
              data-theme={theme}
              className="flex flex-wrap items-center gap-3 bg-bg p-4 text-text"
              style={
                {
                  "--accent": candidate[theme][0],
                  "--accent-contrast": candidate[theme][1],
                } as CSSProperties
              }
            >
              <span className="w-20 text-sm font-semibold text-accent">
                {candidate.name}
              </span>
              <Button size="sm">Download CV</Button>
              <Chip tone="accent">React</Chip>
              <span className="ms-auto font-mono text-[10px] text-muted">
                {candidate[theme][0]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-[1600px] space-y-8 p-4 sm:p-8">
      <AccentCandidates />
      <div className="grid gap-8 xl:grid-cols-2">
        {locales.flatMap((locale) =>
          (["dark", "light"] as const).map((theme) => (
            <Panel key={`${locale}-${theme}`} locale={locale} theme={theme} />
          )),
        )}
      </div>
    </main>
  );
}
