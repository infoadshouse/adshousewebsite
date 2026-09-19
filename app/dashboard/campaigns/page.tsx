import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { listOwnedCampaignIds } from "@/lib/marketplace/access";
import { formatInr } from "@/lib/marketplace/constants";
import { Campaign } from "@/models/Campaign";

export const dynamic = "force-dynamic";

export default async function CampaignsDashboardPage() {
  const user = await requireUser();
  await connectDb();
  const campaigns =
    user.role === "creator"
      ? await Campaign.find({ status: "open" }).sort({ createdAt: -1 }).limit(30).lean()
      : await Campaign.find({ _id: { $in: await listOwnedCampaignIds(user) } })
          .sort({ createdAt: -1 })
          .lean();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-extrabold text-sky-dark">
          {user.role === "creator" ? "Open campaigns" : user.role === "admin" ? "All campaigns" : "Campaigns"}
        </h1>
        {user.role !== "creator" ? (
          <Link href="/dashboard/campaigns/new" className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
            New campaign
          </Link>
        ) : null}
      </div>
      <ul className="space-y-3">
        {campaigns.map((campaign) => (
          <li key={String(campaign._id)}>
            <Link
              href={
                user.role === "creator"
                  ? `/marketplace/campaigns/${campaign._id}`
                  : `/dashboard/campaigns/${campaign._id}`
              }
              className="flex items-center justify-between rounded-2xl border border-line p-4 hover:border-sky/40"
            >
              <div>
                <p className="font-semibold text-sky-dark">{campaign.title}</p>
                <p className="text-sm text-muted">
                  {campaign.status} · {formatInr(campaign.budget)} · {campaign.creatorCount} creators
                </p>
              </div>
              <span className="text-sm text-sky">View</span>
            </Link>
          </li>
        ))}
        {campaigns.length === 0 ? <p className="text-muted">No campaigns yet.</p> : null}
      </ul>
    </div>
  );
}
