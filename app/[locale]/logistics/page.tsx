import { PageShell } from "@/components/motion/MotionProvider";
import { normalizeLocale } from "@/data/localizedContent";
import { images } from "@/lib/assets";
import { setRequestLocale } from "next-intl/server";

const copy = {
  en: {
    label: "Global logistics",
    title: "Continuity Grid",
    nodes: ["Swiss Node", "Zurich", "Istanbul", "Detroit"],
    items: ["Forecast locking", "Priority allocation", "Cold-chain technical handling", "Dual-source routing"],
  },
  de: {
    label: "Globale Logistik",
    title: "Kontinuitätsnetz",
    nodes: ["Swiss Node", "Zürich", "Istanbul", "Detroit"],
    items: ["Forecast-Sicherung", "Prioritätsallokation", "Technisches Cold-Chain-Handling", "Dual-Source-Routing"],
  },
  fr: {
    label: "Logistique globale",
    title: "Réseau de continuité",
    nodes: ["Swiss Node", "Zurich", "Istanbul", "Detroit"],
    items: ["Verrouillage forecast", "Allocation prioritaire", "Handling technique cold-chain", "Routage dual-source"],
  },
};

export default async function LogisticsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const localized = copy[normalizeLocale(locale)];

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {localized.label}
      </span>
      <h1 className="mt-5 max-w-5xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
        {localized.title}
      </h1>
      <div className="mt-12 grid gap-gutter lg:grid-cols-[1fr_0.8fr]">
        <div
          className="relative min-h-[560px] overflow-hidden border border-graphite-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${images.oemMap})` }}
        >
          <div className="absolute inset-0 bg-background/55" />
          {localized.nodes.map((node, index) => (
            <div
              key={node}
              className="absolute border border-graphite-muted bg-surface/75 px-3 py-2 font-mono text-label-xs uppercase text-industrial-silver backdrop-blur"
              style={{ left: `${18 + index * 17}%`, top: `${25 + (index % 2) * 28}%` }}
            >
              <span className="mr-2 inline-block h-2 w-2 bg-warning-red" />
              {node}
            </div>
          ))}
        </div>
        <div className="space-y-gutter">
          {localized.items.map((item, index) => (
            <div
              key={item}
              className="border border-graphite-muted bg-surface-container-low/50 p-6"
            >
              <div className="font-mono text-label-xs uppercase text-warning-red">
                LOG-{String(index + 1).padStart(2, "0")}
              </div>
              <div className="mt-6 font-mono text-technical-md uppercase text-industrial-silver">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
