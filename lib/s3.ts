import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export type S3Settings = {
  bucket: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicBase: string;
};

export function s3Settings(): S3Settings | null {
  const bucket = process.env.S3_BUCKET?.trim();
  const accessKeyId = process.env.S3_ACCESS_KEY_ID?.trim();
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY?.trim();
  if (!bucket || !accessKeyId || !secretAccessKey) return null;
  const region = process.env.S3_REGION?.trim() || "ap-south-1";
  const publicBase = (process.env.S3_PUBLIC_URL?.trim() || `https://${bucket}.s3.${region}.amazonaws.com`).replace(
    /\/$/,
    "",
  );
  return { bucket, region, accessKeyId, secretAccessKey, publicBase };
}

let cached: S3Client | null = null;

function client(settings: S3Settings) {
  if (!cached) {
    cached = new S3Client({
      region: settings.region,
      credentials: {
        accessKeyId: settings.accessKeyId,
        secretAccessKey: settings.secretAccessKey,
      },
    });
  }
  return cached;
}

export function publicObjectUrl(key: string) {
  const settings = s3Settings();
  if (!settings) return "";
  return `${settings.publicBase}/${key}`;
}

export async function presignPut(key: string, contentType: string) {
  const settings = s3Settings();
  if (!settings) return null;
  const uploadUrl = await getSignedUrl(
    client(settings),
    new PutObjectCommand({
      Bucket: settings.bucket,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 300 },
  );
  return { uploadUrl, url: `${settings.publicBase}/${key}`, key };
}

export async function putObject(key: string, body: Buffer, contentType: string) {
  const settings = s3Settings();
  if (!settings) return null;
  await client(settings).send(
    new PutObjectCommand({
      Bucket: settings.bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
  return `${settings.publicBase}/${key}`;
}
