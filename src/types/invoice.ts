export type CurrencyCode = "EUR" | "USD" | "GBP" | "CHF" | "CAD" | "AUD" | "JPY";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  label: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  discountPercent: number;
  taxPercent: number;
}

export interface CompanyDetails {
  name: string;
  logoUrl?: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  email: string;
  phone: string;
  website?: string;
  taxId?: string; // Steuernummer / USt-IdNr.
  commercialRegister?: string; // Handelsregister (z. B. HRB 12345)
}

export interface ClientDetails {
  companyName: string;
  contactPerson?: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  email?: string;
  phone?: string;
  taxId?: string;
}

export interface PaymentDetails {
  bankName: string;
  accountHolder: string;
  iban: string;
  bic: string;
  paymentNotice?: string;
  paypalEmail?: string;
}

export type TemplateId = "modern" | "minimal" | "classic";

export interface InvoiceData {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: CurrencyCode;
  company: CompanyDetails;
  client: ClientDetails;
  items: InvoiceItem[];
  payment: PaymentDetails;
  notes: string;
  terms: string;
  shipping: number;
  extraDiscount: number;
  accentColor: string;
  template: TemplateId;
}
