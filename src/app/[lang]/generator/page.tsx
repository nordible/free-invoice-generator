import { Metadata } from "next";
import { InvoiceGeneratorApp } from "@/components/InvoiceGeneratorApp";
import { SupportedLanguage } from "@/lib/i18n";

export function generateStaticParams() {
  return [
    { lang: "en" },
    { lang: "de" },
    { lang: "fr" },
    { lang: "es" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const validLang = (["en", "de", "fr", "es"].includes(lang) ? lang : "en") as SupportedLanguage;
  const baseUrl = "https://invoice.nordible.co";

  const titles: Record<SupportedLanguage, string> = {
    en: "Invoice Generator Workspace — Free Invoice Generator App",
    de: "Rechnungsersteller Editor — Kostenlose Rechnungsersteller App",
    fr: "Espace Éditeur de Facture — App Générateur de Factures",
    es: "Editor de Facturas — App Generador de Facturas",
  };

  return {
    title: titles[validLang] || titles.en,
    description: "Online invoice generator tool. Create and export professional PDF & PNG invoices for free.",
    alternates: {
      canonical: `${baseUrl}/${validLang}/generator`,
      languages: {
        en: `${baseUrl}/en/generator`,
        de: `${baseUrl}/de/generator`,
        fr: `${baseUrl}/fr/generator`,
        es: `${baseUrl}/es/generator`,
      },
    },
  };
}

export default async function LocalizedGeneratorPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["en", "de", "fr", "es"].includes(lang) ? lang : "en") as SupportedLanguage;

  return <InvoiceGeneratorApp initialLanguage={validLang} />;
}
