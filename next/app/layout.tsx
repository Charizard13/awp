import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import { VercelToolbar } from "@vercel/toolbar/next";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";

import Script from "next/script";
import { getDefaultUrl } from "@/lib/url";

export const metadata = {
  metadataBase: new URL(getDefaultUrl()),
  title: "Awp",
  description: "Transform any website into a App in seconds.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <head>
        <link rel="manifest" href="https://rsgchglqhbpfmrvsjark.supabase.co/storage/v1/object/public/apps/a5d01215-df70-4055-be1f-3c66bd808343/manifest.json" />
      </head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">{children}</main>
        <Toaster />
        <Script src="https://rsgchglqhbpfmrvsjark.supabase.co/storage/v1/object/public/apps/a5d01215-df70-4055-be1f-3c66bd808343/script.js" defer strategy="afterInteractive" />
        <Analytics />
        <VercelToolbar />
        <Footer />
      </body>
    </html>
  );
}
