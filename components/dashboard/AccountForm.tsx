"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/marketplace/client";

export function AccountForm({
  name,
  email,
  role,
}: {
  name: string;
  email: string;
  role: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ name, email, currentPassword: "", newPassword: "" });
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);
  const [pending, setPending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    setSaved(false);
    try {
      await api("/api/auth/me", {
        method: "PATCH",
        json: {
          name: form.name,
          email: form.email,
          currentPassword: form.currentPassword || undefined,
          newPassword: form.newPassword || undefined,
        },
      });
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save account");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky">{role}</p>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Name</span>
        <input
          required
          className="w-full rounded-xl border border-line px-3 py-2.5"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase text-muted">Email</span>
        <input
          type="email"
          required
          className="w-full rounded-xl border border-line px-3 py-2.5"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase text-muted">Current password</span>
          <input
            type="password"
            autoComplete="current-password"
            className="w-full rounded-xl border border-line px-3 py-2.5"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            placeholder="Only to change password"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-semibold uppercase text-muted">New password</span>
          <input
            type="password"
            autoComplete="new-password"
            className="w-full rounded-xl border border-line px-3 py-2.5"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
          />
        </label>
      </div>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      {saved ? <p className="text-sm text-sky">Account saved.</p> : null}
      <button type="submit" disabled={pending} className="btn-primary rounded-full px-6 py-2.5 text-sm font-semibold">
        {pending ? "Saving…" : "Save account"}
      </button>
    </form>
  );
}
