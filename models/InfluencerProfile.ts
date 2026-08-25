import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";
import { locationSchema } from "./location";

const socialAccountSchema = new Schema(
  {
    platform: { type: String, required: true },
    handle: { type: String, default: "" },
    url: { type: String, default: "" },
    followers: { type: Number, default: 0 },
    avgViews: { type: Number, default: 0 },
    avgLikes: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
  },
  { _id: false },
);

const portfolioItemSchema = new Schema(
  {
    title: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  { _id: false },
);

const audienceLocationSchema = new Schema(
  {
    country: { type: String, default: "India" },
    state: { type: String, default: "" },
    city: { type: String, default: "" },
    note: { type: String, default: "" },
  },
  { _id: false },
);

const influencerProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    displayName: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    photo: { type: String, default: "" },
    bio: { type: String, default: "" },
    languages: { type: [String], default: [] },
    categories: { type: [String], default: [], index: true },
    location: { type: locationSchema, default: () => ({}) },
    audienceLocation: { type: audienceLocationSchema, default: () => ({}) },
    serviceRadiusKm: { type: Number, default: 25 },
    socialAccounts: { type: [socialAccountSchema], default: [] },
    pricing: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: "INR" },
    },
    contentTypes: { type: [String], default: [] },
    availability: {
      type: String,
      enum: ["available", "limited", "unavailable"],
      default: "available",
    },
    verified: { type: Boolean, default: false },
    portfolio: { type: [portfolioItemSchema], default: [] },
  },
  { timestamps: true },
);

influencerProfileSchema.index({ "location.geo": "2dsphere" });
influencerProfileSchema.index({ "location.city": 1, "location.state": 1 });

export type InfluencerProfileDoc = InferSchemaType<typeof influencerProfileSchema> & {
  _id: mongoose.Types.ObjectId;
};

export const InfluencerProfile: Model<InfluencerProfileDoc> =
  (mongoose.models.InfluencerProfile as Model<InfluencerProfileDoc>) ||
  mongoose.model<InfluencerProfileDoc>("InfluencerProfile", influencerProfileSchema);
