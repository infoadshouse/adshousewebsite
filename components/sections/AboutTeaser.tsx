import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, SectionEyebrow } from "@/components/ui";

export function AboutTeaser() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">
        <Reveal>
          <div className="img-zoom relative min-h-[380px] overflow-hidden rounded-[2rem] border border-line shadow-sm lg:min-h-[520px]">
            <Image
              src="/images/about-team.png"
              alt="Ads House creative team collaborating in a Mumbai advertising studio"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div>
            <SectionEyebrow>The agency</SectionEyebrow>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
              Built in India. Obsessed with growth.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Ads House exists because most agencies sell activity. We sell outcomes. We started as
              a Rohtak studio for brands that were tired of pretty campaigns with no commercial
              spine — and grew into a pan-India growth partner covering brand, media, web, and
              product.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We believe attention is rented. Preference is owned. Technology is how you scale both.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about" variant="ghost">
                Our story
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
