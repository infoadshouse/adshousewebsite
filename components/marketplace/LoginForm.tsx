"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/marketplace/client";
import { DEMO_ACCOUNTS, DEMO_PASSWORD } from "@/lib/marketplace/demo-accounts";

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(e?: React.FormEvent, creds?: { email: string; password: string }) {
    e?.preventDefault();
    const loginEmail = creds?.email ?? email;
    const loginPassword = creds?.password ?? password;
    setPending(true);
    setError("");
    try {
      await api("/api/auth/login", { method: "POST", json: { email: loginEmail, password: loginPassword } });
      window.location.assign(next.startsWith("/") ? next : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-sky-dark">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-line px-3.5 py-2.5 outline-none ring-sky/20 focus:border-sky focus:ring-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-sky-dark">Password</span>
        <input
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-line px-3.5 py-2.5 outline-none ring-sky/20 focus:border-sky focus:ring-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
      <div className="border-t border-line pt-4">
        <p className="mb-2 text-center text-xs text-muted">Try a demo account</p>
        <div className="flex flex-wrap justify-center gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              type="button"
              className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-sky-dark hover:border-sky hover:text-sky"
              onClick={() => {
                setEmail(account.email);
                setPassword(DEMO_PASSWORD);
                setError("");
                void submit(undefined, { email: account.email, password: DEMO_PASSWORD });
              }}
            >
              {account.label}
            </button>
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-muted">
        New here?{" "}
        <Link href="/marketplace/register" className="font-medium text-sky">
          Create an account
        </Link>
      </p>
    </form>
  );
}
