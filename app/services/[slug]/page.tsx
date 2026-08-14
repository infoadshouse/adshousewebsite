import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ArrowIcon, ButtonLink } from "@/components/ui";
import { getService, methodology, services } from "@/lib/data";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { serviceThemes } from "@/lib/service-themes";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    image: service.image,
    keywords: [service.title, `${service.title} India`, `${service.title} Rohtak`, "digital marketing agency India"],
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const theme = serviceThemes[service.slug] ?? serviceThemes["brand-building"];
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  const delivery = methodology.map((step) => ({
    ...step,
    body:
      step.title === "Discover"
        ? `We audit where ${service.title.toLowerCase()} can actually move leads, CAC, ROAS, or revenue — before we recommend spend.`
        : step.title === "Build"
          ? `${service.title} is built as part of the growth system, not a silo: offers, funnel, tracking, and brand language stay aligned.`
          : step.title === "Launch"
            ? `We put ${service.title.toLowerCase()} live with measurement from day one, so you can see what is working in Indian market conditions.`
            : step.title === "Optimize"
              ? `We keep what converts, kill what does not, and report in business language — not vanity metrics.`
              : `When the engine works, we scale ${service.title.toLowerCase()} into new channels, markets, and product lines.`,
  }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          serviceSchema({
            name: service.title,
            description: service.seoDescription,
            path: `/services/${service.slug}`,
            image: service.image,
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <article className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <div className="grid items-center gap-10 pt-8 lg:grid-cols-2">
          <div>
            <p className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] ${theme.text}`}>
              <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.wrap}`}>{theme.icon}</span>
              Service
            </p>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 text-xl text-muted">{service.outcome}</p>
            <p className="mt-6 leading-relaxed text-muted">{service.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/contact">
                Start a Project
                <ArrowIcon />
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                All services
              </ButtonLink>
            </div>
          </div>
          <div className="img-zoom relative h-[320px] overflow-hidden rounded-[2rem] border border-line shadow-sm md:h-[460px]">
            <Image
              src={service.image}
              alt={`${service.title} services by Ads House digital marketing agency India`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        <section className="mt-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">What you get</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-4xl">
            The work inside {service.title.toLowerCase()}.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {service.points.map((point, index) => (
              <section
                key={point.title}
                className="rounded-2xl border border-line bg-white p-7 shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
              >
                <p className={`font-display text-xl font-extrabold ${theme.text}`}>
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-sky-dark">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{point.body}</p>
              </section>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">How we work</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-4xl">
            Discover. Build. Launch. Optimize. Scale.
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Every {service.title.toLowerCase()} engagement runs through the same growth system, so the work
            compounds instead of resetting every quarter.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {delivery.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-line bg-white p-5 shadow-[0_12px_32px_rgba(15,23,42,0.06)]"
              >
                <p className={`font-display text-lg font-extrabold ${theme.text}`}>{item.step}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-sky-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-sky">More capabilities</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-sky-dark md:text-4xl">
            Other services in the same engine.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((item) => {
              const relatedTheme = serviceThemes[item.slug] ?? serviceThemes["brand-building"];
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group rounded-2xl border border-line bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.06)] transition hover:-translate-y-1"
                >
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${relatedTheme.wrap}`}>
                    {relatedTheme.icon}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-bold text-sky-dark group-hover:text-sky">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.outcome}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">
            Questions about {service.title.toLowerCase()}
          </h2>
          <FaqList items={service.faqs} />
        </section>
      </article>
      <CtaBand />
    </>
  );
}
