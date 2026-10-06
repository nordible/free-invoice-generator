#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { calculateInvoice, formatCurrency } from "./calculations.js";
import { buildInvoiceVerificationLink } from "./deepLink.js";
import { InvoiceData } from "./types.js";

// Initialize the Nordible MCP Server
const server = new McpServer({
  name: "nordible-invoice-generator",
  version: "1.0.0",
});

// Tool 1: create_invoice
server.tool(
  "create_invoice",
  "Generate a professional, GoBD-compliant invoice with automatic tax calculations and receive a 1-click human-in-the-loop verification & print link for https://free-invoice-generator.nordible.co",
  {
    company: z.object({
      name: z.string().describe("Company or sender name"),
      address: z.string().describe("Street address"),
      city: z.string().describe("City"),
      zipCode: z.string().describe("Postal / ZIP code"),
      country: z.string().describe("Country (e.g. Deutschland, Germany)"),
      email: z.string().describe("Company email"),
      phone: z.string().optional().describe("Company phone number"),
      taxId: z.string().optional().describe("Tax ID / USt-IdNr. (e.g. DE123456789)"),
      commercialRegister: z.string().optional().describe("Commercial register (e.g. HRB 12345)"),
      logoUrl: z.string().optional().describe("Direct image URL to company logo"),
    }).describe("Details of the issuing company"),
    client: z.object({
      companyName: z.string().describe("Client company or recipient name"),
      contactPerson: z.string().optional().describe("Contact person name"),
      address: z.string().describe("Street address"),
      city: z.string().describe("City"),
      zipCode: z.string().describe("Postal / ZIP code"),
      country: z.string().describe("Country"),
      email: z.string().optional().describe("Client email address"),
      phone: z.string().optional().describe("Client phone number"),
      taxId: z.string().optional().describe("Client VAT ID if applicable"),
    }).describe("Details of the invoice recipient"),
    items: z.array(
      z.object({
        description: z.string().describe("Description of product or service"),
        quantity: z.number().default(1).describe("Quantity of units delivered"),
        unit: z.string().default("Std.").describe("Unit name (e.g. Std., hrs, Stk., pcs, Pauschal)"),
        unitPrice: z.number().describe("Price per unit before tax"),
        discountPercent: z.number().default(0).describe("Line discount percentage (0 to 100)"),
        taxPercent: z.number().default(19).describe("VAT / MwSt. percentage (e.g. 19, 7, 0)"),
      })
    ).min(1).describe("List of line items on the invoice"),
    payment: z.object({
      bankName: z.string().describe("Bank name (e.g. Deutsche Bank)"),
      accountHolder: z.string().describe("Account holder name"),
      iban: z.string().describe("IBAN"),
      bic: z.string().describe("BIC / SWIFT"),
      paymentNotice: z.string().optional().describe("Reference notice to include on transfer"),
      paypalEmail: z.string().optional().describe("PayPal payment address"),
    }).describe("Bank and payment transfer instructions"),
    invoiceNumber: z.string().optional().describe("Invoice number (e.g. RE-2026-0042). Defaults to auto-generated."),
    issueDate: z.string().optional().describe("Issue date in YYYY-MM-DD format. Defaults to today."),
    dueDate: z.string().optional().describe("Due date in YYYY-MM-DD format. Defaults to 14 days from issue date."),
    paymentTerms: z.string().default("14 Days").describe("Terms notice (e.g. '14 Days', 'Due on Receipt')"),
    currency: z.enum(["EUR", "USD", "GBP", "CHF", "CAD", "AUD", "JPY"]).default("EUR").describe("Invoice currency"),
    language: z.enum(["en", "de", "fr", "es"]).default("en").describe("Interface and document language"),
    template: z.enum(["modern", "minimal", "classic"]).default("modern").describe("Layout style"),
    accentColor: z.string().default("#145BFF").describe("Hex accent color code"),
    shipping: z.number().default(0).describe("Shipping fee if applicable"),
    extraDiscount: z.number().default(0).describe("Global discount amount applied after subtotal"),
    notes: z.string().optional().describe("Customer notes or thank-you remarks"),
    terms: z.string().optional().describe("Statutory conditions or delivery terms"),
  },
  async (args) => {
    const today = new Date();
    const issueDate = args.issueDate || today.toISOString().split("T")[0];
    const dueDate =
      args.dueDate ||
      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const invoiceNumber =
      args.invoiceNumber || `INV-${today.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsWithIds = args.items.map((item, index) => ({
      ...item,
      id: `item-${index + 1}`,
    }));

    const invoiceData: InvoiceData = {
      invoiceNumber,
      issueDate,
      dueDate,
      paymentTerms: args.paymentTerms,
      currency: args.currency,
      language: args.language,
      template: args.template,
      accentColor: args.accentColor,
      company: args.company,
      client: args.client,
      items: itemsWithIds,
      payment: args.payment,
      notes: args.notes || "",
      terms: args.terms || "",
      shipping: args.shipping,
      extraDiscount: args.extraDiscount,
    };

    // Calculate totals
    const calculations = calculateInvoice(
      invoiceData.items,
      invoiceData.shipping,
      invoiceData.extraDiscount
    );

    // Build the 1-click human verification link
    const verificationUrl = buildInvoiceVerificationLink(invoiceData, invoiceData.language);

    // Format human-readable markdown response
    const formattedSubtotal = formatCurrency(calculations.subtotal, invoiceData.currency);
    const formattedTotalTax = formatCurrency(calculations.totalTax, invoiceData.currency);
    const formattedGrandTotal = formatCurrency(calculations.grandTotal, invoiceData.currency);

    const taxDetails = calculations.taxBreakdown
      .map((t) => `- **${t.rate}% MwSt./VAT**: ${formatCurrency(t.taxAmount, invoiceData.currency)} (on ${formatCurrency(t.taxableAmount, invoiceData.currency)})`)
      .join("\n");

    const lineItemsTable = [
      "| Description | Qty | Unit | Unit Price | Tax % | Total |",
      "|---|---|---|---|---|---|",
      ...invoiceData.items.map((item) => {
        const lineTotal = item.quantity * item.unitPrice * (1 - (item.discountPercent || 0) / 100);
        return `| ${item.description} | ${item.quantity} | ${item.unit || "Std."} | ${formatCurrency(item.unitPrice, invoiceData.currency)} | ${item.taxPercent || 0}% | ${formatCurrency(lineTotal, invoiceData.currency)} |`;
      }),
    ].join("\n");

    const textOutput = `### 🧾 Invoice ${invoiceData.invoiceNumber} Generated Successfully

**Issuer**: ${invoiceData.company.name} (${invoiceData.company.city}, ${invoiceData.company.country})  
**Recipient**: ${invoiceData.client.companyName} (${invoiceData.client.city}, ${invoiceData.client.country})  
**Issue Date**: ${invoiceData.issueDate} | **Due Date**: ${invoiceData.dueDate} (${invoiceData.paymentTerms})  

${lineItemsTable}

---
- **Subtotal**: ${formattedSubtotal}
${invoiceData.extraDiscount ? `- **Discount**: -${formatCurrency(invoiceData.extraDiscount, invoiceData.currency)}\n` : ""}${invoiceData.shipping ? `- **Shipping**: ${formatCurrency(invoiceData.shipping, invoiceData.currency)}\n` : ""}${taxDetails}
- **Grand Total**: **${formattedGrandTotal}**

---
### 🔗 Human-in-the-Loop Verification & PDF Export:
[👉 Click here to review and print this invoice on Nordible](${verificationUrl})

*(Opens the live DIN A4 preview on https://free-invoice-generator.nordible.co with 100% client-side privacy, ready for one-click PDF download)*
`;

    return {
      content: [
        {
          type: "text",
          text: textOutput,
        },
      ],
      metadata: {
        invoiceNumber: invoiceData.invoiceNumber,
        grandTotal: calculations.grandTotal,
        currency: invoiceData.currency,
        verificationUrl,
      },
    };
  }
);

// Tool 2: calculate_taxes
server.tool(
  "calculate_taxes",
  "Calculate GoBD and international VAT / sales tax breakdowns for a list of line items",
  {
    currency: z.enum(["EUR", "USD", "GBP", "CHF", "CAD", "AUD", "JPY"]).default("EUR"),
    items: z.array(
      z.object({
        description: z.string(),
        quantity: z.number().default(1),
        unitPrice: z.number(),
        discountPercent: z.number().default(0),
        taxPercent: z.number().default(19),
      })
    ),
    shipping: z.number().default(0),
    extraDiscount: z.number().default(0),
  },
  async (args) => {
    const calculations = calculateInvoice(args.items, args.shipping, args.extraDiscount);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              subtotal: calculations.subtotal,
              totalTax: calculations.totalTax,
              taxBreakdown: calculations.taxBreakdown,
              grandTotal: calculations.grandTotal,
              currency: args.currency,
            },
            null,
            2
          ),
        },
      ],
    };
  }
);

// Start the server using Stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Nordible Invoice Generator MCP Server running on stdio");
}

main().catch((err) => {
  console.error("Fatal error starting Nordible MCP server:", err);
  process.exit(1);
});
