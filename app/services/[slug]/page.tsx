import Image from "next/image";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { ButtonLink } from "@/components/ui";
import { getService, services } from "@/lib/data";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

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
    keywords: [service.title, `${service.title} India`, `${service.title} Mumbai`, "digital marketing agency India"],
  });
}

export default async function ServiceDetailPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

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
            <p className="text-xs uppercase tracking-[0.28em] text-sky">Service</p>
            <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 text-xl text-muted">{service.outcome}</p>
            <p className="mt-6 leading-relaxed text-muted">{service.intro}</p>
            <div className="mt-8">
              <ButtonLink href="/contact">Start a Project</ButtonLink>
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

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {service.points.map((point) => (
            <section key={point.title} className="rounded-3xl border border-line bg-card p-7 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-sky-dark">{point.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{point.body}</p>
            </section>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="mb-6 font-display text-3xl font-bold text-sky-dark">Questions about {service.title.toLowerCase()}</h2>
          <FaqList items={service.faqs} />
        </section>
      </article>
      <CtaBand />
    </>
  );
}
