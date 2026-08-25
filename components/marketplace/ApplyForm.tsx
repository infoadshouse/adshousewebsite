"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/marketplace/client";

export function ApplyForm({ campaignId, open }: { campaignId: string; open: boolean }) {
  const router = useRouter();
  const [pitch, setPitch] = useState("");
  const [rate, setRate] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  if (!open) return <p className="mt-4 text-sm text-muted">This campaign is not accepting applications.</p>;
  if (done) return <p className="mt-4 text-sm font-medium text-sky">Application sent. Watch Messages for a reply.</p>;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError("");
    try {
      await api(`/api/marketplace/campaigns/${campaignId}/applications`, {
        method: "POST",
        json: { pitch, proposedRate: Number(rate) || 0 },
      });
      setDone(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not apply";
      if (message.includes("Sign in") || message.includes("required")) {
        router.push(`/marketplace/login?next=/marketplace/campaigns/${campaignId}`);
        return;
      }
      setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-5 space-y-4">
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Pitch</span>
        <textarea
          className="min-h-28 w-full rounded-xl border border-line px-3 py-2"
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          placeholder="Why you're a fit, content idea, timeline"
        />
      </label>
      <label className="block text-sm">
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Proposed rate (₹)</span>
        <input
          type="number"
          className="w-full rounded-xl border border-line px-3 py-2"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </label>
      {error ? <p className="text-sm text-pink">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="btn-primary inline-flex w-full items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
      >
        {pending ? "Sending…" : "Apply"}
      </button>
    </form>
  );
}
