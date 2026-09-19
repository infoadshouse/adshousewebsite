import { InsightEditor } from "@/components/dashboard/InsightEditor";
import { requireAdminUser } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function NewInsightPage() {
  await requireAdminUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">New blog post</h1>
      <InsightEditor />
    </div>
  );
}
