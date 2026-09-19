import Link from "next/link";
import { requireAdminUser } from "@/lib/admin";
import { listInsights } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminInsightsPage() {
  await requireAdminUser();
  const posts = await listInsights({ includeDrafts: true });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-sky-dark">Blogs</h1>
          <p className="mt-1 text-sm text-muted">Published posts appear on /insights and the homepage.</p>
        </div>
        <Link href="/dashboard/insights/new" className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
          New post
        </Link>
      </div>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id || post.slug}>
            <Link
              href={`/dashboard/insights/${post.id}`}
              className="flex items-center justify-between rounded-2xl border border-line p-4 hover:border-sky/40"
            >
              <div>
                <p className="font-semibold text-sky-dark">{post.title}</p>
                <p className="text-sm text-muted">
                  {post.published ? "Published" : "Draft"} · {post.date} · /insights/{post.slug}
                </p>
              </div>
              <span className="text-sm text-sky">Edit</span>
            </Link>
          </li>
        ))}
        {posts.length === 0 ? <p className="text-muted">No posts yet.</p> : null}
      </ul>
    </div>
  );
}
