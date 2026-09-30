"use client";

import React from "react";
import { InvoiceData } from "@/types/invoice";
import { calculateInvoice, calculateLineTotal, formatCurrency } from "@/lib/calculations";
import { TRANSLATIONS } from "@/lib/i18n";

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

  const { template, accentColor, language = "en" } = invoice;
  const t = (TRANSLATIONS[language] || TRANSLATIONS.en).invoice;

  return (
    <div
      id={containerId}
      className={`print-container relative mx-auto w-full max-w-[800px] min-h-[1050px] bg-white text-slate-800 shadow-xl rounded-2xl p-8 sm:p-12 transition-all flex flex-col justify-between text-xs leading-relaxed border border-[#E8ECF4]`}
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
              className="h-2.5 w-full rounded-t-sm mb-6"
              style={{ backgroundColor: accentColor }}
            />

            {/* Header: Company & Invoice Info */}
            <div className="flex justify-between items-start border-b border-[#E8ECF4] pb-6 mb-6">
              <div className="space-y-1">
                {invoice.company.logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={invoice.company.logoUrl}
                    alt={invoice.company.name}
                    className="max-h-14 max-w-[180px] object-contain mb-2"
                  />
                ) : (
                  <h1 className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                    {invoice.company.name || "Your Company Name"}
                  </h1>
                )}
                <div className="text-slate-500 text-[11px] leading-tight space-y-0.5">
                  <p>{invoice.company.address}</p>
                  <p>
                    {invoice.company.zipCode} {invoice.company.city}
                    {invoice.company.country ? `, ${invoice.company.country}` : ""}
                  </p>
                  {invoice.company.email && <p>Email: {invoice.company.email}</p>}
                  {invoice.company.phone && <p>Tel: {invoice.company.phone}</p>}
                  {invoice.company.taxId && <p>Tax ID: {invoice.company.taxId}</p>}
                </div>
              </div>

              <div className="text-right space-y-1">
                <span
                  className="inline-block text-2xl font-black tracking-wider uppercase font-heading"
                  style={{ color: accentColor }}
                >
                  {t.invoiceDocTitle}
                </span>
                <p className="font-mono text-sm font-semibold text-slate-800">
                  {invoice.invoiceNumber || "INV-2026-0001"}
                </p>
                <div className="text-slate-500 text-[11px] space-y-0.5 pt-1">
                  <p>
                    <span className="font-medium text-slate-700">{t.date}: </span>
                    {invoice.issueDate}
                  </p>
                  <p>
                    <span className="font-medium text-slate-700">{t.dueDate}: </span>
                    {invoice.dueDate}
                  </p>
                  {invoice.paymentTerms && (
                    <p>
                      <span className="font-medium text-slate-700">{t.terms}: </span>
                      {invoice.paymentTerms}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Recipient */}
            <div className="mb-8">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                {t.billTo}
              </span>
              <div className="text-slate-800 font-bold text-sm">
                {invoice.client.companyName || "Client Name"}
              </div>
              {invoice.client.contactPerson && (
                <div className="text-slate-600 text-[11px]">
                  Attn: {invoice.client.contactPerson}
                </div>
              )}
              <div className="text-slate-500 text-[11px] mt-0.5">
                <p>{invoice.client.address}</p>
                <p>
                  {invoice.client.zipCode} {invoice.client.city}
                  {invoice.client.country ? `, ${invoice.client.country}` : ""}
                </p>
                {invoice.client.taxId && <p className="mt-1">Tax ID: {invoice.client.taxId}</p>}
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full text-left mb-6">
              <thead>
                <tr
                  className="text-[11px] font-semibold text-white uppercase tracking-wider"
                  style={{ backgroundColor: accentColor }}
                >
                  <th className="py-2.5 px-3 rounded-l-lg">{t.pos}</th>
                  <th className="py-2.5 px-3">{t.description}</th>
                  <th className="py-2.5 px-3 text-right">{t.qty}</th>
                  <th className="py-2.5 px-3 text-right">{t.price}</th>
                  <th className="py-2.5 px-3 text-right">{t.tax}</th>
                  <th className="py-2.5 px-3 text-right rounded-r-lg">{t.amount}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECF4] text-[11px]">
                {invoice.items.map((item, index) => {
                  const lineTotal = calculateLineTotal(item);
                  return (
                    <tr key={item.id || index} className="border-b border-slate-100">
                      <td className="py-3 px-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="py-3 px-3 font-medium text-slate-800">
                        {item.description || "Line item description"}
                        {item.discountPercent > 0 && (
                          <span className="block text-[10px] text-emerald-600">
                            (incl. {item.discountPercent}% discount)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap text-slate-600">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap text-slate-600">
                        {formatCurrency(item.unitPrice, invoice.currency)}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-500">{item.taxPercent}%</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-800 whitespace-nowrap">
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
                  <span>{t.subtotal}:</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>

                {itemDiscountsTotal > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>{t.itemDiscount}:</span>
                    <span>-{formatCurrency(itemDiscountsTotal, invoice.currency)}</span>
                  </div>
                )}

                {extraDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>{t.extraDiscount}:</span>
                    <span>-{formatCurrency(extraDiscount, invoice.currency)}</span>
                  </div>
                )}

                {shipping > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>{t.shipping}:</span>
                    <span>{formatCurrency(shipping, invoice.currency)}</span>
                  </div>
                )}

                {taxBreakdown.map((tax) => (
                  <div key={tax.rate} className="flex justify-between text-slate-500">
                    <span>{t.taxVat} ({tax.rate}%):</span>
                    <span>{formatCurrency(tax.taxAmount, invoice.currency)}</span>
                  </div>
                ))}

                <div
                  className="flex justify-between items-center pt-2.5 border-t-2 text-sm font-extrabold text-slate-900 mt-2 font-heading"
                  style={{ borderColor: accentColor }}
                >
                  <span>{t.grandTotal}:</span>
                  <span style={{ color: accentColor }}>
                    {formatCurrency(grandTotal, invoice.currency)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes & Terms */}
            {(invoice.notes || invoice.terms) && (
              <div className="mb-6 rounded-xl bg-[#FAFBFF] p-4 border border-[#E8ECF4] text-[11px] space-y-2">
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
          <div className="border-t border-[#E8ECF4] pt-4 mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] text-slate-500">
            <div>
              <p className="font-bold text-[#0D2B75] mb-0.5">{t.bankDetails}</p>
              <p>{invoice.payment.bankName}</p>
              <p className="font-mono">IBAN / Acc: {invoice.payment.iban}</p>
              {invoice.payment.bic && <p className="font-mono">BIC / SWIFT: {invoice.payment.bic}</p>}
            </div>
            <div>
              <p className="font-bold text-[#0D2B75] mb-0.5">{t.paymentRef}</p>
              <p>{invoice.payment.paymentNotice || `${t.invoiceNo} ${invoice.invoiceNumber}`}</p>
              {invoice.payment.paypalEmail && <p>PayPal: {invoice.payment.paypalEmail}</p>}
            </div>
            <div className="sm:text-right">
              <p className="font-bold text-[#0D2B75] mb-0.5">{invoice.company.name}</p>
              {invoice.company.commercialRegister && <p>{invoice.company.commercialRegister}</p>}
              {invoice.company.taxId && <p>Tax ID: {invoice.company.taxId}</p>}
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
                  <h1 className="text-2xl font-light text-slate-900 tracking-tight font-heading">
                    {invoice.company.name}
                  </h1>
                )}
                <p className="text-slate-400 text-[11px]">
                  {invoice.company.zipCode} {invoice.company.city} • {invoice.company.email}
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs uppercase tracking-widest text-slate-400 block mb-1">
                  {t.invoiceDocTitle}
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
                  {t.billTo}
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
                  <span className="text-slate-400">{t.terms}: </span>
                  {invoice.paymentTerms}
                </p>
                <p>
                  <span className="text-slate-400">{t.dueDate}: </span>
                  {invoice.dueDate}
                </p>
                {invoice.client.taxId && (
                  <p>
                    <span className="text-slate-400">Tax ID: </span>
                    {invoice.client.taxId}
                  </p>
                )}
              </div>
            </div>

            {/* Minimal Items Table */}
            <table className="w-full text-left mb-6 text-[11px]">
              <thead>
                <tr className="border-b border-slate-300 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-2 font-medium">{t.description}</th>
                  <th className="py-2 text-right font-medium">{t.qty}</th>
                  <th className="py-2 text-right font-medium">{t.price}</th>
                  <th className="py-2 text-right font-medium">{t.tax}</th>
                  <th className="py-2 text-right font-medium">{t.amount}</th>
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
                  <span>{t.subtotal}:</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>
                {taxBreakdown.map((tax) => (
                  <div key={tax.rate} className="flex justify-between text-slate-500">
                    <span>{t.taxVat} ({tax.rate}%):</span>
                    <span>{formatCurrency(tax.taxAmount, invoice.currency)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2 border-t border-slate-800 text-sm font-semibold text-slate-900">
                  <span>{t.grandTotal}:</span>
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

      {/* ----------------- CLASSIC TEMPLATE ----------------- */}
      {template === "classic" && (
        <div className="flex-1 flex flex-col justify-between font-serif">
          <div>
            {/* Header: Sender Line */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-[9px] text-slate-400 underline decoration-slate-300 mb-2 font-sans">
                  {invoice.company.name} • {invoice.company.address} • {invoice.company.zipCode}{" "}
                  {invoice.company.city}
                </p>
                <div className="mt-4 text-xs font-sans text-slate-800">
                  <p className="font-bold">{invoice.client.companyName}</p>
                  {invoice.client.contactPerson && <p>Attn: {invoice.client.contactPerson}</p>}
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
                <p>{t.date}: {invoice.issueDate}</p>
              </div>
            </div>

            {/* Document Title */}
            <div className="my-6 border-b-2 border-slate-800 pb-2 font-sans">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-heading">
                {t.invoiceDocTitle} #{invoice.invoiceNumber}
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.dueDate}: {invoice.dueDate} | {t.terms}: {invoice.paymentTerms}
              </p>
            </div>

            {/* Classic Table */}
            <table className="w-full text-left mb-6 text-[11px] font-sans border-collapse">
              <thead>
                <tr className="border-b border-slate-800 font-bold text-slate-900">
                  <th className="py-2 px-2">{t.pos}</th>
                  <th className="py-2 px-2">{t.description}</th>
                  <th className="py-2 px-2 text-right">{t.qty}</th>
                  <th className="py-2 px-2 text-right">{t.price}</th>
                  <th className="py-2 px-2 text-right">{t.tax}</th>
                  <th className="py-2 px-2 text-right">{t.amount}</th>
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
                  <span>{t.subtotal}:</span>
                  <span>{formatCurrency(subtotal, invoice.currency)}</span>
                </div>
                {taxBreakdown.map((tx) => (
                  <div key={tx.rate} className="flex justify-between text-slate-600">
                    <span>{t.taxVat} ({tx.rate}%):</span>
                    <span>{formatCurrency(tx.taxAmount, invoice.currency)}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-slate-800 font-bold text-sm text-slate-900">
                  <span>{t.grandTotal}:</span>
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
              <p className="font-bold text-slate-700">{t.bankDetails}</p>
              <p>{invoice.payment.bankName}</p>
              <p>IBAN: {invoice.payment.iban}</p>
              <p>BIC: {invoice.payment.bic}</p>
            </div>
            <div>
              <p className="font-bold text-slate-700">Tax & Registration</p>
              <p>Tax ID: {invoice.company.taxId}</p>
              <p>{invoice.company.commercialRegister}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
