"use client";

import React from "react";
import { ACCENT_COLORS } from "@/lib/constants";
import { TemplateId } from "@/types/invoice";
import { RotateCcw, Sparkles } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  template: TemplateId;
  onTemplateChange: (t: TemplateId) => void;
  accentColor: string;
  onAccentColorChange: (c: string) => void;
  onResetDemo: () => void;
  onClear: () => void;
}

export function Header({
  template,
  onTemplateChange,
  accentColor,
  onAccentColorChange,
  onResetDemo,
  onClear,
}: HeaderProps) {
  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#E8ECF4] bg-white/90 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Brand Logo & Title matching Nordible portfolio */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md shadow-blue-500/10 border border-[#E8ECF4] shrink-0">
              <Image
                src="/images/logos/nordible-icon.png"
                alt="Nordible Technologies Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold text-[#0D2B75] font-heading tracking-tight">
                  Nordible Technologies
                </span>
                <span className="rounded-md bg-[#F3F7FF] border border-[#E8ECF4] px-2 py-0.5 text-xs font-semibold text-[#145BFF]">
                  Rechnungsersteller
                </span>
              </div>
              <p className="text-xs text-slate-500 font-sans">
                Offizieller Rechnungsgenerator für Agenturen, Startups & Freelancer
              </p>
            </div>
          </div>

          {/* Quick controls: Template & Theme Color */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Template Selector */}
            <div className="flex items-center rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-1">
              <button
                type="button"
                onClick={() => onTemplateChange("modern")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  template === "modern"
                    ? "bg-[#145BFF] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0D2B75]"
                }`}
              >
                Modern
              </button>
              <button
                type="button"
                onClick={() => onTemplateChange("minimal")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  template === "minimal"
                    ? "bg-[#145BFF] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0D2B75]"
                }`}
              >
                Minimal
              </button>
              <button
                type="button"
                onClick={() => onTemplateChange("classic")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                  template === "classic"
                    ? "bg-[#145BFF] text-white shadow-xs"
                    : "text-slate-600 hover:text-[#0D2B75]"
                }`}
              >
                Klassisch
              </button>
            </div>

            {/* Accent Color Picker */}
            <div className="flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-2.5 py-1.5">
              <span className="text-[11px] font-medium text-slate-500">Akzent:</span>
              <div className="flex items-center gap-1">
                {ACCENT_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    onClick={() => onAccentColorChange(c.value)}
                    style={{ backgroundColor: c.value }}
                    className={`h-4 w-4 rounded-full transition-transform hover:scale-125 ${
                      accentColor === c.value ? "ring-2 ring-[#0D2B75] ring-offset-1" : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Actions: Demo Data & Clear */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onResetDemo}
                className="flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-3 py-1.5 text-xs font-semibold text-[#0D2B75] hover:bg-[#FAFBFF] transition-colors shadow-xs"
                title="Beispieldaten laden"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#FF9F1A]" />
                <span className="hidden sm:inline">Beispieldaten</span>
              </button>
              <button
                type="button"
                onClick={onClear}
                className="flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-xs"
                title="Formular zurücksetzen"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Leeren</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
