import { CurrencyCode, CurrencyConfig, InvoiceData } from "@/types/invoice";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", label: "US Dollar ($)" },
  EUR: { code: "EUR", symbol: "€", label: "Euro (€)" },
  GBP: { code: "GBP", symbol: "£", label: "British Pound (£)" },
  CHF: { code: "CHF", symbol: "CHF", label: "Swiss Franc (CHF)" },
  CAD: { code: "CAD", symbol: "CA$", label: "Canadian Dollar (CA$)" },
  AUD: { code: "AUD", symbol: "AU$", label: "Australian Dollar (AU$)" },
  JPY: { code: "JPY", symbol: "¥", label: "Japanese Yen (¥)" },
};

export const PAYMENT_TERMS_OPTIONS = [
  { value: "Due on Receipt", label: "Due on Receipt" },
  { value: "Net 7", label: "Net 7 Days" },
  { value: "Net 14", label: "Net 14 Days" },
  { value: "Net 30", label: "Net 30 Days" },
  { value: "Custom", label: "Custom Terms" },
];

export const ACCENT_COLORS = [
  { label: "Nordible Blue", value: "#145BFF" },
  { label: "Nordible Dark", value: "#0D2B75" },
  { label: "Nordible Orange", value: "#FF9F1A" },
  { label: "Emerald Green", value: "#059669" },
  { label: "Graphite Slate", value: "#334155" },
  { label: "Royal Purple", value: "#7c3aed" },
];

export const COMMON_UNITS = [
  "hrs",
  "pcs",
  "days",
  "fixed",
  "months",
  "Std.",
  "Stk.",
];

export const INITIAL_INVOICE: InvoiceData = {
  invoiceNumber: "INV-2026-0042",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  paymentTerms: "Net 14",
  currency: "USD",
  language: "en",
  company: {
    name: "Nordible Technologies Inc.",
    logoUrl: "/images/logos/nordible-logo.png",
    address: "548 Market Street, Suite 42000",
    city: "San Francisco",
    zipCode: "94104",
    country: "United States",
    email: "billing@nordible.com",
    phone: "+1 (415) 800-4290",
    website: "https://nordible.com",
    taxId: "US-84-2938102",
    commercialRegister: "DE State Reg #7829104",
  },
  client: {
    companyName: "Acme Global Solutions Corp.",
    contactPerson: "Alex Morgan",
    address: "742 Evergreen Terrace",
    city: "New York",
    zipCode: "10001",
    country: "United States",
    email: "ap@acmeglobal.com",
    phone: "+1 (212) 555-0199",
    taxId: "US-12-9847103",
  },
  items: [
    {
      id: "item-1",
      description: "Full-Stack Web Application Architecture & Engineering",
      quantity: 36,
      unit: "hrs",
      unitPrice: 140,
      discountPercent: 0,
      taxPercent: 10,
    },
    {
      id: "item-2",
      description: "UI/UX Design System, Component Library & Prototyping",
      quantity: 20,
      unit: "hrs",
      unitPrice: 125,
      discountPercent: 5,
      taxPercent: 10,
    },
    {
      id: "item-3",
      description: "Cloud Deployment, CI/CD Pipeline & Security Hardening",
      quantity: 1,
      unit: "fixed",
      unitPrice: 550,
      discountPercent: 0,
      taxPercent: 10,
    },
  ],
  payment: {
    bankName: "Silicon Valley Bank / First Republic",
    accountHolder: "Nordible Technologies Inc.",
    iban: "US89 SVBK 0000 1234 5678 90",
    bic: "SVBKUS6SXXX",
    paymentNotice: "Please include invoice number INV-2026-0042 in payment memo.",
    paypalEmail: "billing@nordible.com",
  },
  notes: "Thank you for your business and partnership! We look forward to working with you again.",
  terms: "Payment is due within 14 days of invoice date. Please submit remittance advice to billing@nordible.com.",
  shipping: 0,
  extraDiscount: 0,
  accentColor: "#145BFF",
  template: "modern",
};
