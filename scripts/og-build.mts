/**
 * Renders the per-locale Open Graph images (public/og/og-<locale>.png, 1200×630) in headless Chrome,
 * with the site's own fonts — Persian needs a real text shaper, which satori (next/og) lacks.
 * Copy comes from the locale files and profile data, so re-run it whenever the name, role or
 * headline techs change: `yarn og:build` (set CHROME_PATH if Chrome isn't in the default location).
 */
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { importApp, root } from "./app-modules.mts";

const { profile } =
  await importApp<typeof import("../src/content/profile.ts")>(
    "content/profile.ts",
  );
const { SITE_URL } =
  await importApp<typeof import("../src/config/site.ts")>("config/site.ts");

const chrome =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const localesDir = join(root, "src", "locales");
const fontsDir = join(root, "src", "assets", "fonts");
const outDir = join(root, "public", "og");
const workDir = mkdtempSync(join(tmpdir(), "og-"));

type Copy = Record<string, Record<string, string>>;

function readCopy(locale: string, namespace: string): Copy {
  return JSON.parse(
    readFileSync(join(localesDir, locale, `${namespace}.json`), "utf8"),
  ) as Copy;
}

function escapeHtml(text: string): string {
  return text.replace(
    /[&<>"]/g,
    (char) => `&${{ "&": "amp", "<": "lt", ">": "gt", '"': "quot" }[char]};`,
  );
}

// Dark-theme values from src/styles/globals.css.
const colors = {
  bg: "#0e0f12",
  text: "#edeef0",
  muted: "#9ea4ae",
  accent: "#f2b33d",
};
const fontUrl = (file: string) => pathToFileURL(join(fontsDir, file)).href;

function template(locale: string): string {
  const name = readCopy(locale, "common").site!.name!;
  const role = readCopy(locale, "home").hero!.role!;
  const isFa = locale === "fa";
  const items = [role, ...profile.headlineTechs]
    .map((item) => `<span dir="auto">${escapeHtml(item)}</span>`)
    .join(`<span class="sep">·</span>`);
  const host = SITE_URL.replace(/^https:\/\//, "").replace(/\/$/, "");

  return `<!doctype html>
<html lang="${locale}" dir="${isFa ? "rtl" : "ltr"}"><head><meta charset="utf-8"><style>
@font-face { font-family: Inter; src: url("${fontUrl("inter-latin-wght-normal.woff2")}") format("woff2"); font-weight: 100 900; }
@font-face { font-family: Vazirmatn; src: url("${fontUrl("vazirmatn-arabic-wght-normal.woff2")}") format("woff2"); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: ${colors.bg}; color: ${colors.text};
  font-family: ${isFa ? "Vazirmatn, Inter" : "Inter"}, sans-serif;
  background-image: radial-gradient(rgb(255 255 255 / 0.07) 1px, transparent 1px); background-size: 22px 22px; }
main { height: 100%; padding: 88px 96px; display: flex; flex-direction: column; justify-content: space-between; }
h1 { font-size: 112px; font-weight: 800; line-height: ${isFa ? 1.3 : 1.05}; letter-spacing: ${isFa ? 0 : "-0.04em"}; }
.dot { color: ${colors.accent}; }
.line { margin-top: 28px; display: flex; flex-wrap: wrap; gap: 8px 18px; font-size: 32px; font-weight: 500; }
.sep { color: ${colors.accent}; }
footer { display: flex; align-items: center; gap: 16px; font: 500 28px Inter, sans-serif; color: ${colors.muted}; direction: ltr; justify-content: ${isFa ? "flex-end" : "flex-start"}; }
footer i { width: 14px; height: 14px; border-radius: 3px; background: ${colors.accent}; }
</style></head><body><main>
<div><h1>${escapeHtml(name)}<span class="dot">.</span></h1><div class="line">${items}</div></div>
<footer><i></i>${escapeHtml(host)}</footer>
</main></body></html>`;
}

const locales = readdirSync(localesDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name);

mkdirSync(outDir, { recursive: true });
try {
  for (const locale of locales) {
    const page = join(workDir, `${locale}.html`);
    const target = join(outDir, `og-${locale}.png`);
    writeFileSync(page, template(locale));
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--force-device-scale-factor=1",
        "--window-size=1200,630",
        "--virtual-time-budget=2000",
        `--user-data-dir=${join(workDir, "chrome")}`,
        `--screenshot=${target}`,
        pathToFileURL(page).href,
      ],
      { stdio: "ignore" },
    );
    console.log(`✓ public/og/og-${locale}.png`);
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}
