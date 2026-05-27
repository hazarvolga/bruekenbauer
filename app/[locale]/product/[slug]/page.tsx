import Link from "next/link";
import { notFound } from "next/navigation";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { PageShell } from "@/components/motion/MotionProvider";
import { ThemedProductImage } from "@/components/product/ThemedProductImage";
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

  return (
    <PageShell className="min-h-screen pt-20 md:ml-20">
      <section className="grid min-h-[calc(100vh-80px)] lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative min-h-[460px] overflow-hidden border-b border-graphite-muted bg-surface-container-lowest lg:border-b-0 lg:border-r">
          <ThemedProductImage
            src={product.image}
            darkSrc={product.imageDark}
            alt=""
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
