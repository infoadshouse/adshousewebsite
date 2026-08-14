import Image from "next/image";
import Link from "next/link";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white pt-24 md:pt-40">
      <div className="hero-blob -left-16 top-10 h-64 w-64 bg-sky/15" />
      <div className="hero-blob right-0 top-24 h-72 w-72 bg-purple/10" />
      <div className="relative mx-auto max-w-7xl px-5 pb-12 md:px-8 md:pb-16">
        <p className="inline-flex rounded-full bg-sky/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-sky">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl font-display text-[1.85rem] font-extrabold tracking-tight text-sky-dark sm:text-4xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
        {image ? (
          <div className="img-zoom relative mt-10 h-[240px] overflow-hidden rounded-[2rem] border border-line shadow-lg md:h-[420px]">
            <Image src={image} alt={imageAlt || title} fill priority className="object-cover" sizes="100vw" />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-40">
      <ol className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.16em] text-muted">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <span>/</span> : null}
            {index === items.length - 1 ? (
              <span className="text-sky-dark">{item.name}</span>
            ) : (
              <Link href={item.href} className="hover:text-sky">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
