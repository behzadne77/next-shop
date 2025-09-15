import { fetchJson } from "@/lib/api";
import { TodoResponse } from "@/types/todo";

export async function getUserTodos(params: { limit: number; skip: number },user_id: number, revalidateSeconds?:number) {
    const { limit, skip } = params;
    const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
    return fetchJson<TodoResponse>(`/todos/user/${user_id}?${search.toString()}`, {
      cache: revalidateSeconds ? "force-cache" : undefined,
      next: revalidateSeconds ? { revalidate: revalidateSeconds } : undefined,
    });
}