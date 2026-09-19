import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { connectDb } from "@/lib/db";
import { listOwnedCampaignIds } from "@/lib/marketplace/access";
import { Application } from "@/models/Application";
import { Campaign } from "@/models/Campaign";
import { Collaboration } from "@/models/Collaboration";
import { Conversation } from "@/models/Conversation";

export const dynamic = "force-dynamic";

export default async function DashboardHomePage() {
  const user = await requireUser();
  await connectDb();
  const ownedIds = user.role === "creator" ? [] : await listOwnedCampaignIds(user);

  const [campaigns, applications, collaborations, conversations] = await Promise.all([
    user.role === "creator"
      ? Campaign.countDocuments({ status: "open" })
      : ownedIds.length,
    user.role === "creator"
      ? Application.countDocuments({ influencerUserId: user.id })
      : Application.countDocuments({ campaignId: { $in: ownedIds } }),
    user.role === "creator"
      ? Collaboration.countDocuments({ influencerUserId: user.id })
      : Collaboration.countDocuments({ campaignId: { $in: ownedIds } }),
    Conversation.countDocuments({ participantIds: user.id }),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold text-sky-dark">Welcome, {user.name}</h1>
      <p className="mt-2 text-muted">
        {user.role === "admin"
          ? "You have platform access to every creator, business, campaign, and collaboration."
          : user.role === "creator"
            ? "Discover campaigns, apply, and chat with brands."
            : user.role === "agency"
              ? "Manage clients, post campaigns, and shortlist creators."
              : "Find creators, post campaigns, and run collaborations."}
      </p>
      <div className="mt-4 rounded-2xl bg-surface p-5">
        <p className="text-xs uppercase tracking-wide text-muted">Signed in</p>
        <p className="mt-1 font-semibold text-sky-dark">{user.name}</p>
        <p className="text-sm text-muted">{user.email}</p>
        <Link href="/dashboard/profile" className="mt-3 inline-block text-sm font-semibold text-sky">
          Manage account and profile →
        </Link>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat href="/dashboard/campaigns" label={user.role === "creator" ? "Open campaigns" : user.role === "admin" ? "All campaigns" : "Your campaigns"} value={campaigns} />
        <Stat href="/dashboard/applications" label="Applications" value={applications} />
        <Stat href="/dashboard/collaborations" label="Collaborations" value={collaborations} />
        <Stat href="/dashboard/messages" label="Message threads" value={conversations} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {user.role === "admin" ? (
          <>
            <Link href="/dashboard/insights" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
              Manage blogs
            </Link>
            <Link href="/dashboard/work" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold">
              Manage case studies
            </Link>
            <Link href="/dashboard/testimonials" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold">
              Manage testimonials
            </Link>
            <Link href="/dashboard/campaigns/new" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold">
              Post a campaign
            </Link>
          </>
        ) : (
          <Link href="/dashboard/profile" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold">
            Manage profile
          </Link>
        )}
        {user.role === "creator" ? (
          <Link href="/marketplace/campaigns" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
            Apply to campaigns
          </Link>
        ) : user.role === "admin" ? (
          <Link href="/marketplace/creators" className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold">
            Browse creators
          </Link>
        ) : (
          <Link href="/dashboard/campaigns/new" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
            Post a campaign
          </Link>
        )}
      </div>
    </div>
  );
}

function Stat({ href, label, value }: { href: string; label: string; value: number }) {
  return (
    <Link href={href} className="rounded-2xl bg-surface p-5">
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl font-extrabold text-sky-dark">{value}</p>
    </Link>
  );
}
