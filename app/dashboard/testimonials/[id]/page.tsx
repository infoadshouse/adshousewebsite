import { notFound } from "next/navigation";
import { DeleteContentButton } from "@/components/dashboard/ContentListHeader";
import { TestimonialEditor } from "@/components/dashboard/TestimonialEditor";
import { requireAdminUser } from "@/lib/admin";
import { getTestimonialById } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminUser();
  const { id } = await params;
  const item = await getTestimonialById(id);
  if (!item?.id) notFound();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold text-sky-dark">Edit testimonial</h1>
        <DeleteContentButton href={`/api/admin/testimonials/${item.id}`} redirectTo="/dashboard/testimonials" />
      </div>
      <TestimonialEditor initial={item} />
    </div>
  );
}
