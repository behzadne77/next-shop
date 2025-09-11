import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, getUsers, login } from "@/services/users";
import { LoginFormData } from "@/validation/login";

export function UseUsers({ limit, skip }: { limit: number; skip: number }) {
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
  return UseUsers({ limit, skip });
}

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (values: LoginFormData) => login(values),
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
    staleTime: 0,
    refetchOnWindowFocus: false
  })
}

export function useAuthInvalidate() {
  const qc = useQueryClient();
  return () => qc.invalidateQueries({ queryKey: ["me"] });
}