import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Hero } from "@/components/sections/Hero";
import { InsightsTeaser } from "@/components/sections/InsightsTeaser";
import { Methodology } from "@/components/sections/Methodology";
import { Results } from "@/components/sections/Results";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustBar } from "@/components/sections/TrustBar";
import { VisualStudio } from "@/components/sections/VisualStudio";
import { SectionEyebrow } from "@/components/ui";
import { faqs } from "@/lib/data";
import { faqSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Ads House | Digital Marketing & Advertising Agency in India",
  description:
    "Ads House is a digital marketing and advertising agency in India. We build brands, run performance campaigns, and ship websites and software that grow revenue across Mumbai, Delhi, Bengaluru and beyond.",
  path: "/",
  image: "/images/hero-visual.png",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Hero />
      <TrustBar />
      <ServicesGrid />
      <FeaturedWork />
      <Methodology />
      <VisualStudio />
      <Results />
      <Testimonials />
      <AboutTeaser />
      <InsightsTeaser />
      <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
        <SectionEyebrow>Questions</SectionEyebrow>
        <h2 className="mb-8 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Asked by founders across India.
        </h2>
        <FaqList />
      </section>
      <CtaBand />
    </>
  );
}
