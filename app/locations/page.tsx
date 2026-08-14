import Link from "next/link";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { locations } from "@/lib/locations";
import { breadcrumbSchema, itemListSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = createMetadata({
  title: "Digital Marketing Agency Locations in India",
  description:
    "Ads House is a digital marketing agency based in Rohtak, Haryana, working with brands in Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Ahmedabad, and Kolkata.",
  path: "/locations",
  image: "/images/about-team.png",
  keywords: [
    "digital marketing agency Rohtak",
    "digital marketing agency Delhi NCR",
    "digital marketing agency Mumbai",
    "digital marketing agency Bengaluru",
    "advertising agency Haryana",
  ],
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
            name: "Digital marketing agency locations in India",
            description:
              "Cities where Ads House delivers digital marketing, SEO, and advertising.",
            path: "/locations",
            type: "CollectionPage",
          }),
          itemListSchema({
            name: "Ads House locations",
            path: "/locations",
            items: locations.map((location) => ({
              name: `Digital marketing agency in ${location.name}`,
              path: `/locations/${location.slug}`,
            })),
          }),
        ]}
      />
      <PageHero
        eyebrow="Locations"
        title="A Rohtak digital marketing agency that works across India."
        description={`Headquartered in ${siteConfig.address.locality}, ${siteConfig.address.region}. Campaigns, SEO, and websites for founders in India's major markets — without a bloated metro overhead.`}
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
                {location.isHq ? "Headquarters" : "We work here"}
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
        <FaqList
          items={[
            {
              q: "Where is Ads House based?",
              a: `Ads House is based in ${siteConfig.address.locality}, ${siteConfig.address.region}. That is our studio and the centre of SEO, ads, brand, and engineering.`,
            },
            {
              q: "Do you travel to other cities?",
              a: "Yes. Kickoffs, shoots, and workshops happen in Delhi NCR, Mumbai, Bengaluru, and other markets when the work needs to be in the room.",
            },
          ]}
        />
      </section>
      <CtaBand />
    </>
  );
}
