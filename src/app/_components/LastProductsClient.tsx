"use client";
import { fetchProducts } from "@/queries/use-products";
import { ProductsResponse } from "@/types/product";
import ProductsCard from "./ProductsCard";
import { Grid, Skeleton, Alert, Title, Button } from '@mantine/core';
import { ChevronRight } from 'lucide-react';
import Link from "next/link";
import { useEffect } from "react";

interface LastProductsClientProps {
    limit: number;
    skip: number;
    title?: string;
    onTotalChange?: (total: number) => void;
}
export default function LastProductsClient({ limit, skip, title, onTotalChange }: LastProductsClientProps) {
    const {data, isLoading, isError} = fetchProducts(limit, skip)
    const productsList = data as ProductsResponse
    
    useEffect(() => {
        if (productsList?.total != null && onTotalChange) {
            onTotalChange(productsList.total)
        }
    }, [productsList?.total, onTotalChange])
    
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
            {title && (
            <section className="flex items-center justify-between mb-4">
                <Title order={2}>{title}</Title>
                <Link href="/product">
                    <Button
                        variant="light"
                        size="sm"
                        radius="xl"
                        rightSection={<ChevronRight size={16} />}
                    >
                        See All
                    </Button>
                </Link>
            </section>
            )}
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