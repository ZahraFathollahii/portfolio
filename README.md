# Zahra Fathollahi — Portfolio

Bilingual (English / Persian) portfolio of Zahra Fathollahi, front-end developer.
Live at **https://zahrafathollahii.github.io/portfolio/**.

<!-- TODO(screenshots): add home page screenshots (EN + FA, dark + light) before launch. -->

## What's inside

- Home page: hero, about, skills (production / learning), selected work, experience timeline, research & education, contact
- A case-study page per featured project: context → my scope → key decisions → challenges → result
- Full RTL/LTR parity, Persian digits and Jalali dates in FA, dark/light theme without a flash on load
- Fully static export — no server, no API routes

## Stack

- [Next.js](https://nextjs.org) (App Router, static export) · React · TypeScript (strict)
- Tailwind CSS v4 with CSS-first design tokens
- i18next + react-i18next (`en`, `fa`)
- react-icons · self-hosted Inter + Vazirmatn
- Vitest + React Testing Library

No UI, state-management or animation libraries.

## Local setup

Requires Node 24 (see `.nvmrc`) and Yarn 4 via Corepack.

```bash
corepack enable
yarn install
yarn dev        # http://localhost:3000/portfolio/en/
```

## Scripts

| Command                        | What it does                                                                                |
| ------------------------------ | ------------------------------------------------------------------------------------------- |
| `yarn build`                   | Static export to `out/`                                                                     |
| `yarn lint` · `yarn typecheck` | ESLint · route types + `tsc`                                                                |
| `yarn format` · `format:check` | Prettier (with Tailwind class sorting)                                                      |
| `yarn test`                    | Vitest                                                                                      |
| `yarn i18n:check`              | FA/EN translation keys match, nothing empty or unused; lists `TODO` values                  |
| `yarn launch:check [--built]`  | Fails while launch content is missing; `--built` also scans `out/` for rendered `TODO` text |
| `yarn photo:build`             | Profile photo → stripped, square WebP/JPEG in `public/images/profile/`                      |
| `yarn og:build`                | Regenerates the per-locale Open Graph images in `public/og/` (needs Chrome)                 |

## Project layout

```
src/
  app/          routes: /[locale], /[locale]/projects/[slug], sitemap, robots, 404
  components/   ui/ (primitives) and layout/ (shell)
  features/     home sections, project cards and case-study parts, shared domain types
  content/      non-translatable data: dates, URLs, tech lists, translation keys
  locales/      en/ and fa/ JSON (translator notes in locales/CONTEXT.md)
  config/       base path, site URL and feature flags
scripts/        i18n, launch, photo and OG tooling (Node 24 type stripping)
```

Hosting paths are defined once in `src/config/site.ts`. Conventions for contributors live in `AGENTS.md`.

## Deployment

- **CI** (`.github/workflows/ci.yml`) runs lint, typecheck, format, tests, `i18n:check` and the build on every push and pull request.
- **Deploy** (`.github/workflows/deploy.yml`) is started manually from the Actions tab. It runs `launch:check`, builds, runs `launch:check --built`, and publishes `out/` to GitHub Pages. GitHub Pages must use **Source: GitHub Actions**.

## License

Code © Zahra Fathollahi. Fonts: Inter and Vazirmatn under the SIL Open Font License (`src/assets/fonts/`).
