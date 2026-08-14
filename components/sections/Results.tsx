import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui";
import { resultMetrics } from "@/lib/data";

export function Results() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="max-w-3xl">
          <SectionEyebrow>Results</SectionEyebrow>
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-6xl">
            Good marketing looks creative.{" "}
            <span className="text-sky">Great marketing moves numbers.</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resultMetrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 50}>
              <article className="rounded-3xl border border-line bg-white p-7 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <p className="font-display text-4xl font-extrabold text-sky md:text-5xl">
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={"decimals" in metric ? metric.decimals : 0}
                  />
                </p>
                <h3 className="mt-3 font-semibold text-sky-dark">{metric.label}</h3>
                <p className="mt-2 text-sm text-muted">{metric.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
