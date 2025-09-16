import { fetchJson } from "@/lib/api";
import { TodoResponse } from "@/types/todo";
import { Todo } from "@/types/todo";

export async function getUserTodos(params: { limit: number; skip: number },user_id: number, revalidateSeconds?:number) {
    const { limit, skip } = params;
    const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
    return fetchJson<TodoResponse>(`/todos/user/${user_id}?${search.toString()}`, {
      cache: revalidateSeconds ? "force-cache" : undefined,
      next: revalidateSeconds ? { revalidate: revalidateSeconds } : undefined,
    });
}

export async function addTodo(payload: { todo: string; completed?: boolean; userId: number }) {
  return fetchJson<Todo>(`/todos/add`, {
    method: "POST",
    body: JSON.stringify({
      todo: payload.todo,
      completed: payload.completed ?? false,
      userId: payload.userId,
    }),
  });
}