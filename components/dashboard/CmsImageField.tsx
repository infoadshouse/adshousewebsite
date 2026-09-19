"use client";

export async function uploadCmsImage(file: File) {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/marketplace/upload", { method: "POST", body });
  const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
  if (!data.ok || !data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}

export function CmsImageField({
  label,
  value,
  onChange,
  onError,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  onError: (message: string) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-xs font-semibold uppercase text-muted">{label}</span>
      <input
        className="mb-2 w-full rounded-xl border border-line px-3 py-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/… or upload"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          uploadCmsImage(file)
            .then(onChange)
            .catch((err: Error) => onError(err.message));
        }}
      />
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="mt-3 h-28 w-full max-w-sm rounded-2xl object-cover" />
      ) : null}
    </label>
  );
}
