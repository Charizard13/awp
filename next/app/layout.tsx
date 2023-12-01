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
        <link rel="manifest" href="http://127.0.0.1:54321/storage/v1/object/public/apps/66c61caa-d077-44ea-b1de-6bad54f84b6d/manifest.json" />{" "}
      </head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
        <Script src="http://127.0.0.1:54321/storage/v1/object/public/apps/f870423a-b5e0-4a72-90cf-35a80ccd804e/script.js" defer strategy="afterInteractive" />
        {process.env.VERCEL_URL && <Analytics />}
        <VercelToolbar />
        <Footer />
      </body>
    </html>
  );
}
