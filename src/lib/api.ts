const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dummyjson.com";
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const isInternalApi = path.startsWith("/api/");
  const url = isInternalApi 
  ? path 
  : (path.startsWith("http") ? path : `${BASE_URL}${path}`);
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HttpError(res.status, `HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}




