"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
];

export function LanguageSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 font-mono text-[9px] font-bold uppercase tracking-[0.08em]">
      {locales.map((loc, index) => (
        <div key={loc.code} className="flex items-center">
          <Link
            href={pathname}
            locale={loc.code}
            className={cn(
              "inline-flex h-6 min-w-6 items-center justify-center border border-transparent px-1 transition-colors hover:border-warning-red hover:text-warning-red",
              currentLocale === loc.code ? "text-warning-red" : "text-outline"
            )}
            aria-label={`Switch to ${loc.label}`}
          >
            {loc.label}
          </Link>
          {index < locales.length - 1 && (
            <span className="text-graphite-muted/40 px-1 select-none">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
