import { Schema } from "mongoose";

export type LocationFields = {
  country?: string;
  state?: string;
  district?: string;
  city?: string;
  locality?: string;
  geo?: {
    type: "Point";
    coordinates: [number, number];
  };
};

export const locationSchema = new Schema<LocationFields>(
  {
    country: { type: String, default: "India" },
    state: String,
    district: String,
    city: String,
    locality: String,
    geo: {
      type: { type: String, enum: ["Point"] },
      coordinates: { type: [Number] },
    },
  },
  { _id: false },
);

export function toGeoPoint(lng?: number, lat?: number) {
  if (lng == null || lat == null || Number.isNaN(lng) || Number.isNaN(lat)) return undefined;
  return { type: "Point" as const, coordinates: [lng, lat] as [number, number] };
}
