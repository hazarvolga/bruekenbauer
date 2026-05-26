import Link from "next/link";
import { HudMetric } from "@/components/layout/HudMetric";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { MaskedImageFrame, StaggerText } from "@/components/motion/Reveals";
import { images } from "@/lib/assets";

export default function HomePage() {
  return (
    <PageShell className="min-h-screen pt-20 md:pl-20">
      <section className="flex min-h-[calc(100vh-80px)] flex-col md:flex-row">
        <MaskedImageFrame
          image={images.homepage}
          label="Macro transformer circuit board"
          className="h-[520px] border-b border-graphite-muted md:sticky md:top-20 md:h-[calc(100vh-80px)] md:w-2/3 md:border-b-0 md:border-r"
          imageClassName="bg-[center_52%]"
          overlayClassName="bg-gradient-to-t from-background/25 via-background/5 to-transparent dark:from-background/70 dark:via-background/15"
        >
          <div className="absolute bottom-6 left-6 font-mono text-data-sm uppercase text-outline-variant">
            LAT: 47.3769 N<br />
            LNG: 8.5417 E<br />
            Z-INDEX: AURAL_09
          </div>
        </MaskedImageFrame>
        <div className="flex flex-1 flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
          <div className="mb-8 flex items-center gap-3 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            <span className="h-1 w-1 bg-warning-red" />
            Operational layer / level 02
          </div>
          <h1 className="font-mono text-headline-lg-mobile uppercase leading-tight text-industrial-silver md:text-[40px]">
            <StaggerText text="Strategic Collaboration in Electronics" />
          </h1>
          <p className="mt-6 max-w-xl font-mono text-technical-md text-on-surface-variant">
            Strategic partnerships and technology consulting for advanced electronics and
            semiconductor industries.
          </p>
          <div className="mt-10 grid gap-gutter md:grid-cols-2">
            <HudMetric label="Supply continuity" value="99.8%" tone="red" />
            <HudMetric label="Active component classes" value="06" />
            <HudMetric label="Procurement latency" value="12ms" />
            <HudMetric label="Compliance state" value="REACH / RoHS" tone="orange" />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <TechnicalButton href="/products">Open Dossier</TechnicalButton>
            <TechnicalButton href="/rfq" variant="ghost">
              Initiate RFQ
            </TechnicalButton>
          </div>
        </div>
      </section>
      <section className="grid gap-gutter border-y border-graphite-muted bg-surface-container-lowest px-margin-mobile py-16 md:grid-cols-3 md:px-margin-desktop">
        {[
          ["Search", "/search", "Technical finder with predictive part matches."],
          ["Compliance", "/compliance", "Traceability, qualification, and protocol review."],
          ["OEM Supply", "/oem-supply", "Bulk procurement and logistics architecture."],
        ].map(([label, href, copy]) => (
          <Link
            key={href}
            href={href}
            className="reticle-corners relative border border-graphite-muted p-8 transition-colors hover:border-warning-red"
          >
            <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {label}
            </span>
            <p className="mt-6 font-mono text-technical-md text-industrial-silver">{copy}</p>
          </Link>
        ))}
      </section>
    </PageShell>
  );
}
