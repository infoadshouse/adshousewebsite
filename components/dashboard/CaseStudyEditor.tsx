"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CmsImageField } from "@/components/dashboard/CmsImageField";
import { api } from "@/lib/marketplace/client";

type CaseForm = {
  id?: string;
  slug?: string;
  client: string;
  industry: string;
  location: string;
  title: string;
  challenge: string;
  solution: string;
  result: string;
  metric: string;
  metricLabel: string;
  image: string;
  year: string;
  services: string[];
  stats: { label: string; value: string }[];
  story: string[];
  published?: boolean;
};

export function CaseStudyEditor({ initial }: { initial?: CaseForm | null }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    client: initial?.client ?? "",
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    industry: initial?.industry ?? "",
    location: initial?.location ?? "India",
    year: initial?.year || String(new Date().getFullYear()),
    metric: initial?.metric ?? "",
    metricLabel: initial?.metricLabel ?? "",
    challenge: initial?.challenge ?? "",
    solution: initial?.solution ?? "",
    result: initial?.result ?? "",
    image: initial?.image ?? "/images/work-fashion.png",
    services: (initial?.services ?? []).join(", "),
    stats: (initial?.stats ?? []).map((row) => `${row.label}|${row.value}`).join("\n"),
    story: (initial?.story ?? []).join("\n\n"),
    published: initial?.published !== false,
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const payload = {
        ...form,
        services: form.services,
        stats: form.stats,
        story: form.story,
      };
      if (initial?.id) {
        await api(`/api/admin/work/${initial.id}`, { method: "PATCH", json: payload });
      } else {
        await api("/api/admin/work", { method: "POST", json: payload });
      }
      router.push("/dashboard/work");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <Field label="Client" value={form.client} onChange={(client) => setForm({ ...form, client })} required />
      <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} required />
      <Field label="Slug (optional)" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Industry" value={form.industry} onChange={(industry) => setForm({ ...form, industry })} />
        <Field label="Location" value={form.location} onChange={(location) => setForm({ ...form, location })} />
        <Field label="Year" value={form.year} onChange={(year) => setForm({ ...form, year })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Metric" value={form.metric} onChange={(metric) => setForm({ ...form, metric })} placeholder="+187%" />
        <Field label="Metric label" value={form.metricLabel} onChange={(metricLabel) => setForm({ ...form, metricLabel })} placeholder="qualified leads" />
      </div>
      <Area label="Challenge" value={form.challenge} onChange={(challenge) => setForm({ ...form, challenge })} />
      <Area label="Solution" value={form.solution} onChange={(solution) => setForm({ ...form, solution })} />
      <Area label="Result" value={form.result} onChange={(result) => setForm({ ...form, result })} />
      <Field label="Services (comma separated)" value={form.services} onChange={(services) => setForm({ ...form, services })} placeholder="Brand Building, SEO" />
      <Area label="Stats (one per line: Label|Value)" value={form.stats} onChange={(stats) => setForm({ ...form, stats })} />
      <CmsImageField label="Cover image" value={form.image} onChange={(image) => setForm({ ...form, image })} onError={setError} />
      <Area label="Story (blank line between paragraphs)" value={form.story} onChange={(story) => setForm({ ...form, story })} rows={10} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
        Published on /work
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button type="submit" disabled={pending} className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
        {pending ? "Saving…" : "Save case study"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted">{label}</span>
      <input
        className="w-full rounded-xl border border-line px-3 py-2"
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted">{label}</span>
      <textarea className="w-full rounded-xl border border-line px-3 py-2" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
