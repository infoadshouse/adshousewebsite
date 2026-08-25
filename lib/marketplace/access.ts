import type { AuthUser } from "@/lib/auth";
import { AgencyProfile } from "@/models/AgencyProfile";
import { BusinessProfile } from "@/models/BusinessProfile";
import { Campaign } from "@/models/Campaign";
import { InfluencerProfile } from "@/models/InfluencerProfile";

export async function getInfluencerByUser(userId: string) {
  return InfluencerProfile.findOne({ userId });
}

export async function getBusinessByUser(userId: string) {
  return BusinessProfile.findOne({ userId });
}

export async function getAgencyByUser(userId: string) {
  return AgencyProfile.findOne({ userId });
}

export async function canManageCampaign(user: AuthUser, campaign: { createdByUserId: unknown; agencyId?: unknown }) {
  if (user.role === "admin") return true;
  if (String(campaign.createdByUserId) === user.id) return true;
  if (user.role === "agency" && campaign.agencyId) {
    const agency = await getAgencyByUser(user.id);
    return agency ? String(campaign.agencyId) === String(agency._id) : false;
  }
  return false;
}

export async function listOwnedCampaignIds(user: AuthUser) {
  if (user.role === "admin") {
    const campaigns = await Campaign.find({}).select("_id");
    return campaigns.map((c) => c._id);
  }
  if (user.role === "agency") {
    const agency = await getAgencyByUser(user.id);
    if (!agency) return [];
    const campaigns = await Campaign.find({
      $or: [{ createdByUserId: user.id }, { agencyId: agency._id }],
    }).select("_id");
    return campaigns.map((c) => c._id);
  }
  const campaigns = await Campaign.find({ createdByUserId: user.id }).select("_id");
  return campaigns.map((c) => c._id);
}
