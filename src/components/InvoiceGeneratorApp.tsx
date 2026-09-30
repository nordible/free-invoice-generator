"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { InvoiceData } from "@/types/invoice";
import { INITIAL_INVOICE } from "@/lib/constants";
import { loadSavedInvoice, saveInvoiceToStorage, clearInvoiceStorage } from "@/lib/storage";
import { Header } from "@/components/Header";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";
import { MobileActionBar } from "@/components/MobileActionBar";
import { StructuredData } from "@/components/StructuredData";
import { SupportedLanguage, TRANSLATIONS } from "@/lib/i18n";
import { parseUrlInvoicePayload, mergeWithDefaultInvoice, buildInvoiceDeepLink } from "@/lib/urlPayload";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { Printer, Download, CheckCircle2, Link2 } from "lucide-react";

interface InvoiceGeneratorAppProps {
  initialLanguage?: SupportedLanguage;
}

export function InvoiceGeneratorApp({ initialLanguage = "en" }: InvoiceGeneratorAppProps) {
  const [invoice, setInvoice] = useState<InvoiceData>(() => ({
    ...INITIAL_INVOICE,
    language: initialLanguage,
  }));
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const lang: SupportedLanguage = invoice.language || initialLanguage;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // Load draft or URL/agent payload on client mount
  useEffect(() => {
    // 1. Check if an agent or link provided a payload via URL hash or search params
    const urlPayload = parseUrlInvoicePayload();
    if (urlPayload) {
      const merged = mergeWithDefaultInvoice(urlPayload, initialLanguage);
      startTransition(() => {
        setInvoice(merged);
        setIsLoaded(true);
      });

      const isDe = (merged.language || initialLanguage) === "de";
      const timer = setTimeout(() => {
        showToast(isDe ? "Rechnung aus Agenten-Link geladen!" : "Invoice loaded from agent link!");
      }, 50);

      // Clean hash/query safely to prevent overwriting user edits on refresh
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
      return () => clearTimeout(timer);
    }

    // 2. Otherwise load saved draft from browser storage
    const saved = loadSavedInvoice();
    startTransition(() => {
      setInvoice({
        ...saved,
        language: initialLanguage || saved.language || "en",
      });
      setIsLoaded(true);
    });
  }, [initialLanguage, showToast]);

  // Autosave to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      saveInvoiceToStorage(invoice);
    }
  }, [invoice, isLoaded]);

  const handleLanguageChange = useCallback((newL: SupportedLanguage) => {
    setInvoice((prev) => ({ ...prev, language: newL }));
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/" + newL);
    }
  }, []);

  const handlePrint = useCallback(() => {
    setIsExporting(true);
    showToast(lang === "de" ? "Druckdialog wird geöffnet..." : "Opening print dialog...");

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (e) {
      console.warn(e);
    }

    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 200);
  }, [lang, showToast]);

  const handleExportPng = useCallback(async () => {
    const node = document.getElementById("invoice-preview-container");
    if (!node) return;

    setIsExporting(true);
    showToast(lang === "de" ? "PNG-Bild wird generiert..." : "Generating PNG image...");

    try {
      const dataUrl = await toPng(node, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      const filename = `Invoice_${invoice.invoiceNumber || "Export"}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();

      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.8 },
        });
      } catch (e) {
        console.warn(e);
      }

      showToast(`${lang === "de" ? "Gespeichert als" : "Saved as"} ${filename}`);
    } catch (err) {
      console.error("Image export failed:", err);
      alert(lang === "de" ? "Bildexport fehlgeschlagen." : "Image export failed. Please try printing to PDF instead.");
    } finally {
      setIsExporting(false);
    }
  }, [invoice.invoiceNumber, lang, showToast]);

  const handleResetDemo = useCallback(() => {
    const confirmMsg =
      lang === "de"
        ? "Möchten Sie die Beispieldaten wiederherstellen?"
        : "Reset to default demo invoice data?";
    if (confirm(confirmMsg)) {
      setInvoice({ ...INITIAL_INVOICE, language: lang });
      saveInvoiceToStorage({ ...INITIAL_INVOICE, language: lang });
      showToast(lang === "de" ? "Beispieldaten geladen!" : "Demo data loaded!");
    }
  }, [lang, showToast]);

  const handleClear = useCallback(() => {
    const confirmMsg =
      lang === "de"
        ? "Möchten Sie alle Rechnungsfelder leeren?"
        : "Clear all invoice fields?";
    if (confirm(confirmMsg)) {
      clearInvoiceStorage();
      const emptyInvoice: InvoiceData = {
        ...INITIAL_INVOICE,
        language: lang,
        invoiceNumber: "INV-" + new Date().getFullYear() + "-0001",
        items: [
          {
            id: "item-1",
            description: "",
            quantity: 1,
            unit: lang === "de" ? "Std." : "hrs",
            unitPrice: 0,
            discountPercent: 0,
            taxPercent: 10,
          },
        ],
        shipping: 0,
        extraDiscount: 0,
        notes: "",
        terms: "",
      };
      setInvoice(emptyInvoice);
      showToast(lang === "de" ? "Formular zurückgesetzt." : "Form reset.");
    }
  }, [lang, showToast]);

  const handleAddQuickItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: "item-" + Math.random().toString(36).substring(2, 9),
          description: "",
          quantity: 1,
          unit: prev.language === "de" ? "Std." : "hrs",
          unitPrice: 0,
          discountPercent: 0,
          taxPercent: 10,
        },
      ],
    }));
  }, []);

  const handleCopyShareLink = useCallback(() => {
    try {
      const link = buildInvoiceDeepLink(invoice, lang);
      navigator.clipboard.writeText(link);
      showToast(lang === "de" ? "Teilbarer Link in Zwischenablage kopiert!" : "Shareable link copied to clipboard!");
    } catch {
      showToast(lang === "de" ? "Kopieren fehlgeschlagen." : "Failed to copy link.");
    }
  }, [invoice, lang, showToast]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] font-sans selection:bg-[#145BFF]/10 selection:text-[#145BFF]">
      {/* Schema.org Structured Data */}
      <StructuredData language={lang} />

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-label="Notification"
          className="no-print fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#0D2B75]/95 text-white px-4 py-2.5 shadow-xl text-xs backdrop-blur-md transition-all animate-bounce border border-white/10"
        >
          <CheckCircle2 className="h-4 w-4 text-[#FF9F1A] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </aside>
      )}

      {/* Top Header with Language Switcher and nordible.co links */}
      <Header
        language={lang}
        onLanguageChange={handleLanguageChange}
        template={invoice.template}
        onTemplateChange={(t) => setInvoice((prev) => ({ ...prev, template: t }))}
        accentColor={invoice.accentColor}
        onAccentColorChange={(c) => setInvoice((prev) => ({ ...prev, accentColor: c }))}
        onResetDemo={handleResetDemo}
        onClear={handleClear}
        isGeneratorPage={true}
      />

      {/* Main Workspace */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 pb-28 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Editor */}
          <div
            className={`no-print lg:col-span-6 space-y-6 ${
              mobileTab === "form" ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-extrabold tracking-tight text-[#0D2B75] font-heading">
                  {t.form.pageTitle}
                </h1>
                <p className="text-xs text-slate-500">{t.form.pageSubtitle}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F7FF] border border-[#E8ECF4] px-3 py-1 text-[11px] font-semibold text-[#145BFF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#145BFF] animate-pulse" />
                {t.actions.autoSaved}
              </span>
            </div>

            <InvoiceForm invoice={invoice} onChange={setInvoice} />
          </div>

          {/* Right Column: Live A4 Preview & Desktop Actions */}
          <div
            className={`lg:col-span-6 ${
              mobileTab === "preview" ? "block" : "hidden lg:block"
            }`}
          >
            {/* Desktop Action Bar */}
            <div className="no-print sticky top-20 z-20 mb-4 rounded-2xl border border-[#E8ECF4] bg-white/90 backdrop-blur-md p-3 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#0D2B75] font-heading">
                    {t.actions.preview}
                  </span>
                  <span className="rounded-md bg-[#F3F7FF] border border-[#E8ECF4] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#145BFF]">
                    DIN A4
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyShareLink}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-3 py-2 text-xs font-semibold text-[#0D2B75] hover:bg-[#FAFBFF] shadow-xs transition-all cursor-pointer"
                    title={lang === "de" ? "Link mit aktuellen Daten kopieren" : "Copy shareable link with current data"}
                  >
                    <Link2 className="h-3.5 w-3.5 text-slate-500" />
                    <span>{lang === "de" ? "Link teilen" : "Share Link"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleExportPng}
                    disabled={isExporting}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-3 py-2 text-xs font-semibold text-[#0D2B75] hover:bg-[#FAFBFF] shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-slate-500" />
                    <span>{t.actions.exportPng}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    disabled={isExporting}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#145BFF] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0D2B75] transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>{t.actions.printPdf}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* A4 Preview Sheet */}
            <div className="overflow-x-auto pb-4">
              <InvoicePreview invoice={invoice} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed Thumb Action Bar */}
      <MobileActionBar
        language={lang}
        activeTab={mobileTab}
        onTabChange={setMobileTab}
        onPrint={handlePrint}
        onExportImage={handleExportPng}
        onAddItem={handleAddQuickItem}
        isExporting={isExporting}
      />
    </div>
  );
}
