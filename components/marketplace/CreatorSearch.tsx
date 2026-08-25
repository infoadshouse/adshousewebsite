"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CreatorCard, type CreatorCardData } from "@/components/marketplace/CreatorCard";
import { api } from "@/lib/marketplace/client";
import {
  CREATOR_CATEGORIES,
  PRICE_RANGES,
  ROHTAK_GEO,
  SOCIAL_PLATFORMS,
} from "@/lib/marketplace/constants";

export function CreatorSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const [creators, setCreators] = useState<CreatorCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const query = useMemo(() => {
    const q = new URLSearchParams();
    for (const key of [
      "q",
      "city",
      "state",
      "category",
      "platform",
      "followersMin",
      "followersMax",
      "engagementMin",
      "priceMin",
      "priceMax",
      "radiusKm",
    ]) {
      const value = params.get(key);
      if (value) q.set(key, value);
    }
    if (!params.get("city") && !params.get("radiusKm") && !params.get("q")) {
      q.set("city", "Rohtak");
    }
    if (params.get("radiusKm") && !params.get("lat")) {
      q.set("lat", String(ROHTAK_GEO.lat));
      q.set("lng", String(ROHTAK_GEO.lng));
      if (!params.get("city")) q.set("city", "Rohtak");
    }
    return q.toString();
  }, [params]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    api<{ creators: CreatorCardData[] }>(`/api/marketplace/creators${query ? `?${query}` : ""}`)
      .then((data) => {
        if (!cancelled) setCreators(data.creators);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  function update(name: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(name, value);
    else next.delete(name);
    router.replace(`/marketplace/creators?${next.toString()}`);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <form
        className="h-fit space-y-4 rounded-3xl border border-line bg-white p-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <Field label="Search">
          <input
            className="w-full rounded-xl border border-line px-3 py-2"
            defaultValue={params.get("q") ?? ""}
            onBlur={(e) => update("q", e.target.value)}
            placeholder="Name or niche"
          />
        </Field>
        <Field label="City">
          <input
            className="w-full rounded-xl border border-line px-3 py-2"
            defaultValue={params.get("city") ?? "Rohtak"}
            onBlur={(e) => update("city", e.target.value)}
          />
        </Field>
        <Field label="State">
          <input
            className="w-full rounded-xl border border-line px-3 py-2"
            defaultValue={params.get("state") ?? "Haryana"}
            onBlur={(e) => update("state", e.target.value)}
          />
        </Field>
        <Field label="Category">
          <select
            className="w-full rounded-xl border border-line px-3 py-2"
            value={params.get("category") ?? ""}
            onChange={(e) => update("category", e.target.value)}
          >
            <option value="">All</option>
            {CREATOR_CATEGORIES.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </Field>
        <Field label="Platform">
          <select
            className="w-full rounded-xl border border-line px-3 py-2"
            value={params.get("platform") ?? ""}
            onChange={(e) => update("platform", e.target.value)}
          >
            <option value="">All</option>
            {SOCIAL_PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field label="Followers">
          <select
            className="w-full rounded-xl border border-line px-3 py-2"
            value={`${params.get("followersMin") ?? ""}-${params.get("followersMax") ?? ""}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              const next = new URLSearchParams(params.toString());
              if (!min && !max) {
                next.delete("followersMin");
                next.delete("followersMax");
              } else {
                next.set("followersMin", min);
                next.set("followersMax", max);
              }
              router.replace(`/marketplace/creators?${next.toString()}`);
            }}
          >
            <option value="-">Any</option>
            <option value="1000-10000">1K – 10K</option>
            <option value="10000-100000">10K – 100K</option>
            <option value="100000-500000">100K – 500K</option>
            <option value="500000-10000000">500K+</option>
          </select>
        </Field>
        <Field label="Budget / collab">
          <select
            className="w-full rounded-xl border border-line px-3 py-2"
            value={`${params.get("priceMin") ?? ""}-${params.get("priceMax") ?? ""}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split("-");
              const next = new URLSearchParams(params.toString());
              if (!min) {
                next.delete("priceMin");
                next.delete("priceMax");
              } else {
                next.set("priceMin", min);
                next.set("priceMax", max);
              }
              router.replace(`/marketplace/creators?${next.toString()}`);
            }}
          >
            <option value="-">Any</option>
            {PRICE_RANGES.map((range) => (
              <option key={range.label} value={`${range.min}-${range.max}`}>
                {range.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Min engagement %">
          <input
            type="number"
            step="0.1"
            className="w-full rounded-xl border border-line px-3 py-2"
            defaultValue={params.get("engagementMin") ?? ""}
            onBlur={(e) => update("engagementMin", e.target.value)}
          />
        </Field>
        <Field label="Radius from Rohtak (km)">
          <input
            type="number"
            className="w-full rounded-xl border border-line px-3 py-2"
            defaultValue={params.get("radiusKm") ?? ""}
            placeholder="e.g. 25"
            onBlur={(e) => update("radiusKm", e.target.value)}
          />
        </Field>
      </form>

      <div>
        {loading ? <p className="text-muted">Searching creators…</p> : null}
        {error ? <p className="text-pink">{error}</p> : null}
        {!loading && creators.length === 0 ? (
          <p className="rounded-3xl border border-line bg-white p-8 text-muted">
            No creators match those filters yet. Try a wider city or category.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {creators.map((creator) => (
              <CreatorCard key={creator.username} creator={creator} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
    </label>
  );
}
