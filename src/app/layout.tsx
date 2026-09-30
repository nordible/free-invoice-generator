import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nordible Technologies | Rechnungsersteller (Invoice Generator)",
  description:
    "Erstellen Sie professionelle Rechnungen in unter 2 Minuten. GoBD-konform, mit A4-PDF-Export, flexiblen Vorlagen und automatischer Steuerberechnung.",
  icons: {
    icon: "/images/logos/nordible-icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFBFF] text-gray-900">
        {children}
      </body>
    </html>
  );
}
