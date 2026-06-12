import Link from "next/link";
import { localizePath, uiCopy } from "@/data/localizedContent";
import type { PowerManagementFamily } from "@/data/powerManagement";
import { slugify } from "@/lib/slug";

type PowerManagementDetailsProps = {
  family: PowerManagementFamily;
  locale: "en" | "de" | "fr";
};

export function PowerManagementDetails({ family, locale }: PowerManagementDetailsProps) {
  const labels = uiCopy[locale].power;

  return (
    <>
      <section className="border-y border-graphite-muted px-margin-mobile py-10 md:px-margin-desktop">
        <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {labels.moduleVariants}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {family.variants.map((variant) => (
            <span
              key={variant}
              className="border border-outline-variant bg-surface-container-low/70 px-3 py-2 font-mono text-label-xs uppercase text-industrial-silver"
            >
              {variant}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-gutter px-margin-mobile py-16 md:px-margin-desktop lg:grid-cols-[0.34fr_0.66fr]">
        <div>
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {labels.keyParameters}
          </div>
          <h2 className="mt-5 max-w-xl font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
            {labels.operatingWindow}
          </h2>
        </div>
        <div className="overflow-hidden border border-graphite-muted bg-surface-container-low/50">
          <div className="grid border-b border-graphite-muted bg-surface-container-high/40 px-5 py-4 font-mono text-label-xs uppercase tracking-[0.14em] text-industrial-silver md:grid-cols-[0.24fr_0.46fr_0.3fr]">
            <span>{labels.parameter}</span>
            <span>{labels.specification}</span>
            <span>{labels.testStandard}</span>
          </div>
          <div className="divide-y divide-graphite-muted">
            {family.performance.map((item) => (
              <div
                key={item.parameter}
                className="grid gap-3 px-5 py-5 font-mono text-data-sm uppercase md:grid-cols-[0.24fr_0.46fr_0.3fr]"
              >
                <div className="text-industrial-silver">{item.parameter}</div>
                <div className="text-on-surface-variant">{item.specification}</div>
                <div className="text-outline">{item.standard}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-gutter border-y border-graphite-muted bg-surface-container-low/30 px-margin-mobile py-16 md:px-margin-desktop lg:grid-cols-2">
        <div>
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {labels.sellingPoints}
          </div>
          <div className="mt-8 grid gap-3">
            {family.sellingPoints.map((point, index) => (
              <div
                key={point}
                className="grid grid-cols-[48px_1fr] border border-graphite-muted bg-surface/50"
              >
                <span className="flex items-center justify-center border-r border-graphite-muted font-mono text-data-sm text-warning-red">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="px-5 py-4 font-mono text-technical-md uppercase text-industrial-silver">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {labels.targetApplications}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {family.targetApplications.map((application) => (
              <Link
                key={application.label}
                href={localizePath(
                  locale,
                  `/industries/${slugify(application.applicationName)}`
                )}
                className="reticle-corners border border-graphite-muted bg-surface/50 p-5 transition-colors hover:border-warning-red"
              >
                <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-outline">
                  {application.applicationName}
                </div>
                <div className="mt-4 font-mono text-technical-md uppercase text-industrial-silver">
                  {application.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
