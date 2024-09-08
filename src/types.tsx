export type Product = {
    id: number;
    title: string;
    images: string[];
    price: number;
    description: string;
    brand: string;
    dimensions?: {
      height: number;
      width: number;
      depth: number;
    },
    rating?: number;
    category: string;
    isFavorite: boolean;
  };

  export type ProductsState = {
    products: Product[];
  };