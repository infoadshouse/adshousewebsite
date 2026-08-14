import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, SectionEyebrow } from "@/components/ui";
import { caseStudies } from "@/lib/data";

export function FeaturedWork({ limit = 3 }: { limit?: number }) {
  const items = caseStudies.slice(0, limit);

  return (
    <section className="bg-surface py-20 md:py-28" id="work">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionEyebrow>Featured work</SectionEyebrow>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
              Proof over promises.
            </h2>
            <p className="mt-4 text-lg text-muted">
              Client. Challenge. Solution. Result. The only case study format that matters.
            </p>
          </div>
          <ButtonLink href="/work" variant="ghost">
            All case studies
          </ButtonLink>
        </div>

        <div className="grid gap-8">
          {items.map((item, index) => (
            <Reveal key={item.slug}>
              <Link
                href={`/work/${item.slug}`}
                className={`group grid overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(37,99,235,0.12)] ${
                  index === 0 ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-2"
                }`}
              >
                <div className={`img-zoom relative min-h-[220px] ${index === 0 ? "lg:min-h-[520px]" : "lg:min-h-[380px]"}`}>
                  <Image
                    src={item.image}
                    alt={`${item.client} campaign by Ads House — ${item.industry} brand in ${item.location}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center p-5 sm:p-8 md:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky">
                    {item.client} · {item.industry} · {item.location}
                  </p>
                  <p className="mt-4 break-words font-display text-4xl font-extrabold text-sky md:text-6xl">
                    {item.metric}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-muted">
                    {item.metricLabel}
                  </p>
                  <h3 className="mt-6 font-display text-2xl font-bold text-sky-dark md:text-3xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{item.solution}</p>
                  <span className="mt-6 text-sm font-semibold text-sky group-hover:text-sky-dark">
                    View case study →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
