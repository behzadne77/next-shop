import { Card, Text, Badge, Button, Group, Stack, Image, Rating, ActionIcon } from '@mantine/core';
import { ShoppingBag, Heart } from 'lucide-react';
import type { Product } from "@/types/product";

interface ProductsCardProps {
  product: Product;
}

export default function ProductsCard({ product }: ProductsCardProps) {
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const isInStock = product.stock > 0;
  const isLowStock = product.stock <= 5 && product.stock > 0;

  return (
    <Card shadow="sm" padding="lg" radius="lg" className="bg-main-1 h-full">
      <Card.Section>
        <Image
          src={product.thumbnail}
          height={200}
          alt={product.title}
          fit="cover"
        />
        
        {/* تخفیف */}
        {product.discountPercentage > 0 && (
          <Badge
            color="red"
            variant="filled"
            size="sm"
            style={{ position: 'absolute', top: 10, left: 10 }}
          >
            -{product.discountPercentage}%
          </Badge>
        )}
        
        {/* وضعیت موجودی */}
        <Badge
          color={!isInStock ? 'gray' : isLowStock ? 'orange' : 'green'}
          variant="filled"
          size="sm"
          style={{ position: 'absolute', top: 10, right: 10 }}
        >
          {!isInStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
        </Badge>
      </Card.Section>

      <Stack gap="xs" mt="md">
        {/* برند */}
        <Text size="xs" c="dimmed" tt="uppercase" fw={500}>
          {product.brand}
        </Text>
        
        {/* عنوان */}
        <Text fw={500} lineClamp={2}>
          {product.title}
        </Text>
        
        {/* دسته‌بندی */}
        <section className='flex'>
            <Text size="sm" c="white" tt="capitalize" className='bg-blue-500 py-1 rounded-xl text-white !px-3 !py-1'>
            {product.category}
            </Text>
        </section>
        
        {/* توضیحات */}
        <Text size="sm" c="dimmed" lineClamp={2}>
          {product.description}
        </Text>
        
        {/* ریتینگ */}
        <Group gap="xs">
          <Rating value={product.rating} readOnly size="sm" />
          <Text size="sm" c="dimmed">
            ({product.rating})
          </Text>
        </Group>
        
        {/* قیمت */}
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
        
        {/* دکمه‌ها */}
        <Group gap="xs" mt="md">
          <Button 
            variant="outline" 
            leftSection={<ShoppingBag size={16} />}
            disabled={!isInStock}
            flex={1}
          >
            Add to Cart
          </Button>
          
          <ActionIcon variant="outline" color='red' disabled={!isInStock}>
            <Heart size={16} />
          </ActionIcon>
        </Group>
        
        {/* حداقل سفارش */}
        {product.minimumOrderQuantity > 1 && (
          <Text size="xs" c="dimmed" ta="center">
            Min order: {product.minimumOrderQuantity}
          </Text>
        )}
      </Stack>
    </Card>
  );
}