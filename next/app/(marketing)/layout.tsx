import { GeistSans } from "geist/font/sans";
import "../globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={GeistSans.className}>
      <body>{children}</body>
    </html>
  );
}
