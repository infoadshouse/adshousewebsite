import Link from "next/link";

export const searchPaths = [
  { query: "Ads agency in India", href: "/", label: "Homepage" },
  { query: "Digital marketing agency in India", href: "/", label: "Homepage" },
  { query: "SEO agency in India", href: "/services/seo", label: "SEO" },
  { query: "Google Ads agency in India", href: "/services/performance-marketing", label: "Performance" },
  { query: "Social media marketing / Meta ads", href: "/services/performance-marketing", label: "Performance" },
  { query: "Brand building agency in India", href: "/services/brand-building", label: "Brand" },
  { query: "Website development for Indian brands", href: "/services/web-development", label: "Web" },
  { query: "Influencer marketing in India", href: "/marketplace", label: "Marketplace" },
  { query: "Ads agency in Rohtak", href: "/locations/rohtak", label: "Studio" },
] as const;

export function SearchPaths() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">If you searched</p>
      <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-4xl">
        The page that matches the query
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Ads House is a digital marketing and ads agency in India. Rohtak is the studio — not a
        separate network of city microsites.
      </p>
      <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
        {searchPaths.map((item) => (
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
    </section>
  );
}
