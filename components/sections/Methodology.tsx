import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui";
import { methodology } from "@/lib/data";

export function Methodology() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="max-w-2xl">
        <SectionEyebrow>The growth methodology</SectionEyebrow>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Discover. Build. Launch. Optimize. Scale.
        </h2>
        <p className="mt-4 text-lg text-muted">
          We do not sell isolated services. We install a growth system that keeps compounding after
          the first campaign.
        </p>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-5">
        {methodology.map((item, index) => (
          <Reveal key={item.step} delay={index * 80}>
            <article className="h-full rounded-3xl border border-line bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
              <p className="font-display text-3xl font-extrabold text-sky">{item.step}</p>
              <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
