import Image from "next/image";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { localizePath, normalizeLocale } from "@/data/localizedContent";
import { images } from "@/lib/assets";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Procurement / level 01",
    title: ["OEM", "Supply", "Program"],
    intro:
      "Engineered logistics. Bulk procurement architecture optimized for continuous manufacturing operations.",
    cta: "Start RFQ",
    metrics: [
      ["JIT Delivery Metric", "99.8%", "Global supply continuity maintained across tier-1 assembly nodes."],
      ["Volume Capacity", "Scale Elasticity", "Minimum order quantities, priority allocation, and rolling forecast alignment."],
      ["ERP Interface", "REST / EDI", "Procurement API access for synchronized inventory states."],
    ],
    standards: "Global Continuity Standards",
    node: "Swiss node active // Bern region",
  },
  de: {
    label: "Beschaffung / Ebene 01",
    title: ["OEM", "Versorgungsprogramm"],
    intro:
      "Strukturierte Logistik und Beschaffungsarchitektur für kontinuierliche Fertigungsprozesse.",
    cta: "Anfrage starten",
    metrics: [
      ["JIT-Lieferkennzahl", "99.8%", "Versorgungskontinuität über Tier-1-Montagepunkte hinweg."],
      ["Volumenkapazität", "Skalierbarkeit", "Mindestmengen, Prioritätsallokation und rollierende Forecast-Abstimmung."],
      ["ERP-Schnittstelle", "REST / EDI", "Beschaffungs-API-Zugriff für synchronisierte Bestandsdaten."],
    ],
    standards: "Globale Kontinuitätsstandards",
    node: "Schweizer Knoten aktiv // Region Bern",
  },
  fr: {
    label: "Approvisionnement / niveau 01",
    title: ["Programme", "d'approvisionnement", "OEM"],
    intro:
      "Logistique structurée et architecture d'approvisionnement pour des opérations de fabrication continues.",
    cta: "Demander un devis",
    metrics: [
      ["Indicateur JIT", "99.8%", "Continuité d'approvisionnement maintenue sur les points d'assemblage tier-1."],
      ["Capacité volume", "Élasticité d'échelle", "Quantités minimales, allocation prioritaire et alignement des prévisions."],
      ["Interface ERP", "REST / EDI", "Accès API d'approvisionnement pour états d'inventaire synchronisés."],
    ],
    standards: "Standards de continuité globale",
    node: "Noeud suisse actif // Région de Berne",
  },
};

export default async function OemSupplyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

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
              {localized.label}
            </div>
            <h1 className="max-w-5xl break-words font-mono text-[46px] uppercase leading-[1.12] text-on-surface sm:text-headline-lg md:text-[72px] lg:text-display-xl">
              {localized.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="max-w-sm text-left md:text-right">
            <p className="font-mono text-technical-md text-industrial-silver">
              {localized.intro}
            </p>
            <TechnicalButton href={localizePath(locale, "/rfq")} className="mt-8">
              {localized.cta}
            </TechnicalButton>
          </div>
        </div>
      </section>
      <section className="grid gap-gutter bg-surface-container-lowest px-margin-mobile py-24 md:grid-cols-12 md:px-margin-desktop">
        <div className="space-y-gutter md:col-span-6">
          {localized.metrics.map(([label, value, metricCopy]) => (
            <article
              key={label}
              className="relative min-h-64 overflow-hidden border border-graphite-muted bg-surface/50 p-8 backdrop-blur-xl"
            >
              <div className="font-mono text-data-sm uppercase text-outline">{label}</div>
              <div className="mt-12 font-mono text-headline-lg uppercase text-on-surface">
                {value}
              </div>
              <p className="mt-4 font-mono text-technical-md text-industrial-silver">{metricCopy}</p>
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
                {localized.standards}
              </span>
              <span className="mt-2 font-mono text-data-sm uppercase text-industrial-silver">
                {localized.node}
              </span>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
