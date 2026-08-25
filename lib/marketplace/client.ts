export async function api<T = Record<string, unknown>>(
  path: string,
  options: RequestInit & { json?: unknown } = {},
): Promise<T & { ok: boolean; error?: string }> {
  const headers = new Headers(options.headers);
  let body = options.body;
  if (options.json !== undefined) {
    headers.set("Content-Type", "application/json");
    body = JSON.stringify(options.json);
  }
  const res = await fetch(path, { ...options, headers, body });
  const data = (await res.json().catch(() => ({ ok: false, error: "Request failed" }))) as T & {
    ok: boolean;
    error?: string;
  };
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || "Request failed");
  }
  return data;
}

export function avatarFallback(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
