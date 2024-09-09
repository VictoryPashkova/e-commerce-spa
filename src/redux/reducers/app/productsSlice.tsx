import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, Product } from '../../../types';

const initialCategories = [
  {categoryName: 'fragrances', categoryId: 1},
  {categoryName: 'womens-bags', categoryId: 2},
  {categoryName: 'sunglasses', categoryId: 3},
  {categoryName: 'womens-watches', categoryId: 4},
  {categoryName: 'womens-jewellery', categoryId: 5},
];

const initialState: ProductsState = {
  products: [],
  categories: initialCategories,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      const newProducts = action.payload;
      const uniqueProducts = newProducts.filter((newProduct: Product) =>
        !state.products.some((existingProduct: Product) => existingProduct.id === newProduct.id)
      );

      state.products = [...state.products, ...uniqueProducts];
    },
    removeProduct: (state, action: PayloadAction<number>) => {
        const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    },
    addFavoriteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, isFavorite: true };
        }
        return product;
      });
    },
    removeFavoriteProduct: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.products = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, isFavorite: false };
        }
        return product;
      });
    },
    addNewProduct: (state, action: PayloadAction<Product>) => {
      state.products = [action.payload, ...state.products];
    }
  },
});

export const { setProducts, removeProduct, addFavoriteProduct, removeFavoriteProduct, addNewProduct } = productsSlice.actions;

export default productsSlice.reducer;
