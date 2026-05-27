import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { HudMetric } from "@/components/layout/HudMetric";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { MaskedImageFrame, StaggerText } from "@/components/motion/Reveals";
import { images } from "@/lib/assets";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return (
    <PageShell className="min-h-screen pt-20 md:pl-20">
      <section className="flex min-h-[calc(100vh-80px)] flex-col md:flex-row">
        <MaskedImageFrame
          image={images.homepage}
          label="Macro transformer circuit board"
          className="h-[520px] border-b border-graphite-muted md:sticky md:top-20 md:h-[calc(100vh-80px)] md:w-1/2 md:border-b-0 md:border-r"
          imageClassName="object-[85%_52%]"
        />
        <div className="flex flex-1 flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
          <div className="mb-8 flex items-center gap-3 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            <span className="h-1 w-1 bg-warning-red" />
            {t("operational_layer")}
          </div>
          <h1 className="font-mono text-headline-lg-mobile uppercase leading-tight text-industrial-silver md:text-[40px]">
            <StaggerText text={t("title")} />
          </h1>
          <p className="mt-6 max-w-xl font-mono text-technical-md text-on-surface-variant">
            {t("subtitle")}
          </p>
          <div className="mt-10 grid gap-gutter md:grid-cols-2">
            <HudMetric label={t("metrics.supply_continuity")} value="99.8%" tone="red" />
            <HudMetric label={t("metrics.active_classes")} value="06" />
            <HudMetric label={t("metrics.latency")} value="12ms" />
            <HudMetric label={t("metrics.compliance")} value="REACH / RoHS" tone="orange" />
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <TechnicalButton href="/products">{t("cta.open_dossier")}</TechnicalButton>
            <TechnicalButton href="/rfq" variant="ghost">
              {t("cta.initiate_rfq")}
            </TechnicalButton>
          </div>
        </div>
      </section>
      <section className="grid gap-gutter border-y border-graphite-muted bg-surface-container-lowest px-margin-mobile py-16 md:grid-cols-3 md:px-margin-desktop">
        {[
          [t("features.search_title"), "/search", t("features.search_desc")],
          [t("features.compliance_title"), "/compliance", t("features.compliance_desc")],
          [t("features.oem_title"), "/oem-supply", t("features.oem_desc")],
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
