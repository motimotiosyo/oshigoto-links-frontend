import { fetchJson } from "@/lib/api";
export default async function Page() {
  const data = await fetchJson<{ message: string }>("/api/v1/ping");
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
