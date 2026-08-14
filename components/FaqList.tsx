"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export function FaqList({ items = faqs }: { items?: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white shadow-sm">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.q}>
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 px-6 py-5 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="font-display text-lg font-semibold text-sky-dark md:text-xl">{item.q}</span>
              <span className="mt-1 text-sky">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen ? <p className="px-6 pb-5 text-sm leading-relaxed text-muted md:text-base">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
