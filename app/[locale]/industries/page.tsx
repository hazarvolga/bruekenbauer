import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { TechnicalButtonGroup } from "@/components/layout/TechnicalButtonGroup";
import { PageShell } from "@/components/motion/MotionProvider";
import { applications } from "@/data/applications";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getApplicationCopy, localizePath } from "@/data/localizedContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "IndustriesPage" });

  const title = `${t("title")} | brückenbauer GmbH`;
  const description = t("description");
  const ogUrl = `/api/og?title=${encodeURIComponent(t("title"))}&subtitle=${encodeURIComponent(t("description").slice(0, 120) + "...")}&label=${encodeURIComponent(t("label"))}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "brückenbauer GmbH",
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("IndustriesPage");
  const descriptionPoints = t.raw("description_points") as string[];

  const group1 = applications.slice(0, 6);
  const group2 = applications.slice(6);

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {t("label")}
      </span>
      <h1 className="mt-5 max-w-5xl break-words font-mono text-headline-lg-mobile uppercase text-on-surface [overflow-wrap:anywhere] md:text-[54px] md:leading-[0.92] lg:text-[72px] xl:text-display-xl">
        {t("title")}
      </h1>
      <section className="mt-10 grid gap-gutter border-y border-graphite-muted py-6 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("section_label")}
          </div>
          <h2 className="mt-4 max-w-md break-words font-mono text-[clamp(1.25rem,8vw,2.125rem)] uppercase leading-[1.02] text-industrial-silver [overflow-wrap:anywhere] md:text-[44px] md:leading-[0.98] lg:text-[52px]">
            {t("section_title")}
          </h2>
        </div>
        <div className="min-w-0 lg:col-span-7 lg:col-start-6">
          <div className="grid gap-3">
            {descriptionPoints.map((point) => (
              <p
                key={point}
                className="border-l border-graphite-muted pl-4 font-mono text-[13px] uppercase leading-relaxed text-on-surface-variant md:text-technical-md"
              >
                {point}
              </p>
            ))}
          </div>
          <div className="mt-6 border-l border-warning-red pl-5 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {t("in_use_label")}
          </div>
        </div>
      </section>

      {/* Group 01: Strategic Industry Verticals */}
      <div className="mt-16 flex min-w-0 flex-col items-start gap-3 border-b border-graphite-muted pb-4 sm:flex-row sm:items-center sm:gap-6">
        <span className="shrink-0 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          [ Group 01 ]
        </span>
        <h2 className="min-w-0 break-words font-mono text-technical-md uppercase tracking-[0.1em] text-industrial-silver [overflow-wrap:anywhere]">
          {t("group_1_title")}
        </h2>
      </div>
      <div className="mt-8 grid gap-gutter md:grid-cols-2 xl:grid-cols-3">
        {group1.map((app) => {
          const appCopy = getApplicationCopy(locale, app);
          return (
            <Link
              key={app.slug}
              href={localizePath(locale, `/industries/${app.slug}`)}
              className="reticle-corners group relative flex min-h-[340px] flex-col overflow-hidden border border-graphite-muted bg-surface-container-low/50 p-6 transition-colors duration-300 hover:border-industrial-silver hover:bg-surface-container-low/75 focus-visible:border-warning-red focus-visible:outline-none"
            >
              <div className="relative z-10">
                <h2 className="break-words font-mono text-technical-md uppercase text-industrial-silver [overflow-wrap:anywhere]">
                  {appCopy.name}
                </h2>
                <p className="mt-5 break-words font-mono text-data-sm uppercase text-outline [overflow-wrap:anywhere]">
                  {appCopy.summary}
                </p>
              </div>
              <span className="relative z-10 mt-6 inline-flex w-fit items-center border border-graphite-muted px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-industrial-silver transition-colors group-hover:border-warning-red group-hover:text-warning-red">
                {t("explore_sector")} <span aria-hidden="true">-&gt;</span>
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden">
                <Image
                  src={app.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw"
                  className="group-hover:scale-102 object-cover object-center transition-transform duration-700 ease-out"
                />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Group 02: Equipment & Devices */}
      <div className="mt-20 flex min-w-0 flex-col items-start gap-3 border-b border-graphite-muted pb-4 sm:flex-row sm:items-center sm:gap-6">
        <span className="shrink-0 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          [ Group 02 ]
        </span>
        <h2 className="min-w-0 break-words font-mono text-technical-md uppercase tracking-[0.1em] text-industrial-silver [overflow-wrap:anywhere]">
          {t("group_2_title")}
        </h2>
      </div>
      <div className="mt-8 grid gap-gutter md:grid-cols-2 xl:grid-cols-3">
        {group2.map((app) => {
          const appCopy = getApplicationCopy(locale, app);
          return (
            <Link
              key={app.slug}
              href={localizePath(locale, `/industries/${app.slug}`)}
              className="reticle-corners group relative flex min-h-[340px] flex-col overflow-hidden border border-graphite-muted bg-surface-container-low/50 p-6 transition-colors duration-300 hover:border-industrial-silver hover:bg-surface-container-low/75 focus-visible:border-warning-red focus-visible:outline-none"
            >
              <div className="relative z-10">
                <h2 className="break-words font-mono text-technical-md uppercase text-industrial-silver [overflow-wrap:anywhere]">
                  {appCopy.name}
                </h2>
                <p className="mt-5 break-words font-mono text-data-sm uppercase text-outline [overflow-wrap:anywhere]">
                  {appCopy.summary}
                </p>
              </div>
              <span className="relative z-10 mt-6 inline-flex w-fit items-center border border-graphite-muted px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-industrial-silver transition-colors group-hover:border-warning-red group-hover:text-warning-red">
                {t("explore_sector")} <span aria-hidden="true">-&gt;</span>
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-28 overflow-hidden">
                <Image
                  src={app.heroImage}
                  alt=""
                  fill
                  sizes="(min-width: 1280px) 34vw, (min-width: 768px) 50vw, 100vw"
                  className="group-hover:scale-102 object-cover object-center transition-transform duration-700 ease-out"
                />
              </div>
            </Link>
          );
        })}
      </div>
      <section className="mt-20 border border-graphite-muted bg-surface-container-low/45 p-6 md:p-8">
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {t("cta_label")}
        </span>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="break-words font-mono text-headline-md-mobile uppercase text-industrial-silver [overflow-wrap:anywhere] md:text-headline-md">
              {t("cta_title")}
            </h2>
            <p className="mt-4 max-w-3xl font-mono text-technical-md leading-relaxed text-on-surface-variant">
              {t("cta_copy")}
            </p>
          </div>
          <TechnicalButtonGroup className="lg:w-64">
            <TechnicalButton href={localizePath(locale, "/contact")}>
              {t("cta_contact")}
            </TechnicalButton>
            <TechnicalButton href={localizePath(locale, "/rfq")} variant="ghost">
              {t("cta_rfq")}
            </TechnicalButton>
          </TechnicalButtonGroup>
        </div>
      </section>
    </PageShell>
  );
}
