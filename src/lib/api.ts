const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://dummyjson.com";
class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "HttpError";
  }
}

// Prevent repeated refresh attempts after a failed refresh/logout
let sessionRefreshDisabled = false;
let refreshInFlight: Promise<boolean> | null = null;

async function refreshTokensOnce(): Promise<boolean> {
  if (sessionRefreshDisabled) return false;
  if (refreshInFlight) return refreshInFlight;
  refreshInFlight = (async () => {
    try {
      const res = await fetch(`/api/auth/refresh`, {
        method: "post"
      })
      console.log("res is", res)
      if (!res.ok) {
        sessionRefreshDisabled = true;
        return false;
      }
      return true;
    } catch(e) {
      sessionRefreshDisabled = true;
      return false;
    } finally {
      refreshInFlight = null;
    }
  })();
  return refreshInFlight;
}

export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const isInternalApi = path.startsWith("/api/");
  const url = isInternalApi 
  ? path 
  : (path.startsWith("http") ? path : `${BASE_URL}${path}`);

  async function doFetch(target: string): Promise<Response> {
    return fetch(target, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });
  }

  let res = await doFetch(url);

  if (!res.ok && res.status === 401 && isInternalApi && !sessionRefreshDisabled) {
    console.log("go for refresh token")
    const refreshed = await refreshTokensOnce();
    console.log("refresh token result is", refreshed)
    if (refreshed) {
      res = await doFetch(url);
    }
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new HttpError(res.status, `HTTP ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}




