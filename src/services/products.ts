import { fetchJson } from "@/lib/api";
import { Product, type ProductsResponse } from "@/types/product";

export async function getProducts(params: { limit: number; skip: number }) {
  const { limit, skip } = params;
  const search = new URLSearchParams({ limit: String(limit), skip: String(skip) });
  return fetchJson<ProductsResponse>(`/products?${search.toString()}`);
}
export async function showProduct(id:number) {
  return fetchJson<Product>(`/products/${id}`)
}



