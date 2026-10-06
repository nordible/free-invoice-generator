import { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";

export const metadata: Metadata = {
  title: "Free Invoice Generator App — 100% Free, No Watermark, No Sign-up",
  description:
    "Create and download clean DIN A4 PDF invoices in under 2 minutes. 100% free, no registration, no watermarks. Client data remains 100% private in your browser.",
  alternates: {
    canonical: "https://free-invoice-generator.nordible.co/en",
    languages: {
      en: "https://free-invoice-generator.nordible.co/en",
      de: "https://free-invoice-generator.nordible.co/de",
      fr: "https://free-invoice-generator.nordible.co/fr",
      es: "https://free-invoice-generator.nordible.co/es",
    },
  },
  openGraph: {
    title: "Free Invoice Generator App — 100% Free & Open Source",
    description:
      "Create professional invoices in under 2 minutes. 100% free, no registration, no watermarks.",
    url: "https://free-invoice-generator.nordible.co/",
    siteName: "Free Invoice Generator App",
    locale: "en_US",
    type: "website",
  },
};

export default function RootInvoicePage() {
  return <LandingPage language="en" />;
}
