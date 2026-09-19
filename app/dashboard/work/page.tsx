import Link from "next/link";
import { requireAdminUser } from "@/lib/admin";
import { listCaseStudies } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminWorkPage() {
  await requireAdminUser();
  const items = await listCaseStudies({ includeDrafts: true });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-sky-dark">Case studies</h1>
          <p className="mt-1 text-sm text-muted">Campaigns you ran — published on /work and the homepage.</p>
        </div>
        <Link href="/dashboard/work/new" className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
          New case study
        </Link>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id || item.slug}>
            <Link
              href={`/dashboard/work/${item.id}`}
              className="flex items-center justify-between rounded-2xl border border-line p-4 hover:border-sky/40"
            >
              <div>
                <p className="font-semibold text-sky-dark">{item.client}</p>
                <p className="text-sm text-muted">
                  {item.published ? "Published" : "Draft"} · {item.metric} {item.metricLabel} · /work/{item.slug}
                </p>
              </div>
              <span className="text-sm text-sky">Edit</span>
            </Link>
          </li>
        ))}
        {items.length === 0 ? <p className="text-muted">No case studies yet.</p> : null}
      </ul>
    </div>
  );
}
