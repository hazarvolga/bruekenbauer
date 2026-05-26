"use client"; // form state + API submission

import { useState } from "react";
import { TechnicalButton } from "@/components/layout/TechnicalButton";
import type { ContactRequest } from "@/app/api/contact/route";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState<ContactRequest>({
    name: "",
    email: "",
    company: "",
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
        body: JSON.stringify(form),
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
          Transmission confirmed
        </p>
        <p className="mt-4 font-mono text-technical-md text-on-surface-variant">
          Message received. An engineer will respond within 2 business days.
        </p>
        {referenceId && (
          <p className="mt-4 font-mono text-label-xs uppercase tracking-[0.12em] text-outline">
            Reference: <span className="text-warning-red">{referenceId}</span>
          </p>
        )}
        <TechnicalButton
          className="mt-8"
          variant="ghost"
          onClick={() => {
            setStatus("idle");
            setReferenceId(null);
            setForm({ name: "", email: "", company: "", message: "" });
          }}
        >
          New Message
        </TechnicalButton>
      </div>
    );
  }

  return (
    <form
      className="mt-12 grid max-w-4xl gap-8"
      aria-label="Contact form"
      onSubmit={(e) => void handleSubmit(e)}
    >
      {(
        [
          ["name", "Contact Name", "text"],
          ["email", "Preferred Contact Method", "email"],
          ["company", "Company / coordinates", "text"],
        ] as const
      ).map(([id, label, type]) => (
        <div key={id}>
          <label
            htmlFor={id}
            className="mb-2 block font-mono text-label-xs uppercase tracking-[0.18em] text-outline"
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            required={id !== "company"}
            value={form[id]}
            onChange={(e) => update(id, e.target.value)}
            className="w-full border-0 border-b border-graphite-muted bg-transparent py-3 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
          />
        </div>
      ))}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block font-mono text-label-xs uppercase tracking-[0.18em] text-outline"
        >
          Project Information
        </label>
        <textarea
          id="message"
          rows={6}
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full border border-graphite-muted bg-surface-dim/50 p-4 font-mono text-technical-md text-on-surface focus:border-warning-red focus:ring-0"
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
        {status === "loading" ? "Submitting..." : "Submit Inquiry"}
      </TechnicalButton>
    </form>
  );
}
