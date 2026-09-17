import { SectionEyebrow } from "@/components/ui";
import { siteConfig } from "@/lib/site";

export function BrandIntro() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
      <SectionEyebrow>Ads House</SectionEyebrow>
      <h2 className="max-w-4xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
        Ads House is a digital marketing and ads agency in India
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <p className="text-lg leading-relaxed text-muted">
          We work with Indian brands nationwide — D2C, services, and founder-led companies that need
          SEO, ads, brand, and a website that converts. One team, not six vendors.
        </p>
        <p className="text-lg leading-relaxed text-muted">
          The studio is in {siteConfig.address.locality}, {siteConfig.address.region}. Kickoffs can
          happen here in person; campaigns, SEO, and sites ship for clients across India.
        </p>
      </div>
    </section>
  );
}
