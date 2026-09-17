import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { locationHubFaqs, locations } from "@/lib/locations";
import { breadcrumbSchema, faqSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Rohtak Office | Ads House Studio",
  description:
    "Visit Ads House in Rohtak, Haryana — our only office. SEO, Google Ads, branding, and websites from this studio.",
  path: "/locations",
  image: "/images/about-team.png",
  keywords: ["Ads House Rohtak office", "digital marketing agency Rohtak"],
});

export default function LocationsPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
          ]),
          webPageSchema({
            name: "Ads House office in Rohtak",
            description: "The Ads House studio in Rohtak, Haryana — our only office.",
            path: "/locations",
            type: "CollectionPage",
          }),
          itemListSchema({
            name: "Ads House office",
            path: "/locations",
            items: locations.map((location) => ({
              name: `Ads House ads agency in ${location.name}`,
              path: `/locations/${location.slug}`,
            })),
          }),
          faqSchema(locationHubFaqs),
        ]}
      />
      <PageHero
        eyebrow="Office"
        title="Ads House studio in Rohtak"
        description={`Ads House is headquartered in ${siteConfig.address.locality}, ${siteConfig.address.region}. One office. SEO, ads, brand, and engineering under one roof.`}
        image="/images/about-team.png"
        imageAlt="Ads House studio in Rohtak, Haryana — digital marketing agency serving India"
      />
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="group rounded-[1.6rem] border border-line bg-white p-7 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky">
                Headquarters
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-sky-dark group-hover:text-sky">
                {location.name}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {location.state} · Digital marketing, SEO, ads, web
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{location.intro.slice(0, 160)}…</p>
              <span className="mt-5 inline-block text-sm font-semibold text-sky">
                Digital marketing agency in {location.name} →
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <h2 className="mb-8 font-display text-3xl font-extrabold text-sky-dark">
          Looking for a local partner?
        </h2>
        <FaqList items={locationHubFaqs} />
      </section>
      <CtaBand />
    </>
  );
}
