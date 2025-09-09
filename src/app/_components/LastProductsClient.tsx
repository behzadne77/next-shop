"use client";
import { fetchProducts } from "@/queries/use-products";
import { ProductsResponse } from "@/types/product";
import ProductsCard from "./ProductsCard";
import { Grid, Skeleton, Alert, Title } from '@mantine/core';

interface LastProductsClientProps {
    limit: number;
    skip: number;
    title: string;
}
export default function LastProductsClient({ limit, skip, title }: LastProductsClientProps) {
    const {data, isLoading, isError} = fetchProducts(limit, skip)
    const productsList = data as ProductsResponse
    
    if (isLoading) {
        return (
            <div>
                <Title order={2} mb="md">{title}</Title>
                <Grid>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Grid.Col key={i} span={{ base: 12, sm: 6, md: 4 }}>
                            <Skeleton height={400} radius="md" />
                        </Grid.Col>
                    ))}
                </Grid>
            </div>
        );
    }
    
    if (isError || !data) {
        return (
            <Alert color="red" title="Error">
                Failed to load products. Please try again later.
            </Alert>
        );
    }
    
    return (
        <div>
            <Title order={2} mb="md">{title}</Title>
            <Grid>
                {productsList?.products.map(product => (
                    <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
                        <ProductsCard product={product} />
                    </Grid.Col>
                ))}
            </Grid>
        </div>
    );
}