import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import { VercelToolbar } from "@vercel/toolbar/next";

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
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />{" "}
        {/* <link rel="manifest" href={`https://awp-six.vercel.app/wdwaefawecvde`} /> */}
      </head>
      <body className="bg-background text-foreground">
        <Header />
        <main className="min-h-screen flex flex-col items-center p-4">{children}</main>
        <Toaster />
        <VercelToolbar />
        <footer className="flex items-center justify-center h-16 bg-gray-100 dark:bg-gray-900">
          <p className="text-sm text-gray-600 dark:text-gray-400">© 2023 Awp. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
