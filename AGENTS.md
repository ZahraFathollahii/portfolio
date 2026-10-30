# Portfolio — Zahra Fathollahi

Personal bilingual (FA/EN) portfolio. Built in phases; stop at every checkpoint and wait for approval.

## Hosting

- GitHub Pages: `https://zahrafathollahii.github.io/portfolio/`
- `next.config.ts`: `output: 'export'`, `basePath: '/portfolio'`, `trailingSlash: true`, `images.unoptimized: true`.
- The base path / site URL live **only** in `src/config/site.ts` (`BASE_PATH`, `SITE_URL`).
  Every raw asset path, OG image, sitemap, canonical and hreflang URL reads from there.
  Never hard-code `/portfolio` anywhere else. (`next/link`, `next/image` and `next/font` add it automatically.)

## Mindset

Staff engineer doing an internal code review. Pragmatic, opinionated, consistent.
Boring proven solutions. No over-engineering. Readability → scalability → performance.

## Stack (fixed)

- Next.js (App Router) + React + TypeScript (`strict: true`), fully static export — no server, no API routes
- Tailwind CSS v4 via `@tailwindcss/postcss` (official Next.js guide); CSS-first `@theme` tokens in `src/styles/globals.css`
- i18next + react-i18next — locales `fa` (RTL) and `en` (LTR)
- Icons: `react-icons` only
- Yarn (node-modules linker)
- Testing: Vitest + React Testing Library

## Hard rules

- ❌ No UI libraries (MUI, Ant Design, Chakra, shadcn, …).
- ❌ No state-management library. No TanStack Query — there is no server state.
- ❌ No animation library — CSS transitions + one small `useInView` hook (IntersectionObserver). Respect `prefers-reduced-motion`.
- ❌ No contact form — `mailto:` + social links.
- ✅ Strict `@/*` path alias. No relative imports climbing more than one level (enforced by ESLint).
- ✅ Barrel files only at `components/ui/index.ts` and `components/layout/index.ts` — flat, no re-export chains.
- ✅ Zero hard-coded user-facing strings: everything via `t("...")`. FA and EN key sets must match exactly (`yarn i18n:check`).
  Keys are always full string literals (in components or `content/*`) — never built with template strings — so the unused-key check can see them.
- ✅ Logical properties only for direction-sensitive spacing/position (`ms-/me-/ps-/pe-/start-/end-`). Full RTL/LTR parity.
- ✅ Component-local types stay in the file; shared domain types live in `features/*/types.ts`.
- ✅ Server Components by default; `"use client"` only where interaction requires it
  (theme toggle, locale switch, mobile menu, in-view animation).
- ✅ Any new pattern is applied everywhere or not introduced at all.
- ❌ Never invent facts: no fake metrics, years, testimonials, client names, "Expert level" badges or skill percentages.
  Unwritten case-study content stays as clearly marked `TODO` translation values.
- ❌ Do NOT create other GitHub repositories, change repo settings, push, or deploy without asking first. Local commits are fine.

## UI conventions

- Colors/radii/shadows/type only via tokens in `globals.css` (`bg-surface`, `text-muted`, `rounded-card`, `text-display`, …).
  Themes switch with `[data-theme]`; scripts switch with `:lang(fa)` — no `dark:` variants.
- No `tracking-*` on text that can be Persian (breaks letter joining) — use `tracking-label`, which is 0 in FA.
- Mixed-script lists (e.g. "Front-End Developer · React · TypeScript") render as separate `dir="auto"` items in a
  wrapping flex row, never as one concatenated string — bidi reorders separators on wrap.
- Atomic Latin labels inside RTL (chips, tech names) get `dir="auto"` (built into `Chip`).
- Directional icons (arrows) use `mirrorIcon` / `rtl:-scale-x-100`.
- `cn()` only joins classes, no merging: `className` props add layout, never override variants.
- Links that open a new tab take a translated `newTabHint` (screen-reader text); nothing else sets `target="_blank"`.
- Numbers shown to users go through `formatNumber(value, locale)` (Persian digits in FA).

## Workflow

- One phase at a time; small, reviewable commits (conventional commits).
- At each 🛑 checkpoint: summarize what changed, list files, surface decisions. Then wait.
- If something is unclear, ask — do not guess.
- Self-review before a checkpoint: imports/exports, structure, typing, translations, styling/RTL, a11y.

## Node scripts (`scripts/*.mts`)

Run directly with Node 24's native type stripping (no `tsx`). Erasable TypeScript syntax only:
no `@/` alias, no `enum`/`namespace`/parameter properties, relative imports with explicit `.ts` extensions.
Node version is pinned in `.nvmrc` and `engines`.

## Commands

- `yarn dev` · `yarn build` (static output in `out/`) · `yarn lint` · `yarn typecheck`
- `yarn format` / `yarn format:check` · `yarn test` · `yarn i18n:check`
- `yarn launch:check` — fails while launch content is missing (email, resume PDF, role/scope TODOs of visible projects).
  `yarn launch:check --built` also scans `out/**/*.html` for rendered TODO text.
  The deploy workflow runs `launch:check` before `yarn build` and `launch:check --built` after it, before upload.
