export async function uploadMedia(file: File) {
  const signRes = await fetch("/api/marketplace/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      size: file.size,
    }),
  });
  const sign = (await signRes.json()) as {
    ok?: boolean;
    mode?: string;
    uploadUrl?: string;
    url?: string;
    error?: string;
  };
  if (!sign.ok) throw new Error(sign.error || "Upload failed");

  if (sign.mode === "s3" && sign.uploadUrl && sign.url) {
    const put = await fetch(sign.uploadUrl, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
    if (!put.ok) throw new Error("Could not upload to storage");
    return sign.url;
  }

  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/marketplace/upload", { method: "POST", body });
  const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
  if (!data.ok || !data.url) throw new Error(data.error || "Upload failed");
  return data.url;
}
