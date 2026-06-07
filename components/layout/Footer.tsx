import Link from "next/link";
import { localizePath, normalizeLocale } from "@/data/localizedContent";

const footerCopy = {
  en: {
    headquarters: "Corporate Headquarters",
    registry: "Registry & Identification",
    contact: "Direct Contact",
    email: "Email",
    response: "Status: Available for New Projects",
    commercialRegister: "Commercial Register Canton Bern",
    managingDirector: "Managing Director",
    compliance: "Compliance",
    documents: "Documents",
    contactLink: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
    cookies: "Cookie Policy",
    credit: "Designed & Developed by",
    country: "Switzerland",
  },
  de: {
    headquarters: "Firmensitz",
    registry: "Register & Identifikation",
    contact: "Direkter Kontakt",
    email: "E-Mail",
    response: "Status: Verfügbar für neue Projekte",
    commercialRegister: "Handelsregister Kanton Bern",
    managingDirector: "Geschäftsführer",
    compliance: "Compliance",
    documents: "Dokumente",
    contactLink: "Kontakt",
    privacy: "Datenschutzerklärung",
    terms: "Allgemeine Geschäftsbedingungen",
    cookies: "Cookie-Richtlinie",
    credit: "Designed & Developed by",
    country: "Schweiz",
  },
  fr: {
    headquarters: "Siège social",
    registry: "Registre & identification",
    contact: "Contact direct",
    email: "E-mail",
    response: "Statut : disponible pour de nouveaux projets",
    commercialRegister: "Registre du commerce Canton de Berne",
    managingDirector: "Directeur général",
    compliance: "Conformité",
    documents: "Documents",
    contactLink: "Contact",
    privacy: "Politique de confidentialité",
    terms: "Conditions générales",
    cookies: "Politique de cookies",
    credit: "Designed & Developed by",
    country: "Suisse",
  },
};

export function Footer({ locale }: { locale: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const copy = footerCopy[normalizedLocale];

  return (
    <footer className="border-t border-graphite-muted bg-surface px-margin-mobile py-8 font-mono text-data-sm text-on-surface-variant md:ml-20 md:px-gutter">
      <div className="grid gap-6 border-b border-graphite-muted/40 pb-6 mb-6 md:grid-cols-3">
        <div>
          <span className="text-label-xs text-outline uppercase block tracking-wider mb-2">{copy.headquarters}</span>
          <p className="text-on-surface-variant leading-relaxed">
            brückenbauer GmbH<br />
            Dachsweg 12, 3075 Rüfenacht BE<br />
            {copy.country}
          </p>
        </div>
        <div>
          <span className="text-label-xs text-outline uppercase block tracking-wider mb-2">{copy.registry}</span>
          <p className="text-on-surface-variant leading-relaxed">
            UID: CHE-191.442.645<br />
            {copy.commercialRegister}<br />
            {copy.managingDirector}: Dr. Andreas Werthmüller
          </p>
        </div>
        <div>
          <span className="text-label-xs text-outline uppercase block tracking-wider mb-2">{copy.contact}</span>
          <p className="text-on-surface-variant leading-relaxed">
            Tel: +41 (0)76 222 45 54<br />
            {copy.email}: <a href="mailto:bus.dev@brueckenbauer-gmbh.ch" className="text-warning-red hover:underline">bus.dev@brueckenbauer-gmbh.ch</a><br />
            {copy.response}
          </p>
        </div>
      </div>
      
      <div className="flex flex-col gap-4 border-t border-graphite-muted/50 pt-4 text-outline md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.12em]">
          <Link href={localizePath(normalizedLocale, "/privacy-policy")} className="transition-colors hover:text-warning-red">
            {copy.privacy}
          </Link>
          <Link href={localizePath(normalizedLocale, "/terms-and-conditions")} className="transition-colors hover:text-warning-red">
            {copy.terms}
          </Link>
          <Link href={localizePath(normalizedLocale, "/cookie-policy")} className="transition-colors hover:text-warning-red">
            {copy.cookies}
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 uppercase">
          <Link href={localizePath(normalizedLocale, "/compliance")} className="border border-graphite-muted px-3 py-2 text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red">
            {copy.compliance}
          </Link>
          <Link href={localizePath(normalizedLocale, "/documents")} className="border border-graphite-muted px-3 py-2 text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red">
            {copy.documents}
          </Link>
          <Link href={localizePath(normalizedLocale, "/contact")} className="border border-graphite-muted px-3 py-2 text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red">
            {copy.contactLink}
          </Link>
        </div>
      </div>
      <div className="mt-4 border-t border-graphite-muted pt-4 text-[10px] uppercase tracking-[0.08em] text-outline/70">
        {copy.credit}{" "}
        <a
          href="https://hazarvolga.com.tr"
          target="_blank"
          rel="noreferrer"
          className="text-on-surface-variant transition-colors hover:text-warning-red"
        >
          Hazar Volga Ekiz
        </a>
      </div>
    </footer>
  );
}
