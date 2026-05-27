"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function IndustrySystemsPanel({
  products,
  heading = "Active systems",
  supportNote,
  openDetailLabel = "Open detail dossier",
  locale = "en",
}: {
  products: Product[];
  heading?: string;
  supportNote?: string;
  openDetailLabel?: string;
  locale?: string;
}) {
  const [activeSlug, setActiveSlug] = useState(products[0]?.slug ?? "");
  const [listProgress, setListProgress] = useState(0);
  const [detailProgress, setDetailProgress] = useState(0);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const listAreaRef = useRef<HTMLUListElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const listAnimationRef = useRef<number | null>(null);

  function focusProduct(slug: string) {
    setActiveSlug(slug);
    window.requestAnimationFrame(() => {
      const scrollArea = scrollAreaRef.current;
      const item = itemRefs.current[slug];
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (scrollArea && item) {
        if (animationRef.current) window.cancelAnimationFrame(animationRef.current);
        const scrollRect = scrollArea.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        const target = scrollArea.scrollTop + itemRect.top - scrollRect.top - 32;
        animationRef.current = animateScroll(scrollArea, target, prefersReducedMotion);
      }

      const listArea = listAreaRef.current;
      const button = buttonRefs.current[slug];
      if (listArea && button) {
        if (listAnimationRef.current) window.cancelAnimationFrame(listAnimationRef.current);
        const listRect = listArea.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        const target =
          listArea.scrollTop +
          buttonRect.top -
          listRect.top -
          (listArea.clientHeight - buttonRect.height) / 2;
        listAnimationRef.current = animateScroll(listArea, target, prefersReducedMotion, 520);
      }
    });
  }

  function handleListScroll() {
    const element = listAreaRef.current;
    if (!element) return;
    setListProgress(readScrollProgress(element));
  }

  function handleDetailScroll() {
    const element = scrollAreaRef.current;
    if (!element) return;
    setDetailProgress(readScrollProgress(element));
  }

  function readScrollProgress(element: HTMLElement) {
    const max = element.scrollHeight - element.clientHeight;
    if (max <= 0) return 0;
    return element.scrollTop / max;
  }

  function animateScroll(
    element: HTMLElement,
    requestedTarget: number,
    reduceMotion: boolean,
    baseDuration = 720
  ) {
    const start = element.scrollTop;
    const maxScroll = element.scrollHeight - element.clientHeight;
    const target = Math.max(0, Math.min(requestedTarget, maxScroll));
    const distance = target - start;

    if (reduceMotion || Math.abs(distance) < 2) {
      element.scrollTop = target;
      return null;
    }

    const duration = Math.min(1200, Math.max(baseDuration, Math.abs(distance) * 1.25));
    const startedAt = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    let frame = 0;

    const step = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      element.scrollTop = start + distance * ease(progress);
      if (progress < 1) frame = window.requestAnimationFrame(step);
    };

    frame = window.requestAnimationFrame(step);
    return frame;
  }

  return (
    <div className="grid min-h-[520px] gap-gutter lg:grid-cols-[0.42fr_1fr]">
      <div className="relative h-[min(720px,calc(100vh-340px))] min-h-[520px] overflow-hidden border border-graphite-muted bg-surface-container-low/90 p-8 shadow-[0_24px_80px_rgb(20_19_19_/_0.1)] backdrop-blur-xl dark:bg-graphite-muted/30 dark:shadow-none">
        <div className="flex h-full flex-col border-t border-graphite-muted pt-6">
          <span className="font-mono text-label-xs uppercase text-outline">{heading}</span>
          {supportNote ? (
            <p className="mt-4 font-mono text-data-sm uppercase leading-relaxed text-outline">
              {supportNote}
            </p>
          ) : null}
          <ul
            ref={listAreaRef}
            onScroll={handleListScroll}
            className="scrollbar-none mt-4 flex-1 space-y-3 overflow-y-auto pr-5 font-mono text-data-sm uppercase text-industrial-silver"
          >
            {products.map((product) => (
              <li key={product.slug}>
                <button
                  type="button"
                  ref={(node) => {
                    buttonRefs.current[product.slug] = node;
                  }}
                  onClick={() => focusProduct(product.slug)}
                  className={cn(
                    "flex w-full justify-between border-b pb-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warning-red",
                    activeSlug === product.slug
                      ? "border-warning-red text-on-surface"
                      : "border-graphite-muted hover:border-industrial-silver hover:text-on-surface"
                  )}
                >
                  <span>{product.name}</span>
                  <span className="text-warning-red">-&gt;</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="pointer-events-none absolute bottom-8 right-5 top-20 w-px bg-graphite-muted">
          <span
            className="absolute left-1/2 h-16 w-px -translate-x-1/2 bg-warning-red shadow-red-reticle transition-transform duration-300"
            style={{ transform: `translate(-50%, ${listProgress * 100}%)` }}
          />
          <span className="absolute -right-1 top-0 h-1 w-1 bg-warning-red" />
          <span className="absolute -right-1 bottom-0 h-1 w-1 bg-warning-red" />
        </div>
      </div>

      <div className="relative h-[min(720px,calc(100vh-340px))] min-h-[520px] overflow-hidden border border-graphite-muted bg-surface-container-low/90 shadow-[0_24px_80px_rgb(20_19_19_/_0.1)] backdrop-blur-xl dark:bg-graphite-muted/20 dark:shadow-none">
        <div
          ref={scrollAreaRef}
          onScroll={handleDetailScroll}
          className="scrollbar-none h-full scroll-pt-6 overflow-y-auto p-6 pr-8"
        >
          <div className="space-y-5 pb-[620px]">
            {products.map((product) => (
              <article
                key={product.slug}
                ref={(node) => {
                  itemRefs.current[product.slug] = node;
                }}
                className={cn(
                  "reticle-corners grid gap-5 border bg-surface-container-low/95 p-5 transition-[border-color,opacity,transform] duration-500 ease-out dark:bg-surface-container-low/60 md:grid-cols-[220px_1fr]",
                  activeSlug === product.slug
                    ? "industry-card-active border-warning-red"
                    : "border-graphite-muted opacity-70"
                )}
              >
                <div className="relative aspect-[4/3] overflow-hidden border border-graphite-muted bg-surface-container-lowest">
                  <Image
                    src={product.imageDark ?? product.image}
                    alt=""
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
                    {product.partNumber}
                  </div>
                  <h2 className="mt-3 font-mono text-headline-lg-mobile uppercase text-on-surface">
                    {product.name}
                  </h2>
                  <p className="mt-4 max-w-2xl font-mono text-data-sm uppercase text-on-surface-variant">
                    {product.dossier}
                  </p>
                  <dl className="mt-5 grid grid-cols-2 gap-3 font-mono text-data-sm uppercase">
                    {Object.entries(product.specs)
                      .slice(0, 4)
                      .map(([key, value]) => (
                        <div key={key} className="border-t border-graphite-muted pt-3">
                          <dt className="text-outline">{key}</dt>
                          <dd className="mt-1 text-industrial-silver">{value}</dd>
                        </div>
                      ))}
                  </dl>
                  <Link
                    href={`${locale === "en" ? "" : `/${locale}`}/product/${product.slug}`}
                    className="mt-6 inline-flex w-fit border border-warning-red px-4 py-3 font-mono text-label-xs uppercase tracking-[0.14em] text-warning-red transition-colors hover:bg-warning-red hover:text-primary-container"
                  >
                    {openDetailLabel}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-6 right-4 top-6 w-px bg-graphite-muted">
          <span
            className="absolute left-1/2 h-20 w-px -translate-x-1/2 bg-warning-red shadow-red-reticle transition-transform duration-300"
            style={{ transform: `translate(-50%, ${detailProgress * 100}%)` }}
          />
          <span className="absolute -right-1 top-0 h-1 w-1 bg-warning-red" />
          <span className="absolute -right-1 bottom-0 h-1 w-1 bg-warning-red" />
        </div>
      </div>
    </div>
  );
}
