import { SearchPaths } from "@/components/SearchPaths";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { LocationsTeaser } from "@/components/sections/LocationsTeaser";
import { Methodology } from "@/components/sections/Methodology";
import { Results } from "@/components/sections/Results";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { VisualStudio } from "@/components/sections/VisualStudio";
import { SectionEyebrow } from "@/components/ui";
import { faqs } from "@/lib/data";
import { businessEntities, faqSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { defaultTitle } from "@/lib/site";
import Link from "next/link";

export const metadata = createMetadata({
  title: defaultTitle,
  description:
    "Ads House is a digital marketing and ads agency in India. SEO, Google Ads, Meta ads, branding, websites, and an influencer marketplace — from our studio in Rohtak.",
  path: "/",
  image: "/images/hero-visual.png",
  absolute: true,
  keywords: [
    "Ads House",
    "ads agency in India",
    "digital marketing agency in India",
    "SEO agency in India",
    "Google Ads agency in India",
    "ads agency in Rohtak",
    "digital marketing agency in Rohtak",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          ...businessEntities(),
          webPageSchema({
            name: defaultTitle,
            description:
              "Ads House is a digital marketing and ads agency in India — SEO, Google Ads, branding, websites, and an Influencer Marketplace. Studio in Rohtak, Haryana.",
            path: "/",
          }),
          faqSchema(faqs),
        ]}
      />
      <Hero />
      <TrustBar />
      <section className="mx-auto max-w-7xl px-5 pb-4 md:px-8">
        <p className="max-w-3xl text-base leading-relaxed text-muted md:text-lg">
          <span className="font-semibold text-sky-dark">Who we serve.</span> Indian brands
          nationwide — D2C, services, and founder-led companies. Local operators hire us as an{" "}
          <Link href="/locations/rohtak" className="font-semibold text-sky hover:underline">
            ads agency in Rohtak
          </Link>
          ; everyone else gets the same team remotely.
        </p>
      </section>
      <SearchPaths />
      <ServicesGrid />
      <FeaturedWork />
      <Methodology />
      <VisualStudio />
      <Results />
      <Testimonials />
      <LocationsTeaser />
      <AboutTeaser />
      <BrandIntro />
      <InsightsTeaser />
      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <SectionEyebrow>Questions</SectionEyebrow>
        <h2 className="mb-8 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Questions about working with Ads House
        </h2>
        <FaqList items={faqs} />
      </section>
      <CtaBand />
    </>
  );
}
