"use client";

import { useState } from "react";
import { services } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const budgets = ["₹2–5L / month", "₹5–15L / month", "₹15–40L / month", "₹40L+ / month", "Project-based"];

const fieldClass =
  "rounded-2xl border border-line bg-white px-4 py-3 text-[var(--text)] outline-none focus:border-sky";

export function InquiryForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-3xl border border-line bg-surface p-8 text-center">
        <p className="font-display text-2xl font-bold text-sky-dark">We have the brief.</p>
        <p className="mt-2 text-muted">
          A strategist from Ads House will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
      <Field label="Name" name="name" required autoComplete="name" />
      <Field label="Work email" name="email" type="email" required autoComplete="email" />
      <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
      <Field label="Company" name="company" required />
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Service needed</span>
        <select name="service" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet — need a growth plan</option>
        </select>
      </label>
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Budget</span>
        <select name="budget" required className={fieldClass} defaultValue="">
          <option value="" disabled>
            Select a range
          </option>
          {budgets.map((budget) => (
            <option key={budget} value={budget}>
              {budget}
            </option>
          ))}
        </select>
      </label>
      <label className={`grid gap-2 text-sm ${compact ? "" : "md:col-span-2"}`}>
        <span className="text-muted">What are you building?</span>
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          className={`resize-y ${fieldClass}`}
          placeholder="Brand, product, market, and the number you want to move."
        />
      </label>
      <div className={compact ? "" : "md:col-span-2"}>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary w-full rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60 md:w-auto"
        >
          {status === "loading" ? "Sending…" : "Start a Project"}
        </button>
        {status === "error" ? (
          <p className="mt-3 text-sm text-sky">Something went wrong. Email us at {siteConfig.email}.</p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </label>
  );
}
