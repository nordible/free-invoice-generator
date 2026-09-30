import { CompanyDetails, InvoiceData } from "@/types/invoice";
import { INITIAL_INVOICE } from "./constants";

const INVOICE_STORAGE_KEY = "nordible_invoice_draft";
const COMPANY_STORAGE_KEY = "nordible_saved_company";

export function loadSavedInvoice(): InvoiceData {
  if (typeof window === "undefined") return INITIAL_INVOICE;
  try {
    const raw = localStorage.getItem(INVOICE_STORAGE_KEY);
    if (!raw) return INITIAL_INVOICE;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_INVOICE,
      ...parsed,
      company: {
        ...INITIAL_INVOICE.company,
        ...(parsed.company || {}),
        logoUrl: parsed.company?.logoUrl ?? INITIAL_INVOICE.company.logoUrl,
      },
    };
  } catch {
    return INITIAL_INVOICE;
  }
}

export function saveInvoiceToStorage(invoice: InvoiceData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INVOICE_STORAGE_KEY, JSON.stringify(invoice));
    if (invoice.company) {
      localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(invoice.company));
    }
  } catch (e) {
    console.warn("Konnte Daten nicht im Browser speichern:", e);
  }
}

export function loadSavedCompany(): CompanyDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COMPANY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearInvoiceStorage(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(INVOICE_STORAGE_KEY);
  } catch (e) {
    console.warn(e);
  }
}
