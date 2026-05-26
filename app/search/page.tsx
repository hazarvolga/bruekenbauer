import { PageShell } from "@/components/motion/MotionProvider";
import { SearchClient } from "@/components/search/SearchClient";
import { products } from "@/data/products";
import { images } from "@/lib/assets";

export const metadata = {
  title: "Technical Part Finder — brückenbauer GmbH",
  description:
    "Search by part number, product name, component group, or application sector across the full brückenbauer GmbH portfolio.",
};

export default function SearchPage() {
  return (
    <PageShell className="relative min-h-screen overflow-x-hidden pt-20 md:ml-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-normal grayscale dark:mix-blend-luminosity"
        style={{ backgroundImage: `url(${images.finder})` }}
      />
      <div className="absolute inset-0 bg-surface/85 backdrop-blur-[12px]" />
      <section className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col justify-center px-margin-mobile py-16 md:px-margin-desktop">
        <div className="mb-12 flex justify-between font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
          <span>System.query_mode // active</span>
          <span>Latency: 12ms</span>
        </div>
        <SearchClient products={products} />
      </section>
    </PageShell>
  );
}
