import Image from "next/image";
import Link from "next/link";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { CurtainReveal } from "@/components/motion/Reveals";
import { ThemedProductImage } from "@/components/product/ThemedProductImage";
import { getPowerFamilyCopy, localizePath, normalizeLocale } from "@/data/localizedContent";
import {
  powerManagementFamilies,
  powerManagementMetrics,
  powerManagementStandards,
} from "@/data/powerManagement";
import { images } from "@/lib/assets";

export default async function IntroPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const localizedFamilies = powerManagementFamilies.map((family) =>
    getPowerFamilyCopy(family, normalizedLocale)
  );
  const copy = {
    en: {
      label: "Power conversion dossier",
      title: "Power Management",
      description:
        "IGBT, SiC MOSFET, MOSFET, and converter systems for high-efficiency industrial architectures.",
      portfolio: "View Power Portfolio",
      targetUse: "Target use",
      compliance: "Compliance signal",
    },
    de: {
      label: "Power-Conversion-Dossier",
      title: "Power Management",
      description:
        "IGBT-, SiC-MOSFET-, MOSFET- und Converter-Systeme für hocheffiziente Industriearchitekturen.",
      portfolio: "Power-Portfolio ansehen",
      targetUse: "Zielanwendung",
      compliance: "Compliance-Signal",
    },
    fr: {
      label: "Dossier de conversion de puissance",
      title: "Gestion de l'énergie",
      description:
        "Systèmes IGBT, SiC MOSFET, MOSFET et converters pour architectures industrielles haute efficacité.",
      portfolio: "Voir le portefeuille power",
      targetUse: "Utilisation cible",
      compliance: "Signal de conformité",
    },
  }[normalizedLocale];

  return (
    <PageShell className="relative min-h-screen overflow-x-hidden pt-20 md:pl-20">
      <Image
        src={images.intro}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-20 mix-blend-multiply grayscale transition-opacity duration-700 dark:opacity-55 dark:mix-blend-luminosity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
      <section className="relative z-10 grid min-h-[calc(100vh-80px)] content-center gap-12 px-margin-mobile py-16 md:px-margin-desktop">
        <div className="w-full">
          <CurtainReveal>
            <div className="mb-8 flex items-center gap-4 font-mono text-label-xs uppercase tracking-[0.22em] text-warning-red">
              <span className="h-px w-16 bg-warning-red" /> {copy.label}
            </div>
          </CurtainReveal>
          <h1 className="max-w-6xl font-mono text-headline-lg-mobile uppercase leading-tight text-on-surface sm:text-headline-lg md:text-display-xl md:leading-none">
            {copy.title}
          </h1>
          <p className="mt-8 max-w-4xl font-mono text-technical-md uppercase text-on-surface-variant">
            {copy.description}
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
            <TechnicalButton href={localizePath(normalizedLocale, "/products/power-management")}>
              {copy.portfolio}
            </TechnicalButton>
          </div>
        </div>
        <div className="grid gap-gutter">
          {localizedFamilies.map((family, index) => (
            <CurtainReveal
              key={family.slug}
              delay={0.12 + index * 0.06}
              className="group relative grid overflow-hidden border border-graphite-muted bg-surface-container-low/70 p-5 backdrop-blur-xl transition-colors hover:border-industrial-silver md:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] md:gap-gutter"
            >
              <Link
                href={localizePath(normalizedLocale, `/power-management/${family.slug}`)}
                className="absolute inset-0 z-20"
                aria-label={`Open ${family.name} detail dossier`}
              />
              <div className="relative aspect-[16/10] overflow-hidden border border-graphite-muted bg-surface-container-lowest md:aspect-auto md:min-h-[320px]">
                <ThemedProductImage
                  src={family.image}
                  darkSrc={family.image}
                  alt=""
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="group-hover:scale-102 object-cover transition-transform duration-700"
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
                    {copy.targetUse}
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
              {copy.compliance}
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
