import { notFound } from "next/navigation";
import { DeleteContentButton } from "@/components/dashboard/ContentListHeader";
import { InsightEditor } from "@/components/dashboard/InsightEditor";
import { requireAdminUser } from "@/lib/admin";
import { getInsightById } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditInsightPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;
  const post = await getInsightById(id);
  if (!post?.id) notFound();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold text-sky-dark">Edit post</h1>
        <DeleteContentButton href={`/api/admin/insights/${post.id}`} redirectTo="/dashboard/insights" />
      </div>
      <InsightEditor initial={post} />
    </div>
  );
}
