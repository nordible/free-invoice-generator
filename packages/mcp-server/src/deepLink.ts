import { InvoiceData } from "./types.js";

/**
 * Encodes invoice data to a URL-safe Base64 string.
 */
export function encodeInvoicePayload(invoice: Partial<InvoiceData>): string {
  try {
    const jsonStr = JSON.stringify(invoice);
    return Buffer.from(jsonStr, "utf-8").toString("base64");
  } catch (err) {
    console.error("Failed to encode invoice payload:", err);
    return "";
  }
}

/**
 * Builds a 1-click human verification and print link for Nordible Invoice Generator.
 */
export function buildInvoiceVerificationLink(
  invoice: Partial<InvoiceData>,
  lang: string = "en",
  baseUrl: string = "https://invoice.nordible.co"
): string {
  const payload = encodeInvoicePayload(invoice);
  return `${baseUrl}/${lang}/generator#data=${payload}`;
}
