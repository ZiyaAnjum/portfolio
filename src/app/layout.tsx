import type { Metadata } from "next";
import { Space_Grotesk, Unbounded } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";

import SiteFrame from "@/components/site-frame";
import { Providers } from "@/components/providers";

/* Body/base font — Space Grotesk, bound to --font-sans (applied as `font-sans`
 * on <html>). Everything that isn't a heading inherits this. */
const spaceGroteskSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Heading font — Unbounded, bound to --font-display and applied to h1–h6. */
const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site),
  alternates: { canonical: "./" },
  title: "Ziya Anjum | AI/ML & Full-Stack Developer",
  description: config.description.long,
  keywords: config.keywords,
  authors: [{ name: config.author }],
  creator: config.author,
  openGraph: {
    title: "Ziya Anjum | AI/ML & Full-Stack Developer",
    description: config.description.short,
    url: config.site,
    siteName: "Ziya Anjum Portfolio",
    images: [
      {
        url: config.ogImg,
        width: 1200,
        height: 630,
        alt: "Ziya Anjum Portfolio preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ziya Anjum | AI/ML & Full-Stack Developer",
    description: config.description.short,
    images: [config.ogImg],
    creator: "@ZiyaAnjum",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={[
        spaceGroteskSans.variable,
        unbounded.variable,
        "font-sans",
      ].join(" ")}
      suppressHydrationWarning
    >
      <head />
      <body>
        <Providers>
          <SiteFrame>
            {children}
          </SiteFrame>
        </Providers>
      </body>
    </html>
  );
}
