import { NextResponse } from "next/server";
import { connectDb } from "@/lib/db";
import { jsonError } from "@/lib/marketplace/api";
import { AgencyProfile } from "@/models/AgencyProfile";

export const runtime = "nodejs";

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  await connectDb();
  const agency = await AgencyProfile.findOne({ slug: slug.toLowerCase() }).lean();
  if (!agency) return jsonError("Agency not found", 404);
  return NextResponse.json({
    ok: true,
    agency: {
      id: String(agency._id),
      name: agency.name,
      slug: agency.slug,
      about: agency.about,
      website: agency.website,
      photo: agency.photo,
      location: agency.location,
      isPlatformAgency: agency.isPlatformAgency,
    },
  });
}
