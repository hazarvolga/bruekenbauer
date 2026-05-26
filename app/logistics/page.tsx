import { PageShell } from "@/components/motion/MotionProvider";
import { images } from "@/lib/assets";

export default function LogisticsPage() {
  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        Global logistics
      </span>
      <h1 className="mt-5 max-w-5xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-display-xl">
        Continuity Grid
      </h1>
      <div className="mt-12 grid gap-gutter lg:grid-cols-[1fr_0.8fr]">
        <div
          className="relative min-h-[560px] overflow-hidden border border-graphite-muted bg-cover bg-center"
          style={{ backgroundImage: `url(${images.oemMap})` }}
        >
          <div className="absolute inset-0 bg-background/55" />
          {["Swiss Node", "Zurich", "Istanbul", "Detroit"].map((node, index) => (
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
          {[
            "Forecast locking",
            "Priority allocation",
            "Cold-chain technical handling",
            "Dual-source routing",
          ].map((item, index) => (
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
