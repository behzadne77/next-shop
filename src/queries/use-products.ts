import { QueryClient, useQuery } from "@tanstack/react-query";
import { getProducts, showProduct } from "@/services/products";

export function UseProducts({ limit, skip }: { limit: number; skip: number }) {
  return useQuery({
    queryKey: ["products", { limit, skip }],
    queryFn: () => getProducts({ limit, skip }),
    retry: 1
  });
}
export async function prefetchProducts({ limit, skip }: { limit: number; skip: number }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["products", { limit, skip }],
    queryFn: () => getProducts({ limit, skip }),
  });
  return queryClient;
}

export function fetchProducts(limit: number, skip: number) {
  return UseProducts({ limit, skip });
}

export function FetchProduct(id: number) {
  return useQuery({
    retry: 1,
    queryFn: () => showProduct(id),
    queryKey: ["product", {id}]
  })
}