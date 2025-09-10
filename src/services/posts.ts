import { fetchJson } from "@/lib/api";
import type { PostCommentResponse, PostResponse } from "@/types/post";
import type { Post } from "@/types/post";

export async function getPosts(params: { limit: number; skip: number }) {
  const { limit, skip } = params;
  const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  return fetchJson<PostResponse>(`/posts?${search.toString()}`);
}

export async function showPost(id: number) {
  return fetchJson<Post>(`/posts/${id}`);
}

export async function getPostComments(id:number) {
  return fetchJson<PostCommentResponse>(`/posts/${id}/comments`)
  
}



