import { QueryClient, useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/posts";

export function usePosts({ limit, skip }: { limit: number; skip: number }) {
  return useQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => getPosts({ limit, skip }),
    retry: 1
  });
}
export async function prefetchPosts({ limit, skip }: { limit: number; skip: number }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", { limit, skip }],
    queryFn: () => getPosts({ limit, skip }),
  });
  return queryClient;
}

export function fetchPosts(limit: number, skip: number) {
  return usePosts({ limit, skip });
}