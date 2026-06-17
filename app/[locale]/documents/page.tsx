import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { documents } from "@/data/products";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Downloadable documents",
    title: "Documents",
    revision: "Revision",
    fileSize: "File Size",
    publicationDate: "Publication Date",
    download: "Download PDF",
    docs: {
      "BR-PORT-2026": {
        title: "Component Portfolio 2026",
        type: "Portfolio",
        status: "Active",
        description:
          "Comprehensive catalog of active component groups, temperature sensors, electromechanical adapters, and acoustics.",
      },
      "BR-PWR-2026": {
        title: "Power Management Portfolio",
        type: "Portfolio",
        status: "Active",
        description:
          "Detailed technical documentation for advanced IGBT, SiC MOSFET, power rectifiers, and high-frequency power supplies.",
      },
      "BR-COMP-2026": {
        title: "Company Profile 2026",
        type: "Company",
        status: "Active",
        description:
          "Overview of corporate engineering philosophy, Swiss distribution precision, and strategic partnership models.",
      },
    },
  },
  de: {
    label: "Herunterladbare Dokumente",
    title: "Dokumente",
    revision: "Revision",
    fileSize: "Dateigröße",
    publicationDate: "Veröffentlichungsdatum",
    download: "PDF herunterladen",
    docs: {
      "BR-PORT-2026": {
        title: "Komponentenportfolio 2026",
        type: "Portfolio",
        status: "Aktiv",
        description:
          "Umfassender Katalog aktiver Komponentengruppen, Temperatursensoren, elektromechanischer Adapter und Akustik.",
      },
      "BR-PWR-2026": {
        title: "Power Management Portfolio",
        type: "Portfolio",
        status: "Aktiv",
        description:
          "Technische Dokumentation zu IGBT, SiC MOSFET, Leistungsgleichrichtern und High-Frequency Power Supplies.",
      },
      "BR-COMP-2026": {
        title: "Unternehmensprofil 2026",
        type: "Unternehmen",
        status: "Aktiv",
        description:
          "Überblick über Engineering-Philosophie, Schweizer Distributionspräzision und strategische Partnerschaftsmodelle.",
      },
    },
  },
  fr: {
    label: "Documents téléchargeables",
    title: "Documents",
    revision: "Révision",
    fileSize: "Taille du fichier",
    publicationDate: "Date de publication",
    download: "Télécharger PDF",
    docs: {
      "BR-PORT-2026": {
        title: "Portefeuille composants 2026",
        type: "Portfolio",
        status: "Actif",
        description:
          "Catalogue complet des groupes de composants actifs, capteurs de température, adaptateurs électromécaniques et acoustique.",
      },
      "BR-PWR-2026": {
        title: "Power Management Portfolio",
        type: "Portfolio",
        status: "Actif",
        description:
          "Documentation technique pour IGBT, SiC MOSFET, redresseurs de puissance et high-frequency power supplies.",
      },
      "BR-COMP-2026": {
        title: "Profil d'entreprise 2026",
        type: "Entreprise",
        status: "Actif",
        description:
          "Présentation de la philosophie d'ingénierie, de la précision suisse de distribution et des modèles de partenariat stratégique.",
      },
    },
  },
};

export default async function DocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-12 pt-32 md:ml-20 md:px-margin-desktop">
      <div className="mx-auto w-full max-w-[1600px]">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {localized.label}
        </span>
        <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-industrial-silver sm:text-headline-lg md:text-display-xl">
          {localized.title}
        </h1>
        <div className="mt-10 grid gap-gutter md:grid-cols-3">
          {documents.map((doc) => {
            const docCopy = localized.docs[doc.id as keyof typeof localized.docs];

            return (
              <article
                key={doc.id}
                className="reticle-corners relative flex min-h-[380px] flex-col border border-graphite-muted bg-surface-container-low/50 p-7 transition-colors hover:border-warning-red"
              >
                <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                  {docCopy.type}
                </div>
                <h2 className="mt-8 max-w-xs font-mono text-technical-md uppercase text-on-surface">
                  {docCopy.title}
                </h2>
                <p className="mt-4 max-w-sm border-t border-graphite-muted pt-4 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
                  {docCopy.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-y-3 border-t border-graphite-muted/40 pt-4 font-mono text-[10px] uppercase text-outline">
                  <div>
                    <span className="block text-[8px] text-outline/60 tracking-wider">{localized.revision}</span>
                    <span className="text-industrial-silver font-semibold">{doc.revision}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] text-outline/60 tracking-wider">{localized.fileSize}</span>
                    <span className="text-industrial-silver font-semibold">{doc.fileSize}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="block text-[8px] text-outline/60 tracking-wider">{localized.publicationDate}</span>
                    <span className="text-industrial-silver font-semibold">{doc.issueDate}</span>
                  </div>
                </div>

                {"downloadHref" in doc && doc.downloadHref ? (
                  <a
                    href={doc.downloadHref}
                    download
                    className="mt-auto inline-flex w-fit border border-warning-red bg-warning-red px-5 py-3 font-mono text-label-xs uppercase tracking-[0.14em] text-primary-container transition-colors hover:bg-transparent hover:text-warning-red"
                  >
                    {localized.download}
                  </a>
                ) : null}
                <div className="mt-8 flex justify-between border-t border-graphite-muted pt-4 font-mono text-data-sm uppercase text-outline">
                  <span>{doc.id}</span>
                  <span className="text-warning-red font-semibold">{docCopy.status}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
