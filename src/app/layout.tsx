import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "@/components/assets/Providers";
import { Container } from "@/components/common/Container";
import { seo } from "@/config/seo";
import JsonLd from "@/components/seo/JsonLd";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: seo.title,
    template: "%s | Rajat Tripathi",
  },
  description: seo.description,
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_CODE",
  },
  icons: {
    icon: [
      {
        url: "/avatar.svg",
        sizes: "16x16",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: seo.url,
    siteName: seo.title,
    images: [{ url: seo.image }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                name: "Rajat Tripathi",
                url: seo.url,
                sameAs: ["https://x.com/Rival_o5"],
              },
              {
                "@type": "WebSite",
                name: seo.title,
                url: seo.url,
              },
            ],
          }}
        />
        <Providers />
        <Container>
          <main className="w-full">{children}</main>
        </Container>
        <Analytics /> <SpeedInsights />
      </body>
    </html>
  );
}
