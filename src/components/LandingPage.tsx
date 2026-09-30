"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SupportedLanguage } from "@/lib/i18n";
import { Header } from "./Header";
import { FaqSection } from "./FaqSection";
import { Footer } from "./Footer";
import { StructuredData } from "./StructuredData";
import {
  FileText,
  ArrowRight,
  Shield,
  Zap,
  Gift,
  FileCheck,
  CheckCircle2,
  Printer,
  Palette,
  Calculator,
  Lock,
  Bot,
  Code2,
} from "lucide-react";
import { GithubIcon } from "./icons/GithubIcon";

interface LandingPageProps {
  language: SupportedLanguage;
}

export function LandingPage({ language = "en" }: LandingPageProps) {
  const router = useRouter();
  const isDe = language === "de";
  const generatorHref = `/${language}/generator`;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] text-slate-800 font-sans selection:bg-[#145BFF]/10 selection:text-[#145BFF]">
      <StructuredData language={language} />

      {/* Header */}
      <Header
        language={language}
        onLanguageChange={(l) => {
          router.push(`/${l}`);
        }}
        template="modern"
        onTemplateChange={() => {}}
        accentColor="#145BFF"
        onAccentColorChange={() => {}}
        onResetDemo={() => {}}
        onClear={() => {}}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-[#E8ECF4]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Headline & Action */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-700 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {isDe
                      ? "100% Dauerhaft Kostenlos • Open Source auf GitHub • Kein Wasserzeichen"
                      : "100% Free Forever • Open Source on GitHub • Zero Watermarks"}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0D2B75] tracking-tight font-heading leading-[1.12]">
                  {isDe
                    ? "100% Kostenloser Online-Rechnungsersteller"
                    : "Free Online Invoice Generator"}
                  <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-700 mt-2 font-heading">
                    {isDe
                      ? "Professionelle Rechnungen in unter 2 Minuten."
                      : "Professional Invoices in Under 2 Minutes."}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {isDe
                    ? "100% dauerhaft kostenlos ohne versteckte Abonnements, ohne Kreditkarte und garantiert ohne Wasserzeichen. Erstellen und exportieren Sie druckoptimierte A4-PDFs und hochauflösende PNGs direkt im Browser mit GoBD-Konformität und maximalem Datenschutz."
                    : "100% free with no subscriptions, no credit card required, and zero watermarks. Generate print-ready DIN A4 PDFs and high-resolution PNG images directly in your browser with bank-grade local privacy."}
                </p>

                {/* Primary CTA (Fitts's Law) */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link
                    href={generatorHref}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#145BFF] px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-500/25 hover:bg-[#0D2B75] transition-all hover:scale-105 active:scale-95"
                  >
                    <span>{isDe ? "Kostenlose Rechnung erstellen (100% Gratis) →" : "Create Free Invoice (100% Free) →"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <a
                    href="#preview"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E8ECF4] bg-white px-6 py-4 text-sm font-bold text-[#0D2B75] hover:bg-[#FAFBFF] transition-all shadow-xs"
                  >
                    <span>{isDe ? "Beispiel ansehen" : "Preview Sample"}</span>
                  </a>
                </div>

                {/* Mini trust list */}
                <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {isDe ? "100% Dauerhaft Kostenlos" : "100% Free Forever"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {isDe ? "GoBD- & Steuervorlagen" : "Tax & Legal Compliant"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {isDe ? "Alle Währungen ($ € £ CHF)" : "Multi-Currency ($ € £ CHF)"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    {isDe ? "Lokale Datenspeicherung" : "Browser-Local Privacy"}
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Mockup */}
              <div id="preview" className="lg:col-span-5 relative">
                {/* Floating 100% Free Badge */}
                <div className="absolute -top-3 -right-3 z-10 rounded-full bg-emerald-600 text-white px-3.5 py-1 text-[11px] font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 ring-4 ring-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{isDe ? "100% Gratis" : "100% Free"}</span>
                </div>

                <div className="relative mx-auto max-w-sm rounded-3xl border border-[#E8ECF4] bg-white p-6 shadow-2xl shadow-blue-900/10">
                  {/* Mockup header */}
                  <div className="flex justify-between items-start border-b border-[#E8ECF4] pb-4 mb-4">
                    <div className="space-y-1">
                      <div className="h-3 w-28 bg-[#0D2B75] rounded-full" />
                      <div className="h-2 w-20 bg-slate-200 rounded-full" />
                    </div>
                    <span className="font-heading font-black text-sm text-[#145BFF] tracking-wider uppercase">
                      INVOICE
                    </span>
                  </div>

                  {/* Mockup details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-[11px] text-slate-500">
                      <span>INV-2026-0042</span>
                      <span>Net 14 Days</span>
                    </div>

                    <div className="rounded-xl bg-[#FAFBFF] p-3 border border-[#E8ECF4] text-[11px] space-y-1.5">
                      <div className="flex justify-between font-semibold text-slate-800">
                        <span>Web Architecture & Engineering</span>
                        <span>$5,040.00</span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>UI/UX Design System Prototyping</span>
                        <span>$2,375.00</span>
                      </div>
                    </div>

                    <div className="border-t border-[#E8ECF4] pt-2 flex justify-between text-xs font-extrabold text-[#0D2B75]">
                      <span>Total Due:</span>
                      <span className="text-[#145BFF]">$8,156.50</span>
                    </div>
                  </div>

                  {/* Floating Action Badge */}
                  <Link
                    href={generatorHref}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#145BFF] py-3 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0D2B75] transition-all"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>{isDe ? "Diese Rechnung bearbeiten" : "Customize & Download"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Guarantees Ribbon */}
        <section aria-label="Trust Signals" className="py-12 bg-white border-b border-[#E8ECF4]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <Gift className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0D2B75]">{isDe ? "100% Kostenlos" : "100% Free"}</p>
                  <p className="text-[11px] text-slate-500">{isDe ? "Keine Abos oder Limits" : "No hidden subscriptions"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-[#145BFF]">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0D2B75]">{isDe ? "Ohne Anmeldung" : "No Account Needed"}</p>
                  <p className="text-[11px] text-slate-500">{isDe ? "Direkt im Browser starten" : "Start right away in browser"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-[#FF9F1A]">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0D2B75]">{isDe ? "Kein Wasserzeichen" : "Zero Watermark"}</p>
                  <p className="text-[11px] text-slate-500">{isDe ? "Professionelle A4-Dokumente" : "Clean DIN A4 PDFs & PNGs"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0D2B75]">{isDe ? "100% Datenschutz" : "100% Private"}</p>
                  <p className="text-[11px] text-slate-500">{isDe ? "Nur auf Ihrem Gerät" : "Never saved on remote server"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Grid */}
        <section aria-label="Features" className="py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0D2B75] font-heading tracking-tight">
                {isDe ? "Alles, was Sie für perfekte Rechnungen brauchen" : "Everything You Need for Effortless Invoicing"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                {isDe
                  ? "Entwickelt nach internationalen Standards und DIN-A4-Formaten für höchste Professionalität."
                  : "Engineered to international standards and DIN A4 formatting for peak business professionalism."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1: Print & Export */}
              <div className="rounded-3xl border border-[#E8ECF4] bg-white p-7 shadow-xs space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F7FF] text-[#145BFF]">
                  <Printer className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2B75] font-heading">
                  {isDe ? "Makelloser DIN-A4- & PNG-Export" : "Pixel-Perfect DIN A4 PDF & Image Export"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {isDe
                    ? "Drucken Sie direkt maßgeschneiderte DIN-A4-Dokumente ohne Seitenabschneider oder exportieren Sie hochauflösende PNG-Dateien für WhatsApp und E-Mail."
                    : "Print directly to standardized DIN A4 pages with zero cutoffs or export high-resolution PNG images for email and messaging."}
                </p>
              </div>

              {/* Feature 2: Taxes & Math */}
              <div className="rounded-3xl border border-[#E8ECF4] bg-white p-7 shadow-xs space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F7FF] text-[#145BFF]">
                  <Calculator className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2B75] font-heading">
                  {isDe ? "Automatische GoBD-Steuerberechnung" : "Automated GoBD & Multi-Tax Math"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {isDe
                    ? "Automatische Zwischensummen, Rabatte, Versandpauschalen und Mehrwertsteuersätze (19%, 10%, 7%, 0%) in Echtzeit für 7 weltweite Währungen."
                    : "Real-time calculation of subtotals, item discounts, shipping, and itemized VAT/tax rates (19%, 7%, 0%) across 7 global currencies."}
                </p>
              </div>

              {/* Feature 3: Branding */}
              <div className="rounded-3xl border border-[#E8ECF4] bg-white p-7 shadow-xs space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F7FF] text-[#145BFF]">
                  <Palette className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2B75] font-heading">
                  {isDe ? "Individuelles Branding & Farbwähler" : "Complete Brand Customization"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {isDe
                    ? "Laden Sie Ihr Firmenlogo hoch, wählen Sie Ihre Markenfarbe mit Farbkreis oder Hex-Code (#145BFF) und wechseln Sie zwischen Modern, Minimal und Klassisch."
                    : "Upload your company logo, pick your brand color via the spectrum wheel or direct hex code, and toggle between Modern, Minimal, and Classic layouts."}
                </p>
              </div>

              {/* Feature 4: 100% Privacy */}
              <div className="rounded-3xl border border-[#E8ECF4] bg-white p-7 shadow-xs space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F7FF] text-[#145BFF]">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2B75] font-heading">
                  {isDe ? "100% Datenschutz (Nur auf Ihrem Gerät)" : "100% Client-Side Privacy (Local-First)"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {isDe
                    ? "Keine Server-Datenbank, kein Tracking. Alle Kunden- und Finanzdaten verbleiben DSGVO-konform ausschließlich im lokalen Speicher Ihres Browsers."
                    : "Zero remote servers, zero cloud databases. All customer and financial data remains 100% private in your browser LocalStorage for GDPR compliance."}
                </p>
              </div>

              {/* Feature 5: AI & MCP */}
              <div className="rounded-3xl border border-[#E8ECF4] bg-white p-7 shadow-xs space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F7FF] text-[#145BFF]">
                  <Bot className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2B75] font-heading">
                  {isDe ? "KI-Agenten & MCP-Schnittstelle" : "AI Agent & MCP Server Ready"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {isDe
                    ? "Offizielles Model Context Protocol (@nordible/invoice-mcp) und Deep-Linking. KI-Assistenten (Claude, Cursor) erstellen Rechnungen mit 1-Klick-Freigabe."
                    : "Official Model Context Protocol package (@nordible/invoice-mcp) and deep-linking allow AI agents (Claude, Cursor) to draft invoices with 1-click human verification."}
                </p>
              </div>

              {/* Feature 6: Open Source */}
              <div className="rounded-3xl border border-[#E8ECF4] bg-white p-7 shadow-xs space-y-4 hover:shadow-xl hover:shadow-blue-500/5 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F7FF] text-[#145BFF]">
                  <Code2 className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-[#0D2B75] font-heading">
                  {isDe ? "Open Source & Entwicklerqualität" : "Open Source & Engineering Trust"}
                </h3>
                <p className="text-xs leading-relaxed text-slate-600">
                  {isDe
                    ? "100% Open Source auf GitHub unter MIT-Lizenz. Höchste Code- und Performance-Standards, entwickelt und gepflegt von Nordible Technologies."
                    : "100% open-source on GitHub under the MIT License. High performance, zero bloat, engineered and maintained by Nordible Technologies."}
                </p>
              </div>
            </div>

            {/* Launch Banner */}
            <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#0D2B75] to-[#145BFF] p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/10">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold text-white mb-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{isDe ? "100% Kostenlos" : "100% Free Tool"}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading">
                  {isDe ? "Bereit für Ihre nächste Rechnung?" : "Ready to create your next invoice?"}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/80">
                  {isDe
                    ? "Starten Sie sofort kostenlos im Browser – in weniger als 2 Minuten fertig."
                    : "Start completely free in your browser right now – ready in under 2 minutes."}
                </p>
              </div>

              <Link
                href={generatorHref}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 text-xs sm:text-sm font-extrabold text-[#0D2B75] shadow-lg hover:bg-[#FAFBFF] transition-all hover:scale-105 shrink-0"
              >
                <span>{isDe ? "Jetzt kostenlos starten →" : "Start Free Now →"}</span>
              </Link>
            </div>

            {/* Why is it 100% Free? Transparency & Agency Trust Card */}
            <div className="mt-12 rounded-3xl border border-[#E8ECF4] bg-white p-8 sm:p-10 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                    <Gift className="h-3.5 w-3.5 text-emerald-600" />
                    <span>{isDe ? "Transparenz: Warum 100% kostenlos?" : "Transparency: Why is it 100% Free?"}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0D2B75] font-heading">
                    {isDe
                      ? "Keine versteckten Abos. Kein Haken. Von Entwicklern für Macher."
                      : "Zero paywalls. No subscription traps. Built & gifted by Nordible."}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isDe
                      ? "Wir haben dieses Werkzeug ursprünglich für unsere eigene Agentur entwickelt und stellen es nun Gründern, Freelancern und Unternehmen weltweit 100% kostenfrei zur Verfügung. Nordible finanziert sich als Full-Service-Technologieagentur über maßgeschneiderte Softwareentwicklung, Web-Architektur und KI-Systeme."
                      : "We originally built this invoice generator for our own agency workflow and decided to release it 100% free to support founders, freelancers, and businesses worldwide. Nordible sustains itself as a full-service technology agency delivering enterprise software engineering, bespoke web applications, and autonomous AI systems."}
                  </p>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center">
                  <Link
                    href={generatorHref}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#145BFF] px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0D2B75] transition-all text-center"
                  >
                    <span>{isDe ? "Rechnung erstellen" : "Create Free Invoice"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://github.com/nordible/free-invoice-generator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6 py-3 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition-all shadow-xs text-center"
                  >
                    <GithubIcon className="h-4 w-4 text-slate-800" />
                    <span>{isDe ? "Quellcode auf GitHub ansehen" : "View Open Source on GitHub"}</span>
                  </a>
                  <a
                    href="https://nordible.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#E8ECF4] bg-[#FAFBFF] px-6 py-3 text-xs sm:text-sm font-bold text-[#0D2B75] hover:bg-white transition-all shadow-xs text-center"
                  >
                    <span>{isDe ? "Agentur Nordible kennenlernen →" : "Explore Nordible Services →"}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Semantic FAQ Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FaqSection language={language} />
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
