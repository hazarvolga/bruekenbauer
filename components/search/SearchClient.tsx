"use client"; // input state + debounced filtering

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { getProductGroupCopy, localizePath, normalizeLocale } from "@/data/localizedContent";
import type { SupportedLocale } from "@/data/localizedContent";
import type { Product } from "@/data/products";

interface SearchClientProps {
  products: Product[];
  locale?: string;
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

export function SearchClient({ products, locale = "en" }: SearchClientProps) {
  const normalizedLocale = normalizeLocale(locale);
  const copy = {
    en: {
      srLabel: "Search technical archive",
      placeholder: "Part no. / name / group / application",
      matches: "MATCHES",
      awaiting: "Awaiting_input",
      predictive: "Predictive matches",
      noMatch: "No components matched",
      adjust: "Adjust query or",
      submit: "submit an RFQ",
      partNo: "Part no.",
      partNoAndName: "Part no. / Name",
      group: "Group",
      status: "Status",
      supply: "Supply",
      initial: "Enter part no., product name, group, or application sector",
    },
    de: {
      srLabel: "Technisches Archiv durchsuchen",
      placeholder: "Teilenr. / Name / Gruppe / Anwendung",
      matches: "TREFFER",
      awaiting: "Eingabe_erwartet",
      predictive: "Prädiktive Treffer",
      noMatch: "Keine Komponenten gefunden",
      adjust: "Suchbegriff anpassen oder",
      submit: "RFQ absenden",
      partNo: "Teilenr.",
      partNoAndName: "Teilenr. / Name",
      group: "Gruppe",
      status: "Status",
      supply: "Versorgung",
      initial: "Teilenr., Produktname, Gruppe oder Anwendungsbereich eingeben",
    },
    fr: {
      srLabel: "Rechercher dans l'archive technique",
      placeholder: "Réf. / nom / groupe / application",
      matches: "RÉSULTATS",
      awaiting: "Saisie_attendue",
      predictive: "Résultats prédictifs",
      noMatch: "Aucun composant trouvé",
      adjust: "Ajustez la recherche ou",
      submit: "soumettre une RFQ",
      partNo: "Réf.",
      partNoAndName: "Réf. / Nom",
      group: "Groupe",
      status: "Statut",
      supply: "Approvisionnement",
      initial: "Saisir une réf., un nom de produit, un groupe ou un secteur d'application",
    },
  }[normalizedLocale];
  const statusCopy = {
    en: {
      Optimal: "Optimal",
      "Critical Low": "Critical low",
      Allocation: "Allocation",
      Prototype: "Prototype",
    },
    de: {
      Optimal: "Optimal",
      "Critical Low": "Kritisch niedrig",
      Allocation: "Allokation",
      Prototype: "Prototyp",
    },
    fr: {
      Optimal: "Optimal",
      "Critical Low": "Critique bas",
      Allocation: "Allocation",
      Prototype: "Prototype",
    },
  }[normalizedLocale];
  const stockCopyByLocale: Record<SupportedLocale, Record<string, string>> = {
    en: {
      "Series supply": "Series supply",
      "Qualified stock": "Qualified stock",
      "Project build": "Project build",
      "Engineered order": "Engineered order",
    },
    de: {
      "Series supply": "Serienversorgung",
      "Qualified stock": "Qualifizierter Bestand",
      "Project build": "Projektaufbau",
      "Engineered order": "Technische Bestellung",
    },
    fr: {
      "Series supply": "Approvisionnement série",
      "Qualified stock": "Stock qualifié",
      "Project build": "Projet assemblé",
      "Engineered order": "Commande technique",
    },
  };
  const stockCopy = stockCopyByLocale[normalizedLocale];
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 150);

  const filter = useCallback(
    (q: string): Product[] => {
      if (!q.trim()) return [];
      const lower = q.toLowerCase();
      return products.filter((p) => {
        const groupTitle = getProductGroupCopy(normalizedLocale, p.group).title;
        return (
          p.name.toLowerCase().includes(lower) ||
          p.partNumber.toLowerCase().includes(lower) ||
          p.group.toLowerCase().includes(lower) ||
          groupTitle.toLowerCase().includes(lower) ||
          p.applications.some((a) => a.toLowerCase().includes(lower))
        );
      });
    },
    [normalizedLocale, products]
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
          {copy.srLabel}
        </label>
        <input
          id="query"
          autoFocus
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={copy.placeholder}
          className="w-full border-0 border-b border-graphite-muted bg-transparent py-8 pl-16 font-mono text-headline-lg-mobile uppercase text-on-surface outline-none transition-colors placeholder:text-outline focus:border-warning-red md:text-headline-lg"
        />
        <span className="absolute bottom-4 right-0 font-mono text-label-xs uppercase text-warning-red">
          {hasQuery ? `${results.length}_${copy.matches}` : copy.awaiting}
        </span>
      </div>

      {/* Results */}
      <div className="max-w-6xl space-y-4">
        {hasQuery && (
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            {copy.predictive} [{results.length}]
          </div>
        )}

        {/* No results */}
        {hasQuery && results.length === 0 && (
          <div className="border border-graphite-muted bg-surface-container-low/50 p-8 font-mono text-data-sm uppercase text-outline">
            <span className="text-warning-red">ERR_404</span> — {copy.noMatch} &quot;
            {debouncedQuery}&quot;. {copy.adjust}{" "}
            <Link
              href={localizePath(normalizedLocale, "/rfq")}
              className="text-on-surface underline-offset-4 hover:underline"
            >
              {copy.submit}
            </Link>
            .
          </div>
        )}

        {/* Result rows */}
        {results.map((product) => (
          <Link
            key={product.slug}
            href={localizePath(normalizedLocale, `/product/${product.slug}`)}
            className="reticle-corners relative grid border border-graphite-muted bg-surface-container-low/50 p-6 transition-colors hover:border-warning-red md:grid-cols-[0.42fr_0.93fr_auto] md:items-center"
          >
            <div>
              <div className="font-mono text-label-xs uppercase text-warning-red">
                {copy.partNoAndName}
              </div>
              <div className="mt-2 font-mono text-headline-lg-mobile uppercase text-on-surface">
                {highlight(product.partNumber, debouncedQuery)}
              </div>
              <div className="mt-1 font-mono text-technical-md uppercase text-outline">
                {highlight(product.name, debouncedQuery)}
              </div>
            </div>
            <div className="mt-6 grid gap-4 font-mono text-data-sm uppercase md:mt-0 md:grid-cols-3">
              <span>
                <span className="mb-1 block text-[9px] tracking-[0.14em] text-outline">
                  {copy.group}
                </span>
                {highlight(
                  getProductGroupCopy(normalizedLocale, product.group).title,
                  debouncedQuery
                )}
              </span>
              <span className="text-data-orange">
                <span className="mb-1 block text-[9px] tracking-[0.14em] text-outline">
                  {copy.status}
                </span>
                {statusCopy[product.status] ?? product.status}
              </span>
              <span>
                <span className="mb-1 block text-[9px] tracking-[0.14em] text-outline">
                  {copy.supply}
                </span>
                {stockCopy[product.stock] ?? product.stock}
              </span>
            </div>
            <span className="mt-4 font-mono text-warning-red md:mt-0">-&gt;</span>
          </Link>
        ))}

        {/* Initial state hint */}
        {!hasQuery && (
          <div className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            {copy.initial}
          </div>
        )}
      </div>
    </>
  );
}
