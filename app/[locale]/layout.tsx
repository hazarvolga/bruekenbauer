import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { routing } from "@/i18n/routing";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

import { getTranslations } from "next-intl/server";

const getBaseUrl = () =>
  (process.env.NEXT_PUBLIC_SITE_URL || "https://bruekenbauer.vercel.app").replace(/\/$/, "");

const getLocalizedUrl = (baseUrl: string, locale: string) =>
  locale === routing.defaultLocale ? baseUrl : `${baseUrl}/${locale}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "MetaData" });

  const title = t("title");
  const description = t("description");
  const baseUrl = getBaseUrl();
  const url = getLocalizedUrl(baseUrl, locale);

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "brüeckenbauer GmbH",
      url,
      type: "website",
      images: [
        {
          url: "/images/product-groups/power-management.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/product-groups/power-management.png"],
    },
    alternates: {
      canonical: url,
      languages: {
        en: baseUrl,
        de: `${baseUrl}/de`,
        fr: `${baseUrl}/fr`,
      },
    },
  };
}

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
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="font-mono antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SiteChrome>{children}</SiteChrome>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
