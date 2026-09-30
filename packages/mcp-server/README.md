# Nordible Invoice Generator MCP Server

> Model Context Protocol (MCP) server for [Nordible Free Invoice Generator](https://invoice.nordible.co/). Enables AI assistants (Claude, Cursor, Antigravity, ChatGPT) to programmatically draft professional, GoBD-compliant invoices with automatic tax calculations and provide human-in-the-loop verification links.

## Capabilities & Tools

1. **`create_invoice`**: Generates complete, statutory invoice data with custom line items, tax breakdowns (19%, 7%, 0%), and returns:
   - A markdown formatted invoice summary table in chat.
   - A direct, 1-click **human verification link** (`https://invoice.nordible.co/{lang}/generator#data=...`) where the user can visually review the live DIN A4 preview and print to PDF with 100% client-side privacy.
2. **`calculate_taxes`**: Computes subtotal, itemized VAT/MwSt. tax breakdowns, and grand totals for any currency (EUR, USD, GBP, CHF, CAD, AUD, JPY).

---

## Installation & Configuration

### Option 1: Claude Desktop (`claude_desktop_config.json`)

Add the following to your Claude Desktop configuration file:
* **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "nordible-invoice": {
      "command": "node",
      "args": [
        "D:/Projects/nordible/marketing/invoice-generator/packages/mcp-server/dist/index.js"
      ]
    }
  }
}
```

Or when published via npx:
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

### Option 2: Cursor (`.cursor/mcp.json` or Settings > MCP)

Add a new MCP server in Cursor:
* **Type**: `command`
* **Command**: `node D:/Projects/nordible/marketing/invoice-generator/packages/mcp-server/dist/index.js`

---

## Example Prompt for Your AI Agent

> *"Create a German GoBD-compliant invoice from Nordible Solutions GmbH (Berlin) to Acme Corp (Munich) for 15 hours of UX Design at 130 €/h plus 19% MwSt. Include bank details for Deutsche Bank."*

The AI agent will call `create_invoice`, calculate all totals, and output the invoice table along with the 1-click link to inspect and print on `https://invoice.nordible.co`.

---

## License

MIT © [Nordible Technologies](https://nordible.co)
