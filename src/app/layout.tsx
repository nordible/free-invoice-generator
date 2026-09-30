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
  title: "Free Invoice Generator | Nordible Technologies – 100% Free & No Sign-up",
  description:
    "Generate professional, branded DIN A4 PDF invoices in under 2 minutes. 100% free, no registration, no watermarks. Client data remains secure and private in your browser.",
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
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FAFBFF] text-gray-900">
        {children}
      </body>
    </html>
  );
}
