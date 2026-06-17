import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { HudMetric } from "@/components/layout/HudMetric";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { TechnicalButtonGroup } from "@/components/layout/TechnicalButtonGroup";
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
        <div className="flex flex-1 flex-col justify-center px-margin-mobile py-16 md:justify-start md:px-margin-desktop md:pb-16 md:pt-24 lg:pt-28">
          <div className="w-full max-w-2xl">
            <div className="mb-8 flex items-center gap-3 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              <span className="h-1 w-1 bg-warning-red" />
              {t("operational_layer")}
            </div>
            <h1 className="font-mono text-[40px] uppercase leading-[1.14] text-industrial-silver sm:text-headline-lg-mobile sm:leading-[1.12] md:text-[34px] md:leading-[1.14]">
              <StaggerText text={t("title")} />
            </h1>
            <p className="mt-6 max-w-xl font-mono text-technical-md text-on-surface-variant">
              {t("subtitle")}
            </p>
            <div className="mt-8 grid max-w-xl gap-3">
              {[
                [t("features.search_title"), "/search", t("features.search_desc")],
                [t("features.oem_title"), "/oem-supply", t("features.oem_desc")],
              ].map(([label, href, copy]) => (
                <Link
                  key={href}
                  href={href}
                  className="reticle-corners relative border border-graphite-muted bg-surface-container-low/45 p-5 transition-colors hover:border-warning-red"
                >
                  <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                    {label}
                  </span>
                  <p className="mt-3 font-mono text-data-sm uppercase leading-relaxed text-industrial-silver">
                    {copy}
                  </p>
                </Link>
              ))}
            </div>
            <TechnicalButtonGroup className="mt-10 max-w-xl">
              <TechnicalButton href="/products">{t("cta.explore_products")}</TechnicalButton>
              <TechnicalButton href="/rfq" variant="ghost">
                {t("cta.initiate_rfq")}
              </TechnicalButton>
            </TechnicalButtonGroup>
            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              <HudMetric label={t("metrics.supply_continuity")} value="99.8%" tone="red" />
              <HudMetric label={t("metrics.active_classes")} value="06" />
              <HudMetric label={t("metrics.latency")} value="12ms" />
              <HudMetric label={t("metrics.compliance")} value="REACH / RoHS" tone="orange" />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
