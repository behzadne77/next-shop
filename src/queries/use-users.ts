import { QueryClient, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users";

export function useUsers({ limit, skip }: { limit: number; skip: number }) {
  return useQuery({
    queryKey: ["users", { limit, skip }],
    queryFn: () => getUsers({ limit, skip }),
    retry: 1
  });
}
export async function prefetchUsers({ limit, skip }: { limit: number; skip: number }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", { limit, skip }],
    queryFn: () => getUsers({ limit, skip }),
  });
  return queryClient;
}

export function fetchUsers(limit: number, skip: number) {
  return useUsers({ limit, skip });
}