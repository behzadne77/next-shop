import { QueryClient, useQuery } from "@tanstack/react-query";
import { getPostComments, getPosts, showPost } from "@/services/posts";

export function UsePosts({ limit, skip }: { limit: number; skip: number }) {
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
  return UsePosts({ limit, skip });
}

export function FetchPost(id: number) {
  return useQuery({
    retry: 1,
    queryFn: () => showPost(id),
    queryKey: ["post", { id }]
  })
}

export function FetchPostComments(id: number) {
  return useQuery({
    retry: 1,
    queryFn: () => getPostComments(id),
    queryKey: ["post_comment", { id }]
  })
}

