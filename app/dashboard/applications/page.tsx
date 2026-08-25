import { ApplicationsBoard } from "@/components/dashboard/ApplicationsBoard";
import { requireUser } from "@/lib/auth";

export default async function ApplicationsPage() {
  const user = await requireUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">Applications</h1>
      <ApplicationsBoard role={user.role} />
    </div>
  );
}
