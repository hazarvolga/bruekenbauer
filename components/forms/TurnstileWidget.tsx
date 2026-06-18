"use client";

import Script from "next/script";
import { useEffect, useId, useRef, useState } from "react";

type TurnstileWidgetProps = {
  locale?: string;
  onError: () => void;
  onExpire: () => void;
  onVerify: (token: string) => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          callback: (token: string) => void;
          "error-callback": () => void;
          "expired-callback": () => void;
          language?: string;
          sitekey: string;
          theme: "dark" | "light" | "auto";
        }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export function TurnstileWidget({ locale = "en", onError, onExpire, onVerify }: TurnstileWidgetProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const elementId = useId().replace(/:/g, "");

  useEffect(() => {
    if (!siteKey || !loaded || !containerRef.current || !window.turnstile || widgetIdRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "auto",
      language: locale,
      callback: onVerify,
      "expired-callback": onExpire,
      "error-callback": onError,
    });
  }, [loaded, locale, onError, onExpire, onVerify, siteKey]);

  if (!siteKey) {
    return null;
  }

  return (
    <div className="max-w-sm border border-graphite-muted bg-surface-container-low/35 p-3">
      <Script
        id="cloudflare-turnstile"
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
      <div
        id={`turnstile-${elementId}`}
        ref={containerRef}
        className="min-h-[65px]"
        aria-label="Bot verification"
      />
    </div>
  );
}
