import { Product } from '../types';

const createProductItem = (product: Product) => {
  return {
    id: product.id,
    title: product.title,
    images: product.images,
    price: product.price,
    description: product.description,
    brand: product.brand,
    dimensions: product.dimensions,
    rating: product.rating,
    category: product.category,
    isFavorite: false,
  }
};

export default createProductItem;