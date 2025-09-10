import { fetchJson } from "@/lib/api";
import type { PostResponse } from "@/types/post";

export async function getPosts(params: { limit: number; skip: number }) {
  const { limit, skip } = params;
  const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  return fetchJson<PostResponse>(`/posts?${search.toString()}`);
}




