import "@/styles/globals.css";

// Pass-through root: <html> is rendered by [locale]/layout (lang/dir per locale),
// and by the root page and not-found, which live outside any locale.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return children;
}
