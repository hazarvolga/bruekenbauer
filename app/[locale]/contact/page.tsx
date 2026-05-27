import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/motion/MotionProvider";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Engineering Contact — brüeckenbauer GmbH",
  description: "Direct contact channel for procurement, technical, and partnership inquiries.",
};

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "ContactPage" });

  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        {t("label")}
      </span>
      <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        {t("title")}
      </h1>
      <ContactForm />
    </PageShell>
  );
}
