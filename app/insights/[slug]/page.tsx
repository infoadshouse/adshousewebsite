import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { getInsight, insights } from "@/lib/data";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

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
  });
}

export default async function InsightArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

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
          { name: post.category, href: `/insights/${post.slug}` },
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
        </header>
        <div className="img-zoom relative mt-10 h-[280px] overflow-hidden rounded-[1.8rem] border border-line shadow-sm md:h-[400px]">
          <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted">
          {post.content.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </article>
      <CtaBand />
    </>
  );
}
