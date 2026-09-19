import Link from "next/link";
import { SectionEyebrow } from "@/components/ui";
import { TestimonialBoard } from "@/components/sections/TestimonialBoard";
import { listTestimonials } from "@/lib/content";

export async function Testimonials() {
  const testimonials = await listTestimonials();
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <SectionEyebrow>Client results</SectionEyebrow>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
            Impact, in their words.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Studios, clinics, kitchens, and local brands from Rohtak to Gurugram, Noida, and the NCR belt.
          </p>
        </div>
        <Link href="/testimonials" className="text-sm font-semibold text-sky hover:text-sky-dark">
          All testimonials →
        </Link>
      </div>
      {testimonials.length ? <TestimonialBoard items={testimonials} /> : null}
    </section>
  );
}
