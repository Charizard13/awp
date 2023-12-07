import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import { VercelToolbar } from "@vercel/toolbar/next";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

import Providers from "./providers";
import Script from "next/script";
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Awp",
  description: "Transform any website into a App in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="manifest" href="http://127.0.0.1:54321/storage/v1/object/public/apps/cde4c8c0-a5b5-429a-8577-826cacabc83d/manifest.json" />
      </head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
        {process.env.VERCEL_URL && <Analytics />}
        <Script src="http://127.0.0.1:54321/storage/v1/object/public/apps/cde4c8c0-a5b5-429a-8577-826cacabc83d/script.js" defer strategy="afterInteractive" />

        {/* <VercelToolbar /> */}
        <Footer />
      </body>
    </html>
  );
}
