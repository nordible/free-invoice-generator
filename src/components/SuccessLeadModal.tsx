"use client";

import React, { useEffect } from "react";
import { SupportedLanguage, TRANSLATIONS } from "@/lib/i18n";
import { CheckCircle2, Sparkles, ArrowRight, X, Heart } from "lucide-react";

interface SuccessLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: SupportedLanguage;
}

export function SuccessLeadModal({
  isOpen,
  onClose,
  language = "en",
}: SuccessLeadModalProps) {
  const t = TRANSLATIONS[language]?.leadModal || TRANSLATIONS.en.leadModal;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-[#E8ECF4] text-slate-800 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dismiss Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Success Header */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {t.badge}
            </span>
            <h2 id="success-modal-title" className="text-base sm:text-lg font-extrabold text-[#0D2B75] font-heading mt-0.5">
              {t.title}
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {t.message}
        </p>

        {/* Reciprocity Lead Card */}
        <div className="rounded-2xl bg-gradient-to-br from-[#FAFBFF] to-[#F3F7FF] border border-[#E8ECF4] p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#145BFF]">
            <Sparkles className="h-4 w-4 text-[#FF9F1A]" />
            <span>Nordible Technologies</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            {t.leadPrompt}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
            <a
              href="https://nordible.co/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#145BFF] px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/20 hover:bg-[#0D2B75] transition-all hover:scale-102 text-center"
            >
              <span>{t.ctaButton}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors text-center cursor-pointer"
            >
              {t.closeButton}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
          <span>Crafted for creators & businesses worldwide</span>
        </div>
      </div>
    </div>
  );
}
