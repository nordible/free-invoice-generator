# @nordible/invoice-mcp

<div align="center">

[![npm version](https://img.shields.io/npm/v/@nordible/invoice-mcp.svg?style=flat-square)](https://www.npmjs.com/package/@nordible/invoice-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![MCP Standard](https://img.shields.io/badge/MCP-Standard%20v1.0-orange.svg?style=flat-square)](https://modelcontextprotocol.io/)
[![Zero Server](https://img.shields.io/badge/Privacy-100%25%20Client--Side-emerald.svg?style=flat-square)](https://free-invoice-generator.nordible.co)

**Official Model Context Protocol (MCP) Server for the [Nordible Free Invoice Generator](https://free-invoice-generator.nordible.co)**

Draft professional, GoBD-compliant DIN A4 invoices, calculate statutory multi-currency taxes, and generate 1-click human-in-the-loop review links directly inside Claude Desktop, Cursor, Antigravity, and AI Agents.

</div>

---

## Why Use This MCP Server?

1. **Human-in-the-Loop Privacy**: AI drafts the invoice, but the user always has the final review. The server generates a zero-backend URL deep link (`https://free-invoice-generator.nordible.co/{lang}/generator#data=...`) where the user can visually inspect the DIN A4 layout and print to PDF. No financial data is ever transmitted or stored on remote servers.
2. **GoBD-Compliant Math**: Handles subtotal, itemized tax rates (19%, 7%, 0%), discounts, and totals across EUR, USD, GBP, CHF, CAD, AUD, and JPY.
3. **Zero Setup Overhead**: Runs on-demand via `npx` with no local cloning or dependency management required.

---

## Instant Configuration

### 1. Claude Desktop

Add `@nordible/invoice-mcp` to your `claude_desktop_config.json`:
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

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

### 2. Cursor IDE

#### Option A: Project Configuration (`.cursor/mcp.json`)
Create or edit `.cursor/mcp.json` in your project root:

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

#### Option B: Global Settings
1. Open **Cursor Settings** (`Ctrl + ,` or `Cmd + ,`).
2. Navigate to **Features** > **MCP Servers** > **Add New MCP Server**.
3. Set **Name** to `nordible-invoice`.
4. Set **Type** to `command`.
5. Set **Command** to:
   ```bash
   npx -y @nordible/invoice-mcp
   ```

### 3. CLI & Other MCP Clients (Antigravity, Claude Code, Cline, Roo)

Run directly via `npx` with zero installation:

```bash
npx -y @nordible/invoice-mcp
```

---

## Available Tools

### 1. `create_invoice`

Drafts a comprehensive invoice, validates line items, calculates itemized taxes, and returns both a formatted markdown invoice and a 1-click inspection link.

#### Parameters:
| Field | Type | Description |
|---|---|---|
| `company` | `object` | Sender name, address, city, postal code, tax ID, email, bank details |
| `client` | `object` | Client / recipient name, address, city, postal code, country |
| `items` | `array` | Line items with `description`, `quantity`, `unitPrice`, and optional `taxRate` |
| `invoiceNumber` | `string` | Optional invoice ID (e.g. `INV-2026-001`) |
| `issueDate` | `string` | Issue date in `YYYY-MM-DD` |
| `dueDate` | `string` | Payment due date in `YYYY-MM-DD` |
| `currency` | `string` | `EUR` (default), `USD`, `GBP`, `CHF`, `CAD`, `AUD`, `JPY` |
| `notes` | `string` | Optional payment terms or thank-you note |
| `language` | `string` | Target UI locale: `'de'`, `'en'`, `'fr'`, `'es'` |

### 2. `calculate_taxes`

Utility tool to compute statutory subtotal, itemized tax rates (e.g. standard 19% MwSt., reduced 7%, reverse-charge 0%), and net/gross amounts without generating full company metadata.

---

## Example AI Prompts

Try these directly in Claude or Cursor once configured:

> *"Generate a German GoBD-compliant invoice from Nordible Solutions GmbH (Frankfurt) to Acme Corp (Berlin) for 20 hours of Senior Systems Architecture at 150 €/h plus 19% MwSt. Include bank IBAN DE89370400440532013000."*

> *"Create a bilingual English/German invoice for a 2,500 € branding project with 50% upfront deposit and 14 days payment terms."*

The assistant will respond with the calculated totals and a direct link:
`https://free-invoice-generator.nordible.co/de/generator#data=...`

Clicking the link instantly opens the web generator with all fields populated for 1-click PDF printing.

---

## Repository & Community

* **Web Application**: [https://free-invoice-generator.nordible.co](https://free-invoice-generator.nordible.co)
* **GitHub Repository**: [https://github.com/nordible/free-invoice-generator](https://github.com/nordible/free-invoice-generator)
* **Issues & Feedback**: [https://github.com/nordible/free-invoice-generator/issues](https://github.com/nordible/free-invoice-generator/issues)
* **Agency Website**: [https://nordible.co](https://nordible.co)

---

## License

MIT © [Nordible Technologies](https://nordible.co)
