import type { Metadata } from "next";
import { Vazirmatn, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html
      lang="en"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
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
        {children}
      </body>
    </html>
  );
}