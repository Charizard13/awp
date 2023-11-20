import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import { VercelToolbar } from "@vercel/toolbar/next";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import { getSiteUrl } from "@/lib/utils";

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
        <link rel="manifest" href="https://rsgchglqhbpfmrvsjark.supabase.co/storage/v1/object/public/app_manifest/dwdwdwd" />
      </head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center">{children}</main>
        <Script src="../lib/pwa/script.ts" defer />
        <Toaster />
        <VercelToolbar />
        <Footer />
      </body>
    </html>
  );
}
