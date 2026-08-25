"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/marketplace/client";

const ROLES = [
  { id: "creator", label: "Creator", body: "Get discovered and apply to campaigns" },
  { id: "business", label: "Business", body: "Find creators and post campaigns" },
  { id: "agency", label: "Agency", body: "Manage clients and run campaigns for them" },
] as const;

export function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [role, setRole] = useState<(typeof ROLES)[number]["id"]>(
    ROLES.some((r) => r.id === params.get("role")) ? (params.get("role") as (typeof ROLES)[number]["id"]) : "creator",
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      await api("/api/auth/register", { method: "POST", json: { name, email, password, role } });
      router.push("/dashboard/profile");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not register");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-lg space-y-5 rounded-3xl border border-line bg-white p-6 shadow-sm">
      <div className="grid gap-3 sm:grid-cols-3">
        {ROLES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setRole(item.id)}
            className={`rounded-2xl border p-3 text-left text-sm ${
              role === item.id ? "border-sky bg-sky/5" : "border-line"
            }`}
          >
            <span className="font-semibold text-sky-dark">{item.label}</span>
            <span className="mt-1 block text-xs text-muted">{item.body}</span>
          </button>
        ))}
      </div>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Name</span>
        <input
          required
          className="w-full rounded-xl border border-line px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Email</span>
        <input
          type="email"
          required
          className="w-full rounded-xl border border-line px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Password</span>
        <input
          type="password"
          required
          minLength={8}
          className="w-full rounded-xl border border-line px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
      <p className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/marketplace/login" className="text-sky">
          Sign in
        </Link>
      </p>
    </form>
  );
}
