import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { SideRail } from "./SideRail";
import { TopNav } from "./TopNav";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <TopNav />
      <SideRail />
      {children}
      <Footer />
    </>
  );
}
