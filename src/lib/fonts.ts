import localFont from "next/font/local";

export const inter = localFont({
  src: "../assets/fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});

// Arabic-script subset only. No metric-adjusted Arial fallback: it would
// swallow Latin glyphs in the FA stack before they reach Inter.
export const vazirmatn = localFont({
  src: "../assets/fonts/vazirmatn-arabic-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-vazirmatn",
  display: "swap",
  adjustFontFallback: false,
});
