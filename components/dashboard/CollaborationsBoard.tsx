"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";
import { formatInr } from "@/lib/marketplace/constants";

type Collab = {
  id: string;
  status: string;
  agreedRate: number;
  campaign: { id: string; title: string } | null;
  influencer: { displayName: string; username: string } | null;
};

export function CollaborationsBoard() {
  const [rows, setRows] = useState<Collab[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [rating, setRating] = useState<Record<string, { score: string; comment: string }>>({});

  function load() {
    return api<{ collaborations: Collab[] }>("/api/marketplace/collaborations").then((data) =>
      setRows(data.collaborations),
    );
  }

  useEffect(() => {
    load().catch((err: Error) => setError(err.message));
  }, []);

  async function update(id: string, status: string) {
    await api(`/api/marketplace/collaborations/${id}`, { method: "PATCH", json: { status } });
    await load();
  }

  async function review(id: string) {
    const value = rating[id] ?? { score: "5", comment: "" };
    try {
      await api("/api/marketplace/reviews", {
        method: "POST",
        json: { collaborationId: id, rating: Number(value.score), comment: value.comment },
      });
      setError("");
      setNotice("Review saved");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save review");
    }
  }

  if (error) return <p className="text-pink">{error}</p>;

  return (
    <div>
      {notice ? <p className="mb-3 text-sm text-sky">{notice}</p> : null}
      <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.id} className="rounded-2xl border border-line p-4">
          <p className="font-semibold text-sky-dark">{row.campaign?.title}</p>
          <p className="text-sm text-muted">
            {row.influencer?.displayName} · {row.status} · {formatInr(row.agreedRate)}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {row.status === "active" ? (
              <button
                type="button"
                className="rounded-full bg-sky px-3 py-1.5 text-xs text-white"
                onClick={() => update(row.id, "completed")}
              >
                Mark completed
              </button>
            ) : null}
            {row.status === "completed" ? (
              <div className="flex w-full flex-col gap-2 sm:flex-row">
                <select
                  className="rounded-xl border border-line px-2 py-1 text-sm"
                  value={rating[row.id]?.score ?? "5"}
                  onChange={(e) =>
                    setRating((prev) => ({ ...prev, [row.id]: { score: e.target.value, comment: prev[row.id]?.comment ?? "" } }))
                  }
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} stars
                    </option>
                  ))}
                </select>
                <input
                  className="flex-1 rounded-xl border border-line px-3 py-1 text-sm"
                  placeholder="Comment"
                  value={rating[row.id]?.comment ?? ""}
                  onChange={(e) =>
                    setRating((prev) => ({
                      ...prev,
                      [row.id]: { score: prev[row.id]?.score ?? "5", comment: e.target.value },
                    }))
                  }
                />
                <button type="button" className="rounded-full border border-line px-3 py-1.5 text-xs" onClick={() => review(row.id)}>
                  Leave review
                </button>
              </div>
            ) : null}
          </div>
        </li>
      ))}
      {rows.length === 0 ? <p className="text-muted">No collaborations yet.</p> : null}
    </ul>
    </div>
  );
}
