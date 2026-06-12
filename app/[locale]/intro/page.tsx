import { permanentRedirect } from "next/navigation";
import { localizePath, normalizeLocale } from "@/data/localizedContent";

export default async function IntroRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(localizePath(normalizeLocale(locale), "/products/power-management"));
}
