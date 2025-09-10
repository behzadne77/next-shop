"use client";
import { use } from "react";
import { FetchProduct } from "@/queries/use-products"
import ProductGallery from "./_components/ProductGallery";
import ProductDetails from "./_components/ProductDetails";
import ProductComments from "./_components/ProductComments";
import { Product } from "@/types/product";

interface ProductShowPageProps {
    params: Promise<{
        product_id: string
    }>
}

export default function ProductShowPage ({ params }: ProductShowPageProps) {
    const resolvedParams = use(params);
    const productId = Number(resolvedParams.product_id)
    
    const {isLoading, data} = FetchProduct(productId)
    const product = data as Product
    return (
        <section className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ProductGallery isLoading={isLoading} product={product} />
                <ProductDetails isLoading={isLoading} product={product} />
            </div>
            
            {/* Comments Section */}
            <div className="mt-12">
                <ProductComments product={product} />
            </div>
        </section>
    )
}