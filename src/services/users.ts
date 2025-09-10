import { fetchJson } from "@/lib/api";
import type { UsersResponse } from "@/types/user";

export async function getUsers(params: { limit: number; skip: number }) {
  const { limit, skip } = params;
  const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  return fetchJson<UsersResponse>(`/users?${search.toString()}`);
}