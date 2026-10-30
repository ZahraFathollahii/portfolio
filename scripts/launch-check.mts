/**
 * Fails while the site isn't ready to go live. Source checks (run before `yarn build`):
 * - profile email is not set
 * - a resume PDF linked from any locale is missing from public/ (FA falls back to EN, like lib/resume.ts)
 * - a visible project (respecting SHOW_GANOTIC) has a TODO role, or a TODO caseStudy.scope
 * With `--built` (run after `yarn build`), it also scans every generated HTML page in out/ for
 * rendered "TODO" text — the only way to prove no placeholder reaches a visitor.
 *
 * App modules are imported directly so the check reads the same data the site renders;
 * a resolve hook maps the `@/` alias, since Node doesn't read tsconfig paths.
 *
 * Run with Node's native type stripping: `node scripts/launch-check.mts [--built]`.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { registerHooks } from "node:module";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";

type Json = { [key: string]: string | Json };

const root = join(import.meta.dirname, "..");
const srcDir = join(root, "src");
const srcUrl = pathToFileURL(`${srcDir}/`).href;
const checkBuilt = process.argv.includes("--built");

registerHooks({
  resolve(specifier, context, nextResolve) {
    return nextResolve(
      specifier.startsWith("@/")
        ? new URL(`${specifier.slice(2)}.ts`, srcUrl).href
        : specifier,
      context,
    );
  },
  load(url, context, nextLoad) {
    return url.startsWith(srcUrl) && url.endsWith(".ts")
      ? nextLoad(url, { ...context, format: "module-typescript" })
      : nextLoad(url, context);
  },
});

const { profile } = (await import(
  new URL("content/profile.ts", srcUrl).href
)) as typeof import("../src/content/profile.ts");
const { projects } = (await import(
  new URL("features/projects/projects.data.ts", srcUrl).href
)) as typeof import("../src/features/projects/projects.data.ts");
// i18n/settings.ts isn't imported: it pulls in next/navigation, which only loads inside Next.
// profile.resume `satisfies Record<Locale, …>`, so its keys are exactly the locales.
type Locale = keyof typeof profile.resume;
const locales = Object.keys(profile.resume) as Locale[];
const defaultLocale: Locale = "en"; // = defaultLocale in src/i18n/settings.ts

const missing: string[] = [];

if (profile.email === null) {
  missing.push("Email: profile.email is null (src/content/profile.ts).");
}

for (const locale of locales) {
  const own = profile.resume[locale];
  const linked = existsSync(join(root, "public", own))
    ? own
    : profile.resume[defaultLocale];
  if (!existsSync(join(root, "public", linked))) {
    missing.push(
      `Resume (${locale}): links public${linked}${linked === own ? "" : " (EN fallback)"}, which does not exist.`,
    );
  }
}

function lookup(object: Json, path: string): string | undefined {
  let value: string | Json | undefined = object;
  for (const segment of path.split(".")) {
    if (typeof value !== "object") return undefined;
    value = value[segment];
  }
  return typeof value === "string" ? value : undefined;
}

for (const locale of locales) {
  const copy = JSON.parse(
    readFileSync(join(srcDir, "locales", locale, "projects.json"), "utf8"),
  ) as Json;
  for (const project of projects) {
    const keys = [`${project.slug}.role`];
    if (project.hasCaseStudy) keys.push(`${project.slug}.caseStudy.scope`);
    for (const key of keys) {
      if (lookup(copy, key)?.trimStart().startsWith("TODO") ?? true) {
        missing.push(`Project copy (${locale}): projects:${key} is TODO.`);
      }
    }
  }
}

function listHtml(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return listHtml(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

if (checkBuilt) {
  const outDir = join(root, "out");
  if (!existsSync(outDir)) {
    missing.push("Build output: out/ not found — run `yarn build` first.");
  } else {
    for (const file of listHtml(outDir)) {
      const html = readFileSync(file, "utf8");
      for (const match of html.matchAll(/.{0,40}\bTODO\b.{0,40}/g)) {
        missing.push(`Rendered TODO in ${relative(root, file)}: …${match[0]}…`);
      }
    }
  }
}

if (missing.length > 0) {
  console.error(
    `Not ready to launch (${missing.length}):\n  ${missing.join("\n  ")}`,
  );
  process.exit(1);
}

console.log(
  `Launch check passed${checkBuilt ? " (source + built pages)" : " (source)"}.`,
);
