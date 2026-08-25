"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";

type Row = {
  id: string;
  name: string;
  email: string;
  role: string;
  handle?: string | null;
  createdAt?: string;
};

export function AdminUsersTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ users: Row[] }>("/api/marketplace/admin/users")
      .then((data) => setRows(data.users))
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className="text-pink">{error}</p>;

  const counts = {
    admin: rows.filter((r) => r.role === "admin").length,
    creator: rows.filter((r) => r.role === "creator").length,
    business: rows.filter((r) => r.role === "business").length,
    agency: rows.filter((r) => r.role === "agency").length,
  };

  return (
    <div>
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        <Count label="Admins" value={counts.admin} />
        <Count label="Creators" value={counts.creator} />
        <Count label="Businesses" value={counts.business} />
        <Count label="Agencies" value={counts.agency} />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-line">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-surface text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Handle</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-line">
                <td className="px-4 py-3 font-medium text-sky-dark">{row.name}</td>
                <td className="px-4 py-3 text-muted">{row.email}</td>
                <td className="px-4 py-3 capitalize">{row.role}</td>
                <td className="px-4 py-3 text-muted">{row.handle || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Count({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-surface p-4">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-extrabold text-sky-dark">{value}</p>
    </div>
  );
}
