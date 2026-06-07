import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { SideRail } from "./SideRail";
import { TopNav } from "./TopNav";

export function SiteChrome({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <>
      <TopNav />
      <SideRail locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}
