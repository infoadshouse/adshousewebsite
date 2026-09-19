"use client";

import { isVideoUrl } from "@/lib/media";
import { uploadMedia } from "@/lib/marketplace/upload";

export function CmsMediaField({
  label,
  value,
  onChange,
  onError,
  accept = "image/*,video/mp4,video/webm,video/quicktime",
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onError: (message: string) => void;
  accept?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted">{label}</span>
      <input
        className="mb-2 w-full rounded-xl border border-line px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Unsplash URL, S3 URL, or upload"
      />
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          uploadMedia(file)
            .then(onChange)
            .catch((err: Error) => onError(err.message));
        }}
      />
      <p className="mt-1 text-xs text-muted">Images up to 8MB. Videos (MP4/WEBM/MOV) up to 80MB via S3.</p>
      {value ? (
        isVideoUrl(value) ? (
          <video src={value} className="mt-3 h-28 w-full max-w-sm rounded-2xl object-cover" muted controls />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="mt-3 h-28 w-full max-w-sm rounded-2xl object-cover" />
        )
      ) : null}
    </label>
  );
}

export function CmsImageField(props: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onError: (message: string) => void;
}) {
  return <CmsMediaField {...props} accept="image/jpeg,image/png,image/webp,image/gif" />;
}
