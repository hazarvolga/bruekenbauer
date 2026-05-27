import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, locale = "en" }: { products: Product[]; locale?: string }) {
  return (
    <div className="grid grid-cols-1 gap-gutter md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} locale={locale} />
      ))}
    </div>
  );
}
