import { Metadata } from "next";
import { LandingPage } from "@/components/LandingPage";
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
  const baseUrl = "https://free-invoice-generator.nordible.co";

  const titles: Record<SupportedLanguage, string> = {
    en: "Free Invoice Generator App — 100% Free, No Watermark, No Sign-up",
    de: "Kostenlose Rechnungsersteller App — 100% Gratis, Ohne Anmeldung & GoBD-konform",
    fr: "App Générateur de Factures Gratuit — 100% Gratuit & Sans Inscription",
    es: "App Generador de Facturas Gratis — 100% Gratis y Sin Registro",
  };

  const descriptions: Record<SupportedLanguage, string> = {
    en: "Create and download clean DIN A4 PDF invoices in under 2 minutes. 100% free, no registration, no watermarks. Client data remains 100% private in your browser.",
    de: "Erstellen Sie professionelle GoBD-konforme DIN-A4-Rechnungen in unter 2 Minuten. 100% kostenlos, ohne Registrierung, ohne Wasserzeichen. Daten bleiben lokal geschützt.",
    fr: "Créez et téléchargez des factures professionnelles en PDF A4 en moins de 2 minutes. 100% gratuit, sans inscription, sans filigrane.",
    es: "Crea y descarga facturas profesionales en PDF A4 en menos de 2 minutos. 100% gratis, sin registro y sin marcas de agua.",
  };

  return {
    title: titles[validLang] || titles.en,
    description: descriptions[validLang] || descriptions.en,
    alternates: {
      canonical: `${baseUrl}/${validLang}`,
      languages: {
        en: `${baseUrl}/en`,
        de: `${baseUrl}/de`,
        fr: `${baseUrl}/fr`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: titles[validLang] || titles.en,
      description: descriptions[validLang] || descriptions.en,
      url: `${baseUrl}/${validLang}`,
      siteName: "Free Invoice Generator App",
      locale: validLang === "de" ? "de_DE" : validLang === "fr" ? "fr_FR" : validLang === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function LocalizedInvoicePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const validLang = (["en", "de", "fr", "es"].includes(lang) ? lang : "en") as SupportedLanguage;

  return <LandingPage language={validLang} />;
}
