import Link from "next/link";
import { requireAdminUser } from "@/lib/admin";
import { listTestimonials } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  await requireAdminUser();
  const items = await listTestimonials({ includeDrafts: true });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-sky-dark">Testimonials</h1>
          <p className="mt-1 text-sm text-muted">Quotes on the homepage hero and testimonials section.</p>
        </div>
        <Link href="/dashboard/testimonials/new" className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
          New testimonial
        </Link>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id || item.name}>
            <Link
              href={`/dashboard/testimonials/${item.id}`}
              className="flex items-center justify-between rounded-2xl border border-line p-4 hover:border-sky/40"
            >
              <div>
                <p className="font-semibold text-sky-dark">{item.name}</p>
                <p className="text-sm text-muted">
                  {item.published ? "Published" : "Draft"} · {item.company} · {item.result}
                </p>
              </div>
              <span className="text-sm text-sky">Edit</span>
            </Link>
          </li>
        ))}
        {items.length === 0 ? <p className="text-muted">No testimonials yet.</p> : null}
      </ul>
    </div>
  );
}
