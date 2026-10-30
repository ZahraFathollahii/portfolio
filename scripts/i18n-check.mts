/**
 * Fails if FA and EN translation keys differ, a value is empty, or a key is never referenced in src/.
 * "Referenced" = the full key appears as a string literal somewhere in src/ (component or content data),
 * so translation keys must never be built with template strings.
 *
 * Run with Node's native type stripping: `node scripts/i18n-check.mts`.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

type Json = { [key: string]: string | Json };

const root = join(import.meta.dirname, "..");
const srcDir = join(root, "src");
const localesDir = join(srcDir, "locales");
const referenceLocale = "en";

function flatten(object: Json, prefix = ""): Map<string, string> {
  const result = new Map<string, string>();
  for (const [key, value] of Object.entries(object)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") result.set(path, value);
    else
      for (const [nested, nestedValue] of flatten(value, path))
        result.set(nested, nestedValue);
  }
  return result;
}

function readKeys(locale: string, file: string): Map<string, string> {
  return flatten(
    JSON.parse(readFileSync(join(localesDir, locale, file), "utf8")) as Json,
  );
}

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory())
      return path === localesDir ? [] : listSourceFiles(path);
    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

const errors: string[] = [];
const locales = readdirSync(localesDir);
const files = readdirSync(join(localesDir, referenceLocale)).filter((file) =>
  file.endsWith(".json"),
);
const source = listSourceFiles(srcDir)
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

for (const file of files) {
  const reference = readKeys(referenceLocale, file);

  for (const locale of locales) {
    const keys = readKeys(locale, file);
    for (const key of reference.keys())
      if (!keys.has(key)) errors.push(`${locale}/${file}: missing "${key}"`);
    for (const [key, value] of keys) {
      if (!reference.has(key))
        errors.push(
          `${locale}/${file}: extra "${key}" (not in ${referenceLocale})`,
        );
      if (value.trim() === "")
        errors.push(`${locale}/${file}: empty value for "${key}"`);
    }
  }

  for (const key of reference.keys()) {
    const base = key.replace(/_(zero|one|two|few|many|other)$/, "");
    if (
      ![`"${base}"`, `'${base}'`, `\`${base}\``].some((literal) =>
        source.includes(literal),
      )
    ) {
      errors.push(`${referenceLocale}/${file}: unused "${key}"`);
    }
  }
}

if (errors.length > 0) {
  console.error(
    `i18n check failed (${errors.length}):\n  ${errors.join("\n  ")}`,
  );
  process.exit(1);
}

console.log(
  `i18n check passed: ${files.length} namespaces × ${locales.length} locales (${relative(root, localesDir)})`,
);
