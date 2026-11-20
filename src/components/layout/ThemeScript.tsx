import { themeScript } from "@/lib/theme";

/** Blocking inline script in <head> — sets data-theme before first paint (no flash). */
export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
