import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { insights } from "@/lib/data";
import { breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Insights | Digital Marketing Strategy for Indian Brands",
  description:
    "Practical thinking from Ads House on SEO in India, brand building vs discounting, and performance marketing for D2C. Insights for founders and marketing leaders.",
  path: "/insights",
  image: "/images/insight-seo.png",
  keywords: [
    "digital marketing blog India",
    "SEO India 2026",
    "D2C marketing insights",
    "performance marketing playbook",
  ],
});

export default function InsightsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
        ])}
      />
      <PageHero
        eyebrow="Insights"
        title="Notes from the growth floor."
        description="No recycled 'top 10 tips'. These are the playbooks we use on live Indian accounts — SEO, brand, and performance."
        image="/images/insight-seo.png"
        imageAlt="Editorial visual for Ads House insights on ranking Indian brands on Google"
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 md:px-8 lg:grid-cols-3">
        {insights.map((post) => (
          <Link
            key={post.slug}
            href={`/insights/${post.slug}`}
            className="group overflow-hidden rounded-[1.6rem] border border-line bg-card shadow-sm"
          >
            <div className="img-zoom relative h-56">
              <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 33vw" />
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-sky">
                {post.category} · {post.readTime} · {post.date}
              </p>
              <h2 className="mt-3 font-display text-2xl font-bold text-sky-dark group-hover:text-sky">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
