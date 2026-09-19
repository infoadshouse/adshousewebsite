"use client";

import { useMemo, useState } from "react";
import { MediaCover } from "@/components/MediaCover";
import type { Testimonial } from "@/lib/data";

export function TestimonialBoard({ items }: { items: Testimonial[] }) {
  const [city, setCity] = useState("All");
  const cities = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.location).filter(Boolean)))],
    [items],
  );
  const visible = city === "All" ? items : items.filter((item) => item.location === city);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by city">
        {cities.map((name) => {
          const active = city === name;
          return (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={active}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] ${
                active ? "bg-sky text-white" : "border border-line bg-white text-muted hover:border-sky/40 hover:text-sky"
              }`}
              onClick={() => setCity(name)}
            >
              {name === "All" ? `All (${items.length})` : name}
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted">
        Showing {visible.length} of {items.length} client stories
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((item) => (
          <article
            key={`${item.name}-${item.company}`}
            className="flex h-full flex-col rounded-3xl border border-line bg-card p-5 shadow-[0_12px_32px_rgba(15,23,42,0.05)] md:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line">
                <MediaCover
                  src={item.image}
                  alt={`${item.name}, ${item.role} at ${item.company}`}
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-sky-dark">{item.name}</p>
                <p className="text-sm text-muted">
                  {item.role}, {item.company}
                </p>
                {item.location ? (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-sky">{item.location}</p>
                ) : null}
              </div>
            </div>
            <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-sky-dark">
              “{item.quote}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-sky">{item.result}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
