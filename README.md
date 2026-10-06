# Nordible Free Invoice Generator

<div align="center">

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js 16](https://img.shields.io/badge/Next.js-16-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)
![Privacy](https://img.shields.io/badge/Privacy-100%25%20Local-emerald.svg)
![Watermark](https://img.shields.io/badge/Watermarks-None-emerald.svg)
![MCP](https://img.shields.io/badge/MCP-Ready-orange.svg)

**100% Free Forever • Privacy-First • No Watermarks • No Registration • Human & AI-Agent Ready**

[Live Web Application](https://free-invoice-generator.nordible.co) • [MCP Server on npm (`@nordible/invoice-mcp`)](https://www.npmjs.com/package/@nordible/invoice-mcp) • [Nordible Technologies](https://nordible.co)

</div>

---

## Overview

**Nordible Free Invoice Generator** is an open-source, client-side web application and [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server engineered to create beautiful, statutory DIN A4 PDF invoices in under 2 minutes.

Built for freelancers, agencies, and businesses worldwide, it eliminates paywalls, registration hurdles, and watermark extortion. All financial and customer data remains strictly on your device.

---

## Key Features

* **100% Client-Side Privacy**: Zero servers, zero databases, zero tracking. All drafts are stored exclusively in your browser's `LocalStorage`.
* **DIN A4 WYSIWYG Preview**: Real-time DIN 5008 / ISO 216 layout with automatic page-break preservation for clean PDF printing.
* **GoBD-Compliant Financial Math**: Precise calculation of line items, itemized VAT / MwSt. rates (e.g. 19%, 7%, 0%), discounts, shipping, and grand totals across international currencies (EUR, USD, GBP, CHF, CAD, AUD, JPY).
* **Multilingual UI & Documentation**: Native language support for English, German (Deutsch), French (Français), and Spanish (Español).
* **Branding & Customization**: Instant drag-and-drop logo upload, custom brand primary colors, payment details (IBAN/BIC/PayPal), and custom terms.
* **Direct Export**: 1-click native print-to-PDF via browser print engine, PNG export, or JSON backup.
* **Human-in-the-Loop AI Deep Linking**: Pre-fill complete invoices through URL hash payloads (`#data=<base64>`) without exposing sensitive client data to external servers.

---

## AI Agent & MCP Integration (`@nordible/invoice-mcp`)

The repository includes an official, standalone Model Context Protocol server located in [`packages/mcp-server`](./packages/mcp-server). It enables LLMs (Claude Desktop, Cursor, Antigravity, ChatGPT) to programmatically draft invoices, compute statutory tax breakdowns, and generate 1-click review links.

### Quick Start with `npx`

#### 1. Claude Desktop Configuration
Add to your `claude_desktop_config.json` (`%APPDATA%\Claude\claude_desktop_config.json` on Windows, `~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "nordible-invoice": {
      "command": "npx",
      "args": ["-y", "@nordible/invoice-mcp"]
    }
  }
}
```

#### 2. Cursor IDE Configuration
Add to your `.cursor/mcp.json` or in **Cursor Settings > Features > MCP Servers**:

```json
{
  "mcpServers": {
    "nordible-invoice": {
      "command": "npx",
      "args": ["-y", "@nordible/invoice-mcp"]
    }
  }
}
```

### Example AI Prompt
> *"Create a German GoBD-compliant invoice from Nordible Solutions GmbH (Berlin) to Acme Corp (Munich) for 15 hours of UX Design at 130 €/h plus 19% MwSt. Include bank details for Deutsche Bank."*

The AI assistant calls `create_invoice`, outputs the verified calculations table, and returns a direct link to open the invoice in the web generator for 1-click inspection and printing.

---

## Monorepo Architecture

```
free-invoice-generator/
├── src/                          # Next.js 16 App Router application
│   ├── app/                      # Multilingual routing ([lang]/generator)
│   ├── components/               # WYSIWYG invoice editor & landing page
│   ├── contexts/                 # Currency, language, and invoice state
│   ├── lib/                      # PDF rendering, storage, & urlPayload deep linking
│   └── types/                    # Shared TypeScript invoice types
├── packages/
│   └── mcp-server/               # Standalone @nordible/invoice-mcp package
│       ├── src/                  # MCP tools (create_invoice, calculate_taxes)
│       └── dist/                 # Compiled executable Node.js bundle
├── public/                       # Static branding, favicons & llms.txt
└── package.json                  # Root workspace config
```

---

## Local Development

### Prerequisites
* Node.js 18.18+ or Node.js 20+
* npm or pnpm

### Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nordible/free-invoice-generator.git
   cd free-invoice-generator
   ```

2. **Install root dependencies**:
   ```bash
   npm install
   ```

3. **Start the Next.js development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Build the MCP server package**:
   ```bash
   npm run build:mcp
   ```

---

## Security & Privacy Policy

Nordible Free Invoice Generator operates under a strict **Zero-Server Storage** architecture:
* No server database or cloud backend receives your customer or financial records.
* Invoices and logos are stored strictly within the user's browser `LocalStorage`.
* Clearing browser cache or clicking "Reset" removes all stored data permanently.
* URL deep links utilize hash fragments (`#data=...`), which are processed entirely client-side and never transmitted over HTTP requests.

---

## Contributing

Contributions, bug reports, and feature suggestions are welcome!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

Maintained with care by [Nordible Technologies](https://nordible.co).
