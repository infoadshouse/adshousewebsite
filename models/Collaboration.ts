import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const collaborationSchema = new Schema(
  {
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: true, index: true },
    applicationId: { type: Schema.Types.ObjectId, ref: "Application", required: true, unique: true },
    influencerId: { type: Schema.Types.ObjectId, ref: "InfluencerProfile", required: true },
    influencerUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    businessId: { type: Schema.Types.ObjectId, ref: "BusinessProfile", default: null },
    agencyId: { type: Schema.Types.ObjectId, ref: "AgencyProfile", default: null },
    agencyClientId: { type: Schema.Types.ObjectId, ref: "AgencyClient", default: null },
    ownerUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    agreedRate: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
      index: true,
    },
  },
  { timestamps: true },
);

export type CollaborationDoc = InferSchemaType<typeof collaborationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Collaboration: Model<CollaborationDoc> =
  (mongoose.models.Collaboration as Model<CollaborationDoc>) ||
  mongoose.model<CollaborationDoc>("Collaboration", collaborationSchema);
