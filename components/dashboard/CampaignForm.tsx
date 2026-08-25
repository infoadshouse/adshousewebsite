"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";
import { CREATOR_CATEGORIES, SOCIAL_PLATFORMS } from "@/lib/marketplace/constants";

type Client = { id: string; name: string };

export function CampaignForm({ role }: { role: "business" | "agency" | "admin" | "creator" }) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "Rohtak",
    state: "Haryana",
    district: "Rohtak",
    locality: "",
    categories: ["Food"] as string[],
    platforms: ["Instagram"] as string[],
    followerMin: "10000",
    followerMax: "100000",
    budget: "25000",
    creatorCount: "5",
    durationDays: "15",
    agencyClientId: "",
  });

  useEffect(() => {
    if (role === "agency" || role === "admin") {
      api<{ clients: Client[] }>("/api/marketplace/clients")
        .then((data) => setClients(data.clients))
        .catch(() => undefined);
    }
  }, [role]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      const data = await api<{ campaign: { id: string } }>("/api/marketplace/campaigns", {
        method: "POST",
        json: {
          title: form.title,
          description: form.description,
          location: { city: form.city, state: form.state, district: form.district, locality: form.locality },
          categories: form.categories,
          platforms: form.platforms,
          followerMin: Number(form.followerMin),
          followerMax: Number(form.followerMax),
          budget: Number(form.budget),
          creatorCount: Number(form.creatorCount),
          durationDays: Number(form.durationDays),
          agencyClientId: form.agencyClientId || undefined,
        },
      });
      router.push(`/dashboard/campaigns/${data.campaign.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create campaign");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      {role === "agency" || role === "admin" ? (
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase text-muted">Client</span>
          <select
            className="w-full rounded-xl border border-line px-3 py-2"
            value={form.agencyClientId}
            onChange={(e) => setForm({ ...form, agencyClientId: e.target.value })}
          >
            <option value="">No client / general</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Title</span>
        <input
          required
          className="w-full rounded-xl border border-line px-3 py-2"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Brief</span>
        <textarea
          required
          className="min-h-32 w-full rounded-xl border border-line px-3 py-2"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
        <Input label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
        <Input label="Budget (₹)" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
        <Input label="Creators needed" value={form.creatorCount} onChange={(v) => setForm({ ...form, creatorCount: v })} />
        <Input label="Followers min" value={form.followerMin} onChange={(v) => setForm({ ...form, followerMin: v })} />
        <Input label="Followers max" value={form.followerMax} onChange={(v) => setForm({ ...form, followerMax: v })} />
        <Input label="Duration (days)" value={form.durationDays} onChange={(v) => setForm({ ...form, durationDays: v })} />
      </div>
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase text-muted">Categories</legend>
        <div className="flex flex-wrap gap-2">
          {CREATOR_CATEGORIES.map((cat) => {
            const on = form.categories.includes(cat);
            return (
              <button
                key={cat}
                type="button"
                className={`rounded-full px-3 py-1 text-xs ${on ? "bg-sky text-white" : "bg-surface"}`}
                onClick={() =>
                  setForm({
                    ...form,
                    categories: on ? form.categories.filter((c) => c !== cat) : [...form.categories, cat],
                  })
                }
              >
                {cat}
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-xs font-semibold uppercase text-muted">Platforms</legend>
        <div className="flex flex-wrap gap-2">
          {SOCIAL_PLATFORMS.map((p) => {
            const on = form.platforms.includes(p);
            return (
              <button
                key={p}
                type="button"
                className={`rounded-full px-3 py-1 text-xs ${on ? "bg-sky text-white" : "bg-surface"}`}
                onClick={() =>
                  setForm({
                    ...form,
                    platforms: on ? form.platforms.filter((c) => c !== p) : [...form.platforms, p],
                  })
                }
              >
                {p}
              </button>
            );
          })}
        </div>
      </fieldset>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button type="submit" disabled={pending} className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">
        {pending ? "Publishing…" : "Publish campaign"}
      </button>
    </form>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted">{label}</span>
      <input className="w-full rounded-xl border border-line px-3 py-2" value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
