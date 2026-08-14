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
              className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left md:gap-6 md:px-6 md:py-5"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
            >
              <span className="min-w-0 font-display text-base font-semibold text-sky-dark md:text-xl">{item.q}</span>
              <span className="mt-1 text-sky">{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen ? <p className="px-4 pb-4 text-sm leading-relaxed text-muted md:px-6 md:pb-5 md:text-base">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}
