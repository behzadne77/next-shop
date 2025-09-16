import { addTodo, getUserTodos } from "@/services/todos";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Todo } from "@/types/todo";

interface useUserTodosType {
    limit: number;
    skip: number;
    user_id: number;
}

export function useUserTodos(
    {limit, skip, user_id}: useUserTodosType, 
    options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn'>
) {
    return useQuery({
      queryKey: ["todos", limit, user_id],
      queryFn: () => getUserTodos({limit, skip}, user_id),
      ...options
    });
}

export function useAddTodo() {
  return useMutation<Todo, Error, { todo: string; completed?: boolean; userId: number }>({
    mutationFn: (payload) => addTodo(payload),
  });
}