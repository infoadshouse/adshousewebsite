import { redirect } from "next/navigation";
import { AdminUsersTable } from "@/components/dashboard/AdminUsersTable";
import { requireUser } from "@/lib/auth";

export default async function AdminUsersPage() {
  const user = await requireUser();
  if (user.role !== "admin") redirect("/dashboard");
  return (
    <div>
      <h1 className="mb-2 font-display text-3xl font-extrabold text-sky-dark">Users</h1>
      <p className="mb-6 text-sm text-muted">Every admin, creator, business, and agency account on the marketplace.</p>
      <AdminUsersTable />
    </div>
  );
}
