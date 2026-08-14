import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui";

const frames = [
  { src: "/images/service-creative.png", alt: "On-set campaign production with cinematic lighting at Ads House", className: "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[520px]" },
  { src: "/images/work-food.png", alt: "Food campaign photography for an Indian QSR brand", className: "min-h-[220px]" },
  { src: "/images/work-edtech.png", alt: "Edtech campaign featuring Indian learners in a studio", className: "min-h-[220px]" },
  { src: "/images/service-web.png", alt: "Website design mockups for a premium brand site", className: "min-h-[220px]" },
  { src: "/images/service-software.png", alt: "Custom software and dashboard product design", className: "min-h-[220px]" },
  { src: "/images/service-brand.png", alt: "Brand identity system with packaging and stationery", className: "md:col-span-2 min-h-[240px]" },
];

export function VisualStudio() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-10 max-w-2xl">
        <SectionEyebrow>The studio</SectionEyebrow>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Built to look expensive. Measured like a P&L.
        </h2>
        <p className="mt-4 text-lg text-muted">
          Campaign films, product cinema, websites, and product UI — the same visual language from
          first impression to checkout.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {frames.map((frame, index) => (
          <Reveal key={frame.src} delay={index * 40} className={frame.className}>
            <div className={`img-zoom relative h-full min-h-[220px] overflow-hidden rounded-[1.6rem] border border-line ${frame.className}`}>
              <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
