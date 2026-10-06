import { Metadata } from "next";
import { InvoiceGeneratorApp } from "@/components/InvoiceGeneratorApp";

export const metadata: Metadata = {
  title: "Invoice Generator Workspace — Free Invoice Generator App",
  description: "Create and export clean DIN A4 PDF and PNG invoices online for free.",
  alternates: {
    canonical: "https://free-invoice-generator.nordible.co/en/generator",
  },
};

export default function RootGeneratorPage() {
  return <InvoiceGeneratorApp initialLanguage="en" />;
}
