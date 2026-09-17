import Link from "next/link";

const nationalPaths = [
  { query: "Ads agency in India", href: "/", label: "Homepage" },
  { query: "Digital marketing agency in India", href: "/", label: "Homepage" },
  { query: "SEO agency in India", href: "/services/seo", label: "SEO" },
  { query: "Google Ads agency in India", href: "/services/performance-marketing", label: "Performance" },
  { query: "Meta Ads agency in India", href: "/services/performance-marketing", label: "Performance" },
] as const;

const localPaths = [
  { query: "Ads agency in Rohtak", href: "/locations/rohtak", label: "Studio" },
  { query: "Digital marketing agency in Rohtak", href: "/locations/rohtak#digital-marketing", label: "Studio" },
  { query: "SEO agency in Rohtak", href: "/locations/rohtak#seo", label: "Studio" },
  { query: "Google Ads agency in Rohtak", href: "/locations/rohtak#google-ads", label: "Studio" },
  { query: "Meta Ads agency in Rohtak", href: "/locations/rohtak#meta-ads", label: "Studio" },
] as const;

function PathList({
  items,
}: {
  items: readonly { query: string; href: string; label: string }[];
}) {
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
      {items.map((item) => (
        <li key={item.query}>
          <Link
            href={item.href}
            className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4 transition hover:bg-surface"
          >
            <span className="font-semibold text-sky-dark">{item.query}</span>
            <span className="text-sm text-sky">{item.label} →</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SearchPaths() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">If you searched</p>
      <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-4xl">
        India nationwide. Rohtak for local.
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Ads House is a digital marketing and ads agency in India. The studio — and the local-pack
        page — is Rohtak. Same team. Two intents.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-sky">National</h3>
          <PathList items={nationalPaths} />
        </div>
        <div>
          <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-sky">Rohtak</h3>
          <PathList items={localPaths} />
        </div>
      </div>
    </section>
  );
}
