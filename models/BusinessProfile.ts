import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { locationSchema } from "./location";

const businessProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, default: "" },
    location: { type: locationSchema, default: () => ({}) },
    about: { type: String, default: "" },
    website: { type: String, default: "" },
    photo: { type: String, default: "" },
  },
  { timestamps: true },
);

businessProfileSchema.index({ "location.city": 1 });

export type BusinessProfileDoc = InferSchemaType<typeof businessProfileSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const BusinessProfile: Model<BusinessProfileDoc> =
  (mongoose.models.BusinessProfile as Model<BusinessProfileDoc>) ||
  mongoose.model<BusinessProfileDoc>("BusinessProfile", businessProfileSchema);
