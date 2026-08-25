import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { locationSchema } from "./location";

const agencyClientSchema = new Schema(
  {
    agencyId: { type: Schema.Types.ObjectId, ref: "AgencyProfile", required: true, index: true },
    agencyUserId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "" },
    location: { type: locationSchema, default: () => ({}) },
    notes: { type: String, default: "" },
    businessProfileId: { type: Schema.Types.ObjectId, ref: "BusinessProfile", default: null },
  },
  { timestamps: true },
);

export type AgencyClientDoc = InferSchemaType<typeof agencyClientSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const AgencyClient: Model<AgencyClientDoc> =
  (mongoose.models.AgencyClient as Model<AgencyClientDoc>) ||
  mongoose.model<AgencyClientDoc>("AgencyClient", agencyClientSchema);
