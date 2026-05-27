import { PageShell } from "@/components/motion/MotionProvider";
import { SearchClient } from "@/components/search/SearchClient";
import { getLocalizedProducts, normalizeLocale } from "@/data/localizedContent";
import { products } from "@/data/products";
import { images } from "@/lib/assets";

export const metadata = {
  title: "Technical Part Finder — brüeckenbauer GmbH",
  description:
    "Search by part number, product name, component group, or application sector across the full brüeckenbauer GmbH portfolio.",
};

export default async function SearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const localizedProducts = getLocalizedProducts(products, normalizedLocale);
  const copy = {
    en: {
      queryMode: "System.query_mode // active",
    },
    de: {
      queryMode: "System.query_mode // aktiv",
    },
    fr: {
      queryMode: "System.query_mode // actif",
    },
  }[normalizedLocale];

  return (
    <PageShell className="relative min-h-screen overflow-x-hidden pt-20 md:ml-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-normal grayscale dark:mix-blend-luminosity"
        style={{ backgroundImage: `url(${images.finder})` }}
      />
      <div className="absolute inset-0 bg-surface/85 backdrop-blur-[12px]" />
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
        <div className="mb-12 flex justify-between font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
          <span>{copy.queryMode}</span>
          <span>Latency: 12ms</span>
        </div>
        <SearchClient products={localizedProducts} locale={normalizedLocale} />
      </section>
    </PageShell>
  );
}
