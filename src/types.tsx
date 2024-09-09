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

  export type Category = {
    categoryName: string;
    categoryId: number;
  }

  export type ProductsState = {
    products: Product[];
    categories: Category[];
  };

  export type FormValues = {
    title: string;
    price: number;
    description: string;
    category: string;
    mainImage: string;
    secondaryImage: string;
    additionalImage: string;
    brand: string;
  };