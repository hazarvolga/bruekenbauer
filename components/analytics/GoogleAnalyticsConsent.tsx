"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/analytics";
import { localizePath, normalizeLocale } from "@/data/localizedContent";

const CONSENT_KEY = "brueckenbauer-analytics-consent";
const SETTINGS_EVENT = "brueckenbauer:open-cookie-settings";

type Consent = "accepted" | "rejected" | null;

const copy = {
  en: {
    title: "Privacy-friendly analytics",
    body: "With your permission, we use Google Analytics to understand visits, traffic sources, popular pages, and successful business inquiries. No advertising or remarketing tools are used.",
    accept: "Accept analytics",
    reject: "Necessary only",
    policy: "Cookie Policy",
  },
  de: {
    title: "Datenschutzfreundliche Analyse",
    body: "Mit Ihrer Einwilligung nutzen wir Google Analytics, um Besuche, Zugriffsquellen, beliebte Seiten und erfolgreiche Geschäftsanfragen zu verstehen. Werbe- oder Remarketing-Tools werden nicht eingesetzt.",
    accept: "Analytics akzeptieren",
    reject: "Nur notwendige",
    policy: "Cookie-Richtlinie",
  },
  fr: {
    title: "Analyse respectueuse de la vie privée",
    body: "Avec votre accord, nous utilisons Google Analytics pour comprendre les visites, les sources de trafic, les pages populaires et les demandes commerciales abouties. Aucun outil publicitaire ou de remarketing n'est utilisé.",
    accept: "Accepter Analytics",
    reject: "Nécessaires uniquement",
    policy: "Politique de cookies",
  },
};

export function GoogleAnalyticsConsent({ locale }: { locale: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const localized = copy[normalizedLocale];
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>(null);
  const [showSettings, setShowSettings] = useState(false);
  const analyticsEnabled = consent === "accepted";

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "rejected") {
      (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] =
        stored === "rejected";
      setConsent(stored);
    } else {
      setShowSettings(true);
    }

    const openSettings = () => setShowSettings(true);
    window.addEventListener(SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    if (!analyticsEnabled || window.gtag) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_MEASUREMENT_ID, {
      anonymize_ip: true,
      send_page_view: false,
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.dataset.brueckenbauerAnalytics = "true";
    document.head.appendChild(script);
  }, [analyticsEnabled]);

  useEffect(() => {
    if (!analyticsEnabled || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [analyticsEnabled, pathname]);

  function choose(nextConsent: Exclude<Consent, null>) {
    window.localStorage.setItem(CONSENT_KEY, nextConsent);
    const granted = nextConsent === "accepted";
    (window as unknown as Record<string, unknown>)[`ga-disable-${GA_MEASUREMENT_ID}`] = !granted;
    window.gtag?.("consent", "update", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: granted ? "granted" : "denied",
    });
    setConsent(nextConsent);
    setShowSettings(false);
  }

  if (!showSettings) return null;

  return (
    <aside
      aria-label={localized.title}
      className="fixed inset-x-4 bottom-4 z-[100] border border-outline-variant bg-surface/95 p-5 shadow-2xl backdrop-blur-xl md:left-auto md:right-6 md:max-w-xl"
    >
      <p className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {localized.title}
      </p>
      <p className="mt-3 font-mono text-data-sm leading-relaxed text-on-surface-variant">
        {localized.body}{" "}
        <Link
          href={localizePath(normalizedLocale, "/cookie-policy")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-on-surface underline decoration-outline underline-offset-4 hover:text-warning-red"
        >
          {localized.policy}
        </Link>
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="min-h-11 border border-warning-red bg-warning-red px-4 py-3 font-mono text-label-xs uppercase tracking-[0.14em] text-surface transition-colors hover:bg-transparent hover:text-warning-red"
        >
          {localized.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="min-h-11 border border-outline-variant px-4 py-3 font-mono text-label-xs uppercase tracking-[0.14em] text-on-surface-variant transition-colors hover:border-warning-red hover:text-warning-red"
        >
          {localized.reject}
        </button>
      </div>
    </aside>
  );
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(SETTINGS_EVENT));
  }
}
