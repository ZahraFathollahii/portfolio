import "@/styles/globals.css";

// Phase 0 placeholder — replaced by the [locale] layout in Phase 2.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
