"use client";

import React from "react";
import { SupportedLanguage } from "@/lib/i18n";
import { ArrowUpRight, Sparkles, Shield, Mail, Phone, MapPin, Bug, Calendar } from "lucide-react";
import Image from "next/image";
import { GithubIcon } from "./icons/GithubIcon";
import { Mascot } from "@/components/mascot/Mascot";

interface FooterProps {
  language: SupportedLanguage;
  variant?: "full" | "minimal";
}

export function Footer({ language, variant = "full" }: FooterProps) {
  const isDe = language === "de";

  if (variant === "minimal") {
    return (
      <footer className="no-print mt-auto py-6 border-t border-[#E8ECF4] bg-[#FAFBFF] text-slate-500 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-slate-700">Free Invoice Generator App</span>
            <span className="text-slate-300">•</span>
            <a
              href="https://nordible.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#145BFF] transition-colors"
            >
              by Nordible Technologies
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a
              href="https://github.com/nordible/free-invoice-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 transition-colors flex items-center gap-1.5"
            >
              <GithubIcon className="h-3.5 w-3.5 text-slate-700" />
              <span>Open Source</span>
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="mailto:mail@nordible.co?subject=%5BBug%20Report%5D%20Invoice%20Generator"
              className="hover:text-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Bug className="h-3.5 w-3.5 text-amber-500" />
              <span>{isDe ? "Fehler melden / Feedback" : "Report Bug / Feedback"}</span>
            </a>
            <span className="text-slate-300">•</span>
            <a
              href="https://nordible.co/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-800 transition-colors"
            >
              {isDe ? "Datenschutz" : "Privacy"}
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="no-print mt-16 border-t border-[#E8ECF4] bg-[#0D2B75] text-white">
      {/* High-Converting Agency Promo Banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0D2B75] via-[#145BFF]/30 to-[#0D2B75] py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shrink-0 drop-shadow-xl">
              <Mascot variant="hero-wave" alt="Nordible Mascot" priority />
            </div>
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-semibold text-[#FF9F1A]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isDe ? "Individuelle Softwareentwicklung & KI" : "Custom Software & AI Engineering"}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-heading">
                {isDe
                  ? "Benötigen Sie automatisierte Abrechnung oder maßgeschneiderte Software?"
                  : "Need automated billing systems, AI agents, or custom web apps?"}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/70 max-w-2xl">
                {isDe
                  ? "Nordible Technologies entwickelt skalierbare Webanwendungen, CRM- und Abrechnungsintegrationen mit 100 % Code-Eigentum ab Tag 1."
                  : "Nordible Technologies builds scalable web platforms, automated invoicing APIs, and autonomous AI workflows with 100% intellectual property ownership from Day 1."}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://nordible.co/#services"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-all"
            >
              <span>{isDe ? "Leistungen ansehen" : "Explore Services"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-300" />
            </a>
            <a
              href="https://nordible.co/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#145BFF] px-5 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/30 hover:bg-[#145BFF]/90 transition-all hover:scale-105"
            >
              <span>{isDe ? "Erstgespräch anfragen" : "Book Free Consultation"}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-white p-1 flex items-center justify-center">
                <Image
                  src="/images/logos/nordible-icon.png"
                  alt="Nordible Technologies"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
              <span className="text-base font-extrabold font-heading text-white tracking-tight">
                Nordible Technologies
              </span>
            </div>
            <p className="text-blue-100/60 leading-relaxed text-[11px]">
              {isDe
                ? "KI-nativer Business-Technologie- und Digitalmarketing-Partner mit Hauptsitz in Frankfurt am Main."
                : "AI-native engineering & digital growth agency headquartered in Frankfurt am Main, Germany."}
            </p>
            <div className="pt-1 flex items-center gap-2 text-blue-200/80 text-[11px]">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>{isDe ? "100% DSGVO & GoBD konform" : "100% GDPR & Private"}</span>
            </div>
          </div>

          {/* Software & AI Services */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-blue-200/90 text-[11px] mb-3 font-heading">
              {isDe ? "Softwarelösungen" : "Core Services"}
            </h3>
            <ul className="space-y-2 text-blue-100/70">
              <li>
                <a href="https://nordible.co/#services" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isDe ? "Individuelle Webanwendungen" : "Custom Web Applications"}
                </a>
              </li>
              <li>
                <a href="https://nordible.co/#services" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isDe ? "KI-Agenten & Prozessautomatisierung" : "AI Agent & Workflow Automation"}
                </a>
              </li>
              <li>
                <a href="https://nordible.co/#portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isDe ? "Projekt-Portfolio & Referenzen" : "Client Case Studies"}
                </a>
              </li>
              <li>
                <a href="https://nordible.co/why-choose-us" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {isDe ? "Warum Nordible" : "Why Choose Us"}
                </a>
              </li>
            </ul>
          </div>

          {/* Free Ecosystem Tools */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-blue-200/90 text-[11px] mb-3 font-heading">
              {isDe ? "Kostenlose Tools" : "Free Tools"}
            </h3>
            <ul className="space-y-2 text-blue-100/70">
              <li>
                <span className="text-white font-semibold">
                  {isDe ? "Rechnungsersteller (Hier)" : "Invoice Generator (Here)"}
                </span>
              </li>
              <li>
                <a href="https://nordible.co/qr-code-generator" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>{isDe ? "QR-Code-Generator" : "QR Code Generator"}</span>
                  <span className="rounded bg-blue-500/30 px-1 py-0.2 text-[9px] text-blue-300 font-bold uppercase">Free</span>
                </a>
              </li>
              <li>
                <a href="https://email.nordible.co/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Business Email Setup
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nordible/free-invoice-generator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 text-blue-200"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-blue-300" />
                  <span>{isDe ? "Open-Source-Code" : "Open Source Repo"}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Bug Reports */}
          <div>
            <h3 className="font-bold uppercase tracking-wider text-blue-200/90 text-[11px] mb-3 font-heading">
              {isDe ? "Kontakt & Support" : "Contact & Support"}
            </h3>
            <ul className="space-y-2.5 text-blue-100/70">
              <li>
                <a
                  href="mailto:mail@nordible.co"
                  className="hover:text-white transition-colors flex items-center gap-2"
                  title={isDe ? "E-Mail für geschäftliche Anfragen" : "Email for business inquiries"}
                >
                  <Mail className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="font-mono text-[11px]">mail@nordible.co</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+4915211065739"
                  className="hover:text-white transition-colors flex items-center gap-2"
                  title="Phone & WhatsApp"
                >
                  <Phone className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                  <span className="font-mono text-[11px]">+49 1521 1065739</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mail@nordible.co?subject=%5BBug%20Report%5D%20Invoice%20Generator"
                  className="hover:text-amber-200 transition-colors flex items-center gap-2 text-amber-300 font-semibold"
                  title={isDe ? "Fehlerbericht oder Feedback einreichen" : "Submit a bug report or feedback"}
                >
                  <Bug className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                  <span>{isDe ? "Fehler melden / Feedback" : "Report Bug / Feedback"}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nordible/free-invoice-generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-blue-200"
                  title="GitHub Issues"
                >
                  <GithubIcon className="h-3.5 w-3.5 text-blue-300 shrink-0" />
                  <span>{isDe ? "GitHub Issue eröffnen" : "Open GitHub Issue"}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://calendar.app.google/N4XakE4t9zZVmHqYA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2 text-[#FF9F1A] font-bold"
                >
                  <Calendar className="h-3.5 w-3.5 text-[#FF9F1A] shrink-0" />
                  <span>{isDe ? "Beratungstermin buchen" : "Book Founder Call"}</span>
                </a>
              </li>
              <li className="pt-1 text-[11px] text-blue-200/60 flex items-start gap-1.5 leading-snug">
                <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                <span>Breitlacherstraße 101, 60489 Frankfurt am Main, Germany</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-blue-200/50">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {new Date().getFullYear()} Nordible Technologies. {isDe ? "Alle Rechte vorbehalten." : "All rights reserved."}</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <div className="flex items-center gap-3 text-blue-300">
              <a
                href="https://github.com/nordible/free-invoice-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1 font-semibold"
              >
                <GithubIcon className="h-3.5 w-3.5" />
                <span>GitHub (Open Source)</span>
              </a>
              <span>/</span>
              <a href="https://www.linkedin.com/company/nordible-co/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://nordible.co/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {isDe ? "AGB" : "Terms"}
            </a>
            <a href="https://nordible.co/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {isDe ? "Datenschutz" : "Privacy Policy"}
            </a>
            <a href="https://nordible.co/company-profile" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              {isDe ? "Impressum" : "Company Profile"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
