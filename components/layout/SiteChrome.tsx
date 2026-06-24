import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { SideRail } from "./SideRail";
import { ServiceNoticeBar } from "./ServiceNoticeBar";
import { TopNav } from "./TopNav";
import type { ServiceAccessStatus } from "@/lib/serviceControl";

export function SiteChrome({
  children,
  locale,
  serviceStatus,
}: {
  children: ReactNode;
  locale: string;
  serviceStatus: ServiceAccessStatus;
}) {
  return (
    <div className="flex min-h-screen flex-col [&>main]:flex-1">
      <TopNav />
      <SideRail locale={locale} />
      <ServiceNoticeBar locale={locale} status={serviceStatus} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}
