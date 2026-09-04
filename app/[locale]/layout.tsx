import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import ThemeRegistry from "@/components/ThemeRegistry";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";
import { PageTransition } from "@/components/motion/PageTransition";
import "../globals.css";
import { CookieConsentBanner } from "@/components/legal/CookieConsentBanner";
import { Analytics } from "@/components/legal/Analytics";
import { organizationJsonLd } from "@/lib/seo";

const vazirmatn = localFont({
  src: "../../fonts/Vazirmatn[wght].ttf",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MACAN",
    template: "%s | MACAN",
  },
  description:
    "MACAN provides engineering, construction, supply, and project management solutions.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Opt into static rendering (SSG) for this locale; tells next-intl
  // the active locale without reading request headers.
  setRequestLocale(locale);
  const dir = locale === "fa" ? "rtl" : "ltr";
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeRegistry>
            <NextIntlClientProvider>
              <Header />
              <PageTransition>
                <main id="main-content" className="flex-1">
                  {children}
                </main>
              </PageTransition>
              <Footer />
              <CookieConsentBanner />
            </NextIntlClientProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
