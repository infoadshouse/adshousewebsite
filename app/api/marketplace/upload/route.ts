import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";

export const runtime = "nodejs";

const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return jsonError("Choose an image file");
  if (!ALLOWED.has(file.type)) return jsonError("Use JPG, PNG, WEBP, or GIF");
  if (file.size > 2 * 1024 * 1024) return jsonError("Image must be under 2MB");

  const ext = file.type.split("/")[1] === "jpeg" ? "jpg" : file.type.split("/")[1];
  const filename = `${user.id}-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return Response.json({ ok: true, url: `/uploads/${filename}` });
}
