import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { RelatedProductsCarousel } from "@/components/product/RelatedProductsCarousel";
import {
  getLocalizedProduct,
  localizePath,
  normalizeLocale,
  uiCopy,
} from "@/data/localizedContent";
import { products } from "@/data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const productSource = products.find((item) => item.slug === slug);
  if (!productSource) return {};
  const normalizedLocale = normalizeLocale(locale);
  const product = getLocalizedProduct(productSource, normalizedLocale);
  const ogUrl = `/api/og?title=${encodeURIComponent(product.name)}&subtitle=${encodeURIComponent(product.summary)}&label=${encodeURIComponent(product.partNumber)}`;

  return {
    title: `${product.name} | brückenbauer GmbH`,
    description: product.summary,
    openGraph: {
      title: `${product.name} | brückenbauer GmbH`,
      description: product.summary,
      siteName: "brückenbauer GmbH",
      type: "website",
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | brückenbauer GmbH`,
      description: product.summary,
      images: [ogUrl],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const productSource = products.find((item) => item.slug === slug);
  if (!productSource) notFound();
  const product = getLocalizedProduct(productSource, normalizedLocale);
  const labels = uiCopy[normalizedLocale].product;
  const relatedProducts = products
    .filter((item) => item.group === productSource.group && item.slug !== productSource.slug)
    .map((item) => getLocalizedProduct(item, normalizedLocale));
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://brueckenbauer.com${product.image}`,
    description: product.summary,
    sku: product.partNumber,
    mpn: product.partNumber,
    brand: {
      "@type": "Brand",
      name: "brückenbauer GmbH",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "1.00",
      highPrice: "500.00",
      offerCount: "1",
      offers: [
        {
          "@type": "Offer",
          priceCurrency: "EUR",
          price: "100.00",
          availability: "https://schema.org/InStock",
          url: `https://brueckenbauer.com${localizePath(normalizedLocale, `/product/${product.slug}`)}`,
          seller: {
            "@type": "Organization",
            name: "brückenbauer GmbH",
          },
        },
      ],
    },
  };

  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="grid lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="relative aspect-square min-h-[360px] overflow-hidden border-b border-graphite-muted bg-surface-container-lowest lg:min-h-0 lg:border-b-0 lg:border-r">
          <Image
            src={product.imageDark ?? product.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover object-center opacity-90"
          />
        </div>
        <div className="flex flex-col px-margin-mobile py-10 md:px-margin-desktop lg:py-16">
          <Link
            href={localizePath(normalizedLocale, "/products")}
            className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline hover:text-warning-red"
          >
            {labels.technicalArchive}
          </Link>
          <div className="mt-6 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {product.partNumber}
          </div>
          <h1 className="mt-3 break-words font-mono text-headline-lg-mobile uppercase leading-tight text-on-surface md:text-[42px] md:leading-[50px]">
            {product.name}
          </h1>
          <p className="mt-5 break-words font-mono text-[15px] leading-[22px] text-on-surface-variant">
            {product.summary}
          </p>
          <dl className="mt-8 grid grid-cols-1 gap-3 border-y border-graphite-muted py-5 font-mono text-data-sm uppercase sm:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="min-w-0 break-words">
                <dt className="text-outline">{key}</dt>
                <dd className="mt-1.5 break-words text-industrial-silver">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap gap-4">
            <TechnicalButton
              href={localizePath(normalizedLocale, `/rfq?productSlug=${product.slug}`)}
            >
              {labels.requestQuote}
            </TechnicalButton>
          </div>
        </div>
      </section>
      {relatedProducts.length > 0 ? (
        <section className="px-margin-mobile pb-24 pt-10 md:px-margin-desktop lg:pl-[calc(theme(spacing.margin-desktop)+theme(spacing.20))]">
          <div className="border-y border-graphite-muted py-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                  {labels.relatedFamily}
                </span>
                <h2 className="mt-3 break-words font-mono text-headline-sm uppercase text-on-surface">
                  {labels.exploreAdjacent}
                </h2>
              </div>
              <div className="max-w-xl space-y-2">
                <p className="font-mono text-data-sm uppercase leading-relaxed text-on-surface-variant">
                  {labels.relatedIntro}
                </p>
              </div>
            </div>

            <RelatedProductsCarousel
              locale={normalizedLocale}
              products={relatedProducts}
              labels={{
                previousRelated: labels.previousRelated,
                nextRelated: labels.nextRelated,
                viewProduct: labels.viewProduct,
              }}
            />
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
