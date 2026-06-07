import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Protocol / compliance",
    title: "Compliance Matrix",
    headers: ["Standard", "Status", "Revision", "Issue date", "Document type", "Reference"],
    statuses: ["Validated", "Validated", "Supplier scope", "Traceable"],
    documentTypes: ["Declaration", "Declaration", "QMS record", "CMRT record"],
  },
  de: {
    label: "Protokoll / Compliance",
    title: "Compliance Matrix",
    headers: ["Standard", "Status", "Revision", "Ausgabedatum", "Dokumenttyp", "Referenz"],
    statuses: ["Validiert", "Validiert", "Lieferantenumfang", "Rückverfolgbar"],
    documentTypes: ["Erklärung", "Erklärung", "QMS-Nachweis", "CMRT-Nachweis"],
  },
  fr: {
    label: "Protocole / conformité",
    title: "Matrice de conformité",
    headers: ["Standard", "Statut", "Révision", "Date d'émission", "Type de document", "Référence"],
    statuses: ["Validé", "Validé", "Périmètre fournisseur", "Traçable"],
    documentTypes: ["Déclaration", "Déclaration", "Enregistrement QMS", "Enregistrement CMRT"],
  },
};

export default async function CompliancePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];
  const rows = [
    {
      standard: "RoHS",
      status: localized.statuses[0],
      revision: "Rev 2.1",
      issueDate: "2026-11-08",
      documentType: localized.documentTypes[0],
      reference: "CERT-211-R",
    },
    {
      standard: "REACH",
      status: localized.statuses[1],
      revision: "Rev 2.1",
      issueDate: "2026-11-08",
      documentType: localized.documentTypes[1],
      reference: "CERT-211-R",
    },
    {
      standard: "ISO 9001",
      status: localized.statuses[2],
      revision: "Rev 1.3",
      issueDate: "2026-10-16",
      documentType: localized.documentTypes[2],
      reference: "QMS-44",
    },
    {
      standard: "Conflict minerals",
      status: localized.statuses[3],
      revision: "Rev 1.0",
      issueDate: "2026-01-12",
      documentType: localized.documentTypes[3],
      reference: "CMRT-2026",
    },
  ];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {localized.label}
      </span>
      <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
        {localized.title}
      </h1>
      <div className="relative mt-12 overflow-hidden border border-graphite-muted bg-surface-container-low/50">
        <div className="hidden border-b border-graphite-muted bg-surface-container-high/30 p-5 font-mono text-label-xs uppercase tracking-[0.14em] text-outline md:grid md:grid-cols-[1.1fr_0.8fr_0.7fr_0.9fr_1fr_0.8fr]">
          {localized.headers.map((header, index) => (
            <span key={header} className={index === localized.headers.length - 1 ? "text-right" : ""}>
              {header}
            </span>
          ))}
        </div>
        {rows.map((row) => (
          <div
            key={row.standard}
            className="grid grid-cols-2 gap-3 border-b border-graphite-muted p-5 font-mono text-data-sm uppercase last:border-b-0 md:grid-cols-[1.1fr_0.8fr_0.7fr_0.9fr_1fr_0.8fr]"
          >
            <span className="col-span-2 text-industrial-silver md:col-span-1">{row.standard}</span>
            <span className="text-warning-red">{row.status}</span>
            <span className="text-outline">{row.revision}</span>
            <span className="text-outline">{row.issueDate}</span>
            <span className="text-outline">{row.documentType}</span>
            <span className="text-outline md:text-right">{row.reference}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
