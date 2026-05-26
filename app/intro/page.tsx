import Image from "next/image";
import Link from "next/link";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { CurtainReveal } from "@/components/motion/Reveals";
import { ThemedProductImage } from "@/components/product/ThemedProductImage";
import {
  powerManagementFamilies,
  powerManagementMetrics,
  powerManagementStandards,
} from "@/data/powerManagement";
import { images } from "@/lib/assets";

export default function IntroPage() {
  return (
    <PageShell className="relative min-h-screen overflow-x-hidden pt-20 md:pl-20">
      <Image
        src={images.intro}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20 dark:opacity-55 mix-blend-multiply dark:mix-blend-luminosity grayscale transition-opacity duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
      <section className="relative z-10 grid min-h-[calc(100vh-80px)] content-center gap-12 px-margin-mobile py-16 md:px-margin-desktop">
        <div className="w-full">
          <CurtainReveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-label-xs uppercase tracking-[0.22em] text-warning-red">
              <span className="h-px w-16 bg-warning-red" /> Power conversion dossier
            </div>
          </CurtainReveal>
          <h1 className="max-w-6xl font-mono text-headline-lg-mobile uppercase leading-tight text-on-surface sm:text-headline-lg md:text-display-xl md:leading-none">
            Power Management
          </h1>
          <p className="mt-8 max-w-4xl font-mono text-technical-md uppercase text-on-surface-variant">
            IGBT, SiC MOSFET, MOSFET, and converter systems for high-efficiency industrial
            architectures.
          </p>
          <div className="mt-10 grid max-w-5xl gap-gutter md:grid-cols-3">
            {powerManagementMetrics.map((metric, index) => (
              <CurtainReveal
                key={metric}
                delay={index * 0.08}
                className="reticle-corners border border-graphite-muted bg-surface/45 p-5 backdrop-blur-md"
              >
                <span className="font-mono text-data-sm uppercase text-industrial-silver">
                  {metric}
                </span>
              </CurtainReveal>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <TechnicalButton href="/products/power-management">
              View Power Portfolio
            </TechnicalButton>
          </div>
        </div>
        <div className="grid gap-gutter">
          {powerManagementFamilies.map((family, index) => (
            <CurtainReveal
              key={family.slug}
              delay={0.12 + index * 0.06}
              className="group relative grid overflow-hidden border border-graphite-muted bg-surface-container-low/70 p-5 backdrop-blur-xl transition-colors hover:border-industrial-silver md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-gutter"
            >
              <Link
                href={`/power-management/${family.slug}`}
                className="absolute inset-0 z-20"
                aria-label={`Open ${family.name} detail dossier`}
              />
              <div className="relative aspect-[16/10] overflow-hidden border border-graphite-muted bg-surface-container-lowest md:aspect-auto md:min-h-[320px]">
                <ThemedProductImage
                  src={family.image}
                  darkSrc={family.image}
                  alt=""
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
              <div className="grid content-center py-6 md:py-0">
                <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
                  {family.label}
                </div>
                <h2 className="mt-3 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
                  {family.name}
                </h2>
                <p className="mt-4 max-w-3xl font-mono text-technical-md uppercase text-on-surface-variant">
                  {family.summary}
                </p>
                <div className="mt-8 grid gap-3 border-t border-graphite-muted pt-5">
                  <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-industrial-silver">
                    Target use
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {family.targetApplications.slice(0, 3).map((application) => (
                      <span
                        key={application.label}
                        className="border border-outline-variant bg-surface/60 px-3 py-2 font-mono text-label-xs uppercase text-on-surface-variant"
                      >
                        {application.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CurtainReveal>
          ))}
        </div>
        <CurtainReveal
          delay={0.36}
          className="border-y border-graphite-muted bg-surface/50 py-6 backdrop-blur-md"
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)]">
            <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
              Compliance signal
            </div>
            <div className="flex flex-wrap gap-3">
              {powerManagementStandards.map((standard) => (
                <span
                  key={standard}
                  className="font-mono text-data-sm uppercase text-industrial-silver"
                >
                  {standard}
                </span>
              ))}
            </div>
          </div>
        </CurtainReveal>
      </section>
    </PageShell>
  );
}
