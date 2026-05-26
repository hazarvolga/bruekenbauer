import Image from "next/image";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { images } from "@/lib/assets";

export default function OemSupplyPage() {
  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <section className="relative flex min-h-[calc(100vh-80px)] items-end overflow-x-hidden px-margin-mobile py-16 md:px-margin-desktop">
        <Image
          src={images.oemHero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 mix-blend-normal grayscale dark:mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-background/30" />
        <div className="relative z-10 flex w-full flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <div className="mb-8 flex items-center gap-3 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              <span className="h-px w-12 bg-warning-red" />
              Procurement / level 01
            </div>
            <h1 className="font-mono text-headline-lg-mobile uppercase text-on-surface sm:text-headline-lg md:text-display-xl">
              OEM
              <br />
              Supply
              <br />
              Program
            </h1>
          </div>
          <div className="max-w-sm text-left md:text-right">
            <p className="font-mono text-technical-md text-industrial-silver">
              Engineered logistics. Bulk procurement architecture optimized for continuous
              manufacturing operations.
            </p>
            <TechnicalButton href="/rfq" className="mt-8">
              Initialize Contract
            </TechnicalButton>
          </div>
        </div>
      </section>
      <section className="grid gap-gutter bg-surface-container-lowest px-margin-mobile py-24 md:grid-cols-12 md:px-margin-desktop">
        <div className="space-y-gutter md:col-span-6">
          {[
            [
              "JIT Delivery Metric",
              "99.8%",
              "Global supply continuity maintained across tier-1 assembly nodes.",
            ],
            [
              "Volume Capacity",
              "Scale Elasticity",
              "Minimum order quantities, priority allocation, and rolling forecast alignment.",
            ],
            [
              "ERP Interface",
              "REST / EDI",
              "Procurement API access for synchronized inventory states.",
            ],
          ].map(([label, value, copy]) => (
            <article
              key={label}
              className="relative min-h-64 overflow-hidden border border-graphite-muted bg-surface/50 p-8 backdrop-blur-xl"
            >
              <div className="font-mono text-data-sm uppercase text-outline">{label}</div>
              <div className="mt-12 font-mono text-headline-lg uppercase text-on-surface">
                {value}
              </div>
              <p className="mt-4 font-mono text-technical-md text-industrial-silver">{copy}</p>
              <div className="absolute bottom-0 left-0 h-1 w-4/5 bg-warning-red" />
            </article>
          ))}
        </div>
        <div className="md:col-span-6">
          <div className="sticky top-32 h-[624px] overflow-hidden border border-graphite-muted">
            <Image
              src={images.oemMap}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover opacity-60 mix-blend-normal grayscale dark:mix-blend-screen"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface-container-lowest to-transparent p-8">
              <span className="font-mono text-technical-md uppercase text-on-surface">
                Global Continuity Standards
              </span>
              <span className="mt-2 font-mono text-data-sm uppercase text-industrial-silver">
                Swiss node active // Bern region
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
