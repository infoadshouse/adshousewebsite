import { redirect } from "next/navigation";
import { CampaignForm } from "@/components/dashboard/CampaignForm";
import { requireUser } from "@/lib/auth";

export default async function NewCampaignPage() {
  const user = await requireUser();
  if (user.role === "creator") redirect("/marketplace/campaigns");
  if (user.role === "admin") redirect("/dashboard/campaigns");
  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-extrabold text-sky-dark">Post a campaign</h1>
      <CampaignForm role={user.role} />
    </div>
  );
}
