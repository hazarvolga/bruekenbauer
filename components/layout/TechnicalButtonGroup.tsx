import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TechnicalButtonGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("grid w-full min-w-0 gap-3 [&>*]:w-full", className)}>{children}</div>;
}
