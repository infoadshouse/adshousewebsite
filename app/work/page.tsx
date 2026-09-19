import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { listCaseStudies } from "@/lib/content";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Digital Marketing Case Studies near Delhi NCR",
  description:
    "Ads House work for local brands around Delhi NCR — Rohtak, Gurugram, Noida, Faridabad, Ghaziabad, and nearby towns. Leads, visits, ROAS, and repeat orders.",
  path: "/work",
  image: "/images/work-fashion.png",
  keywords: ["digital marketing case studies NCR", "ads agency Rohtak work"],
});

export default async function WorkPage() {
  const caseStudies = await listCaseStudies();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
          ]),
          itemListSchema({
            name: "Ads House case studies",
            path: "/work",
            items: caseStudies.map((item) => ({
              name: item.title,
              path: `/work/${item.slug}`,
            })),
          }),
        ]}
      />
      <PageHero
        eyebrow="Work"
        title="Fifteen local stories from around Delhi NCR"
        description="Boutiques, clinics, kitchens, coaching centres, and yards in Rohtak, Gurugram, Noida, Faridabad, and nearby towns — not metro brand names."
        image="/images/work-fashion.png"
        imageAlt="Local fashion campaign produced by Ads House near Delhi NCR"
      />
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          These are programmes for independent businesses on the NCR belt. Numbers are appointments,
          enquiries, site visits, covers, and repeat orders. Brief a live account and we will say
          whether the first lever is ads, SEO, or the website.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-20 sm:grid-cols-2 md:px-8">
        {caseStudies.length === 0 ? <p className="text-muted">New case studies will appear here.</p> : null}
        {caseStudies.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-line bg-card shadow-sm"
          >
            <div className="img-zoom relative min-h-[200px]">
              <Image
                src={item.image}
                alt={`${item.client} ${item.industry} case study by Ads House`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-sky">
                {item.client} · {item.location} · {item.year}
              </p>
              <p className="mt-2 text-xs text-muted">
                {siteConfig.name} · Founded {siteConfig.foundingYear} · {siteConfig.address.locality}
              </p>
              <p className="mt-4 font-display text-4xl font-extrabold text-sky">{item.metric}</p>
              <p className="text-sm uppercase tracking-widest text-muted">{item.metricLabel}</p>
              <h2 className="mt-4 font-display text-xl font-bold text-sky-dark md:text-2xl">{item.title}</h2>
              <p className="mt-4 text-muted">{item.result}</p>
              <span className="mt-6 text-sm font-semibold text-sky group-hover:text-sky-dark">Read the case study →</span>
            </div>
          </Link>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
