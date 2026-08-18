import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowIcon, ButtonLink } from "@/components/ui";
import { services } from "@/lib/data";
import { getLocation, locations } from "@/lib/locations";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type LocationParams = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: LocationParams) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};
  return createMetadata({
    title: location.seoTitle,
    description: location.seoDescription,
    path: `/locations/${location.slug}`,
    image: "/images/about-team.png",
    keywords: [
      `ads agency in ${location.name}`,
      `digital marketing agency in ${location.name}`,
      "Ads House",
      "adshouse",
      "ads house agency",
      `SEO agency ${location.name}`,
      `Google Ads agency ${location.name}`,
      `advertising agency ${location.state}`,
    ],
  });
}

export default async function LocationDetailPage({ params }: LocationParams) {
  const { slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const others = locations.filter((item) => item.slug !== location.slug).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Locations", path: "/locations" },
            { name: location.name, path: `/locations/${location.slug}` },
          ]),
          webPageSchema({
            name: location.h1,
            description: location.seoDescription,
            path: `/locations/${location.slug}`,
          }),
          faqSchema(location.faqs),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `Digital marketing in ${location.name}`,
            description: location.seoDescription,
            url: `${siteConfig.url}/locations/${location.slug}`,
            provider: { "@id": `${siteConfig.url}/#organization` },
            areaServed: {
              "@type": "City",
              name: location.name,
              containedInPlace: { "@type": "State", name: location.state },
            },
            serviceType: "Digital marketing",
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Locations", href: "/locations" },
          { name: location.name, href: `/locations/${location.slug}` },
        ]}
      />
      <article className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <header className="max-w-3xl pt-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky">
            {location.isHq ? "Headquarters" : "Service area"} · {location.state}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-6xl">
            {location.h1}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">{location.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">
              Start a Project
              <ArrowIcon />
            </ButtonLink>
            <ButtonLink href="/services" variant="ghost">
              View services
            </ButtonLink>
          </div>
        </header>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[1.6rem] border border-line bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-sky-dark">
              The {location.name} market
            </h2>
            <p className="mt-4 leading-relaxed text-muted">{location.market}</p>
          </div>
          <div className="rounded-[1.6rem] border border-line bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-sky-dark">How we work here</h2>
            <p className="mt-4 leading-relaxed text-muted">{location.approach}</p>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-extrabold text-sky-dark">
            Ads House services in {location.name}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            The Ads House ads agency delivers SEO, Google Ads, Meta ads, branding, and websites as
            one system for companies in {location.name} and across India.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="rounded-2xl border border-line bg-white p-5 transition hover:border-sky"
              >
                <h3 className="font-display text-lg font-bold text-sky-dark">{service.title}</h3>
                <p className="mt-2 text-sm text-muted">{service.short}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-3xl font-extrabold text-sky-dark">
            Industries we see in {location.name}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {location.industries.map((industry) => (
              <li
                key={industry}
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-sky-dark"
              >
                {industry}
              </li>
            ))}
          </ul>
        </section>

        {location.nearby.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-3xl font-extrabold text-sky-dark">
              Also serving nearby
            </h2>
            <p className="mt-4 max-w-2xl text-muted">
              Teams around {location.name} hire Ads House for the same SEO, ads, and web work —
              including {location.nearby.join(", ")}.
            </p>
          </section>
        ) : null}

        <section className="mt-16">
          <h2 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">
            Questions about {location.name}
          </h2>
          <FaqList items={location.faqs} />
        </section>

        {others.length > 0 ? (
          <section className="mt-16">
            <h2 className="font-display text-3xl font-extrabold text-sky-dark">Other cities</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {others.map((item) => (
                <Link
                  key={item.slug}
                  href={`/locations/${item.slug}`}
                  className="rounded-full border border-line px-4 py-2 text-sm font-medium text-sky-dark hover:border-sky hover:text-sky"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
      <CtaBand />
    </>
  );
}
