const API_BASE =
  typeof window === "undefined"
    ? process.env.API_URL_SERVER
    : process.env.NEXT_PUBLIC_API_URL;
export async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: "no-store", ...init });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}
