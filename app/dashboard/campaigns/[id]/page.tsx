import { CampaignManage } from "@/components/dashboard/CampaignManage";
import { requireUser } from "@/lib/auth";

export default async function DashboardCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const { id } = await params;
  return <CampaignManage campaignId={id} />;
}
