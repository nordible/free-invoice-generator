"use client";

import React, { useRef } from "react";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { CURRENCIES, PAYMENT_TERMS_OPTIONS } from "@/lib/constants";
import { generateInvoiceNumber } from "@/lib/calculations";
import { InvoiceItemsTable } from "./InvoiceItemsTable";
import {
  Building2,
  UserCheck,
  Calendar,
  CreditCard,
  FileSignature,
  Upload,
  RefreshCw,
  X,
} from "lucide-react";

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (updated: InvoiceData) => void;
}

export function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdate = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    onChange({ ...invoice, [key]: value });
  };

  const handleCompanyUpdate = (field: keyof InvoiceData["company"], value: string) => {
    onChange({
      ...invoice,
      company: { ...invoice.company, [field]: value },
    });
  };

  const handleClientUpdate = (field: keyof InvoiceData["client"], value: string) => {
    onChange({
      ...invoice,
      client: { ...invoice.client, [field]: value },
    });
  };

  const handlePaymentUpdate = (field: keyof InvoiceData["payment"], value: string) => {
    onChange({
      ...invoice,
      payment: { ...invoice.payment, [field]: value },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Das Logo sollte kleiner als 2 MB sein.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        handleCompanyUpdate("logoUrl", reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    handleCompanyUpdate("logoUrl", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleItemUpdate = (id: string, updated: Partial<InvoiceItem>) => {
    const newItems = invoice.items.map((item) =>
      item.id === id ? { ...item, ...updated } : item
    );
    handleUpdate("items", newItems);
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: "item-" + Math.random().toString(36).substring(2, 9),
      description: "",
      quantity: 1,
      unit: "Std.",
      unitPrice: 0,
      discountPercent: 0,
      taxPercent: 19,
    };
    handleUpdate("items", [...invoice.items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (invoice.items.length <= 1) return;
    handleUpdate(
      "items",
      invoice.items.filter((item) => item.id !== id)
    );
  };

  const regenerateNumber = () => {
    handleUpdate("invoiceNumber", generateInvoiceNumber("RE"));
  };

  return (
    <div className="space-y-6">
      {/* 1. Absender & Logo */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
            <Building2 className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
            1. Absender (Ihr Unternehmen)
          </h2>
        </div>

        <div className="space-y-4">
          {/* Logo Upload */}
          <div className="flex items-center gap-4">
            {invoice.company.logoUrl ? (
              <div className="relative h-16 w-36 rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-2 flex items-center justify-center overflow-hidden shadow-xs">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={invoice.company.logoUrl}
                  alt="Firmenlogo"
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  title="Logo entfernen"
                  className="absolute top-1 right-1 rounded-full bg-[#0D2B75]/80 p-1 text-white hover:bg-rose-600 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-16 w-36 flex-col items-center justify-center rounded-xl border border-dashed border-[#E8ECF4] bg-[#FAFBFF] text-slate-500 hover:border-[#145BFF] hover:bg-[#F3F7FF] transition-all text-center px-2"
              >
                <Upload className="h-4 w-4 text-[#145BFF] mb-1" />
                <span className="text-[11px] font-semibold text-slate-700">Logo hochladen</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-[#0D2B75] block">Firmenlogo (Optional)</span>
              PNG, JPG oder SVG (max. 2 MB)
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Firmenname / Ihr Name *
              </label>
              <input
                type="text"
                value={invoice.company.name}
                onChange={(e) => handleCompanyUpdate("name", e.target.value)}
                placeholder="z. B. Nordible Technologies GmbH"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Straße & Hausnummer
              </label>
              <input
                type="text"
                value={invoice.company.address}
                onChange={(e) => handleCompanyUpdate("address", e.target.value)}
                placeholder="Friedrichstraße 123"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">PLZ</label>
              <input
                type="text"
                value={invoice.company.zipCode}
                onChange={(e) => handleCompanyUpdate("zipCode", e.target.value)}
                placeholder="10117"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Stadt</label>
              <input
                type="text"
                value={invoice.company.city}
                onChange={(e) => handleCompanyUpdate("city", e.target.value)}
                placeholder="Berlin"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Land</label>
              <input
                type="text"
                value={invoice.company.country}
                onChange={(e) => handleCompanyUpdate("country", e.target.value)}
                placeholder="Deutschland"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">E-Mail</label>
              <input
                type="email"
                value={invoice.company.email}
                onChange={(e) => handleCompanyUpdate("email", e.target.value)}
                placeholder="billing@nordible.com"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Telefon</label>
              <input
                type="text"
                value={invoice.company.phone}
                onChange={(e) => handleCompanyUpdate("phone", e.target.value)}
                placeholder="+49 30 12345678"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Steuernummer / USt-IdNr.
              </label>
              <input
                type="text"
                value={invoice.company.taxId || ""}
                onChange={(e) => handleCompanyUpdate("taxId", e.target.value)}
                placeholder="DE314159265"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Handelsregister (Optional)
              </label>
              <input
                type="text"
                value={invoice.company.commercialRegister || ""}
                onChange={(e) => handleCompanyUpdate("commercialRegister", e.target.value)}
                placeholder="HRB 98765 B (Amtsgericht Berlin)"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Rechnungsempfänger */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
            <UserCheck className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
            2. Rechnungsempfänger (Kunde)
          </h2>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Kundenname / Firma *
              </label>
              <input
                type="text"
                value={invoice.client.companyName}
                onChange={(e) => handleClientUpdate("companyName", e.target.value)}
                placeholder="Musterkunde GmbH"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Ansprechpartner (Optional)
              </label>
              <input
                type="text"
                value={invoice.client.contactPerson || ""}
                onChange={(e) => handleClientUpdate("contactPerson", e.target.value)}
                placeholder="z. B. Max Mustermann"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Straße & Hausnummer
            </label>
            <input
              type="text"
              value={invoice.client.address}
              onChange={(e) => handleClientUpdate("address", e.target.value)}
              placeholder="Kundenstraße 45"
              className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">PLZ</label>
              <input
                type="text"
                value={invoice.client.zipCode}
                onChange={(e) => handleClientUpdate("zipCode", e.target.value)}
                placeholder="80331"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Stadt</label>
              <input
                type="text"
                value={invoice.client.city}
                onChange={(e) => handleClientUpdate("city", e.target.value)}
                placeholder="München"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Land</label>
              <input
                type="text"
                value={invoice.client.country}
                onChange={(e) => handleClientUpdate("country", e.target.value)}
                placeholder="Deutschland"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                E-Mail des Kunden
              </label>
              <input
                type="email"
                value={invoice.client.email || ""}
                onChange={(e) => handleClientUpdate("email", e.target.value)}
                placeholder="buchhaltung@kunde.de"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                USt-IdNr. des Kunden (Optional)
              </label>
              <input
                type="text"
                value={invoice.client.taxId || ""}
                onChange={(e) => handleClientUpdate("taxId", e.target.value)}
                placeholder="DE987654321"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Rechnungsdaten & Konditionen */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
            <Calendar className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
            3. Rechnungsdetails & Fristen
          </h2>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Rechnungsnummer *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={invoice.invoiceNumber}
                  onChange={(e) => handleUpdate("invoiceNumber", e.target.value)}
                  placeholder="RE-2026-0001"
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden font-mono"
                />
                <button
                  type="button"
                  onClick={regenerateNumber}
                  title="Neue Rechnungsnummer generieren"
                  className="rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-2.5 py-2 text-slate-600 hover:text-[#145BFF] hover:bg-white transition-colors"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Währung</label>
              <select
                value={invoice.currency}
                onChange={(e) => handleUpdate("currency", e.target.value as InvoiceData["currency"])}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              >
                {Object.values(CURRENCIES).map((curr) => (
                  <option key={curr.code} value={curr.code}>
                    {curr.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Rechnungsdatum *
              </label>
              <input
                type="date"
                value={invoice.issueDate}
                onChange={(e) => handleUpdate("issueDate", e.target.value)}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Fälligkeitsdatum *
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => handleUpdate("dueDate", e.target.value)}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Zahlungsziel
              </label>
              <select
                value={invoice.paymentTerms}
                onChange={(e) => handleUpdate("paymentTerms", e.target.value)}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              >
                {PAYMENT_TERMS_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Positionen */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <InvoiceItemsTable
          items={invoice.items}
          currency={invoice.currency}
          onUpdateItem={handleItemUpdate}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />

        {/* Zusätzliche Anpassungen: Versandkosten & Gesamtrabatt */}
        <div className="mt-4 pt-4 border-t border-[#E8ECF4] grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Versandkosten / Pauschale ({CURRENCIES[invoice.currency]?.symbol})
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={invoice.shipping === 0 ? "" : invoice.shipping}
              onChange={(e) => handleUpdate("shipping", parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Zusätzlicher Gesamtrabatt ({CURRENCIES[invoice.currency]?.symbol})
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={invoice.extraDiscount === 0 ? "" : invoice.extraDiscount}
              onChange={(e) => handleUpdate("extraDiscount", parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>
      </section>

      {/* 5. Zahlungsinformationen */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
            <CreditCard className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
            5. Zahlung & Bankverbindung
          </h2>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Bankname</label>
              <input
                type="text"
                value={invoice.payment.bankName}
                onChange={(e) => handlePaymentUpdate("bankName", e.target.value)}
                placeholder="Berliner Sparkasse"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Kontoinhaber</label>
              <input
                type="text"
                value={invoice.payment.accountHolder}
                onChange={(e) => handlePaymentUpdate("accountHolder", e.target.value)}
                placeholder="Nordible Technologies GmbH"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">IBAN *</label>
              <input
                type="text"
                value={invoice.payment.iban}
                onChange={(e) => handlePaymentUpdate("iban", e.target.value)}
                placeholder="DE89 1005 0000 1234 5678 90"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">BIC / SWIFT</label>
              <input
                type="text"
                value={invoice.payment.bic}
                onChange={(e) => handlePaymentUpdate("bic", e.target.value)}
                placeholder="BELADEBEXXX"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Verwendungszweck-Hinweis
              </label>
              <input
                type="text"
                value={invoice.payment.paymentNotice || ""}
                onChange={(e) => handlePaymentUpdate("paymentNotice", e.target.value)}
                placeholder="Bitte Rechnungsnummer angeben"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                PayPal-Adresse (Optional)
              </label>
              <input
                type="email"
                value={invoice.payment.paypalEmail || ""}
                onChange={(e) => handlePaymentUpdate("paypalEmail", e.target.value)}
                placeholder="billing@nordible.com"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Notizen & Geschäftsbedingungen */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
            <FileSignature className="h-4 w-4" />
          </div>
          <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
            6. Bemerkungen & Konditionen
          </h2>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Dankschreiben / Notiz an den Kunden
            </label>
            <textarea
              rows={2}
              value={invoice.notes}
              onChange={(e) => handleUpdate("notes", e.target.value)}
              placeholder="Vielen Dank für Ihren Auftrag und die gute Zusammenarbeit!"
              className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Zahlungsbedingungen & Hinweise (z. B. Kleinunternehmer § 19 UStG)
            </label>
            <textarea
              rows={2}
              value={invoice.terms}
              onChange={(e) => handleUpdate("terms", e.target.value)}
              placeholder="Zahlbar sofort nach Erhalt der Rechnung ohne Abzug."
              className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
