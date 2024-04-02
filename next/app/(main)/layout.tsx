import { GeistSans } from "geist/font/sans";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
// import { VercelToolbar } from "@vercel/toolbar/next";
import Footer from "@/components/layout/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "../providers";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Awp",
  description: "Transform any website into a App in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="flex min-h-screen flex-col items-center">
          <Providers>{children}</Providers>
        </main>
        <Toaster />
        {process.env.VERCEL_URL && <Analytics />}
        {process.env.VERCEL_URL && <SpeedInsights />}
        {/* <VercelToolbar /> */}
        <Footer />
      </body>
    </html>
  );
}
