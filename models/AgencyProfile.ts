import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { locationSchema } from "./location";

const agencyProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    location: { type: locationSchema, default: () => ({}) },
    about: { type: String, default: "" },
    website: { type: String, default: "" },
    photo: { type: String, default: "" },
    isPlatformAgency: { type: Boolean, default: false, index: true },
  },
  { timestamps: true },
);

export type AgencyProfileDoc = InferSchemaType<typeof agencyProfileSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const AgencyProfile: Model<AgencyProfileDoc> =
  (mongoose.models.AgencyProfile as Model<AgencyProfileDoc>) ||
  mongoose.model<AgencyProfileDoc>("AgencyProfile", agencyProfileSchema);
