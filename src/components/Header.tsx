"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ACCENT_COLORS } from "@/lib/constants";
import { TemplateId } from "@/types/invoice";
import { SupportedLanguage, SUPPORTED_LANGUAGES, TRANSLATIONS } from "@/lib/i18n";
import { RotateCcw, Sparkles, Globe, Palette, ArrowLeft, ArrowRight, Bug } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "./icons/GithubIcon";

interface HeaderProps {
  language: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  template?: TemplateId;
  onTemplateChange?: (t: TemplateId) => void;
  accentColor?: string;
  onAccentColorChange?: (c: string) => void;
  onResetDemo?: () => void;
  onClear?: () => void;
  isGeneratorPage?: boolean;
}

export function Header({
  language,
  onLanguageChange,
  template = "modern",
  onTemplateChange,
  accentColor = "#145BFF",
  onAccentColorChange,
  onResetDemo,
  onClear,
  isGeneratorPage = false,
}: HeaderProps) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isDe = language === "de";

  const [prevColor, setPrevColor] = useState(accentColor);
  const [hexInput, setHexInput] = useState(accentColor);

  if (accentColor !== prevColor) {
    setPrevColor(accentColor);
    setHexInput(accentColor);
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (!val.startsWith("#")) {
      val = "#" + val;
    }
    setHexInput(val);
    if (/^#[0-9A-Fa-f]{6}$/.test(val) && onAccentColorChange) {
      onAccentColorChange(val);
    }
  };

  return (
    <header className="no-print sticky top-0 z-40 border-b border-[#E8ECF4] bg-white/95 backdrop-blur-md shadow-xs">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand Logo & Title */}
          {isGeneratorPage ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/${language}`}
                title={isDe ? "Zurück zur Startseite" : "Back to Home"}
                className="inline-flex items-center gap-2.5 text-slate-700 hover:text-[#145BFF] transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-[#FAFBFF] border border-[#E8ECF4] flex items-center justify-center group-hover:border-[#145BFF]/30 transition-colors">
                  <ArrowLeft className="h-4 w-4 text-slate-600 group-hover:text-[#145BFF]" />
                </div>
                <span className="text-base sm:text-lg font-extrabold text-[#0D2B75] font-heading tracking-tight">
                  {t.appTitle}
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href={`/${language}`}
                title={t.appTitle}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-md shadow-blue-500/10 border border-[#E8ECF4] shrink-0 hover:scale-105 transition-transform"
              >
                <Image
                  src="/images/logos/nordible-icon.png"
                  alt="Invoice Generator Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                  priority
                />
              </Link>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/${language}`}
                    className="text-lg sm:text-xl font-extrabold text-[#0D2B75] font-heading tracking-tight hover:text-[#145BFF] transition-colors"
                  >
                    {t.appTitle}
                  </Link>
                  <a
                    href="https://nordible.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-slate-100 hover:bg-[#F3F7FF] border border-[#E8ECF4] px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 hover:text-[#145BFF] transition-colors"
                    title="Engineered by Nordible Technologies"
                  >
                    {t.byAuthor}
                  </a>
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-bold text-emerald-700 shadow-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {t.freeBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-sans">{t.appSubtitle}</p>
              </div>
            </div>
          )}

          {/* Right Navigation & Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {/* Language Switcher */}
            <div className="relative inline-flex items-center rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-2.5 py-1.5">
              <Globe className="h-3.5 w-3.5 text-[#145BFF] mr-1.5 shrink-0" />
              <select
                aria-label="Language / Sprache"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-transparent text-xs font-bold text-[#0D2B75] focus:outline-hidden cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Non-workspace links shown only on Landing Page */}
            {!isGeneratorPage && (
              <>
                <a
                  href="mailto:mail@nordible.co?subject=%5BBug%20Report%20%2F%20Feedback%5D%20Nordible%20Invoice%20Generator"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-[#145BFF] hover:bg-[#FAFBFF] shadow-xs transition-colors"
                  title={isDe ? "Fehler oder Feedback melden" : "Report a Bug or Send Feedback"}
                >
                  <Bug className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  <span className="hidden xl:inline">{isDe ? "Feedback / Bug" : "Report Bug"}</span>
                </a>

                <a
                  href="https://github.com/nordible/free-invoice-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#145BFF] hover:bg-[#FAFBFF] shadow-xs transition-colors"
                  title="GitHub Open Source Repository"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-slate-800 shrink-0" />
                  <span className="hidden sm:inline">Open Source</span>
                </a>
              </>
            )}

            {/* If on Generator Workspace: Show editor tools */}
            {isGeneratorPage ? (
              <>
                {/* Template Selector */}
                {onTemplateChange && (
                  <div className="flex items-center rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] p-1">
                    <button
                      type="button"
                      onClick={() => onTemplateChange("modern")}
                      className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all cursor-pointer ${
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
                      className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all cursor-pointer ${
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
                      className={`rounded-lg px-2 py-1 text-xs font-semibold transition-all cursor-pointer ${
                        template === "classic"
                          ? "bg-[#145BFF] text-white shadow-xs"
                          : "text-slate-600 hover:text-[#0D2B75]"
                      }`}
                    >
                      Classic
                    </button>
                  </div>
                )}

                {/* Full Spectrum Color Picker & Hex Input */}
                {onAccentColorChange && (
                  <div className="flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-[#FAFBFF] px-2 py-1">
                    <label
                      title="Choose custom color from spectrum"
                      className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg border border-[#E8ECF4] p-0.5 shadow-2xs hover:scale-105 transition-transform"
                      style={{ backgroundColor: accentColor }}
                    >
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => onAccentColorChange(e.target.value)}
                        className="absolute inset-0 h-full w-full opacity-0 cursor-pointer"
                      />
                      <Palette className="h-3 w-3 text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] pointer-events-none" />
                    </label>

                    <input
                      type="text"
                      value={hexInput}
                      onChange={handleHexChange}
                      placeholder="#145BFF"
                      maxLength={7}
                      title="Enter Hex Color Code"
                      className="w-16 rounded-md border border-[#E8ECF4] bg-white px-1.5 py-0.5 text-[11px] font-mono font-semibold text-[#0D2B75] uppercase focus:border-[#145BFF] focus:outline-hidden"
                    />

                    <div className="hidden sm:flex items-center gap-1 border-l border-[#E8ECF4] pl-1.5 ml-0.5">
                      {ACCENT_COLORS.slice(0, 3).map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          title={c.label}
                          onClick={() => onAccentColorChange(c.value)}
                          style={{ backgroundColor: c.value }}
                          className={`h-3.5 w-3.5 rounded-full transition-transform hover:scale-125 cursor-pointer ${
                            accentColor.toLowerCase() === c.value.toLowerCase()
                              ? "ring-2 ring-[#0D2B75] ring-offset-1"
                              : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions: Demo Data & Clear */}
                <div className="flex items-center gap-1.5">
                  {onResetDemo && (
                    <button
                      type="button"
                      onClick={onResetDemo}
                      className="flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#0D2B75] hover:bg-[#FAFBFF] transition-colors shadow-xs cursor-pointer"
                      title={t.actions.loadDemo}
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#FF9F1A]" />
                      <span className="hidden sm:inline">{t.actions.loadDemo}</span>
                    </button>
                  )}
                  {onClear && (
                    <button
                      type="button"
                      onClick={onClear}
                      className="flex items-center gap-1.5 rounded-xl border border-[#E8ECF4] bg-white px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
                      title={t.actions.clear}
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{t.actions.clear}</span>
                    </button>
                  )}
                </div>
              </>
            ) : (
              /* If on Landing Page: Show CTA to open generator */
              <Link
                href={`/${language}/generator`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#145BFF] px-4 py-2 text-xs font-extrabold text-white shadow-md shadow-blue-500/20 hover:bg-[#0D2B75] transition-all hover:scale-105"
              >
                <span>{isDe ? "Rechnung erstellen" : "Launch Generator"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
