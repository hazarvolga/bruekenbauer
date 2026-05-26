"use client"; // input state + debounced filtering

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";

interface SearchClientProps {
  products: Product[];
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function highlight(text: string, query: string): React.ReactNode {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-transparent text-warning-red">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export function SearchClient({ products }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 150);

  const filter = useCallback(
    (q: string): Product[] => {
      if (!q.trim()) return [];
      const lower = q.toLowerCase();
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.partNumber.toLowerCase().includes(lower) ||
          p.group.toLowerCase().includes(lower) ||
          p.applications.some((a) => a.toLowerCase().includes(lower))
      );
    },
    [products]
  );

  const results = filter(debouncedQuery);
  const hasQuery = debouncedQuery.trim().length > 0;

  return (
    <>
      {/* Input */}
      <div className="relative mb-12 max-w-5xl">
        <span className="absolute left-0 top-1/2 -translate-y-1/2 font-mono text-5xl text-warning-red">
          /
        </span>
        <label htmlFor="query" className="sr-only">
          Search technical archive
        </label>
        <input
          id="query"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Part no. / name / group / application"
          className="w-full border-0 border-b border-graphite-muted bg-transparent py-8 pl-16 font-mono text-headline-lg-mobile uppercase text-on-surface outline-none transition-colors placeholder:text-outline focus:border-warning-red md:text-headline-lg"
        />
        <span className="absolute bottom-4 right-0 font-mono text-label-xs uppercase text-warning-red">
          {hasQuery ? `${results.length}_MATCHES` : "Awaiting_input"}
        </span>
      </div>

      {/* Results */}
      <div className="max-w-6xl space-y-4">
        {hasQuery && (
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            Predictive matches [{results.length}]
          </div>
        )}

        {/* No results */}
        {hasQuery && results.length === 0 && (
          <div className="border border-graphite-muted bg-surface-container-low/50 p-8 font-mono text-data-sm uppercase text-outline">
            <span className="text-warning-red">ERR_404</span> — No components matched &quot;
            {debouncedQuery}&quot;. Adjust query or{" "}
            <Link href="/rfq" className="text-on-surface underline-offset-4 hover:underline">
              submit an RFQ
            </Link>
            .
          </div>
        )}

        {/* Result rows */}
        {results.map((product) => (
          <Link
            key={product.slug}
            href={`/product/${product.slug}`}
            className="reticle-corners relative grid border border-graphite-muted bg-surface-container-low/50 p-6 transition-colors hover:border-warning-red md:grid-cols-[0.35fr_1fr_auto] md:items-center"
          >
            <div>
              <div className="font-mono text-label-xs uppercase text-warning-red">Part no.</div>
              <div className="mt-2 font-mono text-headline-lg-mobile uppercase text-on-surface">
                {highlight(product.partNumber, debouncedQuery)}
              </div>
            </div>
            <div className="mt-6 grid gap-4 font-mono text-data-sm uppercase md:mt-0 md:grid-cols-3">
              <span>{highlight(product.group, debouncedQuery)}</span>
              <span className="text-data-orange">{product.status}</span>
              <span>{product.stock}</span>
            </div>
            <span className="mt-4 font-mono text-warning-red md:mt-0">-&gt;</span>
          </Link>
        ))}

        {/* Initial state hint */}
        {!hasQuery && (
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            Enter part no., product name, group, or application sector
          </div>
        )}
      </div>
    </>
  );
}
