import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { slugify } from "@/lib/marketplace/constants";
import { extensionForType, MAX_IMAGE_BYTES, MAX_VIDEO_BYTES, mediaKind } from "@/lib/media";
import { isAuthUser, jsonError, requireApiUser } from "@/lib/marketplace/api";
import { presignPut, putObject, s3Settings } from "@/lib/s3";

export const runtime = "nodejs";

function objectKey(userId: string, kind: "image" | "video", filename: string, type: string) {
  const ext = extensionForType(type);
  const base = slugify(filename.replace(/\.[^.]+$/, "")) || kind;
  return `media/${kind}/${userId}/${Date.now()}-${base.slice(0, 40)}.${ext}`;
}

export async function POST(request: Request) {
  const user = await requireApiUser(request);
  if (!isAuthUser(user)) return user;

  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return jsonError("Invalid body");
    const data = body as Record<string, unknown>;
    const filename = typeof data.filename === "string" ? data.filename : "upload";
    const type = typeof data.contentType === "string" ? data.contentType : "";
    const size = typeof data.size === "number" ? data.size : Number(data.size);
    const kind = mediaKind(type);
    if (!kind) return jsonError("Use JPG, PNG, WEBP, GIF, MP4, WEBM, or MOV");
    const max = kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
    if (Number.isFinite(size) && size > max) {
      return jsonError(kind === "video" ? "Video must be under 80MB" : "Image must be under 8MB");
    }

    const key = objectKey(user.id, kind, filename, type);
    const signed = await presignPut(key, type);
    if (signed) {
      return Response.json({ ok: true, mode: "s3", uploadUrl: signed.uploadUrl, url: signed.url, key: signed.key });
    }
    if (kind === "video") return jsonError("Add S3 credentials to upload video", 400);
    return Response.json({ ok: true, mode: "local" });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return jsonError("Choose an image or video file");
  const kind = mediaKind(file.type);
  if (!kind) return jsonError("Use JPG, PNG, WEBP, GIF, MP4, WEBM, or MOV");
  const max = kind === "video" ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;
  if (file.size > max) return jsonError(kind === "video" ? "Video must be under 80MB" : "Image must be under 8MB");

  const key = objectKey(user.id, kind, file.name, file.type);
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await putObject(key, buffer, file.type);
  if (uploaded) return Response.json({ ok: true, url: uploaded });

  if (kind === "video") return jsonError("Add S3 credentials to upload video", 400);
  if (s3Settings()) return jsonError("Could not upload to S3", 500);

  const ext = extensionForType(file.type);
  const filename = `${user.id}-${Date.now()}.${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return Response.json({ ok: true, url: `/uploads/${filename}` });
}
