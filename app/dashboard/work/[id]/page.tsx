import { notFound } from "next/navigation";
import { DeleteContentButton } from "@/components/dashboard/ContentListHeader";
import { CaseStudyEditor } from "@/components/dashboard/CaseStudyEditor";
import { requireAdminUser } from "@/lib/admin";
import { getCaseStudyById } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditWorkPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;
  const item = await getCaseStudyById(id);
  if (!item?.id) notFound();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold text-sky-dark">Edit case study</h1>
        <DeleteContentButton href={`/api/admin/work/${item.id}`} redirectTo="/dashboard/work" />
      </div>
      <CaseStudyEditor initial={item} />
    </div>
  );
}
