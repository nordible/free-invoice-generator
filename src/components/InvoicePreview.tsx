"use client";

import React from "react";
import { InvoiceData } from "@/types/invoice";
import { calculateInvoice, calculateLineTotal, formatCurrency } from "@/lib/calculations";

interface InvoicePreviewProps {
  invoice: InvoiceData;
  containerId?: string;
}

export function InvoicePreview({
  invoice,
  containerId = "invoice-preview-container",
}: InvoicePreviewProps) {
  const {
    subtotal,
    itemDiscountsTotal,
    extraDiscount,
    shipping,
    taxBreakdown,
    grandTotal,
  } = calculateInvoice(invoice.items, invoice.shipping, invoice.extraDiscount);

  const { template, accentColor } = invoice;

  return (
    <div
      id={containerId}
      className={`print-container relative mx-auto w-full max-w-[800px] min-h-[1050px] bg-white text-slate-800 shadow-xl rounded-xl p-8 sm:p-12 transition-all flex flex-col justify-between text-xs leading-relaxed`}
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* ----------------- MODERN TEMPLATE ----------------- */}
      {template === "modern" && (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Top Bar Accent */}
            <div
              className="h-2 w-full rounded-t-sm mb-6"
              style={{ backgroundColor: accentColor }}
            />

            {/* Header: Company & Invoice Info */}
            <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-6">
              <div className="space-y-1">
                {invoice.company.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={invoice.company.logoUrl}
                    alt={invoice.company.name}
                    className="max-h-14 max-w-[180px] object-contain mb-2"
                  />
                ) : (
                  <h1 className="text-xl font-bold tracking-tight text-slate-900">
                    {invoice.company.name || "Ihr Firmenname"}
                  </h1>
                )}
                <div className="text-slate-500 text-[11px] leading-tight space-y-0.5">
                  <p>{invoice.company.address}</p>
                  <p>
                    {invoice.company.zipCode} {invoice.company.city}
                    {invoice.company.country ? `, ${invoice.company.country}` : ""}
                  </p>
                  {invoice.company.email && <p>E-Mail: {invoice.company.email}</p>}
                  {invoice.company.phone && <p>Tel: {invoice.company.phone}</p>}
                  {invoice.company.taxId && <p>USt-IdNr.: {invoice.company.taxId}</p>}
                </div>
              </div>

              <div className="text-right space-y-1">
                <span
                  className="inline-block text-xl font-black tracking-wider uppercase"
                  style={{ color: accentColor }}
                >
                  RECHNUNG
                </span>
                <p className="font-mono text-sm font-semibold text-slate-800">
                  {invoice.invoiceNumber || "RE-2026-0001"}
                </p>
                <div className="text-slate-500 text-[11px] space-y-0.5 pt-1">
                  <p>
                    <span className="font-medium text-slate-700">Datum: </span>
                    {invoice.issueDate}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">Fällig am: </span>
                    {invoice.dueDate}
                  </p>
                  {invoice.paymentTerms && (
                    <p>
                      <span className="font-medium text-slate-700">Zahlungsziel: </span>
                      {invoice.paymentTerms}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Rechnungsempfänger
              </span>
              <div className="text-slate-800 font-medium text-sm">
                {invoice.client.companyName || "Kundenname"}
              </div>
              {invoice.client.contactPerson && (
                <div className="text-slate-600 text-[11px]">
                  z. Hd. {invoice.client.contactPerson}
                </div>
              )}
              <div className="text-slate-500 text-[11px] mt-0.5">
                <p>{invoice.client.address}</p>
                <p>
                  {invoice.client.zipCode} {invoice.client.city}
                  {invoice.client.country ? `, ${invoice.client.country}` : ""}
                </p>
                {invoice.client.taxId && <p className="mt-1">USt-IdNr.: {invoice.client.taxId}</p>}
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left mb-6">
              <thead>
                <tr
                  className="text-[11px] font-semibold text-white uppercase tracking-wider"
                  style={{ backgroundColor: accentColor }}
                >
                  <th className="py-2 px-3 rounded-l-md">Pos.</th>
                  <th className="py-2 px-3">Beschreibung</th>
                  <th className="py-2 px-3 text-right">Menge</th>
                  <th className="py-2 px-3 text-right">Einzelpreis</th>
                  <th className="py-2 px-3 text-right">MwSt.</th>
                  <th className="py-2 px-3 text-right rounded-r-md">Gesamt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {invoice.items.map((item, index) => {
                  const lineTotal = calculateLineTotal(item);
                  return (
                    <tr key={item.id || index} className="border-b border-slate-100">
                      <td className="py-2.5 px-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {item.description || "Position ohne Beschreibung"}
                        {item.discountPercent > 0 && (
                          <span className="block text-[10px] text-emerald-600">
                            (inkl. {item.discountPercent}% Rabatt)
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap text-slate-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-2.5 px-3 text-right whitespace-nowrap text-slate-600">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-500">{item.taxPercent}%</td>
                      <td className="py-2.5 px-3 text-right font-semibold text-slate-800 whitespace-nowrap">
                        {formatCurrency(lineTotal, invoice.currency)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Totals Summary */}
            <div className="flex justify-end mb-8">
              <div className="w-full sm:w-72 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-600">
                  <span>Nettobetrag (Zwischensumme):</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>

                {itemDiscountsTotal > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Artikelrabatt:</span>
                    <span>-{formatCurrency(itemDiscountsTotal, invoice.currency)}</span>
                  </div>
                )}

                {extraDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Zusatzrabatt:</span>
                    <span>-{formatCurrency(extraDiscount, invoice.currency)}</span>
                  </div>
                )}

                {shipping > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Versandkosten:</span>
                    <span>{formatCurrency(shipping, invoice.currency)}</span>
                  </div>
                )}

                {taxBreakdown.map((tax) => (
                  <div key={tax.rate} className="flex justify-between text-slate-500">
                    <span>zzgl. {tax.rate}% MwSt.:</span>
                    <span>{formatCurrency(tax.taxAmount, invoice.currency)}</span>
                  </div>
                ))}

                <div
                  className="flex justify-between items-center pt-2 border-t-2 text-sm font-bold text-slate-900 mt-2"
                  style={{ borderColor: accentColor }}
                >
                  <span>Gesamtbetrag:</span>
                  <span style={{ color: accentColor }}>
                    {formatCurrency(grandTotal, invoice.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            {(invoice.notes || invoice.terms) && (
              <div className="mb-6 rounded-lg bg-slate-50 p-4 border border-slate-100 text-[11px] space-y-2">
                {invoice.notes && (
                  <p className="text-slate-700 font-medium">{invoice.notes}</p>
                )}
                {invoice.terms && (
                  <p className="text-slate-500">{invoice.terms}</p>
                )}
              </div>
            )}
          </div>

          {/* Modern Footer: Bank & Company */}
          <div className="border-t border-slate-200 pt-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] text-slate-500">
            <div>
              <p className="font-semibold text-slate-700 mb-0.5">Bankverbindung</p>
              <p>{invoice.payment.bankName}</p>
              <p className="font-mono">IBAN: {invoice.payment.iban}</p>
              {invoice.payment.bic && <p className="font-mono">BIC: {invoice.payment.bic}</p>}
            </div>
            <div>
              <p className="font-semibold text-slate-700 mb-0.5">Zahlungshinweis</p>
              <p>{invoice.payment.paymentNotice || `Rechnungs-Nr. ${invoice.invoiceNumber}`}</p>
              {invoice.payment.paypalEmail && <p>PayPal: {invoice.payment.paypalEmail}</p>}
            </div>
            <div className="sm:text-right">
              <p className="font-semibold text-slate-700 mb-0.5">{invoice.company.name}</p>
              {invoice.company.commercialRegister && <p>{invoice.company.commercialRegister}</p>}
              {invoice.company.taxId && <p>USt-IdNr.: {invoice.company.taxId}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MINIMAL TEMPLATE ----------------- */}
      {template === "minimal" && (
        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex justify-between items-start mb-8 pb-4 border-b border-slate-200">
              <div>
                {invoice.company.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={invoice.company.logoUrl}
                    alt={invoice.company.name}
                    className="max-h-12 max-w-[160px] object-contain mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-light text-slate-900 tracking-tight">
                    {invoice.company.name}
                  </h1>
                )}
                <p className="text-slate-400 text-[11px]">
                  {invoice.company.zipCode} {invoice.company.city} • {invoice.company.email}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  Rechnung
                </span>
                <span className="font-mono text-sm font-medium text-slate-900">
                  {invoice.invoiceNumber}
                </span>
                <p className="text-slate-400 text-[11px] mt-1">{invoice.issueDate}</p>
              </div>
            </div>

            {/* Recipient & Metadata Grid */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                  Empfänger
                </span>
                <p className="font-semibold text-slate-800 text-sm">
                  {invoice.client.companyName}
                </p>
                {invoice.client.contactPerson && (
                  <p className="text-slate-600 text-[11px]">{invoice.client.contactPerson}</p>
                )}
                <p className="text-slate-500 text-[11px]">{invoice.client.address}</p>
                <p className="text-slate-500 text-[11px]">
                  {invoice.client.zipCode} {invoice.client.city}
                </p>
              </div>

              <div className="text-right text-[11px] space-y-1 text-slate-500">
                <p>
                  <span className="text-slate-400">Zahlungsziel: </span>
                  {invoice.paymentTerms}
                </p>
                <p>
                  <span className="text-slate-400">Fällig am: </span>
                  {invoice.dueDate}
                </p>
                {invoice.client.taxId && (
                  <p>
                    <span className="text-slate-400">Kunden-USt-IdNr.: </span>
                    {invoice.client.taxId}
                  </p>
                )}
              </div>
            </div>

            {/* Minimal Items Table */}
            <table className="w-full text-left mb-6 text-[11px]">
              <thead>
                <tr className="border-b border-slate-300 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2 font-medium">Position</th>
                  <th className="py-2 text-right font-medium">Menge</th>
                  <th className="py-2 text-right font-medium">Preis</th>
                  <th className="py-2 text-right font-medium">MwSt</th>
                  <th className="py-2 text-right font-medium">Betrag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items.map((item, index) => {
                  const lineTotal = calculateLineTotal(item);
                  return (
                    <tr key={item.id || index}>
                      <td className="py-3 pr-2 text-slate-800">
                        <div className="font-medium">{item.description}</div>
                      </td>
                      <td className="py-3 text-right text-slate-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-3 text-right text-slate-600">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="py-3 text-right text-slate-400">{item.taxPercent}%</td>
                      <td className="py-3 text-right font-medium text-slate-900">
                        {formatCurrency(lineTotal, invoice.currency)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end mb-6">
              <div className="w-64 space-y-1.5 text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>Zwischensumme:</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>
                {taxBreakdown.map((tax) => (
                  <div key={tax.rate} className="flex justify-between text-slate-500">
                    <span>MwSt. {tax.rate}%:</span>
                    <span>{formatCurrency(tax.taxAmount, invoice.currency)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-semibold text-slate-900">
                  <span>Gesamt:</span>
                  <span>{formatCurrency(grandTotal, invoice.currency)}</span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <p className="text-slate-600 text-[11px] italic mb-6">{invoice.notes}</p>
            )}
          </div>

          {/* Minimal Footer */}
          <div className="border-t border-slate-200 pt-3 text-[10px] text-slate-400 flex justify-between">
            <span>IBAN: {invoice.payment.iban}</span>
            <span>BIC: {invoice.payment.bic}</span>
            <span>{invoice.company.name}</span>
          </div>
        </div>
      )}

      {/* ----------------- CLASSIC TEMPLATE (DIN 5008 STYLE) ----------------- */}
      {template === "classic" && (
        <div className="flex-1 flex flex-col justify-between font-serif">
          <div>
            {/* Header: DIN-Style Sender Line */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[9px] text-slate-400 underline decoration-slate-300 mb-2">
                  {invoice.company.name} • {invoice.company.address} • {invoice.company.zipCode}{" "}
                  {invoice.company.city}
                </p>
                <div className="mt-4 text-xs font-sans text-slate-800">
                  <p className="font-bold">{invoice.client.companyName}</p>
                  {invoice.client.contactPerson && <p>z. Hd. {invoice.client.contactPerson}</p>}
                  <p>{invoice.client.address}</p>
                  <p>
                    {invoice.client.zipCode} {invoice.client.city}
                  </p>
                </div>
              </div>

              <div className="text-right text-[11px] font-sans text-slate-600 space-y-1">
                {invoice.company.logoUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={invoice.company.logoUrl}
                    alt={invoice.company.name}
                    className="max-h-12 max-w-[140px] object-contain ml-auto mb-2"
                  />
                )}
                <p className="font-semibold text-slate-800">{invoice.company.name}</p>
                <p>{invoice.company.email}</p>
                <p>{invoice.company.phone}</p>
                <p>Datum: {invoice.issueDate}</p>
              </div>
            </div>

            {/* Document Title */}
            <div className="my-6 border-b-2 border-slate-800 pb-2 font-sans">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Rechnung Nr. {invoice.invoiceNumber}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Fälligkeitsdatum: {invoice.dueDate} | Zahlungsziel: {invoice.paymentTerms}
              </p>
            </div>

            {/* Classic Table */}
            <table className="w-full text-left mb-6 text-[11px] font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-800 font-bold text-slate-900">
                  <th className="py-2 px-2">Pos.</th>
                  <th className="py-2 px-2">Bezeichnung</th>
                  <th className="py-2 px-2 text-right">Menge</th>
                  <th className="py-2 px-2 text-right">Einzelpreis</th>
                  <th className="py-2 px-2 text-right">USt.</th>
                  <th className="py-2 px-2 text-right">Gesamt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoice.items.map((item, index) => {
                  const lineTotal = calculateLineTotal(item);
                  return (
                    <tr key={item.id || index}>
                      <td className="py-2 px-2 text-slate-500">{index + 1}</td>
                      <td className="py-2 px-2 text-slate-800">{item.description}</td>
                      <td className="py-2 px-2 text-right text-slate-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-2 px-2 text-right text-slate-600">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="py-2 px-2 text-right text-slate-600">{item.taxPercent}%</td>
                      <td className="py-2 px-2 text-right font-medium text-slate-900">
                        {formatCurrency(lineTotal, invoice.currency)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Classic Totals */}
            <div className="flex justify-end mb-6 font-sans">
              <div className="w-72 space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-700">
                  <span>Zwischensumme netto:</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>
                {taxBreakdown.map((t) => (
                  <div key={t.rate} className="flex justify-between text-slate-600">
                    <span>Umsatzsteuer ({t.rate}%):</span>
                    <span>{formatCurrency(t.taxAmount, invoice.currency)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-sm text-slate-900">
                  <span>Rechnungsbetrag brutto:</span>
                  <span>{formatCurrency(grandTotal, invoice.currency)}</span>
                </div>
              </div>
            </div>

            {/* Classic Notes */}
            <div className="text-[11px] font-sans text-slate-600 space-y-2 mb-6">
              {invoice.notes && <p>{invoice.notes}</p>}
              {invoice.terms && <p>{invoice.terms}</p>}
            </div>
          </div>

          {/* Classic 3-Column Footer */}
          <div className="border-t border-slate-300 pt-3 grid grid-cols-3 gap-4 text-[9px] font-sans text-slate-500">
            <div>
              <p className="font-bold text-slate-700">{invoice.company.name}</p>
              <p>{invoice.company.address}</p>
              <p>
                {invoice.company.zipCode} {invoice.company.city}
              </p>
            </div>
            <div>
              <p className="font-bold text-slate-700">Bankverbindung</p>
              <p>{invoice.payment.bankName}</p>
              <p>IBAN: {invoice.payment.iban}</p>
              <p>BIC: {invoice.payment.bic}</p>
            </div>
            <div>
              <p className="font-bold text-slate-700">Steuer & Register</p>
              <p>Steuernummer: {invoice.company.taxId}</p>
              <p>{invoice.company.commercialRegister}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
