import { SectionEyebrow } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export function BrandIntro() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
      <SectionEyebrow>Ads House</SectionEyebrow>
      <h2 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
        Ads House is a digital marketing and ads agency in Rohtak
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <p className="text-lg leading-relaxed text-muted">
          Ads House is the official ads agency and digital marketing studio in Rohtak, Haryana. The
          website is adshouse.in — the same company people find as Adshouse, ads house, or Ads House
          agency. If you need an ads agency in Rohtak, this is the studio.
        </p>
        <p className="text-lg leading-relaxed text-muted">
          From our only office in {siteConfig.address.locality}, Ads House runs SEO, Google Ads,
          Meta ads, brand building, and websites as one growth system. Local businesses in Haryana
          and brands across India hire us when they want pipeline — not a posting package.
        </p>
      </div>
    </section>
  );
}
