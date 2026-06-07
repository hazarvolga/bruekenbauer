"use client";

import { useLocale, useTranslations } from "next-intl";
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
  const t = useTranslations("Navigation");

  return (
    <div className="flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.1em]">
      <span className="hidden text-outline/80 sm:inline">{t("language")}</span>
      <div className="inline-flex items-center gap-1 border border-graphite-muted bg-surface-container-low/70 p-0.5">
        {locales.map((loc) => (
          <Link
            key={loc.code}
            href={pathname}
            locale={loc.code}
            className={cn(
              "inline-flex h-7 min-w-8 items-center justify-center border border-transparent px-2 transition-colors hover:border-warning-red hover:bg-surface-container-high hover:text-warning-red focus-visible:border-warning-red focus-visible:outline-none",
              currentLocale === loc.code
                ? "border-warning-red bg-warning-red/10 text-warning-red"
                : "text-outline"
            )}
            aria-label={t("switch_language", { language: loc.label })}
            aria-current={currentLocale === loc.code ? "true" : undefined}
          >
            {loc.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
