"use client"; // form state + API submission

import { useState } from "react";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import type { ContactRequest } from "@/app/api/contact/route";
import { normalizeLocale } from "@/data/localizedContent";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm({ locale = "en" }: { locale?: string }) {
  const normalizedLocale = normalizeLocale(locale);
  const copy = {
    en: {
      confirmed: "Transmission confirmed",
      received: "Message received. An engineer will respond within 2 business days.",
      reference: "Reference",
      newMessage: "New Message",
      aria: "Contact form",
      name: "Contact Name",
      email: "Preferred Contact Method",
      company: "Company Name",
      phone: "Phone Number",
      message: "Project Description",
      submitting: "Submitting...",
      submit: "Submit Inquiry",
      placeholderName: "e.g. Dr. Arthur Vance",
      placeholderEmail: "e.g. vance@company.com",
      placeholderCompany: "e.g. Vance Semiconductor (optional)",
      placeholderPhone: "e.g. +49 89 1234567 (optional)",
      placeholderMessage: "Describe your design requirements, target volume, and technical specifications...",
    },
    de: {
      confirmed: "Übermittlung bestätigt",
      received: "Nachricht erhalten. Ein Engineer meldet sich innerhalb von 2 Werktagen.",
      reference: "Referenz",
      newMessage: "Neue Nachricht",
      aria: "Kontaktformular",
      name: "Kontaktname",
      email: "Bevorzugte Kontaktmethode",
      company: "Unternehmensname",
      phone: "Telefonnummer",
      message: "Projektbeschreibung",
      submitting: "Wird gesendet...",
      submit: "Anfrage senden",
      placeholderName: "z.B. Dr. Arthur Vance",
      placeholderEmail: "z.B. vance@company.de",
      placeholderCompany: "z.B. Vance Halbleiter (optional)",
      placeholderPhone: "z.B. +49 89 1234567 (optional)",
      placeholderMessage: "Beschreiben Sie Ihre Designanforderungen, das Zielvolumen und die technischen Spezifikationen...",
    },
    fr: {
      confirmed: "Transmission confirmée",
      received: "Message reçu. Un engineer répondra sous 2 jours ouvrables.",
      reference: "Référence",
      newMessage: "Nouveau message",
      aria: "Formulaire de contact",
      name: "Nom du contact",
      email: "Méthode de contact préférée",
      company: "Nom de l'entreprise",
      phone: "Numéro de téléphone",
      message: "Description du projet",
      submitting: "Envoi...",
      submit: "Soumettre la demande",
      placeholderName: "ex. Dr. Arthur Vance",
      placeholderEmail: "ex. vance@company.fr",
      placeholderCompany: "ex. Vance Semi-conducteurs (optionnel)",
      placeholderPhone: "ex. +33 1 23 45 67 89 (optionnel)",
      placeholderMessage: "Décrivez vos besoins de conception, le volume cible et les spécifications techniques...",
    },
  }[normalizedLocale];
  const [form, setForm] = useState<ContactRequest>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function update(field: keyof ContactRequest, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const complete = form.name.trim() && form.email.trim() && form.message.trim();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { referenceId: string };
      setReferenceId(data.referenceId);
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-12 max-w-2xl border border-graphite-muted bg-surface-container-low/50 p-8">
        <p className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {copy.confirmed}
        </p>
        <p className="mt-4 font-mono text-technical-md text-on-surface-variant">{copy.received}</p>
        {referenceId && (
          <p className="mt-4 font-mono text-label-xs uppercase tracking-[0.12em] text-outline">
            {copy.reference}: <span className="text-warning-red">{referenceId}</span>
          </p>
        )}
        <TechnicalButton
          className="mt-8"
          variant="ghost"
          onClick={() => {
            setStatus("idle");
            setReferenceId(null);
            setForm({ name: "", email: "", company: "", phone: "", message: "" });
          }}
        >
          {copy.newMessage}
        </TechnicalButton>
      </div>
    );
  }

  return (
    <form
      className="mt-12 grid max-w-4xl gap-8"
      aria-label={copy.aria}
      onSubmit={(e) => void handleSubmit(e)}
    >
      {(
        [
          ["name", copy.name, "text", copy.placeholderName, true],
          ["email", copy.email, "email", copy.placeholderEmail, true],
          ["company", copy.company, "text", copy.placeholderCompany, false],
          ["phone", copy.phone, "tel", copy.placeholderPhone, false],
        ] as const
      ).map(([id, label, type, placeholder, required]) => (
        <div key={id}>
          <label
            htmlFor={id}
            className="mb-2 block font-mono text-label-xs uppercase tracking-[0.18em] text-outline"
          >
            {label}
            {required && <span className="ml-1 text-warning-red">*</span>}
          </label>
          <input
            id={id}
            type={type}
            required={required}
            placeholder={placeholder}
            value={form[id] || ""}
            onChange={(e) => update(id, e.target.value)}
            className="w-full border border-outline-variant hover:border-outline focus:border-warning-red bg-surface-container-low/60 px-4 py-3 font-mono text-technical-md text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-warning-red/20 focus:outline-none transition-colors duration-200"
          />
        </div>
      ))}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-label-xs uppercase tracking-[0.18em] text-outline"
        >
          {copy.message}
          <span className="ml-1 text-warning-red">*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          required
          placeholder={copy.placeholderMessage}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full border border-outline-variant hover:border-outline focus:border-warning-red bg-surface-container-low/60 p-4 font-mono text-technical-md text-on-surface placeholder:text-outline/40 focus:ring-1 focus:ring-warning-red/20 focus:outline-none transition-colors duration-200"
        />
      </div>
      {errorMsg && (
        <p className="font-mono text-label-xs uppercase tracking-[0.12em] text-warning-red">
          ERR — {errorMsg}
        </p>
      )}
      <TechnicalButton
        type="submit"
        className={!complete || status === "loading" ? "opacity-60" : ""}
      >
        {status === "loading" ? copy.submitting : copy.submit}
      </TechnicalButton>
    </form>
  );
}
