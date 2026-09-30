import React from "react";
import { SupportedLanguage } from "@/lib/i18n";

interface StructuredDataProps {
  language: SupportedLanguage;
}

export function StructuredData({ language }: StructuredDataProps) {
  const baseUrl = "https://invoice.nordible.co";

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Invoice Generator App",
    alternateName: "Kostenlose Rechnungsersteller App",
    url: `${baseUrl}/${language}`,
    description:
      "Free professional invoice generator. Create and download GoBD-compliant DIN A4 PDF and PNG invoices in under 2 minutes without registration or watermarks.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    codeRepository: "https://github.com/nordible/free-invoice-generator",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: "Nordible Technologies",
      url: "https://nordible.co/",
      email: "mail@nordible.co",
      telephone: "+4915211065739",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Breitlacherstraße 101",
        addressLocality: "Frankfurt am Main",
        postalCode: "60489",
        addressCountry: "DE",
      },
      logo: "https://nordible.co/images/logos/nordible-icon.png",
      sameAs: [
        "https://www.linkedin.com/company/nordible-co/",
        "https://github.com/nordible",
      ],
    },
    featureList: [
      "100% Free Invoice Generation",
      "No Sign-Up or Registration Required",
      "Zero Watermarks on PDF or PNG",
      "Standard DIN A4 Print-Ready PDF & High-Res PNG Export",
      "GoBD & Statutory VAT / Tax Calculation (19%, 7%, 0%)",
      "Multi-Currency (EUR, USD, GBP, CHF, CAD, AUD, JPY) & 4 Languages (EN, DE, FR, ES)",
      "100% Client-Side Privacy & GDPR Compliance via Browser LocalStorage",
      "AI Agent Deep-Linking (#data=...) with 1-Click Human Verification",
      "Official Model Context Protocol (MCP) Server (@nordible/invoice-mcp) for Claude & Cursor",
      "Open Source Repository on GitHub (MIT License)",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is the Nordible Invoice Generator truly free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% free forever with no hidden subscriptions, limits, or watermarks. You can generate unlimited professional invoices for your business.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to create an account or sign up?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No account or registration is required. You can start creating your invoice directly in the browser immediately.",
        },
      },
      {
        "@type": "Question",
        name: "Is my company and client data secure and private?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all data is processed and stored strictly client-side within your browser's local storage. Nothing is stored on or sent to remote servers.",
        },
      },
      {
        "@type": "Question",
        name: "Are the generated invoices compliant with tax standards?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, the templates adhere to international invoicing standards and German GoBD requirements, including sequential invoice numbers, tax breakdowns (19%, 7%, 0%), company information, and due dates.",
        },
      },
      {
        "@type": "Question",
        name: "Can AI agents (Claude, Cursor, ChatGPT) create invoices with this tool?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. AI agents can create pre-filled invoices using URL deep-linking (#data=...) or via the official Model Context Protocol (MCP) server package (@nordible/invoice-mcp) with 1-click human verification on https://invoice.nordible.co.",
        },
      },
      {
        "@type": "Question",
        name: "How can I report a bug or contact Nordible for business inquiries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can report bugs or send feedback by emailing mail@nordible.co or via GitHub at github.com/nordible. For custom software engineering, reach out via mail@nordible.co or WhatsApp +49 1521 1065739.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
