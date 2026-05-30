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
            className="reticle-corners relative flex min-h-[440px] flex-col border border-graphite-muted bg-surface-container-low/50 p-8 transition-colors hover:border-warning-red"
          >
            <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {doc.type}
            </div>
            <h2 className="mt-12 max-w-xs font-mono text-technical-md uppercase text-on-surface">
              {doc.title}
            </h2>
            <p className="mt-4 max-w-sm border-t border-graphite-muted pt-4 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
              {doc.description}
            </p>
            
            <div className="mt-6 grid grid-cols-2 gap-y-3 border-t border-graphite-muted/40 pt-4 font-mono text-[10px] uppercase text-outline">
              <div>
                <span className="block text-[8px] text-outline/60 tracking-wider">Revision</span>
                <span className="text-industrial-silver font-semibold">{doc.revision}</span>
              </div>
              <div>
                <span className="block text-[8px] text-outline/60 tracking-wider">File Size</span>
                <span className="text-industrial-silver font-semibold">{doc.fileSize}</span>
              </div>
              <div className="col-span-2">
                <span className="block text-[8px] text-outline/60 tracking-wider">Publication Date</span>
                <span className="text-industrial-silver font-semibold">{doc.issueDate}</span>
              </div>
            </div>

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
              <span className="text-warning-red font-semibold">{doc.status}</span>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
