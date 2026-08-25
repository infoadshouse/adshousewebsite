"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api } from "@/lib/marketplace/client";
import { formatFollowers, formatInr } from "@/lib/marketplace/constants";

type Application = {
  id: string;
  status: string;
  pitch: string;
  proposedRate: number;
  influencerUserId: string;
  influencer: {
    username: string;
    displayName: string;
    photo?: string;
    socialAccounts?: { followers: number; engagementRate: number }[];
  } | null;
};

type Campaign = {
  id: string;
  title: string;
  description: string;
  status: string;
  budget: number;
  creatorCount: number;
  clientName?: string | null;
};

export function CampaignManage({ campaignId }: { campaignId: string }) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [error, setError] = useState("");

  async function load() {
    const [c, a] = await Promise.all([
      api<{ campaign: Campaign }>(`/api/marketplace/campaigns/${campaignId}`),
      api<{ applications: Application[] }>(`/api/marketplace/campaigns/${campaignId}/applications`),
    ]);
    setCampaign(c.campaign);
    setApplications(a.applications);
  }

  useEffect(() => {
    load().catch((err: Error) => setError(err.message));
  }, [campaignId]);

  async function setStatus(id: string, status: string) {
    setError("");
    try {
      await api(`/api/marketplace/applications/${id}`, { method: "PATCH", json: { status } });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  async function closeCampaign() {
    await api(`/api/marketplace/campaigns/${campaignId}`, { method: "PATCH", json: { status: "closed" } });
    router.refresh();
    await load();
  }

  if (!campaign) return <p className="text-muted">{error || "Loading…"}</p>;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-sky-dark">{campaign.title}</h1>
          {campaign.clientName ? <p className="text-sm text-muted">Client: {campaign.clientName}</p> : null}
          <p className="mt-2 max-w-2xl text-sm text-muted">{campaign.description}</p>
          <p className="mt-2 text-sm font-medium text-sky-dark">
            {formatInr(campaign.budget)} · {campaign.creatorCount} creators · {campaign.status}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/marketplace/campaigns/${campaign.id}`} className="rounded-full border border-line px-4 py-2 text-sm">
            Public page
          </Link>
          {campaign.status === "open" ? (
            <button type="button" onClick={closeCampaign} className="rounded-full border border-line px-4 py-2 text-sm">
              Close campaign
            </button>
          ) : null}
        </div>
      </div>
      {error ? <p className="mb-4 text-sm text-pink">{error}</p> : null}
      <h2 className="mb-3 font-semibold text-sky-dark">Applications</h2>
      <ul className="space-y-3">
        {applications.map((app) => {
          const social = app.influencer?.socialAccounts?.[0];
          return (
            <li key={app.id} className="rounded-2xl border border-line p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link href={`/marketplace/creators/${app.influencer?.username}`} className="font-semibold text-sky-dark">
                    {app.influencer?.displayName ?? "Creator"}
                  </Link>
                  <p className="text-sm text-muted">
                    {social
                      ? `${formatFollowers(social.followers)} · ${social.engagementRate}% ER`
                      : "Profile incomplete"}{" "}
                    · {formatInr(app.proposedRate)} · {app.status}
                  </p>
                  <p className="mt-2 text-sm text-muted">{app.pitch}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {app.status === "applied" || app.status === "shortlisted" ? (
                    <>
                      {app.status === "applied" ? (
                        <button
                          type="button"
                          className="rounded-full border border-line px-3 py-1.5 text-xs"
                          onClick={() => setStatus(app.id, "shortlisted")}
                        >
                          Shortlist
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className="rounded-full bg-sky px-3 py-1.5 text-xs text-white"
                        onClick={() => setStatus(app.id, "accepted")}
                      >
                        Accept
                      </button>
                      <button
                        type="button"
                        className="rounded-full border border-line px-3 py-1.5 text-xs"
                        onClick={() => setStatus(app.id, "rejected")}
                      >
                        Reject
                      </button>
                    </>
                  ) : null}
                  <Link
                    href={`/dashboard/messages?with=${app.influencerUserId}&campaign=${campaign.id}`}
                    className="rounded-full border border-line px-3 py-1.5 text-xs"
                  >
                    Message
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
        {applications.length === 0 ? <p className="text-sm text-muted">No applications yet.</p> : null}
      </ul>
    </div>
  );
}
