import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { SideRail } from "./SideRail";
import { TopNav } from "./TopNav";

export function SiteChrome({ children, locale }: { children: ReactNode; locale: string }) {
  return (
    <div className="flex min-h-screen flex-col [&>main]:flex-1">
      <TopNav />
      <SideRail locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
