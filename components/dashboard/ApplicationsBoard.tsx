"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";
import { formatInr } from "@/lib/marketplace/constants";

type Row = {
  id: string;
  status: string;
  proposedRate: number;
  pitch: string;
  campaign: { id: string; title: string; status: string } | null;
  influencer: { displayName: string; username: string } | null;
};

export function ApplicationsBoard({ role }: { role: string }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ applications: Row[] }>("/api/marketplace/applications")
      .then((data) => setRows(data.applications))
      .catch((err: Error) => setError(err.message));
  }, []);

  async function withdraw(id: string) {
    await api(`/api/marketplace/applications/${id}`, { method: "PATCH", json: { status: "withdrawn" } });
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, status: "withdrawn" } : row)));
  }

  if (error) return <p className="text-pink">{error}</p>;

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.id} className="rounded-2xl border border-line p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-semibold text-sky-dark">
                {role === "creator" ? row.campaign?.title : row.influencer?.displayName}
              </p>
              <p className="text-sm text-muted">
                {row.status} · {formatInr(row.proposedRate)}
              </p>
              <p className="mt-2 text-sm text-muted">{row.pitch}</p>
            </div>
            <div className="flex gap-2">
              {row.campaign ? (
                <Link
                  href={
                    role === "creator"
                      ? `/marketplace/campaigns/${row.campaign.id}`
                      : `/dashboard/campaigns/${row.campaign.id}`
                  }
                  className="rounded-full border border-line px-3 py-1.5 text-xs"
                >
                  Open
                </Link>
              ) : null}
              {role === "creator" && row.status === "applied" ? (
                <button
                  type="button"
                  className="rounded-full border border-line px-3 py-1.5 text-xs"
                  onClick={() => withdraw(row.id)}
                >
                  Withdraw
                </button>
              ) : null}
            </div>
          </div>
        </li>
      ))}
      {rows.length === 0 ? <p className="text-muted">No applications yet.</p> : null}
    </ul>
  );
}
