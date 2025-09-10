import { QueryClient, useQuery } from "@tanstack/react-query";
import { getProducts, showProduct } from "@/services/products";
import type { ProductsResponse } from "@/types/product";

export function useProducts({ limit, skip }: { limit: number; skip: number }) {
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
  return useProducts({ limit, skip });
}

export function fetchProduct(id: number) {
  return useQuery({
    retry: 1,
    queryFn: () => showProduct(id),
    queryKey: ["product", {id}]
  })
}