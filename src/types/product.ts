export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  brand: string;
  minimumOrderQuantity: number;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};




