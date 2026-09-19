import { CaseStudyEditor } from "@/components/dashboard/CaseStudyEditor";
import { requireAdminUser } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function NewWorkPage() {
  await requireAdminUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">New case study</h1>
      <CaseStudyEditor />
    </div>
  );
}
