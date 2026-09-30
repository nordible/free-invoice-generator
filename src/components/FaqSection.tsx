"use client";

import React, { useState } from "react";
import { SupportedLanguage } from "@/lib/i18n";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface FaqSectionProps {
  language: SupportedLanguage;
}

export function FaqSection({ language }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = {
    en: [
      {
        q: "Is this invoice generator really 100% free with no watermarks?",
        a: "Yes. Nordible Invoice Generator is completely free with zero watermarks, no subscriptions, and no trial limits. It's a free community tool built by Nordible Technologies.",
      },
      {
        q: "Do I need to sign up or provide an email to download my invoice?",
        a: "No registration or sign-up is required. You can generate, print to PDF, and export high-resolution PNG images instantly in your browser.",
      },
      {
        q: "How does data privacy work? Are my invoices stored on your server?",
        a: "Your data never leaves your device. All company information, customer details, and invoice items are processed client-side and saved solely in your browser's private local storage.",
      },
      {
        q: "Are the generated invoices compliant with tax & legal standards?",
        a: "Yes. The templates include all mandatory invoicing elements such as unique sequential invoice numbers, issuer & recipient details, tax rate breakdowns, line items, and payment terms suitable for US, UK, EU, and German GoBD requirements.",
      },
      {
        q: "Can I customize the logo, colors, and layout?",
        a: "Yes. You can upload your own company logo, pick any brand accent color via the spectrum picker or direct hex code, and choose between Modern, Minimal, and Classic layouts.",
      },
      {
        q: "How can I report a bug, request a feature, or reach out for business inquiries?",
        a: "We welcome all feedback! You can email us directly at mail@nordible.co with any issues, or visit our GitHub (github.com/nordible). For custom software engineering, automated billing, or AI integrations, reach out to mail@nordible.co or call/WhatsApp +49 1521 1065739.",
      },
    ],
    de: [
      {
        q: "Ist dieser Rechnungsersteller wirklich 100% kostenlos ohne Wasserzeichen?",
        a: "Ja, absolut. Der Nordible Rechnungsersteller ist dauerhaft kostenlos, werbefrei und fügt keinerlei Wasserzeichen hinzu. Bereitgestellt von Nordible Technologies.",
      },
      {
        q: "Muss ich mich registrieren oder meine E-Mail angeben?",
        a: "Nein, eine Registrierung ist nicht erforderlich. Sie können sofort im Browser Rechnungen schreiben, als druckoptimiertes A4-PDF speichern oder als PNG herunterladen.",
      },
      {
        q: "Wo werden meine Daten gespeichert? (Datenschutz)",
        a: "Ihre Daten bleiben zu 100 % lokal auf Ihrem Computer (im Browser-Speicher). Es werden keine Unternehmens- oder Kundendaten an externe Server übertragen.",
      },
      {
        q: "Sind die Rechnungen GoBD- und finanzamtkonform?",
        a: "Ja. Die Vorlagen enthalten alle gesetzlichen Pflichtangaben nach § 14 UStG: fortlaufende Rechnungsnummer, Steuernummer/USt-IdNr., vollständige Anschriften, Leistungszeitraum, Nettosummen und MwSt.-Aufschlüsselung.",
      },
      {
        q: "Wie kann ich einen Fehler melden oder Kontakt für ein Projekt aufnehmen?",
        a: "Wir freuen uns über Feedback und Fehlerberichte! Schreiben Sie uns direkt an mail@nordible.co oder eröffnen Sie ein GitHub-Ticket (github.com/nordible). Für maßgeschneiderte Softwareentwicklung oder Beratung erreichen Sie uns per E-Mail oder telefonisch/WhatsApp unter +49 1521 1065739.",
      },
    ],
    fr: [
      {
        q: "Ce générateur de factures est-il réellement 100% gratuit ?",
        a: "Oui, entièrement gratuit et sans filigrane. Créé par Nordible Technologies pour aider les entreprises et indépendants.",
      },
      {
        q: "Mes données sont-elles confidentielles ?",
        a: "Toutes vos données restent sur votre ordinateur via le stockage local du navigateur. Aucune donnée n'est envoyée sur un serveur distant.",
      },
      {
        q: "Comment signaler un bogue ou contacter Nordible pour un projet ?",
        a: "Vous pouvez contacter directement notre équipe par e-mail à mail@nordible.co ou nous joindre par téléphone/WhatsApp au +49 1521 1065739.",
      },
    ],
    es: [
      {
        q: "¿Este generador de facturas es realmente 100% gratuito?",
        a: "Sí, es completamente gratis, sin marcas de agua y sin suscripciones. Creado por Nordible Technologies para profesionales y pymes.",
      },
      {
        q: "¿Están seguros mis datos?",
        a: "Absolutamente. Todos los datos se procesan y almacenan localmente en tu propio navegador sin enviarse a servidores externos.",
      },
      {
        q: "¿Cómo puedo reportar un error o ponerme en contacto para proyectos de software?",
        a: "Puedes escribirnos directamente a mail@nordible.co o contactarnos por teléfono/WhatsApp al +49 1521 1065739.",
      },
    ],
  };

  const list = faqs[language] || faqs.en;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section aria-label="Frequently Asked Questions" className="no-print mt-12 mb-8">
      <div className="rounded-3xl border border-[#E8ECF4] bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#F3F7FF] text-[#145BFF]">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0D2B75] font-heading">
              {language === "de" ? "Häufig gestellte Fragen (FAQ)" : "Frequently Asked Questions"}
            </h2>
            <p className="text-xs text-slate-500">
              {language === "de"
                ? "Wichtige Informationen zu Rechtssicherheit, Datenschutz und Formaten"
                : "Helpful insights on compliance, data privacy, and invoicing standards"}
            </p>
          </div>
        </div>

        <div className="divide-y divide-[#E8ECF4]">
          {list.map((item, idx) => (
            <div key={idx} className="py-3.5">
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between text-left text-xs sm:text-sm font-semibold text-[#0D2B75] hover:text-[#145BFF] transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                {openIndex === idx ? (
                  <ChevronUp className="h-4 w-4 text-[#145BFF] shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />
                )}
              </button>
              {openIndex === idx && (
                <p className="mt-2 text-xs leading-relaxed text-slate-600 animate-fadeIn">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
