export const MEDIA_URL_MAX = 600;

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?|#|$)/i;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)(\?|#|$)/i;

export function isVideoUrl(url: string) {
  if (!url) return false;
  if (url.includes("/media/videos/")) return true;
  if (url.startsWith("data:video/")) return true;
  return VIDEO_EXT.test(url);
}

export function isImageUrl(url: string) {
  if (!url) return false;
  if (isVideoUrl(url)) return false;
  if (url.startsWith("/images/") || url.startsWith("/uploads/")) return true;
  if (url.includes("images.unsplash.com")) return true;
  if (url.includes("/media/images/")) return true;
  return IMAGE_EXT.test(url);
}

export const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
export const VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 80 * 1024 * 1024;

export function mediaKind(type: string): "image" | "video" | null {
  if (IMAGE_TYPES.has(type)) return "image";
  if (VIDEO_TYPES.has(type)) return "video";
  return null;
}

export function extensionForType(type: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "video/mp4") return "mp4";
  if (type === "video/webm") return "webm";
  if (type === "video/quicktime") return "mov";
  return "bin";
}
