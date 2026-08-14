import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { services } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Digital Marketing Services in India | Brand, Ads, Web & Software",
  description:
    "Explore Ads House services: brand building, performance marketing, marketing strategy, website development, custom software, and creative content for Indian businesses.",
  path: "/services",
  image: "/images/service-performance.png",
  keywords: [
    "digital marketing services India",
    "advertising services Mumbai",
    "performance marketing services",
    "branding agency services",
    "website development services India",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <PageHero
        eyebrow="Services"
        title="Six capabilities. One growth engine."
        description="We do not throw a menu at you. We assemble brand, media, content, web, and software around the number you need to move."
        image="/images/service-performance.png"
        imageAlt="Performance marketing war room at Ads House with campaign dashboards"
      />
      <ServicesGrid heading={false} />
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <h2 className="font-display text-3xl font-bold text-sky-dark">Built for Indian market realities</h2>
        <p className="mt-4 max-w-3xl text-muted">
          From GST invoices to festive calendars, from English search to Hinglish social, from metro
          CAC to Bharat demand — every service is designed for how India actually buys. Explore a
          capability in depth or start with a growth diagnostic.
        </p>
        <ul className="mt-8 grid gap-3 text-sm text-muted md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>→ {service.short}</li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
