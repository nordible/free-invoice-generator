export type SupportedLanguage = "en" | "de" | "fr" | "es";

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "es", name: "Español", flag: "🇪🇸" },
];

export interface TranslationDictionary {
  appTitle: string;
  appBadge: string;
  byAuthor: string;
  appSubtitle: string;
  freeBadge: string;
  leadModal: {
    badge: string;
    title: string;
    message: string;
    leadPrompt: string;
    ctaButton: string;
    closeButton: string;
  };
  trust: {
    freeTitle: string;
    freeSub: string;
    noAccountTitle: string;
    noAccountSub: string;
    noWatermarkTitle: string;
    noWatermarkSub: string;
    privacyTitle: string;
    privacySub: string;
  };
  actions: {
    loadDemo: string;
    clear: string;
    template: string;
    color: string;
    printPdf: string;
    exportPng: string;
    addItem: string;
    edit: string;
    preview: string;
    posShort: string;
    autoSaved: string;
    showMore: string;
    showLess: string;
  };
  form: {
    pageTitle: string;
    pageSubtitle: string;
    senderTitle: string;
    uploadLogo: string;
    logoHint: string;
    companyName: string;
    companyNamePlaceholder: string;
    address: string;
    addressPlaceholder: string;
    zipCode: string;
    city: string;
    country: string;
    email: string;
    phone: string;
    taxId: string;
    commercialRegister: string;

    clientTitle: string;
    clientName: string;
    clientNamePlaceholder: string;
    contactPerson: string;
    clientTaxId: string;

    invoiceDetailsTitle: string;
    invoiceNumber: string;
    currency: string;
    issueDate: string;
    dueDate: string;
    paymentTerms: string;

    itemsTitle: string;
    itemDesc: string;
    itemQty: string;
    itemUnit: string;
    itemPrice: string;
    itemTax: string;
    itemTotal: string;
    shipping: string;
    extraDiscount: string;

    paymentTitle: string;
    bankName: string;
    accountHolder: string;
    iban: string;
    bic: string;
    paymentNotice: string;
    paypalEmail: string;

    notesTitle: string;
    notes: string;
    notesPlaceholder: string;
    terms: string;
    termsPlaceholder: string;
  };
  invoice: {
    invoiceDocTitle: string;
    billTo: string;
    invoiceNo: string;
    date: string;
    dueDate: string;
    terms: string;
    pos: string;
    description: string;
    qty: string;
    price: string;
    tax: string;
    amount: string;
    subtotal: string;
    itemDiscount: string;
    extraDiscount: string;
    shipping: string;
    taxVat: string;
    grandTotal: string;
    bankDetails: string;
    paymentRef: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    appTitle: "Invoice Generator App",
    byAuthor: "by Nordible",
    appBadge: "100% Free",
    appSubtitle: "Free, private & open-source invoice generator for freelancers and businesses",
    freeBadge: "100% Free Forever",
    leadModal: {
      badge: "Invoice Generated! 🎉",
      title: "Your professional invoice is ready",
      message: "100% free with no watermarks and bank-grade privacy. Developed with care by Nordible Technologies.",
      leadPrompt: "Need automated billing APIs, custom client portals, or AI systems for your business?",
      ctaButton: "Explore Custom Software Solutions →",
      closeButton: "Back to Workspace",
    },
    trust: {
      freeTitle: "100% Free",
      freeSub: "No subscription or limits",
      noAccountTitle: "No Sign-up",
      noAccountSub: "Instant in your browser",
      noWatermarkTitle: "No Watermark",
      noWatermarkSub: "Clean, professional A4 PDFs",
      privacyTitle: "100% Private",
      privacySub: "Data stays in your browser",
    },
    actions: {
      loadDemo: "Demo Data",
      clear: "Reset",
      template: "Template",
      color: "Accent",
      printPdf: "Print / Save PDF",
      exportPng: "Export PNG",
      addItem: "Add Line Item",
      edit: "Edit Form",
      preview: "Preview",
      posShort: "Item",
      autoSaved: "Auto-saved",
      showMore: "+ More details",
      showLess: "- Fewer details",
    },
    form: {
      pageTitle: "Invoice Details",
      pageSubtitle: "Changes update instantly in the DIN A4 live preview",
      senderTitle: "1. Sender (Your Business)",
      uploadLogo: "Upload Logo",
      logoHint: "PNG, JPG or SVG (max. 2 MB)",
      companyName: "Company Name / Your Name *",
      companyNamePlaceholder: "e.g. Nordible Technologies Inc.",
      address: "Street Address",
      addressPlaceholder: "123 Innovation Way",
      zipCode: "Postal Code",
      city: "City",
      country: "Country",
      email: "Email Address",
      phone: "Phone Number",
      taxId: "Tax ID / VAT Number",
      commercialRegister: "Commercial Register (Optional)",

      clientTitle: "2. Client (Recipient)",
      clientName: "Client / Company Name *",
      clientNamePlaceholder: "e.g. Acme Corporation",
      contactPerson: "Contact Person (Optional)",
      clientTaxId: "Client Tax ID / VAT",

      invoiceDetailsTitle: "3. Invoice Details & Terms",
      invoiceNumber: "Invoice Number *",
      currency: "Currency",
      issueDate: "Issue Date *",
      dueDate: "Due Date *",
      paymentTerms: "Payment Terms",

      itemsTitle: "Items & Services",
      itemDesc: "Description",
      itemQty: "Qty",
      itemUnit: "Unit",
      itemPrice: "Unit Price",
      itemTax: "Tax %",
      itemTotal: "Line Total",
      shipping: "Shipping / Handling Fee",
      extraDiscount: "Extra Invoice Discount",

      paymentTitle: "5. Payment & Bank Information",
      bankName: "Bank Name",
      accountHolder: "Account Holder",
      iban: "IBAN / Account Number *",
      bic: "BIC / SWIFT / Routing Code",
      paymentNotice: "Payment Reference Note",
      paypalEmail: "PayPal Email (Optional)",

      notesTitle: "6. Notes & Terms of Service",
      notes: "Thank You Note / Client Message",
      notesPlaceholder: "Thank you for your business and partnership!",
      terms: "Terms & Conditions (e.g. Payment due within 14 days)",
      termsPlaceholder: "Payment is due upon receipt without deduction.",
    },
    invoice: {
      invoiceDocTitle: "INVOICE",
      billTo: "BILL TO",
      invoiceNo: "Invoice No.",
      date: "Date",
      dueDate: "Due Date",
      terms: "Terms",
      pos: "No.",
      description: "Description",
      qty: "Qty",
      price: "Unit Price",
      tax: "Tax",
      amount: "Amount",
      subtotal: "Subtotal",
      itemDiscount: "Item Discount",
      extraDiscount: "Discount",
      shipping: "Shipping",
      taxVat: "Tax",
      grandTotal: "Total Due",
      bankDetails: "Payment Details",
      paymentRef: "Payment Reference",
    },
  },
  de: {
    appTitle: "Rechnungsersteller App",
    byAuthor: "von Nordible",
    appBadge: "100% Kostenlos",
    appSubtitle: "Kostenlos, quelloffen und mit 100% lokalem Datenschutz",
    freeBadge: "100% Dauerhaft Kostenlos",
    leadModal: {
      badge: "Rechnung erstellt! 🎉",
      title: "Ihre professionelle Rechnung ist fertig",
      message: "100% kostenlos ohne Wasserzeichen mit lokalem Datenschutz. Bereitgestellt von Nordible Technologies.",
      leadPrompt: "Benötigen Sie automatisierte Abrechnung, individuelle Web-Apps oder KI-Agenten für Ihr Unternehmen?",
      ctaButton: "Softwarelösungen entdecken →",
      closeButton: "Zurück zum Editor",
    },
    trust: {
      freeTitle: "100% Kostenlos",
      freeSub: "Ohne Abo oder Limits",
      noAccountTitle: "Ohne Anmeldung",
      noAccountSub: "Direkt im Browser starten",
      noWatermarkTitle: "Kein Wasserzeichen",
      noWatermarkSub: "Reine DIN-A4-Dokumente",
      privacyTitle: "100% Datenschutz",
      privacySub: "Lokal in Ihrem Browser",
    },
    actions: {
      loadDemo: "Beispieldaten",
      clear: "Leeren",
      template: "Vorlage",
      color: "Farbe",
      printPdf: "PDF drucken / speichern",
      exportPng: "Als PNG",
      addItem: "Position hinzufügen",
      edit: "Formular",
      preview: "Vorschau",
      posShort: "Pos.",
      autoSaved: "Automatisch gesichert",
      showMore: "+ Weitere Angaben",
      showLess: "- Weniger anzeigen",
    },
    form: {
      pageTitle: "Rechnungsdaten erfassen",
      pageSubtitle: "Änderungen werden synchron in der DIN-A4-Vorschau aktualisiert",
      senderTitle: "1. Absender (Ihr Unternehmen)",
      uploadLogo: "Logo hochladen",
      logoHint: "PNG, JPG oder SVG (max. 2 MB)",
      companyName: "Firmenname / Ihr Name *",
      companyNamePlaceholder: "z. B. Nordible Technologies GmbH",
      address: "Straße & Hausnummer",
      addressPlaceholder: "Friedrichstraße 123",
      zipCode: "PLZ",
      city: "Stadt",
      country: "Land",
      email: "E-Mail",
      phone: "Telefon",
      taxId: "Steuernummer / USt-IdNr.",
      commercialRegister: "Handelsregister (Optional)",

      clientTitle: "2. Rechnungsempfänger (Kunde)",
      clientName: "Kundenname / Firma *",
      clientNamePlaceholder: "z. B. Musterkunde GmbH",
      contactPerson: "Ansprechpartner (Optional)",
      clientTaxId: "USt-IdNr. des Kunden (Optional)",

      invoiceDetailsTitle: "3. Rechnungsdetails & Fristen",
      invoiceNumber: "Rechnungsnummer *",
      currency: "Währung",
      issueDate: "Rechnungsdatum *",
      dueDate: "Fälligkeitsdatum *",
      paymentTerms: "Zahlungsziel",

      itemsTitle: "Positionen & Leistungen",
      itemDesc: "Beschreibung",
      itemQty: "Menge",
      itemUnit: "Einheit",
      itemPrice: "Einzelpreis",
      itemTax: "MwSt.",
      itemTotal: "Gesamt",
      shipping: "Versandkosten / Pauschale",
      extraDiscount: "Zusätzlicher Gesamtrabatt",

      paymentTitle: "5. Zahlung & Bankverbindung",
      bankName: "Bankname",
      accountHolder: "Kontoinhaber",
      iban: "IBAN *",
      bic: "BIC / SWIFT",
      paymentNotice: "Verwendungszweck-Hinweis",
      paypalEmail: "PayPal-Adresse (Optional)",

      notesTitle: "6. Bemerkungen & Konditionen",
      notes: "Dankschreiben / Notiz an den Kunden",
      notesPlaceholder: "Vielen Dank für Ihren Auftrag und die gute Zusammenarbeit!",
      terms: "Zahlungsbedingungen & Hinweise",
      termsPlaceholder: "Zahlbar sofort nach Erhalt der Rechnung ohne Abzug.",
    },
    invoice: {
      invoiceDocTitle: "RECHNUNG",
      billTo: "RECHNUNGSEMPFÄNGER",
      invoiceNo: "Rechnungs-Nr.",
      date: "Datum",
      dueDate: "Fällig am",
      terms: "Zahlungsziel",
      pos: "Pos.",
      description: "Beschreibung",
      qty: "Menge",
      price: "Einzelpreis",
      tax: "MwSt.",
      amount: "Gesamt",
      subtotal: "Nettobetrag (Zwischensumme)",
      itemDiscount: "Artikelrabatt",
      extraDiscount: "Zusatzrabatt",
      shipping: "Versandkosten",
      taxVat: "MwSt.",
      grandTotal: "Gesamtbetrag",
      bankDetails: "Bankverbindung",
      paymentRef: "Verwendungszweck",
    },
  },
  fr: {
    appTitle: "App Générateur de Factures",
    byAuthor: "par Nordible",
    appBadge: "100% Gratuit",
    appSubtitle: "Générateur de factures gratuit, privé et open source pour indépendants et entreprises",
    freeBadge: "100% Gratuit à Vie",
    leadModal: {
      badge: "Facture Prête ! 🎉",
      title: "Votre facture a été générée avec succès",
      message: "100% gratuit, sans filigrane et avec une confidentialité totale. Développé par Nordible Technologies.",
      leadPrompt: "Besoin de facturation automatisée ou d'applications sur-mesure pour votre entreprise ?",
      ctaButton: "Découvrir nos services →",
      closeButton: "Fermer",
    },
    trust: {
      freeTitle: "100% Gratuit",
      freeSub: "Sans abonnement ni limite",
      noAccountTitle: "Sans Inscription",
      noAccountSub: "Instantané dans votre navigateur",
      noWatermarkTitle: "Sans Filigrane",
      noWatermarkSub: "PDF A4 nets et professionnels",
      privacyTitle: "100% Privé",
      privacySub: "Données conservées sur votre appareil",
    },
    actions: {
      loadDemo: "Données Démo",
      clear: "Effacer",
      template: "Modèle",
      color: "Couleur",
      printPdf: "Imprimer / PDF",
      exportPng: "Exporter PNG",
      addItem: "Ajouter une ligne",
      edit: "Formulaire",
      preview: "Aperçu",
      posShort: "Ligne",
      autoSaved: "Enregistré auto",
      showMore: "+ Plus de détails",
      showLess: "- Moins de détails",
    },
    form: {
      pageTitle: "Détails de la Facture",
      pageSubtitle: "Mise à jour en direct dans l'aperçu A4",
      senderTitle: "1. Émetteur (Votre Entreprise)",
      uploadLogo: "Télécharger Logo",
      logoHint: "PNG, JPG ou SVG (max. 2 Mo)",
      companyName: "Nom de l'entreprise *",
      companyNamePlaceholder: "ex. Nordible Technologies",
      address: "Adresse",
      addressPlaceholder: "123 Avenue des Affaires",
      zipCode: "Code Postal",
      city: "Ville",
      country: "Pays",
      email: "Email",
      phone: "Téléphone",
      taxId: "Numéro de TVA",
      commercialRegister: "RCS / SIRET (Optionnel)",

      clientTitle: "2. Client (Destinataire)",
      clientName: "Nom du Client / Entreprise *",
      clientNamePlaceholder: "ex. Client SARL",
      contactPerson: "Contact (Optionnel)",
      clientTaxId: "TVA du Client",

      invoiceDetailsTitle: "3. Informations Facture",
      invoiceNumber: "Numéro de Facture *",
      currency: "Devise",
      issueDate: "Date d'émission *",
      dueDate: "Date d'échéance *",
      paymentTerms: "Conditions de règlement",

      itemsTitle: "Prestations & Produits",
      itemDesc: "Description",
      itemQty: "Qté",
      itemUnit: "Unité",
      itemPrice: "Prix Unitaire",
      itemTax: "TVA %",
      itemTotal: "Total",
      shipping: "Frais de livraison",
      extraDiscount: "Remise globale",

      paymentTitle: "5. Coordonnées Bancaires",
      bankName: "Banque",
      accountHolder: "Titulaire du compte",
      iban: "IBAN *",
      bic: "BIC / SWIFT",
      paymentNotice: "Référence de paiement",
      paypalEmail: "Email PayPal (Optionnel)",

      notesTitle: "6. Notes & Conditions",
      notes: "Message de remerciement",
      notesPlaceholder: "Merci pour votre confiance !",
      terms: "Conditions Générales de Vente",
      termsPlaceholder: "Paiement à réception sans escompte.",
    },
    invoice: {
      invoiceDocTitle: "FACTURE",
      billTo: "FACTURÉ À",
      invoiceNo: "Facture N°",
      date: "Date",
      dueDate: "Échéance",
      terms: "Conditions",
      pos: "N°",
      description: "Désignation",
      qty: "Qté",
      price: "Prix Unitaire",
      tax: "TVA",
      amount: "Montant HT",
      subtotal: "Total HT",
      itemDiscount: "Remise ligne",
      extraDiscount: "Remise globale",
      shipping: "Livraison",
      taxVat: "TVA",
      grandTotal: "Total TTC",
      bankDetails: "Coordonnées Bancaires",
      paymentRef: "Réf. Paiement",
    },
  },
  es: {
    appTitle: "App Generador de Facturas",
    byAuthor: "por Nordible",
    appBadge: "100% Gratis",
    appSubtitle: "Generador de facturas gratuito, privado y de código abierto para profesionales y empresas",
    freeBadge: "100% Gratis para Siempre",
    leadModal: {
      badge: "¡Factura Lista! 🎉",
      title: "Tu factura profesional se generó con éxito",
      message: "100% gratis, sin marcas de agua y con máxima privacidad. Creado por Nordible Technologies.",
      leadPrompt: "¿Necesitas facturación automatizada, aplicaciones web a medida o sistemas de IA para tu negocio?",
      ctaButton: "Conoce nuestros servicios →",
      closeButton: "Cerrar",
    },
    trust: {
      freeTitle: "100% Gratis",
      freeSub: "Sin suscripción ni límites",
      noAccountTitle: "Sin Registro",
      noAccountSub: "Instantáneo en tu navegador",
      noWatermarkTitle: "Sin Marcas de Agua",
      noWatermarkSub: "PDF A4 limpios y profesionales",
      privacyTitle: "100% Privado",
      privacySub: "Tus datos se quedan en tu navegador",
    },
    actions: {
      loadDemo: "Datos Demo",
      clear: "Reiniciar",
      template: "Plantilla",
      color: "Acento",
      printPdf: "Imprimir / Guardar PDF",
      exportPng: "Exportar PNG",
      addItem: "Añadir Concepto",
      edit: "Formulario",
      preview: "Vista Previa",
      posShort: "Línea",
      autoSaved: "Guardado automático",
      showMore: "+ Más detalles",
      showLess: "- Menos detalles",
    },
    form: {
      pageTitle: "Datos de la Factura",
      pageSubtitle: "Actualización instantánea en la vista previa A4",
      senderTitle: "1. Emisor (Tus Datos)",
      uploadLogo: "Subir Logo",
      logoHint: "PNG, JPG o SVG (máx. 2 MB)",
      companyName: "Nombre de Empresa / Autónomo *",
      companyNamePlaceholder: "ej. Nordible Technologies S.L.",
      address: "Dirección",
      addressPlaceholder: "Calle Principal 123",
      zipCode: "Código Postal",
      city: "Ciudad",
      country: "País",
      email: "Correo Electrónico",
      phone: "Teléfono",
      taxId: "NIF / CIF / IVA",
      commercialRegister: "Registro Mercantil (Opcional)",

      clientTitle: "2. Cliente (Receptor)",
      clientName: "Nombre del Cliente / Empresa *",
      clientNamePlaceholder: "ej. Cliente Ejemplo S.A.",
      contactPerson: "Persona de Contacto (Opcional)",
      clientTaxId: "NIF / CIF del Cliente",

      invoiceDetailsTitle: "3. Detalles de Factura & Fechas",
      invoiceNumber: "Número de Factura *",
      currency: "Moneda",
      issueDate: "Fecha de Emisión *",
      dueDate: "Fecha de Vencimiento *",
      paymentTerms: "Plazo de Pago",

      itemsTitle: "Conceptos & Servicios",
      itemDesc: "Descripción",
      itemQty: "Cant.",
      itemUnit: "Unidad",
      itemPrice: "Precio Unitario",
      itemTax: "IVA %",
      itemTotal: "Importe",
      shipping: "Gastos de Envío",
      extraDiscount: "Descuento Adicional",

      paymentTitle: "5. Datos de Pago & Banco",
      bankName: "Nombre del Banco",
      accountHolder: "Titular de la Cuenta",
      iban: "IBAN *",
      bic: "BIC / SWIFT",
      paymentNotice: "Concepto de Pago",
      paypalEmail: "Correo PayPal (Opcional)",

      notesTitle: "6. Notas & Condiciones",
      notes: "Nota de agradecimiento",
      notesPlaceholder: "¡Muchas gracias por su confianza y colaboración!",
      terms: "Términos y Condiciones",
      termsPlaceholder: "Pago al contado a la recepción de la factura.",
    },
    invoice: {
      invoiceDocTitle: "FACTURA",
      billTo: "FACTURAR A",
      invoiceNo: "Factura Nº",
      date: "Fecha",
      dueDate: "Vencimiento",
      terms: "Plazo",
      pos: "Nº",
      description: "Concepto",
      qty: "Cant.",
      price: "Precio",
      tax: "IVA",
      amount: "Base",
      subtotal: "Base Imponible",
      itemDiscount: "Descuento línea",
      extraDiscount: "Descuento total",
      shipping: "Envío",
      taxVat: "IVA",
      grandTotal: "Total Factura",
      bankDetails: "Datos de Pago",
      paymentRef: "Concepto",
    },
  },
};
