"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Client-side providers wrapper.
 * Keeps app/layout.tsx a pure server component.
 *
 * ThemeProvider config:
 *   attribute="class"  → adds "dark" / "light" class to <html>
 *   defaultTheme="dark" → matches brand identity
 *   enableSystem        → respects OS prefers-color-scheme on first visit
 *   storageKey="theme"  → matches v01 localStorage key for seamless migration
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      storageKey="theme"
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
