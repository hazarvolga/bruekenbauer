import { cn } from "@/lib/utils";

/**
 * HudMetric — v02
 * Uses cn() for tone-driven color class — object syntax replaces ternary chain.
 */
export function HudMetric({
  label,
  value,
  tone = "silver",
}: {
  label: string;
  value: string;
  tone?: "silver" | "red" | "orange";
}) {
  return (
    <div className="border border-graphite-muted bg-surface/45 p-5 backdrop-blur-md">
      <div className="mb-3 font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
        {label}
      </div>
      <div
        className={cn("font-mono text-technical-md uppercase", {
          "text-warning-red": tone === "red",
          "text-data-orange": tone === "orange",
          "text-industrial-silver": tone === "silver",
        })}
      >
        {value}
      </div>
    </div>
  );
}
