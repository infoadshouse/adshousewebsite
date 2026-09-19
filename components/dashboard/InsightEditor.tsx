"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CmsMediaField } from "@/components/dashboard/CmsImageField";
import { api } from "@/lib/marketplace/client";

type InsightForm = {
  id?: string;
  slug?: string;
  title: string;
  excerpt: string;
  seoDescription: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: string[] | string;
  published?: boolean;
};

export function InsightEditor({ initial }: { initial?: InsightForm | null }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    seoDescription: initial?.seoDescription ?? "",
    date: initial?.date || new Date().toISOString().slice(0, 10),
    readTime: initial?.readTime ?? "",
    category: initial?.category ?? "Insights",
    image: initial?.image ?? "/images/insight-seo.png",
    content: Array.isArray(initial?.content) ? initial.content.join("\n\n") : (initial?.content ?? ""),
    published: initial?.published !== false,
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      if (initial?.id) {
        await api(`/api/admin/insights/${initial.id}`, { method: "PATCH", json: form });
      } else {
        await api("/api/admin/insights", { method: "POST", json: form });
      }
      router.push("/dashboard/insights");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title })} required />
      <Field label="Slug (optional)" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
      <Field label="Category" value={form.category} onChange={(category) => setForm({ ...form, category })} />
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Date</span>
        <input
          type="date"
          className="w-full rounded-xl border border-line px-3 py-2"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </label>
      <Field label="Read time" value={form.readTime} onChange={(readTime) => setForm({ ...form, readTime })} placeholder="7 min" />
      <Area label="Excerpt" value={form.excerpt} onChange={(excerpt) => setForm({ ...form, excerpt })} />
      <Area label="SEO description" value={form.seoDescription} onChange={(seoDescription) => setForm({ ...form, seoDescription })} />
      <CmsMediaField label="Cover image or video" value={form.image} onChange={(image) => setForm({ ...form, image })} onError={setError} />
      <Area
        label="Body (blank line between paragraphs)"
        value={form.content}
        onChange={(content) => setForm({ ...form, content })}
        rows={14}
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => setForm({ ...form, published: e.target.checked })}
        />
        Published on /insights
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button type="submit" disabled={pending} className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
        {pending ? "Saving…" : "Save post"}
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
      <textarea
        className="w-full rounded-xl border border-line px-3 py-2"
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}
