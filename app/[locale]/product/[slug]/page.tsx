import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
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
  const ogUrl = `/api/og?title=${encodeURIComponent(product.name)}&subtitle=${encodeURIComponent(product.dossier)}&label=${encodeURIComponent(product.partNumber)}`;

  return {
    title: `${product.name} | brückenbauer GmbH`,
    description: product.dossier,
    openGraph: {
      title: `${product.name} | brückenbauer GmbH`,
      description: product.dossier,
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
      description: product.dossier,
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
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://brueckenbauer.com${product.image}`,
    "description": product.dossier,
    "sku": product.partNumber,
    "mpn": product.partNumber,
    "brand": {
      "@type": "Brand",
      "name": "brückenbauer GmbH"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "lowPrice": "1.00",
      "highPrice": "500.00",
      "offerCount": "1",
      "offers": [
        {
          "@type": "Offer",
          "priceCurrency": "EUR",
          "price": "100.00",
          "availability": "https://schema.org/InStock",
          "url": `https://brueckenbauer.com${localizePath(normalizedLocale, `/product/${product.slug}`)}`,
          "seller": {
            "@type": "Organization",
            "name": "brückenbauer GmbH"
          }
        }
      ]
    }
  };

  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="grid min-h-[calc(100vh-80px)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[460px] overflow-hidden border-b border-graphite-muted bg-surface-container-lowest lg:border-b-0 lg:border-r">
          <Image
            src={product.imageDark ?? product.image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover opacity-90"
          />
        </div>
        <div className="flex flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
          <Link
            href={localizePath(normalizedLocale, "/products")}
            className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline hover:text-warning-red"
          >
            {labels.technicalArchive}
          </Link>
          <div className="mt-8 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {product.partNumber}
          </div>
          <h1 className="mt-4 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
            {product.name}
          </h1>
          <p className="mt-6 font-mono text-technical-md text-on-surface-variant">
            {product.dossier}
          </p>
          <dl className="mt-10 grid grid-cols-2 gap-4 border-y border-graphite-muted py-6 font-mono text-data-sm uppercase">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key}>
                <dt className="text-outline">{key}</dt>
                <dd className="mt-2 text-industrial-silver">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-wrap gap-4">
            <TechnicalButton
              href={localizePath(normalizedLocale, `/rfq?productSlug=${product.slug}`)}
            >
              {labels.requestQuote}
            </TechnicalButton>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
