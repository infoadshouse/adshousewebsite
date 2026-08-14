import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-2xl">
        <SectionEyebrow>Client results</SectionEyebrow>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Impact, in their words.
        </h2>
      </div>
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 80}>
            <article className="flex h-full flex-col rounded-[1.8rem] border border-line bg-card p-7 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-line">
                  <Image src={item.image} alt={`${item.name}, ${item.role} at ${item.company}`} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
              <blockquote className="mt-6 flex-1 text-[1.05rem] leading-relaxed text-sky-dark">
                “{item.quote}”
              </blockquote>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-sky">
                {item.result}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
