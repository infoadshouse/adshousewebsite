"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";

type Review = {
  id: string;
  rating: number;
  comment: string;
  fromRole: string;
  mine: boolean;
  createdAt: string;
};

export function ReviewsList() {
  const [rows, setRows] = useState<Review[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<{ reviews: Review[] }>("/api/marketplace/reviews")
      .then((data) => setRows(data.reviews))
      .catch((err: Error) => setError(err.message));
  }, []);

  if (error) return <p className="text-pink">{error}</p>;

  return (
    <ul className="space-y-3">
      {rows.map((row) => (
        <li key={row.id} className="rounded-2xl border border-line p-4">
          <p className="font-semibold text-sky-dark">
            {"★".repeat(row.rating)}{" "}
            <span className="text-sm font-normal text-muted">{row.mine ? "You wrote" : `From ${row.fromRole}`}</span>
          </p>
          <p className="mt-2 text-sm text-muted">{row.comment}</p>
        </li>
      ))}
      {rows.length === 0 ? (
        <p className="text-muted">No reviews yet. Complete a collaboration to leave one.</p>
      ) : null}
    </ul>
  );
}
