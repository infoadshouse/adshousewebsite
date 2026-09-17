import Link from "next/link";
import { SectionEyebrow } from "@/components/ui";

export function LocationsTeaser() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionEyebrow>Office</SectionEyebrow>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          One studio in Rohtak. Clients across India.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Sit with the team in Rohtak when you want to, or work remotely. SEO, ads, brand, and
          websites ship from this office for brands nationwide.
        </p>
        <div className="mt-10">
          <Link
            href="/locations/rohtak"
            className="inline-flex rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-sky-dark transition hover:border-sky hover:text-sky"
          >
            Rohtak HQ
          </Link>
        </div>
      </div>
    </section>
  );
}
