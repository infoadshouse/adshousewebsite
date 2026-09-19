import { TestimonialEditor } from "@/components/dashboard/TestimonialEditor";
import { requireAdminUser } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function NewTestimonialPage() {
  await requireAdminUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">New testimonial</h1>
      <TestimonialEditor />
    </div>
  );
}
