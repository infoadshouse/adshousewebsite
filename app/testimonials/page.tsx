import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { TestimonialBoard } from "@/components/sections/TestimonialBoard";
import { listTestimonials } from "@/lib/content";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Client Testimonials near Delhi NCR",
  description:
    "Ads House client stories from Rohtak, Gurugram, Noida, Faridabad, Ghaziabad, Sonipat, and other towns around Delhi NCR.",
  path: "/testimonials",
  image: "/images/about-team.png",
  keywords: ["Ads House testimonials", "digital marketing reviews NCR", "ads agency Rohtak reviews"],
});

export default async function TestimonialsPage() {
  const testimonials = await listTestimonials();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Testimonials", path: "/testimonials" },
          ]),
          itemListSchema({
            name: "Ads House client testimonials",
            path: "/testimonials",
            items: testimonials.map((item) => ({
              name: `${item.company}, ${item.location}`,
              path: "/testimonials",
            })),
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Testimonials", href: "/testimonials" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-5 pb-8 pt-8 md:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky">Client results</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Brands around Delhi NCR, in their words
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Client stories from around Delhi NCR. Filter by city or read all six below.
        </p>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        {testimonials.length ? <TestimonialBoard items={testimonials} /> : <p className="text-muted">New stories will appear here.</p>}
      </section>
      <CtaBand />
    </>
  );
}
