import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import Link from "next/link";
import { ButtonLink } from "@/components/ui";
import { caseStudies, getCaseStudy, services } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return caseStudies.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) return {};
  return createMetadata({
    title: `${item.client} Case Study | ${item.metric} ${item.metricLabel}`,
    description: `${item.challenge} ${item.result}`,
    path: `/work/${item.slug}`,
    image: item.image,
  });
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const item = getCaseStudy(slug);
  if (!item) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: item.client, path: `/work/${item.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: item.title,
            about: item.client,
            image: `${siteConfig.url}${item.image}`,
            url: `${siteConfig.url}/work/${item.slug}`,
            creator: { "@id": `${siteConfig.url}/#organization` },
          },
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Work", href: "/work" },
          { name: item.client, href: `/work/${item.slug}` },
        ]}
      />
      <article className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <header className="pt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-sky">
            {item.industry} · {item.location} · {item.year}
          </p>
          <p className="mt-2 text-sm text-muted">
            By {siteConfig.name} · Founded {siteConfig.foundingYear} · {siteConfig.address.locality}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-6xl">
            {item.title}
          </h1>
          <p className="mt-6 font-display text-5xl font-extrabold text-sky">{item.metric}</p>
          <p className="text-sm uppercase tracking-widest text-muted">{item.metricLabel}</p>
        </header>

        <div className="img-zoom relative mt-10 h-[280px] overflow-hidden rounded-[2rem] border border-line shadow-sm md:h-[520px]">
          <Image
            src={item.image}
            alt={`${item.client} campaign visual produced by Ads House`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {item.stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-line bg-card p-6 shadow-sm">
              <p className="font-display text-3xl font-extrabold text-sky">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <section className="rounded-3xl border border-line bg-card p-7 shadow-sm">
            <h2 className="text-xs uppercase tracking-[0.2em] text-sky">Challenge</h2>
            <p className="mt-3 leading-relaxed text-muted">{item.challenge}</p>
          </section>
          <section className="rounded-3xl border border-line bg-card p-7 shadow-sm">
            <h2 className="text-xs uppercase tracking-[0.2em] text-sky">Solution</h2>
            <p className="mt-3 leading-relaxed text-muted">{item.solution}</p>
          </section>
          <section className="rounded-3xl border border-line bg-card p-7 shadow-sm">
            <h2 className="text-xs uppercase tracking-[0.2em] text-sky">Result</h2>
            <p className="mt-3 leading-relaxed text-muted">{item.result}</p>
          </section>
        </div>

        <div className="mx-auto mt-14 max-w-3xl space-y-5 text-lg leading-relaxed text-muted">
          {item.story.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted">
          Services:{" "}
          {item.services.map((name, index) => {
            const match = services.find((service) => service.title === name);
            return (
              <span key={name}>
                {index > 0 ? " · " : null}
                {match ? (
                  <Link href={`/services/${match.slug}`} className="text-sky hover:underline">
                    {name}
                  </Link>
                ) : (
                  name
                )}
              </span>
            );
          })}
        </p>
        <div className="mt-8">
          <ButtonLink href="/contact">Start a similar project</ButtonLink>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
