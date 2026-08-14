import Link from "next/link";
import { locations } from "@/lib/locations";
import { SectionEyebrow } from "@/components/ui";

export function LocationsTeaser() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionEyebrow>Locations</SectionEyebrow>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Based in Rohtak. Hired across India.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Search for a digital marketing agency in your city — then work with a team that can still
          sit in Haryana and ship metro-grade SEO, ads, and websites.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-sky-dark transition hover:border-sky hover:text-sky"
            >
              {location.name}
              {location.isHq ? " HQ" : ""}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
