import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const caseStudySchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    client: { type: String, required: true, trim: true },
    industry: { type: String, default: "", trim: true },
    location: { type: String, default: "India", trim: true },
    title: { type: String, required: true, trim: true },
    challenge: { type: String, default: "" },
    solution: { type: String, default: "" },
    result: { type: String, default: "" },
    metric: { type: String, default: "" },
    metricLabel: { type: String, default: "" },
    image: { type: String, default: "/images/work-fashion.png" },
    year: { type: String, default: "" },
    services: { type: [String], default: [] },
    stats: {
      type: [{ label: { type: String, default: "" }, value: { type: String, default: "" } }],
      default: [],
    },
    story: { type: [String], default: [] },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

caseStudySchema.index({ published: 1, createdAt: -1 });

export type CaseStudyDoc = InferSchemaType<typeof caseStudySchema> & { _id: mongoose.Types.ObjectId };

export const CaseStudy: Model<CaseStudyDoc> =
  (mongoose.models.CaseStudy as Model<CaseStudyDoc>) ||
  mongoose.model<CaseStudyDoc>("CaseStudy", caseStudySchema);
