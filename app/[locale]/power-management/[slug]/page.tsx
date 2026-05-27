import { ThemedProductImage } from "@/components/product/ThemedProductImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { getPowerFamilyCopy, localizePath, normalizeLocale, uiCopy } from "@/data/localizedContent";
import { powerManagementFamilies } from "@/data/powerManagement";
import { slugify } from "@/lib/slug";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return powerManagementFamilies.map((family) => ({ slug: family.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const familySource = powerManagementFamilies.find((item) => item.slug === slug);
  if (!familySource) return {};
  const family = getPowerFamilyCopy(familySource, locale);

  return {
    title: `${family.name} | brüeckenbauer GmbH`,
    description: family.summary,
  };
}

export default async function PowerManagementDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const familySource = powerManagementFamilies.find((item) => item.slug === slug);
  if (!familySource) notFound();
  const family = getPowerFamilyCopy(familySource, normalizedLocale);
  const labels = uiCopy[normalizedLocale].power;

  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <section className="grid border-b border-graphite-muted lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[360px] overflow-hidden border-b border-graphite-muted bg-surface-container-lowest lg:min-h-[560px] lg:border-b-0 lg:border-r">
          <ThemedProductImage
            src={family.image}
            darkSrc={family.image}
            alt=""
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="hover:scale-102 object-cover transition-transform duration-700"
          />
          <div className="absolute bottom-8 left-8 right-8 grid gap-3 border border-graphite-muted bg-surface/70 p-5 backdrop-blur-md">
            <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
              {labels.moduleVariants}
            </div>
            <div className="flex flex-wrap gap-2">
              {family.variants.map((variant) => (
                <span
                  key={variant}
                  className="border border-outline-variant bg-surface-container-low/70 px-3 py-2 font-mono text-label-xs uppercase text-industrial-silver"
                >
                  {variant}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid content-center px-margin-mobile py-16 md:px-margin-desktop">
          <Link
            href={localizePath(normalizedLocale, "/intro")}
            className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline hover:text-warning-red"
          >
            {labels.powerManagement}
          </Link>
          <div className="mt-8 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {family.label}
          </div>
          <h1 className="mt-4 font-mono text-headline-lg-mobile uppercase text-on-surface sm:text-headline-lg md:text-display-xl">
            {family.name}
          </h1>
          <p className="mt-8 max-w-3xl font-mono text-technical-md uppercase text-on-surface-variant">
            {family.summary}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <TechnicalButton
              href={localizePath(normalizedLocale, `/rfq?familySlug=${family.slug}`)}
            >
              {labels.requestQuote}
            </TechnicalButton>
            <TechnicalButton href={localizePath(normalizedLocale, "/intro")} variant="ghost">
              {labels.back}
            </TechnicalButton>
          </div>
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
                  normalizedLocale,
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
    </PageShell>
  );
}
