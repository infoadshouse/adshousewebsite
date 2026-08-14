import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui";
import { services } from "@/lib/data";

export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" id="services">
      {heading ? (
        <div className="mb-12 max-w-3xl">
          <SectionEyebrow>What we do</SectionEyebrow>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
              An end-to-end growth partner. Not another ads vendor.
            </h2>
          <p className="mt-4 text-lg text-muted">
            Brand, performance, product, and engineering in one team — so the work compounds instead
            of colliding.
          </p>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 60}>
            <Link
              href={`/services/${service.slug}`}
              className="group block overflow-hidden rounded-[1.6rem] border border-line bg-card shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(37,99,235,0.12)]"
            >
              <div className="img-zoom relative h-52">
                <Image
                  src={service.image}
                  alt={`${service.title} by Ads House, a digital marketing agency in India`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white/10" />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-sky">{service.icon} {service.title}</p>
                <h3 className="mt-2 font-display text-2xl font-bold text-sky-dark group-hover:text-sky">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{service.outcome}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
