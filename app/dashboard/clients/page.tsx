import { redirect } from "next/navigation";
import { ClientsManager } from "@/components/dashboard/ClientsManager";
import { requireUser } from "@/lib/auth";

export default async function ClientsPage() {
  const user = await requireUser();
  if (user.role !== "agency" && user.role !== "admin") redirect("/dashboard");
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">Clients</h1>
      <p className="mb-6 text-sm text-muted">
        Run campaigns for businesses that don’t have their own marketplace account.
      </p>
      <ClientsManager />
    </div>
  );
}
