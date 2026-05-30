import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/motion/MotionProvider";
import { IndustrySystemsPanel } from "@/components/product/IndustrySystemsPanel";
import type { ApplicationName } from "@/data/applications";
import { applications } from "@/data/applications";
import {
  getApplicationCopy,
  getLocalizedProducts,
  localizePath,
  normalizeLocale,
  uiCopy,
} from "@/data/localizedContent";
import { products } from "@/data/products";

export function generateStaticParams() {
  return applications.map((application) => ({ slug: application.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const application = applications.find((item) => item.slug === slug);
  if (!application) return {};
  const copy = getApplicationCopy(locale, application);
  const ogUrl = `/api/og?title=${encodeURIComponent(copy.name)}&subtitle=${encodeURIComponent(copy.summary)}&label=${encodeURIComponent("INDUSTRY DOSSIER")}`;

  return {
    title: `${copy.name} | brückenbauer GmbH`,
    description: copy.detail.intro,
    openGraph: {
      title: `${copy.name} | brückenbauer GmbH`,
      description: copy.detail.intro,
      siteName: "brückenbauer GmbH",
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: copy.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.name} | brückenbauer GmbH`,
      description: copy.detail.intro,
      images: [ogUrl],
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const application = applications.find((item) => item.slug === slug);
  if (!application) notFound();
  const related = products.filter((product) => product.applications.includes(application.name));
  const portfolioProducts = getLocalizedProducts(
    buildSectorPortfolio(application.name, related),
    normalizedLocale
  );
  const applicationCopy = getApplicationCopy(normalizedLocale, application);
  const labels = uiCopy[normalizedLocale].industry;
  const isSupportedPortfolio = related.length < 3;
  const sectorIndex = applications.map((item) => ({
    ...item,
    displayName: getApplicationCopy(normalizedLocale, item).name,
    code:
      item.slug === "aerospace-and-aviation"
        ? "AERO"
        : item.slug === "automotive-and-transportation"
          ? "AUTO"
          : item.slug === "industrial-automation"
            ? "IND"
            : item.slug === "solar-pv-and-bess"
              ? "SOLAR"
              : item.slug === "home-appliances"
                ? "HOME"
                : "MED",
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": applicationCopy.name,
    "description": applicationCopy.detail.intro,
    "provider": {
      "@type": "LocalBusiness",
      "name": "brückenbauer GmbH",
      "image": "https://brueckenbauer.com/images/product-groups/power-management.png",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Zug",
        "addressCountry": "CH"
      }
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Global"
    }
  };

  return (
    <PageShell className="relative min-h-screen overflow-x-hidden pt-20 md:ml-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="absolute inset-0 z-0">
        <Image
          src={application.heroImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20 mix-blend-multiply grayscale transition-opacity duration-700 dark:opacity-45 dark:mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/10" />
      </div>
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] items-center px-margin-mobile py-16 md:pl-margin-desktop md:pr-20 lg:pr-24">
        <div className="w-full">
          <div className="mb-4 flex items-center gap-2 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            <span className="h-2 w-2 bg-warning-red" />
            {labels.applicationSector}
          </div>
          <div className="mb-8 grid gap-gutter lg:grid-cols-[0.42fr_1fr]">
            <div>
              <h1 className="font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
                {applicationCopy.name}
              </h1>
              <p className="mt-6 max-w-xl font-mono text-technical-md text-on-surface-variant">
                {applicationCopy.summary}
              </p>
              <p className="mt-5 max-w-3xl font-mono text-data-sm uppercase leading-relaxed text-outline">
                {applicationCopy.detail.intro}
              </p>
            </div>
            <div className="border border-graphite-muted bg-surface-container-low/90 p-5 shadow-[0_24px_90px_rgb(20_19_19_/_0.12)] backdrop-blur dark:bg-surface-container-low/55 dark:shadow-none lg:min-h-[420px]">
              <div className="grid h-full gap-gutter lg:grid-cols-2">
                <div>
                  <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                    {labels.applicationFields}
                  </div>
                  <ul className="mt-5 grid gap-3">
                    {applicationCopy.detail.applications.map((item) => (
                      <li
                        key={item}
                        className="border-l border-graphite-muted pl-4 font-mono text-data-sm uppercase leading-relaxed text-industrial-silver"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                    {applicationCopy.detail.strengthsTitle}
                  </div>
                  <ul className="mt-5 grid gap-3">
                    {applicationCopy.detail.strengths.map((item) => (
                      <li
                        key={item}
                        className="border-l border-graphite-muted pl-4 font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <IndustrySystemsPanel
            products={portfolioProducts}
            heading={isSupportedPortfolio ? labels.supportedPortfolio : labels.activeSystems}
            supportNote={isSupportedPortfolio ? labels.supportNote : undefined}
            openDetailLabel={labels.openDetail}
            locale={normalizedLocale}
          />
        </div>
        <aside className="absolute bottom-16 right-0 top-16 hidden w-16 border-l border-graphite-muted bg-surface-container-low/70 backdrop-blur-md dark:bg-graphite-surface/55 lg:flex lg:flex-col lg:items-stretch lg:justify-center">
          <div className="grid gap-1 px-2">
            {sectorIndex.map((item) => (
              <Link
                key={item.slug}
                href={localizePath(normalizedLocale, `/industries/${item.slug}`)}
                title={item.displayName}
                aria-label={item.displayName}
                className={`border border-transparent px-1 py-2 text-center font-mono text-[9px] font-bold uppercase leading-none tracking-[0.08em] transition-colors hover:border-warning-red hover:text-warning-red ${
                  item.slug === application.slug
                    ? "border-warning-red text-warning-red"
                    : "text-outline"
                }`}
              >
                {item.code}
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </PageShell>
  );
}

function buildSectorPortfolio(applicationName: ApplicationName, relatedProducts: typeof products) {
  return relatedProducts;
}
