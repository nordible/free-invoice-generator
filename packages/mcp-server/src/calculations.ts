import { CurrencyCode, InvoiceItem } from "./types.js";

export interface TaxBreakdown {
  rate: number;
  taxableAmount: number;
  taxAmount: number;
}

export interface InvoiceCalculations {
  subtotal: number;
  itemDiscountsTotal: number;
  extraDiscount: number;
  shipping: number;
  totalTax: number;
  taxBreakdown: TaxBreakdown[];
  grandTotal: number;
}

export function calculateLineTotal(item: InvoiceItem): number {
  const base = (item.quantity || 0) * (item.unitPrice || 0);
  const discountMultiplier = Math.max(0, 1 - (item.discountPercent || 0) / 100);
  return base * discountMultiplier;
}

export function calculateInvoice(
  items: InvoiceItem[],
  shipping = 0,
  extraDiscount = 0
): InvoiceCalculations {
  let subtotal = 0;
  let itemDiscountsTotal = 0;
  const taxesByRate: Record<number, { taxableAmount: number; taxAmount: number }> = {};

  items.forEach((item) => {
    const rawLine = (item.quantity || 0) * (item.unitPrice || 0);
    const lineDiscount = rawLine * ((item.discountPercent || 0) / 100);
    const lineTotal = rawLine - lineDiscount;

    itemDiscountsTotal += lineDiscount;
    subtotal += lineTotal;

    const rate = item.taxPercent || 0;
    const lineTax = lineTotal * (rate / 100);

    if (!taxesByRate[rate]) {
      taxesByRate[rate] = { taxableAmount: 0, taxAmount: 0 };
    }
    taxesByRate[rate].taxableAmount += lineTotal;
    taxesByRate[rate].taxAmount += lineTax;
  });

  const taxBreakdown: TaxBreakdown[] = Object.keys(taxesByRate)
    .map(Number)
    .sort((a, b) => b - a)
    .map((rate) => ({
      rate,
      taxableAmount: taxesByRate[rate].taxableAmount,
      taxAmount: taxesByRate[rate].taxAmount,
    }));

  const totalTax = taxBreakdown.reduce((sum, t) => sum + t.taxAmount, 0);
  const grandTotal = Math.max(0, subtotal - (extraDiscount || 0) + (shipping || 0) + totalTax);

  return {
    subtotal,
    itemDiscountsTotal,
    extraDiscount: extraDiscount || 0,
    shipping: shipping || 0,
    totalTax,
    taxBreakdown,
    grandTotal,
  };
}

export function formatCurrency(amount: number, currency: CurrencyCode = "EUR"): string {
  const symbols: Record<CurrencyCode, string> = {
    EUR: "€",
    USD: "$",
    GBP: "£",
    CHF: "CHF",
    CAD: "CA$",
    AUD: "AU$",
    JPY: "¥",
  };

  const symbol = symbols[currency] || currency;
  const formatted = amount.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${formatted} ${symbol}`;
}
