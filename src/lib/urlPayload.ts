import { InvoiceData } from "@/types/invoice";
import { INITIAL_INVOICE } from "./constants";

/**
 * Safely encodes invoice data into a URL-safe Base64 string (UTF-8 compatible).
 */
export function encodeInvoicePayload(invoice: Partial<InvoiceData>): string {
  try {
    const json = JSON.stringify(invoice);
    if (typeof window !== "undefined" && typeof window.btoa === "function") {
      const bytes = new TextEncoder().encode(json);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    } else if (typeof Buffer !== "undefined") {
      return Buffer.from(json, "utf-8").toString("base64");
    }
    return encodeURIComponent(json);
  } catch (err) {
    console.warn("Failed to encode invoice payload:", err);
    return "";
  }
}

/**
 * Safely decodes an invoice payload from a Base64 string, URL-encoded string, or raw JSON.
 */
export function decodeInvoicePayload(raw: string): Partial<InvoiceData> | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();

  // 1. Try URL-encoded or raw JSON directly
  if (trimmed.startsWith("{") || trimmed.startsWith("%7B")) {
    try {
      const decoded = decodeURIComponent(trimmed);
      const parsed = JSON.parse(decoded);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as Partial<InvoiceData>;
      }
    } catch {
      // Continue to Base64 attempt
    }
  }

  // 2. Try Base64 decoding with UTF-8 support
  try {
    const base64 = trimmed.replace(/-/g, "+").replace(/_/g, "/");
    let jsonStr = "";
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      jsonStr = new TextDecoder().decode(bytes);
    } else if (typeof Buffer !== "undefined") {
      jsonStr = Buffer.from(base64, "base64").toString("utf-8");
    }

    if (jsonStr) {
      const parsed = JSON.parse(jsonStr);
      if (typeof parsed === "object" && parsed !== null) {
        return parsed as Partial<InvoiceData>;
      }
    }
  } catch {
    // Continue to fallback
  }

  // 3. Fallback: try raw decodeURIComponent
  try {
    const parsed = JSON.parse(decodeURIComponent(trimmed));
    if (typeof parsed === "object" && parsed !== null) {
      return parsed as Partial<InvoiceData>;
    }
  } catch {
    // Parsing failed
  }

  return null;
}

/**
 * Parses the current window URL hash or search parameters for agent-provided invoice payloads.
 * Supports:
 *   #data=<payload>
 *   #invoice=<payload>
 *   ?data=<payload>
 *   ?invoice=<payload>
 */
export function parseUrlInvoicePayload(): Partial<InvoiceData> | null {
  if (typeof window === "undefined") return null;

  try {
    let payload = "";

    // 1. Check URL hash first (privacy-first: hash is never sent to servers)
    if (window.location.hash && window.location.hash.length > 1) {
      const hashStr = window.location.hash.substring(1);
      const params = new URLSearchParams(hashStr);
      payload = params.get("data") || params.get("invoice") || "";

      // If no query-style param in hash, check if entire hash is the payload
      if (!payload && (hashStr.startsWith("ey") || hashStr.startsWith("%7B") || hashStr.startsWith("{"))) {
        payload = hashStr;
      }
    }

    // 2. Check query search params if hash was empty
    if (!payload && window.location.search) {
      const searchParams = new URLSearchParams(window.location.search);
      payload = searchParams.get("data") || searchParams.get("invoice") || "";
    }

    if (!payload) return null;

    return decodeInvoicePayload(payload);
  } catch (err) {
    console.warn("Failed to parse URL invoice payload:", err);
    return null;
  }
}

/**
 * Merges an agent's partial or full invoice payload into standard InvoiceData with fallbacks.
 */
export function mergeWithDefaultInvoice(
  imported: Partial<InvoiceData>,
  defaultLang = "en"
): InvoiceData {
  return {
    ...INITIAL_INVOICE,
    ...imported,
    company: {
      ...INITIAL_INVOICE.company,
      ...(imported.company || {}),
    },
    client: {
      ...INITIAL_INVOICE.client,
      ...(imported.client || {}),
    },
    payment: {
      ...INITIAL_INVOICE.payment,
      ...(imported.payment || {}),
    },
    items:
      Array.isArray(imported.items) && imported.items.length > 0
        ? imported.items.map((item, index) => ({
            id: item.id || `item-${index + 1}`,
            description: item.description || "",
            quantity: typeof item.quantity === "number" ? item.quantity : 1,
            unit: item.unit || (defaultLang === "de" ? "Std." : "hrs"),
            unitPrice: typeof item.unitPrice === "number" ? item.unitPrice : 0,
            discountPercent: typeof item.discountPercent === "number" ? item.discountPercent : 0,
            taxPercent: typeof item.taxPercent === "number" ? item.taxPercent : 10,
          }))
        : INITIAL_INVOICE.items,
    language: (imported.language as InvoiceData["language"]) || (defaultLang as InvoiceData["language"]),
    accentColor: imported.accentColor || INITIAL_INVOICE.accentColor,
    template: imported.template || INITIAL_INVOICE.template,
  };
}

/**
 * Builds a shareable / agent-callable deep link for an invoice.
 */
export function buildInvoiceDeepLink(
  invoice: Partial<InvoiceData>,
  lang = "en",
  baseUrl?: string
): string {
  const base = baseUrl || (typeof window !== "undefined" ? window.location.origin : "https://free-invoice-generator.nordible.co");
  const payload = encodeInvoicePayload(invoice);
  return `${base}/${lang}/generator#data=${payload}`;
}
