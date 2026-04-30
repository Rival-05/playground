import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "@/components/common/Providers";
import Navbar from "@/components/common/navbar";
import { Container } from "@/components/common/Container";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Playground",
  description: "Sleek portfolio designed and built by Rajat Tripathi",
  icons: {
    icon: [{ url: "/shinchan.svg", sizes: "16x16", type: "image/svg" }],
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
      className={`${geistSans.className} ${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <TooltipProvider>
            <Navbar />
            <Container>
              <main className="pt-10">{children}</main>
            </Container>
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
