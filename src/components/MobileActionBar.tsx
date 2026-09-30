"use client";

import React from "react";
import { SupportedLanguage, TRANSLATIONS } from "@/lib/i18n";
import { Eye, Edit3, Printer, Image as ImageIcon, Plus } from "lucide-react";

interface MobileActionBarProps {
  language: SupportedLanguage;
  activeTab: "form" | "preview";
  onTabChange: (tab: "form" | "preview") => void;
  onPrint: () => void;
  onExportImage: () => void;
  onAddItem: () => void;
  isExporting: boolean;
}

export function MobileActionBar({
  language,
  activeTab,
  onTabChange,
  onPrint,
  onExportImage,
  onAddItem,
  isExporting,
}: MobileActionBarProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <aside
      aria-label="Mobile Quick Actions"
      className="no-print fixed bottom-0 left-0 right-0 z-50 border-t border-[#E8ECF4] bg-white/95 backdrop-blur-md px-3 py-2.5 shadow-[0_-4px_25px_rgba(13,43,117,0.08)] lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        {/* Toggle Form vs Preview */}
        <div className="flex rounded-xl bg-[#FAFBFF] border border-[#E8ECF4] p-1">
          <button
            type="button"
            onClick={() => onTabChange("form")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "form"
                ? "bg-[#145BFF] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0D2B75]"
            }`}
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>{t.actions.edit}</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange("preview")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "preview"
                ? "bg-[#145BFF] text-white shadow-xs"
                : "text-slate-600 hover:text-[#0D2B75]"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{t.actions.preview}</span>
          </button>
        </div>

        {/* Add item shortcut if in form mode */}
        {activeTab === "form" && (
          <button
            type="button"
            onClick={onAddItem}
            title={t.actions.addItem}
            className="flex h-10 items-center gap-1 rounded-xl border border-[#E8ECF4] bg-[#F3F7FF] px-2.5 text-xs font-bold text-[#145BFF] active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>{t.actions.posShort}</span>
          </button>
        )}

        {/* Quick Export: PNG and PDF */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onExportImage}
            disabled={isExporting}
            title={t.actions.exportPng}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E8ECF4] bg-white text-slate-700 active:scale-95 transition-all shadow-xs cursor-pointer"
          >
            <ImageIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onPrint}
            disabled={isExporting}
            className="flex h-10 items-center gap-1.5 rounded-xl bg-[#145BFF] px-3.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Printer className="h-4 w-4" />
            <span>PDF</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
