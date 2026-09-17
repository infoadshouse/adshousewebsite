import Link from "next/link";
import { SectionEyebrow } from "@/components/ui";

export function LocationsTeaser() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionEyebrow>Rohtak studio</SectionEyebrow>
        <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Ads agency in Rohtak. Digital marketing for India.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          If you searched for a digital marketing agency, SEO agency, Google Ads agency, or Meta ads
          agency in Rohtak — this is the office. Sit with the team here, or hire the same studio for
          work anywhere in India.
        </p>
        <div className="mt-10">
          <Link
            href="/locations/rohtak"
            className="inline-flex rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold text-sky-dark transition hover:border-sky hover:text-sky"
          >
            Ads agency in Rohtak →
          </Link>
        </div>
      </div>
    </section>
  );
}
