import Link from "next/link";

const slides = Array.from({ length: 10 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");
  return {
    number,
    src: `/presentation-review/slides/slide-${number}.png`,
  };
});

export default function PresentationReviewPage() {
  return (
    <main className="min-h-screen bg-background pt-20 md:ml-20">
      <section className="border-b border-graphite-muted px-margin-mobile py-8 md:px-margin-desktop">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              Presentation review
            </div>
            <h1 className="mt-3 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
              brückenbauer Brand Dossier
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 font-mono text-label-xs uppercase tracking-[0.14em]">
            <Link
              href="/presentation-review/brueckenbauer-brand-dossier.pdf"
              className="border border-graphite-muted px-4 py-3 text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red"
            >
              Open PDF
            </Link>
            <Link
              href="/presentation-review/brueckenbauer-brand-dossier.pptx"
              className="border border-warning-red px-4 py-3 text-warning-red transition-colors hover:bg-warning-red hover:text-primary-container"
            >
              PPTX
            </Link>
          </div>
        </div>
      </section>
      <section className="grid gap-8 px-margin-mobile py-8 md:px-margin-desktop">
        {slides.map((slide) => (
          <article
            key={slide.number}
            id={`slide-${slide.number}`}
            className="border border-graphite-muted bg-surface-container-lowest p-4"
          >
            <div className="mb-3 flex items-center justify-between font-mono text-label-xs uppercase tracking-[0.16em]">
              <span className="text-warning-red">Slide {slide.number}</span>
              <Link
                href={slide.src}
                className="text-outline transition-colors hover:text-warning-red"
              >
                Open image
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={`brückenbauer Brand Dossier slide ${slide.number}`}
              className="block w-full border border-graphite-muted"
            />
          </article>
        ))}
      </section>
    </main>
  );
}
