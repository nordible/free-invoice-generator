import { CurrencyCode, CurrencyConfig, InvoiceData } from "@/types/invoice";

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  EUR: { code: "EUR", symbol: "€", label: "Euro (€)" },
  USD: { code: "USD", symbol: "$", label: "US Dollar ($)" },
  GBP: { code: "GBP", symbol: "£", label: "Britisches Pfund (£)" },
  CHF: { code: "CHF", symbol: "CHF", label: "Schweizer Franken (CHF)" },
  CAD: { code: "CAD", symbol: "CA$", label: "Kanadischer Dollar (CA$)" },
  AUD: { code: "AUD", symbol: "AU$", label: "Australischer Dollar (AU$)" },
  JPY: { code: "JPY", symbol: "¥", label: "Japanischer Yen (¥)" },
};

export const PAYMENT_TERMS_OPTIONS = [
  { value: "Due on Receipt", label: "Fällig bei Erhalt" },
  { value: "7 Days", label: "Zahlbar innerhalb von 7 Tagen" },
  { value: "14 Days", label: "Zahlbar innerhalb von 14 Tagen" },
  { value: "30 Days", label: "Zahlbar innerhalb von 30 Tagen" },
  { value: "Custom", label: "Individuell" },
];

export const ACCENT_COLORS = [
  { label: "Nordible Blau", value: "#145BFF" },
  { label: "Nordible Dunkelblau", value: "#0D2B75" },
  { label: "Nordible Orange", value: "#FF9F1A" },
  { label: "Smaragdgrün", value: "#059669" },
  { label: "Graphit", value: "#334155" },
  { label: "Purpur", value: "#7c3aed" },
];

export const COMMON_UNITS = [
  "Std.",
  "Stk.",
  "Tag(e)",
  "Pauschal",
  "Monat(e)",
  "m²",
  "km",
];

export const INITIAL_INVOICE: InvoiceData = {
  invoiceNumber: "RE-2026-0042",
  issueDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  paymentTerms: "14 Days",
  currency: "EUR",
  company: {
    name: "Nordible Technologies GmbH",
    logoUrl: "/images/logos/nordible-logo.png",
    address: "Friedrichstraße 123",
    city: "Berlin",
    zipCode: "10117",
    country: "Deutschland",
    email: "billing@nordible.com",
    phone: "+49 30 12345678",
    website: "https://nordible.com",
    taxId: "DE314159265",
    commercialRegister: "HRB 98765 B (Amtsgericht Charlottenburg)",
  },
  client: {
    companyName: "Musterfirma GmbH & Co. KG",
    contactPerson: "Max Mustermann",
    address: "Hauptstraße 45",
    city: "München",
    zipCode: "80331",
    country: "Deutschland",
    email: "buchhaltung@musterfirma.de",
    phone: "+49 89 98765432",
    taxId: "DE123456789",
  },
  items: [
    {
      id: "item-1",
      description: "Full-Stack Webanwendungsentwicklung (Next.js & TypeScript)",
      quantity: 32,
      unit: "Std.",
      unitPrice: 130,
      discountPercent: 0,
      taxPercent: 19,
    },
    {
      id: "item-2",
      description: "UI/UX Konzeption & Design System Umsetzung",
      quantity: 16,
      unit: "Std.",
      unitPrice: 125,
      discountPercent: 5,
      taxPercent: 19,
    },
    {
      id: "item-3",
      description: "Cloud-Infrastruktur, CI/CD Pipeline & Monitoring Setup",
      quantity: 1,
      unit: "Pauschal",
      unitPrice: 450,
      discountPercent: 0,
      taxPercent: 19,
    },
  ],
  payment: {
    bankName: "Berliner Sparkasse",
    accountHolder: "Nordible Technologies GmbH",
    iban: "DE89 1005 0000 1234 5678 90",
    bic: "BELADEBEXXX",
    paymentNotice: "Bitte geben Sie als Verwendungszweck RE-2026-0042 an.",
    paypalEmail: "billing@nordible.com",
  },
  notes: "Vielen Dank für die partnerschaftliche Zusammenarbeit!",
  terms: "Zahlungsziel: 14 Tage netto ohne Abzug. Es gelten unsere allgemeinen Geschäftsbedingungen (AGB).",
  shipping: 0,
  extraDiscount: 0,
  accentColor: "#145BFF",
  template: "modern",
};
