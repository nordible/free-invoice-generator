"use client";

import React, { useState, useEffect, useCallback, useTransition } from "react";
import { InvoiceData } from "@/types/invoice";
import { INITIAL_INVOICE } from "@/lib/constants";
import { loadSavedInvoice, saveInvoiceToStorage, clearInvoiceStorage } from "@/lib/storage";
import { Header } from "@/components/Header";
import { InvoiceForm } from "@/components/InvoiceForm";
import { InvoicePreview } from "@/components/InvoicePreview";
import { MobileActionBar } from "@/components/MobileActionBar";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { Printer, Download, CheckCircle2 } from "lucide-react";

export default function InvoiceGeneratorPage() {
  const [invoice, setInvoice] = useState<InvoiceData>(INITIAL_INVOICE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileTab, setMobileTab] = useState<"form" | "preview">("form");
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Load draft on client mount
  useEffect(() => {
    const saved = loadSavedInvoice();
    startTransition(() => {
      setInvoice(saved);
      setIsLoaded(true);
    });
  }, []);

  // Autosave to localStorage on changes
  useEffect(() => {
    if (isLoaded) {
      saveInvoiceToStorage(invoice);
    }
  }, [invoice, isLoaded]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const handlePrint = useCallback(() => {
    setIsExporting(true);
    showToast("Druckdialog wird geöffnet...");

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
  }, [showToast]);

  const handleExportPng = useCallback(async () => {
    const node = document.getElementById("invoice-preview-container");
    if (!node) return;

    setIsExporting(true);
    showToast("PNG-Bild wird generiert...");

    try {
      const dataUrl = await toPng(node, {
        quality: 0.98,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      const filename = `Rechnung_${invoice.invoiceNumber || "Export"}.png`;
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

      showToast(`Gespeichert als ${filename}`);
    } catch (err) {
      console.error("Bild-Export fehlgeschlagen:", err);
      alert("Bildexport fehlgeschlagen. Bitte versuchen Sie stattdessen die Druckfunktion.");
    } finally {
      setIsExporting(false);
    }
  }, [invoice.invoiceNumber, showToast]);

  const handleResetDemo = useCallback(() => {
    if (confirm("Möchten Sie die Nordible-Beispieldaten wiederherstellen?")) {
      setInvoice(INITIAL_INVOICE);
      saveInvoiceToStorage(INITIAL_INVOICE);
      showToast("Beispieldaten erfolgreich geladen!");
    }
  }, [showToast]);

  const handleClear = useCallback(() => {
    if (confirm("Möchten Sie alle Rechnungsfelder leeren?")) {
      clearInvoiceStorage();
      const emptyInvoice: InvoiceData = {
        ...INITIAL_INVOICE,
        invoiceNumber: "RE-" + new Date().getFullYear() + "-0001",
        items: [
          {
            id: "item-1",
            description: "",
            quantity: 1,
            unit: "Std.",
            unitPrice: 0,
            discountPercent: 0,
            taxPercent: 19,
          },
        ],
        shipping: 0,
        extraDiscount: 0,
        notes: "",
        terms: "",
      };
      setInvoice(emptyInvoice);
      showToast("Formular zurückgesetzt.");
    }
  }, [showToast]);

  const handleAddQuickItem = useCallback(() => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: "item-" + Math.random().toString(36).substring(2, 9),
          description: "",
          quantity: 1,
          unit: "Std.",
          unitPrice: 0,
          discountPercent: 0,
          taxPercent: 19,
        },
      ],
    }));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFF] font-sans selection:bg-[#145BFF]/10 selection:text-[#145BFF]">
      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-label="Benachrichtigung"
          className="no-print fixed top-4 right-4 z-50 flex items-center gap-2 rounded-xl bg-[#0D2B75]/95 text-white px-4 py-2.5 shadow-xl text-xs backdrop-blur-md transition-all animate-bounce border border-white/10"
        >
          <CheckCircle2 className="h-4 w-4 text-[#FF9F1A] shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </aside>
      )}

      {/* Top Header */}
      <Header
        template={invoice.template}
        onTemplateChange={(t) => setInvoice((prev) => ({ ...prev, template: t }))}
        accentColor={invoice.accentColor}
        onAccentColorChange={(c) => setInvoice((prev) => ({ ...prev, accentColor: c }))}
        onResetDemo={handleResetDemo}
        onClear={handleClear}
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
                  Rechnungsdaten erfassen
                </h1>
                <p className="text-xs text-slate-500">
                  Änderungen werden synchron in der DIN-A4-Vorschau aktualisiert
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F7FF] border border-[#E8ECF4] px-3 py-1 text-[11px] font-semibold text-[#145BFF]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#145BFF] animate-pulse" />
                Automatisch gesichert
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
                    Live-Vorschau
                  </span>
                  <span className="rounded-md bg-[#F3F7FF] border border-[#E8ECF4] px-2 py-0.5 text-[10px] font-mono font-semibold text-[#145BFF]">
                    DIN A4
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportPng}
                    disabled={isExporting}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-3 py-2 text-xs font-semibold text-[#0D2B75] hover:bg-[#FAFBFF] shadow-xs transition-all disabled:opacity-50"
                  >
                    <Download className="h-3.5 w-3.5 text-slate-500" />
                    <span>Als PNG</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrint}
                    disabled={isExporting}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#145BFF] px-4 py-2 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0D2B75] transition-all disabled:opacity-50 active:scale-95"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>PDF drucken / speichern</span>
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
