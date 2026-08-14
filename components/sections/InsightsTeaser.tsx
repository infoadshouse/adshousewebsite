import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionEyebrow } from "@/components/ui";
import { insights } from "@/lib/data";

export function InsightsTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
      <div className="mb-12 max-w-2xl">
        <SectionEyebrow>Insights</SectionEyebrow>
        <h2 className="font-display text-4xl font-extrabold tracking-tight text-sky-dark md:text-5xl">
          Thinking that compounds.
        </h2>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {insights.map((post, index) => (
          <Reveal key={post.slug} delay={index * 70}>
            <Link href={`/insights/${post.slug}`} className="group block overflow-hidden rounded-[1.6rem] border border-line bg-card shadow-sm">
              <div className="img-zoom relative h-52">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-sky">
                  {post.category} · {post.readTime}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-sky-dark group-hover:text-sky">{post.title}</h3>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
