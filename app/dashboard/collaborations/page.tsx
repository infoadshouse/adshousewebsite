import { CollaborationsBoard } from "@/components/dashboard/CollaborationsBoard";
import { requireUser } from "@/lib/auth";

export default async function CollaborationsPage() {
  await requireUser();
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">Collaborations</h1>
      <CollaborationsBoard />
    </div>
  );
}
