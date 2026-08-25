import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const applicationSchema = new Schema(
  {
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign", required: true, index: true },
    influencerId: { type: Schema.Types.ObjectId, ref: "InfluencerProfile", required: true },
    influencerUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    pitch: { type: String, default: "" },
    proposedRate: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["applied", "shortlisted", "rejected", "withdrawn", "accepted"],
      default: "applied",
      index: true,
    },
  },
  { timestamps: true },
);

applicationSchema.index({ campaignId: 1, influencerId: 1 }, { unique: true });

export type ApplicationDoc = InferSchemaType<typeof applicationSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const Application: Model<ApplicationDoc> =
  (mongoose.models.Application as Model<ApplicationDoc>) ||
  mongoose.model<ApplicationDoc>("Application", applicationSchema);
