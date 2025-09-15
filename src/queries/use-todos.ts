import { getUserTodos } from "@/services/todos";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

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