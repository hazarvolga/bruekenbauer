import Link from "next/link";
import type { Product } from "@/data/products";
import { ThemedProductImage } from "./ThemedProductImage";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="reticle-corners group relative overflow-hidden border border-graphite-muted bg-surface-container-low/50 p-5 backdrop-blur-xl transition-colors hover:border-industrial-silver">
      <Link
        href={`/product/${product.slug}`}
        className="absolute inset-0 z-20"
        aria-label={`Open ${product.name}`}
      />
      <div className="relative mb-6 aspect-[4/3] overflow-hidden border border-graphite-muted bg-surface-container-lowest">
        <ThemedProductImage
          src={product.image}
          darkSrc={product.imageDark}
          alt=""
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-95"
        />
      </div>
      <div className="font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red">
        {product.partNumber}
      </div>
      <h2 className="product-card-title mt-3 break-words font-mono uppercase text-on-surface">
        {product.name}
      </h2>
      <p className="mt-4 font-mono text-data-sm uppercase text-on-surface-variant">
        {product.dossier}
      </p>
    </article>
  );
}
