import type { Metadata } from "next";
import Script from "next/script";
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
  metadataBase: new URL("https://free-invoice-generator.nordible.co"),
  title: "Free Invoice Generator App — 100% Free, No Watermark, No Sign-up",
  description:
    "Generate professional, branded DIN A4 PDF invoices in under 2 minutes. 100% free, no registration, no watermarks. Client data remains secure and private in your browser.",
  keywords: [
    "Free Invoice Generator",
    "Invoice Generator App",
    "Rechnungsersteller",
    "GoBD Invoice",
    "No Watermark Invoice",
    "Print to PDF Invoice",
    "Nordible Technologies",
  ],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    url: "https://free-invoice-generator.nordible.co",
    title: "Free Invoice Generator App — 100% Free, No Watermark, No Sign-up",
    description:
      "Generate professional, branded DIN A4 PDF invoices in under 2 minutes. 100% free, no registration, no watermarks. Local privacy guaranteed.",
    siteName: "Invoice Generator App",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Free Invoice Generator App by Nordible",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator App — 100% Free, No Watermark",
    description:
      "Generate professional, branded DIN A4 PDF invoices in under 2 minutes. 100% free, no registration, no watermarks.",
    images: ["/images/logo.png"],
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

        {/* Google Analytics (matches main portfolio) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || "G-E5H1MEHYYB"}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || "G-E5H1MEHYYB"}');
          `}
        </Script>
      </body>
    </html>
  );
}
