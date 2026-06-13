"use client";

import { openCookieSettings } from "@/components/analytics/GoogleAnalyticsConsent";

export function CookieSettingsButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="text-left transition-colors hover:text-warning-red"
    >
      {children}
    </button>
  );
}
