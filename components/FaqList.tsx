export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl border border-line bg-white shadow-sm">
      {items.map((item) => (
        <details key={item.q} className="group px-4 py-4 md:px-6 md:py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="min-w-0 font-display text-base font-semibold text-sky-dark md:text-xl">
              {item.q}
            </span>
            <span className="mt-1 text-sky group-open:hidden">+</span>
            <span className="mt-1 hidden text-sky group-open:inline">–</span>
          </summary>
          <p className="mt-3 pr-8 text-sm leading-relaxed text-muted md:text-base">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
