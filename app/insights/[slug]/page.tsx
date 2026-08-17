import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { getInsight, insights } from "@/lib/data";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.seoDescription,
    path: `/insights/${post.slug}`,
    image: post.image,
    type: "article",
    publishedTime: post.date,
    keywords: [post.category, "digital marketing India", "SEO India", siteConfig.name],
  });
}

export default async function InsightArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();
  const related = insights.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Insights", path: "/insights" },
            { name: post.title, path: `/insights/${post.slug}` },
          ]),
          articleSchema({
            title: post.title,
            description: post.seoDescription,
            path: `/insights/${post.slug}`,
            image: post.image,
            date: post.date,
          }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Insights", href: "/insights" },
          { name: post.title, href: `/insights/${post.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
        <header className="pt-8">
          <p className="text-xs uppercase tracking-[0.22em] text-sky">
            {post.category} · {post.readTime} · {post.date}
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
          <p className="mt-3 text-sm text-muted">
            By {siteConfig.name} · Founded {siteConfig.foundingYear} · {siteConfig.address.locality},{" "}
            {siteConfig.address.region}
          </p>
        </header>
        <div className="img-zoom relative mt-10 h-[280px] overflow-hidden rounded-[1.8rem] border border-line shadow-sm md:h-[400px]">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
        <nav className="mt-12 rounded-3xl border border-line bg-surface p-6" aria-label="Related">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky">Keep reading</p>
          <ul className="mt-4 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/insights/${item.slug}`} className="font-semibold text-sky-dark hover:text-sky">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/services/seo" className="text-sky hover:underline">
              SEO services
            </Link>
            <Link href="/services/performance-marketing" className="text-sky hover:underline">
              Performance marketing
            </Link>
            <Link href="/locations/rohtak" className="text-sky hover:underline">
              Agency in Rohtak
            </Link>
            <Link href="/contact" className="text-sky hover:underline">
              Start a project
            </Link>
          </div>
        </nav>
      </article>
      <CtaBand />
    </>
  );
}
