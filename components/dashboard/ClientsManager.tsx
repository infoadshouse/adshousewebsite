"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";
import { BUSINESS_CATEGORIES, formatLocation } from "@/lib/marketplace/constants";

type Client = {
  id: string;
  name: string;
  category: string;
  notes: string;
  location?: { city?: string; state?: string; locality?: string };
};

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", category: "Restaurant", city: "Rohtak", state: "Haryana", notes: "" });
  const [pending, setPending] = useState(false);

  function load() {
    return api<{ clients: Client[] }>("/api/marketplace/clients").then((data) => setClients(data.clients));
  }

  useEffect(() => {
    load().catch((err: Error) => setError(err.message));
  }, []);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      await api("/api/marketplace/clients", {
        method: "POST",
        json: {
          name: form.name,
          category: form.category,
          notes: form.notes,
          location: { city: form.city, state: form.state, country: "India" },
        },
      });
      setForm({ name: "", category: "Restaurant", city: "Rohtak", state: "Haryana", notes: "" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not add client");
    } finally {
      setPending(false);
    }
  }

  async function remove(id: string) {
    await api(`/api/marketplace/clients/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <form onSubmit={create} className="space-y-3 rounded-2xl bg-surface p-4">
        <h2 className="font-semibold text-sky-dark">Add client</h2>
        <input
          required
          placeholder="Business name"
          className="w-full rounded-xl border border-line px-3 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <select
          className="w-full rounded-xl border border-line px-3 py-2"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {BUSINESS_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          placeholder="City"
          className="w-full rounded-xl border border-line px-3 py-2"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          className="min-h-24 w-full rounded-xl border border-line px-3 py-2"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        {error ? <p className="text-sm text-pink">{error}</p> : null}
        <button type="submit" disabled={pending} className="btn-primary rounded-full px-5 py-2 text-sm font-semibold">
          {pending ? "Saving…" : "Save client"}
        </button>
      </form>
      <ul className="space-y-3">
        {clients.map((client) => (
          <li key={client.id} className="rounded-2xl border border-line p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-sky-dark">{client.name}</p>
                <p className="text-sm text-muted">
                  {client.category} · {formatLocation(client.location)}
                </p>
                <p className="mt-2 text-sm text-muted">{client.notes}</p>
              </div>
              <button type="button" className="text-xs text-muted" onClick={() => remove(client.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
        {clients.length === 0 ? <p className="text-muted">No clients yet. Add a restaurant, gym, or shop you manage.</p> : null}
      </ul>
    </div>
  );
}
