import { notFound, permanentRedirect } from "next/navigation";
import { localizePath, normalizeLocale } from "@/data/localizedContent";
import { powerManagementFamilies } from "@/data/powerManagement";

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export function generateStaticParams() {
  return powerManagementFamilies.map((family) => ({ slug: family.slug }));
}

export default async function PowerManagementDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const normalizedLocale = normalizeLocale(locale);
  const familySource = powerManagementFamilies.find((item) => item.slug === slug);
  if (!familySource) notFound();
  permanentRedirect(localizePath(normalizedLocale, `/product/${familySource.slug}`));
}
