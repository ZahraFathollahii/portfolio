/**
 * Lets scripts import app modules from src/ so they read the same data the site renders.
 * Node doesn't read tsconfig paths: a resolve hook maps the `@/` alias, and src/*.ts files are
 * loaded as TypeScript modules. Modules that pull in Next (e.g. i18n/settings.ts) can't be loaded.
 */
import { registerHooks } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const root = join(import.meta.dirname, "..");
const srcUrl = pathToFileURL(`${join(root, "src")}/`).href;

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

/** `path` is relative to src/, e.g. "content/profile.ts". */
export function importApp<T>(path: string): Promise<T> {
  return import(new URL(path, srcUrl).href) as Promise<T>;
}
