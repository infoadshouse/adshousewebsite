import mongoose from "mongoose";
import {
  caseStudies as staticCaseStudies,
  insights as staticInsights,
  testimonials as staticTestimonials,
  type CaseStudy,
  type Insight,
  type Testimonial,
} from "@/lib/data";
import { slugify } from "@/lib/marketplace/constants";
import { tryConnectDb } from "@/lib/db";
import { CaseStudy as CaseStudyModel } from "@/models/CaseStudy";
import { Insight as InsightModel } from "@/models/Insight";
import { Testimonial as TestimonialModel } from "@/models/Testimonial";

function asInsight(doc: Record<string, unknown>): Insight & { id?: string; published?: boolean } {
  return {
    id: String(doc._id ?? ""),
    slug: String(doc.slug ?? ""),
    title: String(doc.title ?? ""),
    excerpt: String(doc.excerpt ?? ""),
    seoDescription: String(doc.seoDescription ?? ""),
    date: String(doc.date ?? ""),
    readTime: String(doc.readTime ?? "5 min"),
    category: String(doc.category ?? "Insights"),
    image: String(doc.image || "/images/insight-seo.png"),
    content: Array.isArray(doc.content) ? doc.content.map(String) : [],
    published: doc.published !== false,
  };
}

function asCaseStudy(doc: Record<string, unknown>): CaseStudy & { id?: string; published?: boolean } {
  const stats = Array.isArray(doc.stats)
    ? doc.stats.map((item) => {
        const row = item as { label?: string; value?: string };
        return { label: String(row.label ?? ""), value: String(row.value ?? "") };
      })
    : [];
  return {
    id: String(doc._id ?? ""),
    slug: String(doc.slug ?? ""),
    client: String(doc.client ?? ""),
    industry: String(doc.industry ?? ""),
    location: String(doc.location ?? ""),
    title: String(doc.title ?? ""),
    challenge: String(doc.challenge ?? ""),
    solution: String(doc.solution ?? ""),
    result: String(doc.result ?? ""),
    metric: String(doc.metric ?? ""),
    metricLabel: String(doc.metricLabel ?? ""),
    image: String(doc.image || "/images/work-fashion.png"),
    year: String(doc.year ?? ""),
    services: Array.isArray(doc.services) ? doc.services.map(String) : [],
    stats,
    story: Array.isArray(doc.story) ? doc.story.map(String) : [],
    published: doc.published !== false,
  };
}

function asTestimonial(doc: Record<string, unknown>): Testimonial & {
  id?: string;
  published?: boolean;
  sortOrder?: number;
} {
  return {
    id: String(doc._id ?? ""),
    name: String(doc.name ?? ""),
    role: String(doc.role ?? ""),
    company: String(doc.company ?? ""),
    quote: String(doc.quote ?? ""),
    result: String(doc.result ?? ""),
    image: String(doc.image || "/images/testimonial-1.png"),
    published: doc.published !== false,
    sortOrder: Number(doc.sortOrder ?? 0),
  };
}

function isDuplicateKeyError(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && (error as { code?: number }).code === 11000;
}

const seedLocks = new Map<string, Promise<void>>();

function runSeed(key: string, fn: () => Promise<void>) {
  const pending = seedLocks.get(key) ?? Promise.resolve();
  const next = pending.then(fn, fn);
  seedLocks.set(key, next);
  return next;
}

async function insertIfEmpty(count: () => Promise<number>, insert: () => Promise<unknown>) {
  if ((await count()) > 0) return;
  try {
    await insert();
  } catch (error) {
    if (!isDuplicateKeyError(error)) throw error;
  }
}

async function seedInsightsIfEmpty() {
  await runSeed("insights", () =>
    insertIfEmpty(
      () => InsightModel.countDocuments(),
      () => InsightModel.insertMany(staticInsights.map((item) => ({ ...item, published: true })), { ordered: false }),
    ),
  );
}

async function seedCaseStudiesIfEmpty() {
  await runSeed("work", () =>
    insertIfEmpty(
      () => CaseStudyModel.countDocuments(),
      () =>
        CaseStudyModel.insertMany(
          staticCaseStudies.map((item) => ({ ...item, published: true })),
          { ordered: false },
        ),
    ),
  );
}

async function seedTestimonialsIfEmpty() {
  await runSeed("testimonials", async () => {
    await insertIfEmpty(
      () => TestimonialModel.countDocuments(),
      () =>
        TestimonialModel.insertMany(
          staticTestimonials.map((item, index) => ({ ...item, published: true, sortOrder: index })),
          { ordered: false },
        ),
    );

    const latestCount = await TestimonialModel.countDocuments();
    if (latestCount <= staticTestimonials.length) return;

    const dupes = await TestimonialModel.aggregate<{ ids: mongoose.Types.ObjectId[] }>([
      { $sort: { createdAt: 1 } },
      {
        $group: {
          _id: { name: "$name", company: "$company" },
          ids: { $push: "$_id" },
          n: { $sum: 1 },
        },
      },
      { $match: { n: { $gt: 1 } } },
    ]);
    const extra = dupes.flatMap((group) => group.ids.slice(1));
    if (extra.length) await TestimonialModel.deleteMany({ _id: { $in: extra } });
  });
}

export async function listInsights(options: { includeDrafts?: boolean } = {}): Promise<(Insight & { id?: string; published?: boolean })[]> {
  if (!(await tryConnectDb())) return staticInsights;
  await seedInsightsIfEmpty();
  const filter = options.includeDrafts ? {} : { published: true };
  const docs = await InsightModel.find(filter).sort({ date: -1 }).lean();
  return docs.map((doc) => asInsight(doc as Record<string, unknown>));
}

export async function getInsightBySlug(slug: string) {
  if (!(await tryConnectDb())) return staticInsights.find((item) => item.slug === slug) ?? null;
  await seedInsightsIfEmpty();
  const doc = await InsightModel.findOne({ slug, published: true }).lean();
  return doc ? asInsight(doc as Record<string, unknown>) : null;
}

export async function getInsightById(id: string) {
  if (!(await tryConnectDb())) return null;
  const doc = await InsightModel.findById(id).lean();
  return doc ? asInsight(doc as Record<string, unknown>) : null;
}

export async function listCaseStudies(options: { includeDrafts?: boolean } = {}): Promise<(CaseStudy & { id?: string; published?: boolean })[]> {
  if (!(await tryConnectDb())) return staticCaseStudies;
  await seedCaseStudiesIfEmpty();
  const filter = options.includeDrafts ? {} : { published: true };
  const docs = await CaseStudyModel.find(filter).sort({ createdAt: -1 }).lean();
  return docs.map((doc) => asCaseStudy(doc as Record<string, unknown>));
}

export async function getCaseStudyBySlug(slug: string) {
  if (!(await tryConnectDb())) return staticCaseStudies.find((item) => item.slug === slug) ?? null;
  await seedCaseStudiesIfEmpty();
  const doc = await CaseStudyModel.findOne({ slug, published: true }).lean();
  return doc ? asCaseStudy(doc as Record<string, unknown>) : null;
}

export async function getCaseStudyById(id: string) {
  if (!(await tryConnectDb())) return null;
  const doc = await CaseStudyModel.findById(id).lean();
  return doc ? asCaseStudy(doc as Record<string, unknown>) : null;
}

export async function listTestimonials(options: { includeDrafts?: boolean } = {}): Promise<(Testimonial & { id?: string; published?: boolean; sortOrder?: number })[]> {
  if (!(await tryConnectDb())) return staticTestimonials;
  await seedTestimonialsIfEmpty();
  const filter = options.includeDrafts ? {} : { published: true };
  const docs = await TestimonialModel.find(filter).sort({ sortOrder: 1, createdAt: 1 }).lean();
  return docs.map((doc) => asTestimonial(doc as Record<string, unknown>));
}

export async function getTestimonialById(id: string) {
  if (!(await tryConnectDb())) return null;
  const doc = await TestimonialModel.findById(id).lean();
  return doc ? asTestimonial(doc as Record<string, unknown>) : null;
}

export function paragraphsFromText(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function textFromParagraphs(value: string[]) {
  return value.join("\n\n");
}

export function estimateReadTime(paragraphs: string[]) {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min`;
}

export async function uniqueContentSlug(
  Model: { exists: (filter: object) => Promise<unknown> },
  base: string,
  exceptId?: string,
) {
  const root = slugify(base) || "item";
  let candidate = root;
  let i = 0;
  const except =
    exceptId && mongoose.Types.ObjectId.isValid(exceptId)
      ? { _id: { $ne: new mongoose.Types.ObjectId(exceptId) } }
      : {};
  while (await Model.exists({ slug: candidate, ...except })) {
    i += 1;
    candidate = `${root}-${i}`;
  }
  return candidate;
}
