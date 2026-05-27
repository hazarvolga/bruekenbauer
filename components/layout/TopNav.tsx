"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Links are mapped using translation keys instead of hardcoded labels
const primaryLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/industries", key: "industries" },
  { href: "/contact", key: "contact" },
];

export function TopNav() {
  const pathname = usePathname();
  const t = useTranslations("Navigation");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-graphite-muted bg-surface/90 backdrop-blur-md">
      <div className="flex h-10 items-center justify-between border-b border-graphite-muted px-6 py-1.5 md:px-10">
        <div className="flex items-center gap-3" aria-label="Language selection">
          <LanguageSwitcher />
        </div>
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.14em] text-industrial-silver">
          <Link
            href="/search"
            className="hidden transition-colors hover:text-warning-red sm:inline"
          >
            {t("finder")}
          </Link>
          <ThemeToggle className="h-7 min-w-12 px-2 text-[9px] tracking-[0.12em]" />
          <Link
            href="/rfq"
            className="inline-flex h-7 items-center border border-warning-red px-4 text-warning-red transition-colors hover:bg-warning-red hover:text-primary-container"
          >
            {t("rfq")}
          </Link>
        </div>
      </div>
      <div className="flex h-12 items-center justify-between gap-3 px-margin-mobile md:px-gutter">
        <Link
          href="/"
          className="min-w-0 flex-1 truncate font-mono text-base font-bold leading-none text-on-surface sm:text-lg md:flex-none md:text-xl"
        >
          brüeckenbauer GmbH
        </Link>
        <nav className="hidden items-center gap-5 md:flex lg:gap-7" aria-label="Primary navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border-b border-transparent pb-1 font-mono text-data-sm uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 font-mono text-data-sm uppercase text-industrial-silver md:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-warning-red text-warning-red transition-colors hover:bg-warning-red hover:text-primary-container md:hidden"
            aria-label={isMenuOpen ? "Close primary menu" : "Open primary menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-primary-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="relative h-4 w-5" aria-hidden="true">
              <span
                className={cn("absolute left-0 top-0 h-px w-5 bg-current transition-transform", {
                    "translate-y-[7px] rotate-45": isMenuOpen,
                  })}
              />
              <span
                className={cn("absolute left-0 top-[7px] h-px w-5 bg-current transition-opacity", {
                    "opacity-0": isMenuOpen,
                    "opacity-100": !isMenuOpen,
                  })}
              />
              <span
                className={cn("absolute bottom-0 left-0 h-px w-5 bg-current transition-transform", {
                    "-translate-y-[7px] -rotate-45": isMenuOpen,
                  })}
              />
            </span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-primary-navigation"
        aria-label="Mobile primary navigation"
        className={cn(
          "grid overflow-hidden border-t border-graphite-muted bg-surface-container-low/95 transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          isMenuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <div className="grid gap-2 px-margin-mobile py-4">
            {[
              ...primaryLinks,
              { href: "/search", key: "finder" },
              { href: "/rfq", key: "rfq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-graphite-muted bg-surface/55 px-4 py-3 font-mono text-data-sm uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red"
              >
                {t(link.key)}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
