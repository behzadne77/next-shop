import { fetchJson } from "@/lib/api";
import type { LoginResponse, UsersResponse } from "@/types/user";
import type { LoginFormData } from "@/validation/login";

export async function getUsers(params: { limit: number; skip: number }) {
  const { limit, skip } = params;
  const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  return fetchJson<UsersResponse>(`/users?${search.toString()}`);
}

export async function login(params:LoginFormData) {
  return fetchJson<LoginResponse>(`/api/auth/login`, {
    method: "post",
    body: JSON.stringify(params)
  })
}