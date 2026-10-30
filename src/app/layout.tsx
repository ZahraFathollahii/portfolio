import "@/styles/globals.css";

import { inter, vazirmatn } from "@/lib/fonts";

// Phase 1 placeholder — replaced by the [locale] layout in Phase 2.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${inter.variable} ${vazirmatn.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
