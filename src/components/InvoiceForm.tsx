"use client";

import React, { useRef, useState } from "react";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { CURRENCIES, PAYMENT_TERMS_OPTIONS } from "@/lib/constants";
import { generateInvoiceNumber } from "@/lib/calculations";
import { TRANSLATIONS } from "@/lib/i18n";
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
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface InvoiceFormProps {
  invoice: InvoiceData;
  onChange: (updated: InvoiceData) => void;
}

export function InvoiceForm({ invoice, onChange }: InvoiceFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = TRANSLATIONS[invoice.language] || TRANSLATIONS.en;

  // Progressive disclosure toggle states
  const [showMoreSender, setShowMoreSender] = useState(false);
  const [showMoreClient, setShowMoreClient] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);
  const [showMorePricing, setShowMorePricing] = useState(false);
  const [showMorePayment, setShowMorePayment] = useState(false);
  const [showMoreNotes, setShowMoreNotes] = useState(false);

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
      alert("Logo image should be under 2 MB.");
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
      unit: invoice.language === "de" ? "Std." : "hrs",
      unitPrice: 0,
      discountPercent: 0,
      taxPercent: 10,
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
    const prefix = invoice.language === "de" ? "RE" : "INV";
    handleUpdate("invoiceNumber", generateInvoiceNumber(prefix));
  };

  return (
    <div className="space-y-5">
      {/* 1. Sender (Your Business) */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
              <Building2 className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
              {t.form.senderTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowMoreSender(!showMoreSender)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#145BFF] hover:text-[#0D2B75] transition-colors cursor-pointer"
          >
            <span>{showMoreSender ? t.actions.showLess : t.actions.showMore}</span>
            {showMoreSender ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="space-y-3.5">
          {/* Logo & Company Name (Always Visible) */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {invoice.company.logoUrl ? (
              <div className="relative h-16 w-36 rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-2 flex items-center justify-center overflow-hidden shadow-xs shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={invoice.company.logoUrl}
                  alt="Company Logo"
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  title="Remove logo"
                  className="absolute top-1 right-1 rounded-full bg-[#0D2B75]/80 p-1 text-white hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex h-16 w-36 flex-col items-center justify-center rounded-xl border border-dashed border-[#E8ECF4] bg-[#FAFBFF] text-slate-500 hover:border-[#145BFF] hover:bg-[#F3F7FF] transition-all text-center px-2 shrink-0 cursor-pointer"
              >
                <Upload className="h-4 w-4 text-[#145BFF] mb-1" />
                <span className="text-[11px] font-semibold text-slate-700">{t.form.uploadLogo}</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleLogoUpload}
            />

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.form.companyName}
                </label>
                <input
                  type="text"
                  value={invoice.company.name}
                  onChange={(e) => handleCompanyUpdate("name", e.target.value)}
                  placeholder={t.form.companyNamePlaceholder}
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.email}</label>
                <input
                  type="email"
                  value={invoice.company.email}
                  onChange={(e) => handleCompanyUpdate("email", e.target.value)}
                  placeholder="billing@nordible.com"
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                />
              </div>
            </div>
          </div>

          {/* Progressive Secondary Details */}
          {showMoreSender && (
            <div className="pt-3 border-t border-[#E8ECF4] space-y-3 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.form.address}
                </label>
                <input
                  type="text"
                  value={invoice.company.address}
                  onChange={(e) => handleCompanyUpdate("address", e.target.value)}
                  placeholder={t.form.addressPlaceholder}
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.zipCode}</label>
                  <input
                    type="text"
                    value={invoice.company.zipCode}
                    onChange={(e) => handleCompanyUpdate("zipCode", e.target.value)}
                    placeholder="10001"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.city}</label>
                  <input
                    type="text"
                    value={invoice.company.city}
                    onChange={(e) => handleCompanyUpdate("city", e.target.value)}
                    placeholder="New York"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.country}</label>
                  <input
                    type="text"
                    value={invoice.company.country}
                    onChange={(e) => handleCompanyUpdate("country", e.target.value)}
                    placeholder="United States"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.phone}</label>
                  <input
                    type="text"
                    value={invoice.company.phone}
                    onChange={(e) => handleCompanyUpdate("phone", e.target.value)}
                    placeholder="+1 (415) 800-4290"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.taxId}</label>
                  <input
                    type="text"
                    value={invoice.company.taxId || ""}
                    onChange={(e) => handleCompanyUpdate("taxId", e.target.value)}
                    placeholder="US-84-2938102"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.commercialRegister}</label>
                  <input
                    type="text"
                    value={invoice.company.commercialRegister || ""}
                    onChange={(e) => handleCompanyUpdate("commercialRegister", e.target.value)}
                    placeholder="Reg #12345"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. Client (Recipient) */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
              <UserCheck className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
              {t.form.clientTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowMoreClient(!showMoreClient)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#145BFF] hover:text-[#0D2B75] transition-colors cursor-pointer"
          >
            <span>{showMoreClient ? t.actions.showLess : t.actions.showMore}</span>
            {showMoreClient ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="space-y-3.5">
          {/* Essential Client Info (Always Visible) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.form.clientName}
              </label>
              <input
                type="text"
                value={invoice.client.companyName}
                onChange={(e) => handleClientUpdate("companyName", e.target.value)}
                placeholder={t.form.clientNamePlaceholder}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.form.email}
              </label>
              <input
                type="email"
                value={invoice.client.email || ""}
                onChange={(e) => handleClientUpdate("email", e.target.value)}
                placeholder="billing@client.com"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
              />
            </div>
          </div>

          {/* Progressive Secondary Client Details */}
          {showMoreClient && (
            <div className="pt-3 border-t border-[#E8ECF4] space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.form.contactPerson}
                  </label>
                  <input
                    type="text"
                    value={invoice.client.contactPerson || ""}
                    onChange={(e) => handleClientUpdate("contactPerson", e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.form.clientTaxId}
                  </label>
                  <input
                    type="text"
                    value={invoice.client.taxId || ""}
                    onChange={(e) => handleClientUpdate("taxId", e.target.value)}
                    placeholder="TAX-ID-9921"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.form.address}
                </label>
                <input
                  type="text"
                  value={invoice.client.address}
                  onChange={(e) => handleClientUpdate("address", e.target.value)}
                  placeholder="742 Evergreen Terrace"
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.zipCode}</label>
                  <input
                    type="text"
                    value={invoice.client.zipCode}
                    onChange={(e) => handleClientUpdate("zipCode", e.target.value)}
                    placeholder="10001"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.city}</label>
                  <input
                    type="text"
                    value={invoice.client.city}
                    onChange={(e) => handleClientUpdate("city", e.target.value)}
                    placeholder="New York"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.country}</label>
                  <input
                    type="text"
                    value={invoice.client.country}
                    onChange={(e) => handleClientUpdate("country", e.target.value)}
                    placeholder="United States"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Invoice Details */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
              <Calendar className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
              {t.form.invoiceDetailsTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#145BFF] hover:text-[#0D2B75] transition-colors cursor-pointer"
          >
            <span>{showMoreDetails ? t.actions.showLess : t.actions.showMore}</span>
            {showMoreDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.form.invoiceNumber}
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  value={invoice.invoiceNumber}
                  onChange={(e) => handleUpdate("invoiceNumber", e.target.value)}
                  placeholder="INV-2026-0001"
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-2.5 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden font-mono"
                />
                <button
                  type="button"
                  onClick={regenerateNumber}
                  title="Generate new invoice number"
                  className="rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-2.5 py-2 text-slate-600 hover:text-[#145BFF] hover:bg-white transition-colors cursor-pointer shrink-0"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.form.issueDate}
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
                {t.form.dueDate}
              </label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => handleUpdate("dueDate", e.target.value)}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>

          {/* Secondary Details: Currency & Payment Terms */}
          {showMoreDetails && (
            <div className="pt-3 border-t border-[#E8ECF4] grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.currency}</label>
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
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.form.paymentTerms}
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
          )}
        </div>
      </section>

      {/* 4. Items & Services */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <InvoiceItemsTable
          items={invoice.items}
          currency={invoice.currency}
          language={invoice.language}
          onUpdateItem={handleItemUpdate}
          onAddItem={handleAddItem}
          onRemoveItem={handleRemoveItem}
        />

        {/* Collapsible Shipping & Extra Discount */}
        <div className="mt-4 pt-3 border-t border-[#E8ECF4]">
          <button
            type="button"
            onClick={() => setShowMorePricing(!showMorePricing)}
            className="flex items-center gap-1.5 text-[11px] font-semibold text-[#145BFF] hover:text-[#0D2B75] transition-colors cursor-pointer"
          >
            {showMorePricing ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            <span>{showMorePricing ? t.actions.showLess : `+ ${t.form.shipping} & ${t.form.extraDiscount}`}</span>
          </button>

          {showMorePricing && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {t.form.shipping} ({CURRENCIES[invoice.currency]?.symbol})
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
                  {t.form.extraDiscount} ({CURRENCIES[invoice.currency]?.symbol})
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
          )}
        </div>
      </section>

      {/* 5. Payment & Bank Information */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
              <CreditCard className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
              {t.form.paymentTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowMorePayment(!showMorePayment)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#145BFF] hover:text-[#0D2B75] transition-colors cursor-pointer"
          >
            <span>{showMorePayment ? t.actions.showLess : t.actions.showMore}</span>
            {showMorePayment ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        <div className="space-y-3">
          {/* Essential Payment Details (Always Visible) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.bankName}</label>
              <input
                type="text"
                value={invoice.payment.bankName}
                onChange={(e) => handlePaymentUpdate("bankName", e.target.value)}
                placeholder="Silicon Valley Bank"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.iban}</label>
              <input
                type="text"
                value={invoice.payment.iban}
                onChange={(e) => handlePaymentUpdate("iban", e.target.value)}
                placeholder="US89 SVBK 0000 1234 5678 90"
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Secondary Payment Details */}
          {showMorePayment && (
            <div className="pt-3 border-t border-[#E8ECF4] space-y-3 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.accountHolder}</label>
                  <input
                    type="text"
                    value={invoice.payment.accountHolder}
                    onChange={(e) => handlePaymentUpdate("accountHolder", e.target.value)}
                    placeholder="Nordible Technologies Inc."
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">{t.form.bic}</label>
                  <input
                    type="text"
                    value={invoice.payment.bic}
                    onChange={(e) => handlePaymentUpdate("bic", e.target.value)}
                    placeholder="SVBKUS6SXXX"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.form.paymentNotice}
                  </label>
                  <input
                    type="text"
                    value={invoice.payment.paymentNotice || ""}
                    onChange={(e) => handlePaymentUpdate("paymentNotice", e.target.value)}
                    placeholder="Please state invoice number"
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    {t.form.paypalEmail}
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
          )}
        </div>
      </section>

      {/* 6. Notes & Terms (Collapsible Card) */}
      <section className="rounded-2xl border border-[#E8ECF4] bg-white p-5 shadow-xs transition-all hover:shadow-md hover:shadow-blue-500/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F3F7FF] text-[#145BFF]">
              <FileSignature className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-bold text-[#0D2B75] font-heading">
              {t.form.notesTitle}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowMoreNotes(!showMoreNotes)}
            className="flex items-center gap-1 text-[11px] font-semibold text-[#145BFF] hover:text-[#0D2B75] transition-colors cursor-pointer"
          >
            <span>{showMoreNotes ? t.actions.showLess : t.actions.showMore}</span>
            {showMoreNotes ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        </div>

        {showMoreNotes && (
          <div className="mt-4 pt-3 border-t border-[#E8ECF4] space-y-3 animate-fadeIn">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.form.notes}
              </label>
              <textarea
                rows={2}
                value={invoice.notes}
                onChange={(e) => handleUpdate("notes", e.target.value)}
                placeholder={t.form.notesPlaceholder}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {t.form.terms}
              </label>
              <textarea
                rows={2}
                value={invoice.terms}
                onChange={(e) => handleUpdate("terms", e.target.value)}
                placeholder={t.form.termsPlaceholder}
                className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-3 py-2 text-xs text-slate-800 focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
              />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
