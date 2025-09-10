"use client";
import { use } from "react";
import { fetchProduct } from "@/queries/use-products"
import ProductGallery from "./_components/ProductGallery";
import ProductDetails from "./_components/ProductDetails";
import { Product } from "@/types/product";

interface ProductShowPageProps {
    params: Promise<{
        product_id: string
    }>
}

export default function ProductShowPage ({ params }: ProductShowPageProps) {
    const resolvedParams = use(params);
    const productId = Number(resolvedParams.product_id)
    
    const {isLoading, data, isError} = fetchProduct(productId)
    const product = data as Product
    return (
        <section className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProductGallery isLoading={isLoading} product={product} />
                <ProductDetails isLoading={isLoading} product={product} />
            </div>
        </section>
    )
}