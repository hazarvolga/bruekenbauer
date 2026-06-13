"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { localizePath } from "@/data/localizedContent";
import type { Product } from "@/data/products";

type RelatedProductsCarouselProps = {
  locale: string;
  products: Product[];
  labels: {
    previousRelated: string;
    nextRelated: string;
    viewProduct: string;
  };
};

export function RelatedProductsCarousel({ locale, products, labels }: RelatedProductsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollTrack = (direction: "previous" | "next") => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction === "next" ? track.clientWidth * 0.82 : -track.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="h-px flex-1 bg-graphite-muted" />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => scrollTrack("previous")}
            className="flex h-11 w-12 items-center justify-center border border-graphite-muted bg-surface-container-low/60 font-mono text-label-xs uppercase tracking-[0.16em] text-industrial-silver transition-colors hover:border-warning-red hover:text-warning-red focus-visible:border-warning-red focus-visible:outline-none"
            aria-label={labels.previousRelated}
          >
            &lt;
          </button>
          <button
            type="button"
            onClick={() => scrollTrack("next")}
            className="flex h-11 w-12 items-center justify-center border border-warning-red bg-surface-container-low/60 font-mono text-label-xs uppercase tracking-[0.16em] text-warning-red transition-colors hover:bg-warning-red hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warning-red"
            aria-label={labels.nextRelated}
          >
            &gt;
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none flex items-stretch snap-x snap-mandatory gap-gutter overflow-x-auto pb-4 pr-[14%] sm:pr-[10%] lg:pr-0"
      >
        {products.map((relatedProduct) => (
          <Link
            key={relatedProduct.slug}
            href={localizePath(locale, `/product/${relatedProduct.slug}`)}
            className="group flex min-w-[84%] snap-start flex-col border border-graphite-muted bg-surface-container-low/45 p-4 transition-colors hover:border-industrial-silver hover:bg-surface-container-low/70 sm:min-w-[48%] lg:min-w-[calc((100%_-_48px)_/_3)]"
          >
            <div className="relative aspect-square overflow-hidden border border-graphite-muted bg-surface-container-lowest">
              <Image
                src={relatedProduct.imageDark ?? relatedProduct.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 84vw"
                className="object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
            </div>
            <div className="mt-4 font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
              {relatedProduct.partNumber}
            </div>
            <h3 className="mt-2 font-mono text-technical-md uppercase text-industrial-silver">
              {relatedProduct.name}
            </h3>
            <span className="mt-auto inline-flex pt-6 font-mono text-label-xs uppercase tracking-[0.16em] text-outline transition-colors group-hover:text-warning-red">
              {labels.viewProduct} -&gt;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
