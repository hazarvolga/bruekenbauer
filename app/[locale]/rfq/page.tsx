import { RfqFlow } from "@/components/rfq/RfqFlow";
import { PageShell } from "@/components/motion/MotionProvider";
import { images } from "@/lib/assets";
import { resolveRfqContext } from "@/lib/rfqContext";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{
    product?: string;
    productSlug?: string;
    familySlug?: string;
    applicationSector?: string;
  }>;
};

export default async function RfqPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const query = await searchParams;
  const initialContext = resolveRfqContext({
    productSlug: query?.productSlug,
    familySlug: query?.familySlug,
    applicationSector: query?.applicationSector,
    legacyProduct: query?.product,
  });

  return (
    <PageShell className="relative min-h-screen overflow-x-hidden px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-normal grayscale dark:opacity-25 dark:mix-blend-luminosity"
        style={{ backgroundImage: `url(${images.inquiry})` }}
      />
      <div className="absolute inset-0 bg-background/90 dark:bg-background/80" />
      <div className="relative z-10">
        <RfqFlow initialContext={initialContext} locale={locale} />
      </div>
    </PageShell>
  );
}
