import { Card, Text, Badge, Button, Group, Stack, Rating, ActionIcon } from '@mantine/core';
import { ShoppingBag, Heart } from 'lucide-react';
import Link from "next/link"
import type { Product } from "@/types/product";
import Image from 'next/image';

interface ProductsCardProps {
  product: Product;
}

export default function ProductsCard({ product }: ProductsCardProps) {
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const isInStock = product.stock > 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <Link href={`/product/${product.id}`}>
      <Card shadow="sm" padding="lg" radius="lg" className="group relative h-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur ring-1 ring-gray-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 via-sky-400/10 to-cyan-300/10 blur-2xl" />
        <Card.Section className="relative">
          <div className="relative overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-[200px] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              width={300}
              height={300}
            />
          </div>

          {product.discountPercentage > 0 && (
            <Badge
              color="red"
              variant="filled"
              size="sm"
              className="shadow ring-1 ring-white/60"
              style={{ position: 'absolute', top: 10, left: 10 }}
            >
              -{product.discountPercentage}%
            </Badge>
          )}

          <Badge
            color={!isInStock ? 'gray' : isLowStock ? 'orange' : 'green'}
            variant="filled"
            size="sm"
            className="shadow ring-1 ring-white/60"
            style={{ position: 'absolute', top: 10, right: 10 }}
          >
            {!isInStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
          </Badge>
        </Card.Section>

        <Stack gap="xs" mt="md">
          <Text size="xs" c="dimmed" tt="uppercase" fw={500} className="tracking-wide">
            {product.brand}
          </Text>
          
          {/* عنوان */}
          <Text fw={500} lineClamp={2}>
            {product.title}
          </Text>
          
          <section className="flex">
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
              {product.category}
            </span>
          </section>
          
          {/* توضیحات */}
          <Text size="sm" c="dimmed" lineClamp={2}>
            {product.description}
          </Text>
          
          <Group gap="xs">
            <Rating value={product.rating} readOnly size="sm" />
            <Text size="sm" c="dimmed">
              ({product.rating})
            </Text>
          </Group>
          
          <Group justify="space-between" align="center">
            <Stack gap={0}>
              {product.discountPercentage > 0 ? (
                <>
                  <Text size="xl" fw={700} c="green">
                    ${discountedPrice.toFixed(2)}
                  </Text>
                  <Text size="sm" c="dimmed" td="line-through">
                    ${product.price}
                  </Text>
                </>
              ) : (
                <Text size="xl" fw={700} c="blue">
                  ${product.price}
                </Text>
              )}
            </Stack>
            <Text size="xs" c="dimmed">
              {product.stock} left
            </Text>
          </Group>
          
          <Group gap="xs" mt="md">
            <Button
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan' }}
              leftSection={<ShoppingBag size={16} />}
              disabled={!isInStock}
              className="transition-transform duration-200 active:scale-[0.98]"
              flex={1}
            >
              Add to Cart
            </Button>
            <ActionIcon variant="outline" color='red' disabled={!isInStock} className="transition-transform duration-200 active:scale-[0.98]">
              <Heart size={16} />
            </ActionIcon>
          </Group>
          
          {product.minimumOrderQuantity > 1 && (
            <Text size="xs" c="dimmed" ta="center">
              Min order: {product.minimumOrderQuantity}
            </Text>
          )}
        </Stack>
      </Card>
    </Link>
  );
}