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
import { faqSchema, webPageSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { defaultTitle } from "@/lib/site";

export const metadata = createMetadata({
  title: defaultTitle,
  description:
    "Ads House (adshouse.in) is a digital marketing and ads agency in Rohtak, Haryana. Hire Ads House for SEO, Google Ads, Meta ads, branding, and websites.",
  path: "/",
  image: "/images/hero-visual.png",
  absolute: true,
  keywords: [
    "Ads House",
    "adshouse",
    "ads house",
    "adshouse.in",
    "ads house agency",
    "ads agency in Rohtak",
    "adshouse ads agency",
    "digital marketing ads house",
    "digital marketing agency in Rohtak",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webPageSchema({
            name: defaultTitle,
            description:
              "Ads House is a digital marketing and ads agency in Rohtak, Haryana — SEO, Google Ads, branding, and websites.",
            path: "/",
          }),
          faqSchema(faqs),
        ]}
      />
      <Hero />
      <TrustBar />
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
          Ads House, ads agency, and Rohtak — answered.
        </h2>
        <FaqList />
      </section>
      <CtaBand />
    </>
  );
}
