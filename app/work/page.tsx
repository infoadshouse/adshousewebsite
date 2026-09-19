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
  title: "Digital Marketing Case Studies in India",
  description:
    "See Ads House case studies: fashion, fintech, skincare, food, and edtech brands across India. Real metrics — leads, ROAS, revenue, CAC, and organic growth.",
  path: "/work",
  image: "/images/work-fashion.png",
  keywords: ["digital marketing case studies India", "performance marketing results"],
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
        title="Digital marketing case studies from India"
        description="Fashion, fintech, skincare, food, and edtech. Honest numbers — leads, ROAS, revenue, CAC, and organic growth from Ads House campaigns."
        image="/images/work-fashion.png"
        imageAlt="Fashion campaign produced by Ads House for an Indian D2C brand"
      />
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <p className="max-w-3xl text-lg leading-relaxed text-muted">
          Case studies below are Ads House programmes for Indian brands — fashion, fintech, skincare,
          food, and edtech. Metrics are leads, ROAS, revenue, CAC, and organic growth. To brief a live
          account, start a project; we will tell you if the first lever is ads, SEO, or the website.
        </p>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 md:px-8">
        {caseStudies.length === 0 ? <p className="text-muted">New case studies will appear here.</p> : null}
        {caseStudies.map((item) => (
          <Link
            key={item.slug}
            href={`/work/${item.slug}`}
            className="group grid overflow-hidden rounded-[2rem] border border-line bg-card shadow-sm lg:grid-cols-2"
          >
            <div className="img-zoom relative min-h-[280px] lg:min-h-[360px]">
              <Image
                src={item.image}
                alt={`${item.client} ${item.industry} case study by Ads House`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="text-xs uppercase tracking-[0.2em] text-sky">
                {item.client} · {item.location} · {item.year}
              </p>
              <p className="mt-2 text-xs text-muted">
                {siteConfig.name} · Founded {siteConfig.foundingYear} · {siteConfig.address.locality}
              </p>
              <p className="mt-4 font-display text-5xl font-extrabold text-sky">{item.metric}</p>
              <p className="text-sm uppercase tracking-widest text-muted">{item.metricLabel}</p>
              <h2 className="mt-5 font-display text-2xl font-bold text-sky-dark md:text-3xl">{item.title}</h2>
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
