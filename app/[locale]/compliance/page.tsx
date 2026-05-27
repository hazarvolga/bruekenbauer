import { PageShell } from "@/components/motion/MotionProvider";

export default function CompliancePage() {
  const rows = [
    {
      standard: "RoHS",
      status: "Validated",
      revision: "Rev 2.1",
      issueDate: "2025-11-08",
      documentType: "Declaration",
      reference: "CERT-211-R",
    },
    {
      standard: "REACH",
      status: "Validated",
      revision: "Rev 2.1",
      issueDate: "2025-11-08",
      documentType: "Declaration",
      reference: "CERT-211-R",
    },
    {
      standard: "ISO 9001",
      status: "Supplier scope",
      revision: "Rev 1.3",
      issueDate: "2025-10-16",
      documentType: "QMS record",
      reference: "QMS-44",
    },
    {
      standard: "Conflict minerals",
      status: "Traceable",
      revision: "Rev 1.0",
      issueDate: "2026-01-12",
      documentType: "CMRT record",
      reference: "CMRT-2026",
    },
  ];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        Protocol / compliance
      </span>
      <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
        Compliance Matrix
      </h1>
      <div className="relative mt-12 overflow-hidden border border-graphite-muted bg-surface-container-low/50">
        <div className="hidden border-b border-graphite-muted bg-surface-container-high/30 p-5 font-mono text-label-xs uppercase tracking-[0.14em] text-outline md:grid md:grid-cols-[1.1fr_0.8fr_0.7fr_0.9fr_1fr_0.8fr]">
          <span>Standard</span>
          <span>Status</span>
          <span>Revision</span>
          <span>Issue date</span>
          <span>Document type</span>
          <span className="text-right">Reference</span>
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
