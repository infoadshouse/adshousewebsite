import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.28em] text-sky">404</p>
      <h1 className="mt-4 font-display text-5xl font-extrabold text-sky-dark">This page went off-brief.</h1>
      <p className="mt-4 text-muted">The URL does not exist. The growth plan still does.</p>
      <Link
        href="/"
        className="btn-primary mt-8 rounded-full px-6 py-3 text-sm font-semibold"
      >
        Back to Ads House
      </Link>
    </section>
  );
}
