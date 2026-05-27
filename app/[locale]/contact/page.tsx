import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageShell } from "@/components/motion/MotionProvider";

export const metadata: Metadata = {
  title: "Engineering Contact — brückenbauer GmbH",
  description: "Direct contact channel for procurement, technical, and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <PageShell className="min-h-screen px-margin-mobile pb-24 pt-32 md:ml-20 md:px-margin-desktop">
      <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
        Supplier Inquiry
      </span>
      <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
        Engineering Contact
      </h1>
      <ContactForm />
    </PageShell>
  );
}
