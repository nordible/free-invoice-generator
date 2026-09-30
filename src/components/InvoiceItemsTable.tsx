"use client";

import React from "react";
import { InvoiceItem, CurrencyCode } from "@/types/invoice";
import { COMMON_UNITS } from "@/lib/constants";
import { calculateLineTotal, formatCurrency } from "@/lib/calculations";
import { SupportedLanguage, TRANSLATIONS } from "@/lib/i18n";
import { Plus, Trash2 } from "lucide-react";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  currency: CurrencyCode;
  language: SupportedLanguage;
  onUpdateItem: (id: string, updated: Partial<InvoiceItem>) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
}

export function InvoiceItemsTable({
  items,
  currency,
  language,
  onUpdateItem,
  onAddItem,
  onRemoveItem,
}: InvoiceItemsTableProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#0D2B75] font-heading">
          {t.form.itemsTitle} ({items.length})
        </h3>
        <button
          type="button"
          onClick={onAddItem}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#F3F7FF] border border-[#E8ECF4] px-3 py-1.5 text-xs font-bold text-[#145BFF] hover:bg-[#145BFF] hover:text-white transition-all shadow-xs cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          {t.actions.addItem}
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden rounded-xl border border-[#E8ECF4] bg-white">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#E8ECF4] bg-[#FAFBFF] font-semibold text-[#0D2B75]">
            <tr>
              <th className="py-2.5 pl-3 pr-2 w-[40%]">{t.form.itemDesc}</th>
              <th className="py-2.5 px-2 w-[12%]">{t.form.itemQty}</th>
              <th className="py-2.5 px-2 w-[14%]">{t.form.itemUnit}</th>
              <th className="py-2.5 px-2 w-[14%]">{t.form.itemPrice}</th>
              <th className="py-2.5 px-2 w-[10%]">{t.form.itemTax}</th>
              <th className="py-2.5 px-2 text-right w-[15%]">{t.form.itemTotal}</th>
              <th className="py-2.5 pr-3 pl-1 w-[5%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8ECF4]">
            {items.map((item, index) => {
              const lineTotal = calculateLineTotal(item);
              return (
                <tr key={item.id || index} className="group hover:bg-[#FAFBFF]/80">
                  <td className="py-2 pl-3 pr-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                      placeholder="e.g. Web Development & UI/UX"
                      className="w-full rounded-lg border border-[#E8ECF4] bg-white px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-[#145BFF] focus:outline-hidden"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.quantity === 0 ? "" : item.quantity}
                      onChange={(e) =>
                        onUpdateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full rounded-lg border border-[#E8ECF4] bg-white px-2 py-1.5 text-xs text-slate-800 focus:border-[#145BFF] focus:outline-hidden"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select
                      value={item.unit}
                      onChange={(e) => onUpdateItem(item.id, { unit: e.target.value })}
                      className="w-full rounded-lg border border-[#E8ECF4] bg-white px-2 py-1.5 text-xs text-slate-800 focus:border-[#145BFF] focus:outline-hidden"
                    >
                      {COMMON_UNITS.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={item.unitPrice === 0 ? "" : item.unitPrice}
                      onChange={(e) =>
                        onUpdateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
                      }
                      placeholder="0.00"
                      className="w-full rounded-lg border border-[#E8ECF4] bg-white px-2 py-1.5 text-xs text-slate-800 focus:border-[#145BFF] focus:outline-hidden"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select
                      value={item.taxPercent}
                      onChange={(e) =>
                        onUpdateItem(item.id, { taxPercent: parseFloat(e.target.value) || 0 })
                      }
                      className="w-full rounded-lg border border-[#E8ECF4] bg-white px-1.5 py-1.5 text-xs text-slate-800 focus:border-[#145BFF] focus:outline-hidden"
                    >
                      <option value={19}>19%</option>
                      <option value={10}>10%</option>
                      <option value={7}>7%</option>
                      <option value={0}>0%</option>
                    </select>
                  </td>
                  <td className="py-2 px-2 text-right font-semibold text-slate-800 whitespace-nowrap">
                    {formatCurrency(lineTotal, currency)}
                  </td>
                  <td className="py-2 pr-3 pl-1 text-right">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={items.length <= 1}
                      title="Delete item"
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {items.map((item, index) => {
          const lineTotal = calculateLineTotal(item);
          return (
            <div
              key={item.id || index}
              className="rounded-2xl border border-[#E8ECF4] bg-white p-3.5 shadow-xs space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-[#145BFF] uppercase tracking-wider">
                  {t.actions.posShort} #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => onRemoveItem(item.id)}
                  disabled={items.length <= 1}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  {t.form.itemDesc}
                </label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                  placeholder="e.g. Design & Consulting"
                  className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-2 text-xs focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">
                    {t.form.itemQty}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.quantity === 0 ? "" : item.quantity}
                    onChange={(e) =>
                      onUpdateItem(item.id, { quantity: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-2 text-xs focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">
                    {t.form.itemUnit}
                  </label>
                  <select
                    value={item.unit}
                    onChange={(e) => onUpdateItem(item.id, { unit: e.target.value })}
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-2 text-xs focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
                  >
                    {COMMON_UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-600 block mb-1">
                    {t.form.itemPrice}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={item.unitPrice === 0 ? "" : item.unitPrice}
                    onChange={(e) =>
                      onUpdateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-2 text-xs focus:border-[#145BFF] focus:bg-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E8ECF4]">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">{t.form.itemTax}:</span>
                  <select
                    value={item.taxPercent}
                    onChange={(e) =>
                      onUpdateItem(item.id, { taxPercent: parseFloat(e.target.value) || 0 })
                    }
                    className="rounded-lg border border-[#E8ECF4] bg-white px-2 py-1 text-xs"
                  >
                    <option value={19}>19%</option>
                    <option value={10}>10%</option>
                    <option value={7}>7%</option>
                    <option value={0}>0%</option>
                  </select>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-400 block">{t.form.itemTotal}</span>
                  <span className="text-xs font-bold text-[#0D2B75]">
                    {formatCurrency(lineTotal, currency)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          onClick={onAddItem}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-dashed border-[#145BFF]/40 bg-[#F3F7FF] py-3 text-xs font-bold text-[#145BFF] hover:bg-[#145BFF] hover:text-white transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          {t.actions.addItem}
        </button>
      </div>
    </div>
  );
}
