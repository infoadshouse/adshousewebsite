import { AccountForm } from "@/components/dashboard/AccountForm";
import { ProfileEditor } from "@/components/dashboard/ProfileEditor";
import { requireUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await requireUser();
  return (
    <div className="space-y-10">
      <section>
        <h1 className="mb-2 font-display text-3xl font-extrabold text-sky-dark">Your account</h1>
        <p className="mb-6 text-sm text-muted">Update your login details. Sign out from the sidebar to use another account.</p>
        <AccountForm name={user.name} email={user.email} role={user.role} />
      </section>
      {user.role !== "admin" ? (
        <section className="border-t border-line pt-10">
          <h2 className="mb-2 font-display text-2xl font-extrabold text-sky-dark">Marketplace profile</h2>
          <p className="mb-6 text-sm text-muted">
            This is the public information businesses and creators see on the marketplace.
          </p>
          <ProfileEditor role={user.role} />
        </section>
      ) : (
        <p className="text-sm text-muted">Admins manage users from the Users page. There is no public marketplace profile.</p>
      )}
    </div>
  );
}
