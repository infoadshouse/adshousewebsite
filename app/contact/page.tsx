import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema, businessEntities, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { officeAddressLines, siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Contact Ads House | Ads Agency in Rohtak",
  description:
    "Talk to Ads House in Rohtak about SEO, Google Ads, Meta ads, branding, websites, or influencer campaigns. We reply within one business day.",
  path: "/contact",
  image: "/images/cta-studio.png",
  keywords: ["contact Ads House", "ads agency Rohtak", "hire digital marketing agency India"],
});

const mapSrc = `https://maps.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&z=12&output=embed`;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          ...businessEntities(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
          webPageSchema({
            name: "Contact Ads House",
            description: "Contact Ads House, the ads agency and digital marketing studio in Rohtak, Haryana.",
            path: "/contact",
            type: "ContactPage",
          }),
        ]}
      />
      <PageHero
        eyebrow="Contact Ads House"
        title="Start a project with the Rohtak studio"
        description="Share the brand, the market, and the number you want to move. A strategist replies within one business day — usually sooner."
        image="/images/cta-studio.png"
        imageAlt="Ads House studio in Rohtak ready for a new campaign briefing"
      />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 lg:grid-cols-[1.1fr_0.9fr] md:px-8">
        <div className="rounded-[2rem] border border-line bg-card p-6 shadow-sm md:p-10">
          <h2 className="font-display text-2xl font-bold text-sky-dark">Start a Project</h2>
          <p className="mt-2 text-sm text-muted">We work with brands investing in growth, not vanity campaigns.</p>
          <div className="mt-8">
            <InquiryForm />
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-3xl border border-line bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-bold text-sky-dark">Studio</h2>
            <p className="mt-3 text-muted">
              {siteConfig.name}
              <br />
              {officeAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="mt-3 text-sm text-muted">
              Mon–Sat {siteConfig.hours.opens}–{siteConfig.hours.closes} IST
            </p>
            <Link href="/locations/rohtak" className="mt-4 inline-block text-sm font-semibold text-sky hover:underline">
              Digital marketing agency in Rohtak →
            </Link>
          </div>
          <div className="rounded-3xl border border-line bg-white p-7 shadow-sm">
            <h2 className="font-display text-xl font-bold text-sky-dark">Direct</h2>
            <p className="mt-3">
              <a className="break-all text-sky hover:underline" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </p>
            <p className="mt-2">
              <a className="hover:text-sky" href={siteConfig.phoneHref}>
                {siteConfig.phone}
              </a>
            </p>
            <p className="mt-2">
              <a className="hover:text-sky" href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl border border-line shadow-sm">
            <iframe
              title="Ads House location in Rohtak, Haryana"
              src={mapSrc}
              className="h-56 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </aside>
      </section>
    </>
  );
}
