import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { SiteChrome } from "@/components/layout/SiteChrome";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const siteTitle = "brückenbauer GmbH: We don't just advise";
const siteDescription = "We connect, design and empower.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    siteName: "brückenbauer GmbH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

/**
 * RootLayout — v02
 *
 * Changes vs v01:
 * - Removed manual inline themeScript (anti-flash now handled by next-themes)
 * - Removed hardcoded className="dark" and data-theme="dark" on <html>
 *   (next-themes injects both automatically)
 * - Added <Providers> wrapper containing ThemeProvider
 * - suppressHydrationWarning remains — required by next-themes
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <Providers>
          <SiteChrome>{children}</SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
