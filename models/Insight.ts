import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const insightSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    date: { type: String, required: true, trim: true },
    readTime: { type: String, default: "5 min" },
    category: { type: String, default: "Insights", trim: true },
    image: { type: String, default: "/images/insight-seo.png" },
    content: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

insightSchema.index({ published: 1, date: -1 });

export type InsightDoc = InferSchemaType<typeof insightSchema> & { _id: mongoose.Types.ObjectId };

export const Insight: Model<InsightDoc> =
  (mongoose.models.Insight as Model<InsightDoc>) || mongoose.model<InsightDoc>("Insight", insightSchema);
