"use client"; // multi-step form state + API submission

import { useMemo, useState } from "react";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import { applications } from "@/data/applications";
import { getApplicationCopy, getProductGroupCopy, normalizeLocale } from "@/data/localizedContent";
import { productTaxonomy, type ProductGroup } from "@/data/productTaxonomy";
import { products } from "@/data/products";
import type { RfqRequest } from "@/app/api/rfq/route";
import { localizePath } from "@/data/localizedContent";
import { trackEvent } from "@/lib/analytics";
import Link from "next/link";

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
  website: "",
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
      eyebrow: "Request for quotation",
      title: "Request for Quotation (RFQ)",
      intro:
        "Share the product group, application sector, monthly volume, lead time, contact data, and project notes required for a precise quotation.",
      productGroup: "Product group",
      productFamily: "Product family",
      applicationSector: "Application sector",
      monthlyVolume: "Monthly volume (units/month)",
      leadTime: "Required lead time (days/weeks)",
      contactName: "Contact name",
      email: "Email",
      company: "Company",
      notes: "RFQ notes",
      placeholder: "Technical requirements, compliance needs, packaging, forecast windows...",
      placeholders: {
        monthlyVolume: "Example: 10000",
        leadTime: "Example: 14 days",
        contactName: "Your full name",
        email: "name@company.com",
        company: "Company name",
      },
      submitting: "Submitting...",
      submit: "Submit RFQ",
      privacyPrefix: "By submitting this RFQ, you acknowledge that your personal data will be processed in accordance with our",
      privacyLink: "Privacy Policy",
      confidential: "Please do not submit confidential or export-controlled information unless covered by an appropriate agreement.",
      response: "Typical response within 1-2 business days.",
    },
    de: {
      confirmed: "RFQ bestätigt",
      received: "RFQ erhalten",
      success: "Ihre Anfrage wurde erfasst. Ein Ingenieur meldet sich innerhalb von 2 Werktagen.",
      reference: "Referenz",
      newInquiry: "Neue Anfrage",
      notSupplied: "Nicht angegeben",
      eyebrow: "Angebotsanfrage",
      title: "Angebotsanfrage (RFQ)",
      intro:
        "Teilen Sie Produktgruppe, Anwendungsbereich, Monatsvolumen, Lieferzeit, Kontaktdaten und Projektnotizen für ein präzises Angebot.",
      productGroup: "Produktgruppe",
      productFamily: "Produktfamilie",
      applicationSector: "Anwendungsbereich",
      monthlyVolume: "Monatsvolumen (Stück/Monat)",
      leadTime: "Gewünschte Lieferzeit (Tage/Wochen)",
      contactName: "Kontaktname",
      email: "E-Mail",
      company: "Unternehmen",
      notes: "RFQ-Notizen",
      placeholder: "Technische Anforderungen, Compliance-Bedarf, Verpackung, Forecast-Fenster...",
      placeholders: {
        monthlyVolume: "Beispiel: 10000",
        leadTime: "Beispiel: 14 Tage",
        contactName: "Ihr vollständiger Name",
        email: "name@unternehmen.com",
        company: "Unternehmensname",
      },
      submitting: "Wird gesendet...",
      submit: "RFQ absenden",
      privacyPrefix: "Mit dem Absenden dieser RFQ bestätigen Sie, dass Ihre personenbezogenen Daten gemäß unserer",
      privacyLink: "Datenschutzerklärung verarbeitet werden.",
      confidential: "Bitte übermitteln Sie keine vertraulichen oder exportkontrollierten Informationen, sofern keine geeignete Vereinbarung besteht.",
      response: "Typische Antwort innerhalb von 1-2 Werktagen.",
    },
    fr: {
      confirmed: "RFQ confirmé",
      received: "RFQ reçu",
      success: "Votre demande a été enregistrée. Un ingénieur répondra sous 2 jours ouvrables.",
      reference: "Référence",
      newInquiry: "Nouvelle demande",
      notSupplied: "Non renseigné",
      eyebrow: "Demande de devis",
      title: "Demande de devis (RFQ)",
      intro:
        "Partagez le groupe produit, le secteur d'application, le volume mensuel, le délai, les coordonnées et les notes projet nécessaires à un devis précis.",
      productGroup: "Groupe produit",
      productFamily: "Famille produit",
      applicationSector: "Secteur d'application",
      monthlyVolume: "Volume mensuel (unités/mois)",
      leadTime: "Délai souhaité (jours/semaines)",
      contactName: "Nom du contact",
      email: "E-mail",
      company: "Entreprise",
      notes: "Notes RFQ",
      placeholder: "Exigences techniques, conformité, packaging, fenêtres de forecast...",
      placeholders: {
        monthlyVolume: "Exemple : 10000",
        leadTime: "Exemple : 14 jours",
        contactName: "Votre nom complet",
        email: "nom@entreprise.com",
        company: "Nom de l'entreprise",
      },
      submitting: "Envoi...",
      submit: "Soumettre RFQ",
      privacyPrefix: "En envoyant cette RFQ, vous reconnaissez que vos données personnelles seront traitées conformément à notre",
      privacyLink: "Politique de confidentialité.",
      confidential: "Ne transmettez pas d'informations confidentielles ou soumises au contrôle des exportations sans accord approprié.",
      response: "Réponse habituelle sous 1 à 2 jours ouvrables.",
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
  const fieldClass =
    "mt-2 w-full border border-outline/70 bg-surface-container-low/60 px-4 py-3 font-mono text-technical-md text-on-surface outline-none transition-colors duration-200 placeholder:text-outline/45 hover:border-industrial-silver focus:border-warning-red focus:ring-1 focus:ring-warning-red/20";
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
        body: JSON.stringify({ ...state, locale }),
      });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? `HTTP ${res.status}`);
      }
      const data = (await res.json()) as { referenceId: string };
      setReferenceId(data.referenceId);
      setStatus("success");
      trackEvent("rfq_form_submit", {
        form_name: "rfq",
        locale: normalizedLocale,
        product_group: state.productGroup,
        source: state.source,
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
      setStatus("error");
    }
  }

  if (status === "success") {
    const keyLabels: Record<string, string> = {
      source: normalizedLocale === "de" ? "Quelle" : normalizedLocale === "fr" ? "Source" : "Source",
      productSlug: normalizedLocale === "de" ? "Produkt-Slug" : normalizedLocale === "fr" ? "Slug du produit" : "Product Slug",
      familySlug: normalizedLocale === "de" ? "Familien-Slug" : normalizedLocale === "fr" ? "Slug de la famille" : "Family Slug",
      productGroup: copy.productGroup,
      productFamily: copy.productFamily,
      applicationSector: copy.applicationSector,
      monthlyVolume: copy.monthlyVolume,
      leadTime: copy.leadTime,
      name: copy.contactName,
      email: copy.email,
      company: copy.company,
      notes: copy.notes,
    };

    const getLocalizedValue = (key: string, val: string) => {
      if (!val) return copy.notSupplied;
      if (key === "source") {
        const sourceTranslations: Record<string, Record<string, string>> = {
          en: {
            general: "General",
            product: "Product",
            "power-family": "Power Family",
            "application-sector": "Application Sector",
          },
          de: {
            general: "Allgemein",
            product: "Produkt",
            "power-family": "Power-Familie",
            "application-sector": "Anwendungsbereich",
          },
          fr: {
            general: "Général",
            product: "Produit",
            "power-family": "Famille d'alimentation",
            "application-sector": "Secteur d'application",
          },
        };
        return sourceTranslations[normalizedLocale]?.[val] || val;
      }
      if (key === "productGroup") {
        try {
          const groupCopy = getProductGroupCopy(normalizedLocale, val as ProductGroup);
          return groupCopy?.title || val;
        } catch {
          return val;
        }
      }
      if (key === "applicationSector") {
        const appObj = applications.find((item) => item.name === val);
        return appObj ? getApplicationCopy(normalizedLocale, appObj).name : val;
      }
      if (key === "leadTime") {
        const lowerVal = val.toLowerCase();
        if (lowerVal.includes("days")) {
          const suffix = normalizedLocale === "de" ? " Tage" : normalizedLocale === "fr" ? " jours" : " days";
          return val.replace(/\s*days/i, suffix);
        }
        if (lowerVal.includes("day")) {
          const suffix = normalizedLocale === "de" ? " Tag" : normalizedLocale === "fr" ? " jour" : " day";
          return val.replace(/\s*day/i, suffix);
        }
      }
      return val;
    };

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
          {Object.entries(state).filter(([key]) => key !== "website").map(([key, value]) => (
            <div
              key={key}
              className="grid grid-cols-[0.45fr_1fr] gap-4 border-b border-graphite-muted py-4 last:border-b-0"
            >
              <dt className="text-outline">{keyLabels[key] || key.replace(/([A-Z])/g, " $1")}</dt>
              <dd className="text-industrial-silver">{getLocalizedValue(key, value)}</dd>
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
              className={fieldClass}
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
              className={fieldClass}
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
              className={fieldClass}
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
            placeholder={copy.placeholders.monthlyVolume}
            inputClassName={fieldClass}
            onChange={(value) => update("monthlyVolume", value)}
          />
          <Field
            id="leadTime"
            label={copy.leadTime}
            value={state.leadTime}
            placeholder={copy.placeholders.leadTime}
            inputClassName={fieldClass}
            onChange={(value) => update("leadTime", value)}
          />
          <Field
            id="name"
            label={copy.contactName}
            value={state.name}
            required
            placeholder={copy.placeholders.contactName}
            inputClassName={fieldClass}
            onChange={(value) => update("name", value)}
          />
          <Field
            id="email"
            label={copy.email}
            type="email"
            value={state.email}
            required
            placeholder={copy.placeholders.email}
            inputClassName={fieldClass}
            onChange={(value) => update("email", value)}
          />
          <Field
            id="company"
            label={copy.company}
            value={state.company}
            required
            placeholder={copy.placeholders.company}
            inputClassName={fieldClass}
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
            className={`${fieldClass} min-h-36 resize-y`}
            placeholder={copy.placeholder}
          />
        </label>
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={state.website || ""}
            onChange={(event) => update("website", event.target.value)}
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
        <div className="space-y-3 border-t border-graphite-muted pt-5 font-mono text-data-sm leading-relaxed text-outline">
          <p>
            {copy.privacyPrefix}{" "}
            <Link
              href={localizePath(normalizedLocale, "/privacy-policy")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant underline decoration-outline underline-offset-4 hover:text-warning-red"
            >
              {copy.privacyLink}
            </Link>
          </p>
          <p className="text-on-surface-variant">{copy.confidential}</p>
          <p className="uppercase tracking-[0.12em]">{copy.response}</p>
        </div>
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
  placeholder,
  inputClassName,
}: {
  id: keyof RfqState;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputClassName?: string;
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
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={
          inputClassName ??
          "mt-2 w-full border-0 border-b border-graphite-muted bg-transparent py-3 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
        }
      />
    </label>
  );
}
