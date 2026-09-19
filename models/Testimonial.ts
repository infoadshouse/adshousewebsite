import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const testimonialSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "", trim: true },
    company: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    quote: { type: String, required: true, trim: true },
    result: { type: String, default: "" },
    image: { type: String, default: "/images/testimonial-1.png" },
    sortOrder: { type: Number, default: 0 },
    published: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

testimonialSchema.index({ published: 1, sortOrder: 1 });

export type TestimonialDoc = InferSchemaType<typeof testimonialSchema> & { _id: mongoose.Types.ObjectId };

export const Testimonial: Model<TestimonialDoc> =
  (mongoose.models.Testimonial as Model<TestimonialDoc>) ||
  mongoose.model<TestimonialDoc>("Testimonial", testimonialSchema);
