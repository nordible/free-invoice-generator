# Nordible Invoice Generator

## Product Requirements Document (PRD)

**Version:** 1.0

**Product Name:** Nordible Invoice Generator

**Target Platform:** Web Application

**Suggested URL:** `free-invoice-generator.nordible.co`

---

# 1. Overview

The Nordible Invoice Generator is a web-based application that enables businesses worldwide to create professional invoices quickly without requiring accounting software.

The application should support businesses of all sizes, be mobile-friendly, generate high-quality PDF invoices, and export invoice images suitable for sharing via email, messaging applications, and social media.

The system should not be tied to any country's invoicing format. Instead, it should provide flexible fields so users can customize invoices according to their local regulations.

---

# 2. Goals

The primary goals are:

* Generate professional invoices in under two minutes.
* Support international businesses.
* Produce print-ready PDFs.
* Export high-quality invoice images.
* Allow complete branding customization.
* Support multiple currencies.
* Support multiple languages.
* Keep the interface simple while allowing advanced customization.

---

# 3. Target Users

* Freelancers
* Consultants
* Agencies
* Software Companies
* Restaurants
* Retail Businesses
* Marketing Agencies
* Startups
* Small Businesses
* Enterprise Teams

---

# 4. Functional Requirements

## 4.1 Company Information

Fields:

* Company Name
* Logo
* Address
* City
* State / Province
* Postal Code
* Country
* Email
* Phone
* Website
* Business Registration Number (optional)
* Tax ID / VAT / GST Number (optional)

The company profile should be reusable for future invoices.

---

## 4.2 Customer Information

Fields:

* Company Name
* Contact Person (optional)
* Address
* City
* State
* Postal Code
* Country
* Email (optional)
* Phone (optional)
* Customer Tax ID (optional)

---

## 4.3 Invoice Details

Required:

* Invoice Number
* Invoice Date
* Due Date
* Currency
* Language
* Payment Terms

Payment terms should include:

* Due on Receipt
* 7 Days
* 14 Days
* 30 Days
* Custom

---

## 4.4 Invoice Items

The system should allow unlimited invoice rows.

Each row contains:

* Description
* Quantity
* Unit
* Unit Price
* Discount
* Tax Percentage
* Line Total

Automatic calculations should occur whenever values change.

---

## 4.5 Totals

Automatically calculate:

* Subtotal
* Discount
* Shipping
* Additional Charges
* Tax
* Grand Total

---

## 4.6 Payment Information

Users should be able to choose accepted payment methods.

Examples include:

* Bank Transfer
* Card
* Cash
* PayPal
* Wise
* Stripe
* UPI
* Cryptocurrency
* Custom

The payment details section should be completely free-form.

Examples:

* Bank Account Details
* Payment Link
* QR Code
* Wallet Address
* IBAN
* SWIFT
* Routing Number

The application should not enforce country-specific banking formats.

---

## 4.7 Notes

Rich text field.

Example:

Thank you for your business.

---

## 4.8 Terms & Conditions

Optional.

Displayed at the bottom of the invoice.

---

## 4.9 Attachments

Future support for:

* Purchase Orders
* Contracts
* Receipts
* Timesheets

---

# 5. Branding

Users should be able to customize:

* Company Logo
* Accent Color
* Footer
* Fonts
* Digital Signature
* Company Stamp

Brand settings should persist across future invoices.

---

# 6. Invoice Number Generation

Support:

## Automatic

Example:

INV-20260930-A8D4

or

NORD-202609-X4K8

Generated using:

* Prefix
* Current Date
* Random Identifier

## Manual

Users may override the generated number.

The system should not require sequential numbering.

---

# 7. Templates

Provide multiple invoice layouts.

Initial templates:

* Minimal
* Modern
* Corporate
* Elegant
* Startup

Templates should be switchable without affecting invoice data.

---

# 8. Output Formats

Users should be able to generate:

* PDF
* PNG
* JPG

Additional options:

* Print
* Copy Share Link (future)

---

# 9. Languages

Initial support:

* English
* German
* French
* Spanish
* Italian
* Portuguese

Language selection should translate invoice labels while preserving user-entered content.

---

# 10. Currency Support

Support all ISO currencies.

Examples:

* EUR
* USD
* GBP
* INR
* CAD
* AUD
* AED
* SGD
* JPY

Currency symbols should update automatically.

---

# 11. User Experience

The application should provide:

* Live Preview
* Auto Save
* Responsive Design
* Dark Mode
* Keyboard Navigation
* Fast Loading
* Mobile Compatibility

---

# 12. Dashboard

Future versions should include:

* Invoice History
* Search
* Filters
* Duplicate Invoice
* Delete Invoice
* Archive Invoice
* Download Again

---

# 13. Customer Management

Future support:

* Save Customers
* Edit Customers
* Customer Search
* Invoice History per Customer

---

# 14. Company Profiles

Support multiple businesses.

Example:

* Nordible Solutions
* Company B
* Company C

Users can switch companies without re-entering details.

---

# 15. Security

* HTTPS Only
* Input Validation
* XSS Protection
* CSRF Protection
* Secure File Uploads
* Audit Logs (future)

---

# 16. Performance

Targets:

* Initial page load under 2 seconds
* PDF generation under 3 seconds
* Image generation under 2 seconds

---

# 17. Technology Stack

Frontend:

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

Forms:

* React Hook Form
* Zod

PDF:

* @react-pdf/renderer

Image Export:

* html-to-image

State Management:

* Zustand

Backend (optional):

* Next.js API Routes

Database (future):

* PostgreSQL
* Supabase

Storage:

* Cloud Storage for logos and attachments

Deployment:

* Vercel

---

# 18. Future Roadmap

Phase 2:

* Quotes / Estimates
* Purchase Orders
* Credit Notes
* Proforma Invoices
* Recurring Invoices
* Automatic Email Sending
* Payment Tracking
* Client Portal
* Invoice Status
* Overdue Reminders

Phase 3:

* Expense Management
* Time Tracking
* Subscription Billing
* Accounting Integrations
* Tax Reports
* Multi-user Workspaces
* Role-Based Access Control (RBAC)
* REST API
* Webhooks

---

# 19. Success Criteria

The system will be considered successful if users can:

* Create a professional invoice in under two minutes.
* Generate branded PDFs and images without manual formatting.
* Reuse saved company and customer information.
* Support invoicing for businesses in any country without localization constraints.
* Scale from individual freelancers to organizations managing multiple brands and clients.

---

# 20. Out of Scope (Version 1)

The following features are intentionally excluded from the initial release:

* Full accounting/bookkeeping
* Inventory management
* Tax filing
* Payment gateway processing
* Payroll
* ERP integration
* CRM functionality
* Multi-tenant enterprise administration
* Offline desktop application

These may be considered in future versions based on product adoption and customer demand.
