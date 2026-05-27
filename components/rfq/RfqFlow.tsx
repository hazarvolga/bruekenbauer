"use client"; // multi-step form state + API submission

import { useMemo, useState } from "react";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { applications } from "@/data/applications";
import { getApplicationCopy, getProductGroupCopy, normalizeLocale } from "@/data/localizedContent";
import { productTaxonomy } from "@/data/productTaxonomy";
import { products } from "@/data/products";
import type { RfqRequest } from "@/app/api/rfq/route";

type RfqState = RfqRequest;

const defaultProduct = products[0];

const initialState: RfqState = {
  source: "general",
  productSlug: defaultProduct?.slug ?? "",
  familySlug: "",
  productGroup: defaultProduct?.group ?? productTaxonomy[0].name,
  productFamily: defaultProduct?.name ?? "",
  applicationSector: defaultProduct?.applications[0] ?? applications[0].name,
  monthlyVolume: "10000",
  leadTime: defaultProduct?.leadTime ?? "14 days",
  name: "",
  email: "",
  company: "",
  notes: "",
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

type RfqInitialContext = Partial<
  Pick<
    RfqState,
    | "source"
    | "productSlug"
    | "familySlug"
    | "productGroup"
    | "productFamily"
    | "applicationSector"
    | "leadTime"
    | "notes"
  >
>;

export function RfqFlow({
  initialContext,
  locale = "en",
}: {
  initialContext?: RfqInitialContext;
  locale?: string;
}) {
  const normalizedLocale = normalizeLocale(locale);
  const copy = {
    en: {
      confirmed: "RFQ confirmed",
      received: "RFQ Received",
      success: "Your inquiry has been logged. An engineer will respond within 2 business days.",
      reference: "Reference",
      newInquiry: "New Inquiry",
      notSupplied: "Not supplied",
      eyebrow: "Engineering inquiry",
      title: "Supplier Inquiry",
      intro:
        "Share the product group, application sector, monthly volume, lead time, contact data, and project notes required for a precise quotation.",
      productGroup: "Product group",
      productFamily: "Product family",
      applicationSector: "Application sector",
      monthlyVolume: "Monthly volume",
      leadTime: "Lead time",
      contactName: "Contact name",
      email: "Email",
      company: "Company",
      notes: "RFQ notes",
      placeholder: "Technical requirements, compliance needs, packaging, forecast windows...",
      submitting: "Submitting...",
      submit: "Submit RFQ",
    },
    de: {
      confirmed: "RFQ bestätigt",
      received: "RFQ erhalten",
      success: "Ihre Anfrage wurde erfasst. Ein Engineer meldet sich innerhalb von 2 Werktagen.",
      reference: "Referenz",
      newInquiry: "Neue Anfrage",
      notSupplied: "Nicht angegeben",
      eyebrow: "Technische Anfrage",
      title: "Lieferantenanfrage",
      intro:
        "Teilen Sie Produktgruppe, Anwendungsbereich, Monatsvolumen, Lieferzeit, Kontaktdaten und Projektnotizen für ein präzises Angebot.",
      productGroup: "Produktgruppe",
      productFamily: "Produktfamilie",
      applicationSector: "Anwendungsbereich",
      monthlyVolume: "Monatsvolumen",
      leadTime: "Lieferzeit",
      contactName: "Kontaktname",
      email: "E-Mail",
      company: "Unternehmen",
      notes: "RFQ-Notizen",
      placeholder: "Technische Anforderungen, Compliance-Bedarf, Verpackung, Forecast-Fenster...",
      submitting: "Wird gesendet...",
      submit: "RFQ absenden",
    },
    fr: {
      confirmed: "RFQ confirmé",
      received: "RFQ reçu",
      success: "Votre demande a été enregistrée. Un engineer répondra sous 2 jours ouvrables.",
      reference: "Référence",
      newInquiry: "Nouvelle demande",
      notSupplied: "Non renseigné",
      eyebrow: "Demande technique",
      title: "Demande fournisseur",
      intro:
        "Partagez le groupe produit, le secteur d'application, le volume mensuel, le délai, les coordonnées et les notes projet nécessaires à un devis précis.",
      productGroup: "Groupe produit",
      productFamily: "Famille produit",
      applicationSector: "Secteur d'application",
      monthlyVolume: "Volume mensuel",
      leadTime: "Délai",
      contactName: "Nom du contact",
      email: "E-mail",
      company: "Entreprise",
      notes: "Notes RFQ",
      placeholder: "Exigences techniques, conformité, packaging, fenêtres de forecast...",
      submitting: "Envoi...",
      submit: "Soumettre RFQ",
    },
  }[normalizedLocale];
  const resolvedInitialState = useMemo(
    () => ({ ...initialState, ...initialContext }),
    [initialContext]
  );
  const [state, setState] = useState<RfqState>(resolvedInitialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const familyOptions = useMemo(
    () => products.filter((product) => product.group === state.productGroup),
    [state.productGroup]
  );
  const selectedFamily = useMemo(
    () =>
      products.find((product) => product.slug === state.productSlug) ??
      familyOptions.find((product) => product.name === state.productFamily) ??
      familyOptions[0],
    [familyOptions, state.productFamily, state.productSlug]
  );
  const applicationOptions = useMemo(() => {
    const names: string[] = selectedFamily?.applications.length
      ? selectedFamily.applications
      : applications.map((application) => application.name);

    return names.includes(state.applicationSector) ? names : [state.applicationSector, ...names];
  }, [selectedFamily, state.applicationSector]);

  const complete = useMemo(
    () => state.name.trim() && state.email.trim() && state.company.trim(),
    [state]
  );

  function update(field: keyof RfqState, value: string) {
    setState((current) => ({ ...current, [field]: value }));
  }

  function updateProductGroup(productGroup: string) {
    const nextProduct = products.find((product) => product.group === productGroup);
    setState((current) => ({
      ...current,
      source: "general",
      productGroup,
      productSlug: nextProduct?.slug ?? "",
      familySlug: "",
      productFamily: nextProduct?.name ?? "",
      applicationSector: nextProduct?.applications[0] ?? applications[0].name,
      leadTime: nextProduct?.leadTime ?? current.leadTime,
    }));
  }

  function updateProductFamily(productSlug: string) {
    const nextProduct = products.find((product) => product.slug === productSlug);
    if (!nextProduct) return;
    setState((current) => ({
      ...current,
      source: "general",
      productSlug: nextProduct.slug,
      familySlug: "",
      productGroup: nextProduct.group,
      productFamily: nextProduct.name,
      applicationSector: nextProduct.applications[0] ?? current.applicationSector,
      leadTime: nextProduct.leadTime,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!complete) return;
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
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
      <section className="grid gap-gutter lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
            {copy.confirmed}
          </span>
          <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
            {copy.received}
          </h1>
          <p className="mt-6 max-w-xl font-mono text-technical-md text-on-surface-variant">
            {copy.success}
          </p>
          {referenceId && (
            <p className="mt-4 font-mono text-label-xs uppercase tracking-[0.12em] text-outline">
              {copy.reference}: <span className="text-warning-red">{referenceId}</span>
            </p>
          )}
          <TechnicalButton
            className="mt-10"
            variant="ghost"
            onClick={() => {
              setStatus("idle");
              setReferenceId(null);
              setState(resolvedInitialState);
            }}
          >
            {copy.newInquiry}
          </TechnicalButton>
        </div>
        <dl className="border border-graphite-muted bg-surface-container-low/50 p-8 font-mono text-data-sm uppercase">
          {Object.entries(state).map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-[0.45fr_1fr] gap-4 border-b border-graphite-muted py-4 last:border-b-0"
            >
              <dt className="text-outline">{key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="text-industrial-silver">{value || copy.notSupplied}</dd>
            </div>
          ))}
        </dl>
      </section>
    );
  }

  return (
    <form
      className="grid gap-gutter lg:grid-cols-[0.8fr_1.2fr]"
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div>
        <span className="font-mono text-label-xs uppercase tracking-[0.18em] text-warning-red">
          {copy.eyebrow}
        </span>
        <h1 className="mt-5 font-mono text-headline-lg-mobile uppercase text-on-surface md:text-headline-lg">
          {copy.title}
        </h1>
        <p className="mt-6 max-w-xl font-mono text-technical-md text-on-surface-variant">
          {copy.intro}
        </p>
      </div>
      <div className="space-y-8 border border-graphite-muted bg-surface-container-low/45 p-6 backdrop-blur-xl md:p-8">
        <div className="grid gap-6 md:grid-cols-2">
          <label className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            {copy.productGroup}
            <select
              value={state.productGroup}
              onChange={(event) => updateProductGroup(event.target.value)}
              className="mt-2 w-full border border-graphite-muted bg-surface p-3 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
            >
              {productTaxonomy.map((group) => (
                <option key={group.slug} value={group.name}>
                  {getProductGroupCopy(normalizedLocale, group.name).title}
                </option>
              ))}
            </select>
          </label>
          <label className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            {copy.productFamily}
            <select
              value={selectedFamily?.slug ?? ""}
              onChange={(event) => updateProductFamily(event.target.value)}
              className="mt-2 w-full border border-graphite-muted bg-surface p-3 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
            >
              {familyOptions.map((product) => (
                <option key={product.slug} value={product.slug}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label className="font-mono text-label-xs uppercase tracking-[0.18em] text-outline">
            {copy.applicationSector}
            <select
              value={state.applicationSector}
              onChange={(event) => update("applicationSector", event.target.value)}
              className="mt-2 w-full border border-graphite-muted bg-surface p-3 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
            >
              {applicationOptions.map((application) => (
                <option key={application} value={application}>
                  {
                    getApplicationCopy(
                      normalizedLocale,
                      applications.find((item) => item.name === application) ?? applications[0]
                    ).name
                  }
                </option>
              ))}
            </select>
          </label>
          <Field
            id="monthlyVolume"
            label={copy.monthlyVolume}
            value={state.monthlyVolume}
            type="number"
            onChange={(value) => update("monthlyVolume", value)}
          />
          <Field
            id="leadTime"
            label={copy.leadTime}
            value={state.leadTime}
            onChange={(value) => update("leadTime", value)}
          />
          <Field
            id="name"
            label={copy.contactName}
            value={state.name}
            required
            onChange={(value) => update("name", value)}
          />
          <Field
            id="email"
            label={copy.email}
            type="email"
            value={state.email}
            required
            onChange={(value) => update("email", value)}
          />
          <Field
            id="company"
            label={copy.company}
            value={state.company}
            required
            onChange={(value) => update("company", value)}
          />
        </div>
        <label
          htmlFor="notes"
          className="block font-mono text-label-xs uppercase tracking-[0.18em] text-outline"
        >
          {copy.notes}
          <textarea
            id="notes"
            rows={5}
            value={state.notes}
            onChange={(event) => update("notes", event.target.value)}
            className="mt-2 w-full border border-graphite-muted bg-surface-dim/50 p-4 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
            placeholder={copy.placeholder}
          />
        </label>
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
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  id: keyof RfqState;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={id}
      className="block font-mono text-label-xs uppercase tracking-[0.18em] text-outline"
    >
      {label}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full border-0 border-b border-graphite-muted bg-transparent py-3 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
      />
    </label>
  );
}
