import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Methodology } from "@/components/sections/Methodology";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ArrowIcon } from "@/components/ui";
import { faqs, services, teamPrinciples } from "@/lib/data";
import { breadcrumbSchema, faqSchema, itemListSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Ads House Services | Digital Marketing & Ads Agency",
  description:
    "Ads House ads agency services in Rohtak: SEO, Google Ads, Meta ads, brand building, websites, custom software, and creative — run as one growth system.",
  path: "/services",
  image: "/images/service-performance.png",
  keywords: [
    "Ads House services",
    "ads agency in Rohtak",
    "digital marketing services India",
    "Google Ads agency Rohtak",
    "advertising services Rohtak",
  ],
});

const engagement = [
  {
    step: "01",
    title: "Share the brief",
    body: "Tell us the brand, the market, and the number that matters — leads, CAC, ROAS, or revenue.",
  },
  {
    step: "02",
    title: "We diagnose the bottleneck",
    body: "Positioning, offer, funnel, creative, product, or channel mix. We name the real constraint before we sell work.",
  },
  {
    step: "03",
    title: "One system, not six vendors",
    body: "Brand, media, content, web, and software get scoped as a single plan with owners, timelines, and commercial KPIs.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          faqSchema(faqs),
          itemListSchema({
            name: "Digital marketing services",
            path: "/services",
            items: services.map((service) => ({
              name: service.title,
              path: `/services/${service.slug}`,
            })),
          }),
        ]}
      />
      <PageHero
        eyebrow="Services"
        title="Ads House digital marketing services"
        description="SEO, ads, brand, web, and software — seven capabilities, one growth engine. Ads House, the ads agency in Rohtak, assembles the stack around the number you need to move."
      />

      <ServicesGrid />

      <Methodology />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">How an engagement starts</p>
          <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
            Clear intake. Honest diagnosis. Then we build.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {engagement.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-line bg-white p-7 shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
              >
                <p className="font-display text-2xl font-extrabold text-sky">{item.step}</p>
                <h3 className="mt-3 font-display text-xl font-bold text-sky-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <Link
            href="/contact"
            className="btn-primary mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold"
          >
            Start a Project
            <ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">Built for India</p>
          <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
            Designed for how India actually buys.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            From GST invoices to festive calendars, from English search to Hinglish social, from metro
            CAC to Bharat demand — every service is planned for {siteConfig.address.locality} and pan-India
            growth, not a generic global playbook.
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {teamPrinciples.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-line bg-white p-7 shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
              >
                <h3 className="font-display text-xl font-bold text-sky-dark">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">Questions</p>
        <h2 className="mb-8 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Services, pricing, and how we start.
        </h2>
        <FaqList />
      </section>

      <CtaBand />
    </>
  );
}
