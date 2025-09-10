"use client";
import { Product } from "@/types/product";
import { Badge, Button, Group, Text, Divider, Rating, ActionIcon } from "@mantine/core";
import { ShoppingBag, Heart, Share2, Package, Truck, Shield, RotateCcw } from "lucide-react";
import ProductRanking from "./ProductRanking";

interface ProductDetailsProps {
    product: Product;
    isLoading: boolean;
}

export default function ProductDetails({ product, isLoading }: ProductDetailsProps) {
    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 bg-gray-200 rounded-lg animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                <div className="h-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
            </div>
        );
    }

    if (!product) return null;

    const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
    const isInStock = product.stock > 0;
    const isLowStock = product.stock <= 5 && product.stock > 0;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Badge variant="light" color="indigo" radius="xl" className="text-xs">
                        {product.brand}
                    </Badge>
                    <Badge variant="light" color="green" radius="xl" className="text-xs">
                        {product.category}
                    </Badge>
                    {product.discountPercentage > 0 && (
                        <Badge color="red" radius="xl" className="text-xs">
                            -{product.discountPercentage}%
                        </Badge>
                    )}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                </h1>
                <div className="flex items-center gap-2">
                    <Rating value={product.rating} readOnly size="sm" />
                    <Text size="sm" c="dimmed">
                        ({product.rating}) • {product.stock} in stock
                    </Text>
                </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 p-6 rounded-2xl border border-indigo-100">
                <div className="flex items-baseline gap-3">
                    {product.discountPercentage > 0 ? (
                        <>
                            <Text size="3xl" fw={700} c="green">
                                ${discountedPrice.toFixed(2)}
                            </Text>
                            <Text size="lg" c="dimmed" td="line-through">
                                ${product.price}
                            </Text>
                            <Text size="sm" c="green" fw={600}>
                                Save ${(product.price - discountedPrice).toFixed(2)}
                            </Text>
                        </>
                    ) : (
                        <Text size="3xl" fw={700} c="blue">
                            ${product.price}
                        </Text>
                    )}
                </div>
                {product.discountPercentage > 0 && (
                    <Text size="sm" c="dimmed" className="mt-1">
                        You save {product.discountPercentage}% off regular price
                    </Text>
                )}
            </div>

            {/* Description */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <Text size="sm" c="dimmed" className="leading-relaxed">
                    {product.description}
                </Text>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isInStock ? (isLowStock ? 'bg-orange-500' : 'bg-green-500') : 'bg-gray-400'}`} />
                <Text size="sm" fw={500} c={isInStock ? (isLowStock ? 'orange' : 'green') : 'dimmed'}>
                    {!isInStock ? 'Out of Stock' : isLowStock ? 'Low Stock - Only ' + product.stock + ' left!' : 'In Stock'}
                </Text>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Package className="h-5 w-5 text-indigo-600" />
                    <div>
                        <Text size="sm" fw={600}>Free Shipping</Text>
                        <Text size="xs" c="dimmed">On orders over $50</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Truck className="h-5 w-5 text-indigo-600" />
                    <div>
                        <Text size="sm" fw={600}>Fast Delivery</Text>
                        <Text size="xs" c="dimmed">{product.shippingInformation}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    <div>
                        <Text size="sm" fw={600}>Warranty</Text>
                        <Text size="xs" c="dimmed">{product.warrantyInformation}</Text>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <RotateCcw className="h-5 w-5 text-indigo-600" />
                    <div>
                        <Text size="sm" fw={600}>Returns</Text>
                        <Text size="xs" c="dimmed">{product.returnPolicy}</Text>
                    </div>
                </div>
            </div>

            {/* Minimum Order */}
            {product.minimumOrderQuantity > 1 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <Text size="sm" fw={600} c="amber">
                        Minimum Order: {product.minimumOrderQuantity} units
                    </Text>
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
                <Group gap="md">
                    <Button
                        variant="gradient"
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        leftSection={<ShoppingBag size={18} />}
                        disabled={!isInStock}
                        size="lg"
                        className="flex-1 transition-transform duration-200 active:scale-[0.98]"
                    >
                        {!isInStock ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    <ActionIcon
                        variant="outline"
                        color="red"
                        size="lg"
                        disabled={!isInStock}
                        className="transition-transform duration-200 active:scale-[0.98]"
                    >
                        <Heart size={18} />
                    </ActionIcon>
                    <ActionIcon
                        variant="outline"
                        color="blue"
                        size="lg"
                        className="transition-transform duration-200 active:scale-[0.98]"
                    >
                        <Share2 size={18} />
                    </ActionIcon>
                </Group>

                <Button
                    variant="outline"
                    fullWidth
                    size="lg"
                    disabled={!isInStock}
                    className="transition-transform duration-200 active:scale-[0.98]"
                >
                    Buy Now
                </Button>
            </div>

            {/* Product Ranking */}
            <ProductRanking product={product} />

            {/* Additional Info */}
            <Divider />
            <div className="text-center">
                <Text size="sm" c="dimmed">
                    Need help? <span className="text-indigo-600 cursor-pointer hover:underline">Contact Support</span>
                </Text>
            </div>
        </div>
    );
}

