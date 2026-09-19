"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CmsImageField } from "@/components/dashboard/CmsImageField";
import { api } from "@/lib/marketplace/client";

type Item = {
  id?: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  result: string;
  image: string;
  sortOrder?: number;
  published?: boolean;
};

export function TestimonialEditor({ initial }: { initial?: Item | null }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    role: initial?.role ?? "",
    company: initial?.company ?? "",
    quote: initial?.quote ?? "",
    result: initial?.result ?? "",
    image: initial?.image ?? "/images/testimonial-1.png",
    sortOrder: String(initial?.sortOrder ?? 0),
    published: initial?.published !== false,
  });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const payload = { ...form, sortOrder: Number(form.sortOrder) };
      if (initial?.id) {
        await api(`/api/admin/testimonials/${initial.id}`, { method: "PATCH", json: payload });
      } else {
        await api("/api/admin/testimonials", { method: "POST", json: payload });
      }
      router.push("/dashboard/testimonials");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-4">
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Name</span>
        <input className="w-full rounded-xl border border-line px-3 py-2" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase text-muted">Role</span>
          <input className="w-full rounded-xl border border-line px-3 py-2" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase text-muted">Company</span>
          <input className="w-full rounded-xl border border-line px-3 py-2" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        </label>
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Quote</span>
        <textarea className="w-full rounded-xl border border-line px-3 py-2" rows={5} required value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Result line</span>
        <input className="w-full rounded-xl border border-line px-3 py-2" value={form.result} onChange={(e) => setForm({ ...form, result: e.target.value })} />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Order</span>
        <input className="w-full rounded-xl border border-line px-3 py-2" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: e.target.value })} />
      </label>
      <CmsImageField label="Photo" value={form.image} onChange={(image) => setForm({ ...form, image })} onError={setError} />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
        Published on homepage
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button type="submit" disabled={pending} className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
        {pending ? "Saving…" : "Save testimonial"}
      </button>
    </form>
  );
}
