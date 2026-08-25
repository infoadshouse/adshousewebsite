import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { locationSchema } from "./location";

const campaignSchema = new Schema(
  {
    createdByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    businessId: { type: Schema.Types.ObjectId, ref: "BusinessProfile", default: null },
    agencyId: { type: Schema.Types.ObjectId, ref: "AgencyProfile", default: null },
    agencyClientId: { type: Schema.Types.ObjectId, ref: "AgencyClient", default: null },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    location: { type: locationSchema, default: () => ({}) },
    categories: { type: [String], default: [] },
    platforms: { type: [String], default: [] },
    followerMin: { type: Number, default: 0 },
    followerMax: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    currency: { type: String, default: "INR" },
    creatorCount: { type: Number, default: 1 },
    durationDays: { type: Number, default: 15 },
    status: {
      type: String,
      enum: ["draft", "open", "closed", "completed"],
      default: "open",
      index: true,
    },
  },
  { timestamps: true },
);

campaignSchema.index({ status: 1, createdAt: -1 });
campaignSchema.index({ "location.city": 1, status: 1 });

export type CampaignDoc = InferSchemaType<typeof campaignSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Campaign: Model<CampaignDoc> =
  (mongoose.models.Campaign as Model<CampaignDoc>) ||
  mongoose.model<CampaignDoc>("Campaign", campaignSchema);
