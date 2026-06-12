type LegalSection = {
  title: string;
  paragraphs: string[];
};

type LegalDocumentProps = {
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalDocument({ label, title, updated, intro, sections }: LegalDocumentProps) {
  return (
    <>
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {label}
      </span>
      <h1 className="mt-5 max-w-4xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        {title}
      </h1>
      <div className="mt-4 font-mono text-label-xs uppercase tracking-[0.14em] text-on-surface-muted">
        {updated}
      </div>

      <article className="mt-10 max-w-5xl border border-graphite-muted bg-surface-container-low/45 p-6 font-mono text-technical-md leading-relaxed text-on-surface-variant md:p-8">
        <p className="max-w-3xl text-on-surface">{intro}</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {sections.map((section) => (
            <section key={section.title} className="border-t border-graphite-muted pt-5">
              <h2 className="font-mono text-label-sm uppercase tracking-[0.16em] text-warning-red">
                {section.title}
              </h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 border-t border-graphite-muted pt-5">
          Contact:{" "}
          <a className="text-warning-red hover:underline" href="mailto:bus.dev@brueckenbauer-gmbh.ch">
            bus.dev@brueckenbauer-gmbh.ch
          </a>
        </p>
      </article>
    </>
  );
}
