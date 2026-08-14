import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/data";
import { serviceThemes } from "@/lib/service-themes";

export function ServicesGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" id="services">
      {heading ? (
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
            <span className="h-px w-8 bg-slate-300" />
            What we do
          </p>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
            An end-to-end <span className="text-gradient">growth</span> partner. Not another ads
            vendor.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Brand, performance, product, and engineering in one team — so the work compounds instead
            of colliding.
          </p>
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => {
          const theme = serviceThemes[service.slug] ?? serviceThemes["brand-building"];
          return (
            <Reveal key={service.slug} delay={index * 60}>
              <Link
                href={`/services/${service.slug}`}
                className="group block rounded-[1.4rem] border border-line bg-white shadow-[0_12px_36px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(37,99,235,0.12)]"
              >
                <div className="img-zoom relative h-48 overflow-hidden rounded-t-[1.4rem]">
                  <Image
                    src={service.image}
                    alt={`${service.title} by Ads House, a digital marketing agency in India`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative z-10 -mt-5 flex items-end gap-3 px-5">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-sm ${theme.wrap}`}
                  >
                    {theme.icon}
                  </span>
                  <p
                    className={`mb-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${theme.text}`}
                  >
                    {service.title}
                  </p>
                </div>
                <div className="px-5 pb-6 pt-3">
                  <h3 className="font-display text-xl font-bold text-sky-dark group-hover:text-sky">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{service.outcome}</p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
