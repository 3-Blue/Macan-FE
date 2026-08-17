import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import ThemeRegistry from "@/components/ThemeRegistry";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { routing } from "@/i18n/routing";
import { PageTransition } from "@/components/motion/PageTransition";
import "../globals.css";

const vazirmatn = localFont({
  src: "../../fonts/Vazirmatn[wght].ttf",
  variable: "--font-vazirmatn",
});
const geistMono = localFont({
  src: "../../fonts/GeistMono[wght].ttf",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.macan-example.com"),
  title: {
    default: "MACAN",
    template: "%s | MACAN",
  },
  description:
    "MACAN provides engineering, construction, supply, and project management solutions.",
  openGraph: {
    title: "MACAN",
    description:
      "MACAN provides engineering, construction, supply, and project management solutions.",
    url: "https://www.macan-example.com",
    siteName: "MACAN",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MACAN",
    description:
      "MACAN provides engineering, construction, supply, and project management solutions.",
  },
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
  // Enable static rendering (required for `output: export`); tells next-intl
  // the active locale without reading request headers.
  setRequestLocale(locale);
  const dir = locale === "fa" ? "rtl" : "ltr";
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:shadow-lg"
        >
          Skip to main content
        </a>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
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
            </NextIntlClientProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
