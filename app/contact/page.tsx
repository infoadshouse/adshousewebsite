import { InquiryForm } from "@/components/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Start a Project | Contact Ads House India",
  description:
    "Start a project with Ads House, a digital marketing agency in Rohtak, Haryana. Tell us what you are building — branding, ads, website, or software — and we will respond within one business day.",
  path: "/contact",
  image: "/images/cta-studio.png",
  keywords: [
    "contact advertising agency Rohtak",
    "hire digital marketing agency India",
    "start a marketing project",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us what you are building."
        description="Share the brand, the market, and the number you want to move. A strategist replies within one business day — usually sooner."
        image="/images/cta-studio.png"
        imageAlt="Ads House studio ready for a new campaign briefing"
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
              {siteConfig.address.locality}, {siteConfig.address.region}
              <br />
              India
            </p>
            <p className="mt-4 text-sm text-muted">
              Also working with teams in {siteConfig.cities.slice(1).join(", ")}.
            </p>
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
          </div>
        </aside>
      </section>
    </>
  );
}
