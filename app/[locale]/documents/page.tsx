import { PageShell } from "@/components/motion/MotionProvider";
import { documents } from "@/data/products";

export default function DocumentsPage() {
  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        Technical archive
      </span>
      <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-industrial-silver sm:text-headline-lg md:text-display-xl">
        Documents
      </h1>
      <div className="mt-12 grid gap-gutter md:grid-cols-3">
        {documents.map((doc) => (
          <article
            key={doc.id}
            className="reticle-corners relative flex min-h-80 flex-col border border-graphite-muted bg-surface-container-low/50 p-8 transition-colors hover:border-warning-red"
          >
            <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {doc.type}
            </div>
            <h2 className="mt-16 max-w-xs font-mono text-technical-md uppercase text-on-surface">
              {doc.title}
            </h2>
            <p className="mt-8 max-w-sm border-t border-graphite-muted pt-5 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
              PDF dossier prepared for supplier review and internal project sharing.
            </p>
            {"downloadHref" in doc && doc.downloadHref ? (
              <a
                href={doc.downloadHref}
                download
                className="mt-auto inline-flex w-fit translate-y-[25px] border border-warning-red bg-warning-red px-5 py-3 font-mono text-label-xs uppercase tracking-[0.14em] text-primary-container transition-colors hover:bg-transparent hover:text-warning-red"
              >
                Download PDF
              </a>
            ) : null}
            <div className="mt-8 flex justify-between border-t border-graphite-muted pt-4 font-mono text-data-sm uppercase text-outline">
              <span>{doc.id}</span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
